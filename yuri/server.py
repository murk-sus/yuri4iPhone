"""Local server behind the yuri4iPhone window. 127.0.0.1 only, per-launch token."""
import asyncio
import json
import secrets
import uuid
from pathlib import Path

from aiohttp import web

from . import device

HERE = Path(__file__).parent
WEB = HERE / "web"


class App:
    def __init__(self, token, cache_dir):
        self.token = token
        self.cache = cache_dir
        self.cache.mkdir(parents=True, exist_ok=True)
        self.jobs = {}

    @web.middleware
    async def guard(self, request, handler):
        if request.path.startswith("/api/"):
            tok = request.headers.get("X-Token") or request.query.get("token")
            if not secrets.compare_digest(tok or "", self.token):
                return web.json_response({"error": "unauthorized"}, status=401)
        try:
            return await handler(request)
        except web.HTTPException:
            raise
        except Exception as e:
            return web.json_response({"error": str(e) or type(e).__name__}, status=500)

    def udid(self, request):
        u = request.query.get("udid") or request.match_info.get("udid")
        return u or None

    # ---------- read ----------
    async def devices(self, request):
        return web.json_response(await device.list_devices())

    async def dashboard(self, request):
        return web.json_response(await device.dashboard(self.udid(request)))

    async def apps(self, request):
        return web.json_response(await device.apps(self.udid(request), request.query.get("kind", "User")))

    async def files(self, request):
        return web.json_response(await device.browse(self.udid(request), request.query.get("path", "/"),
                                                     request.query.get("bundle") or None))

    async def download(self, request):
        path = request.query["path"]
        data = await device.read_file(self.udid(request), path, request.query.get("bundle") or None)
        name = path.rstrip("/").split("/")[-1] or "file"
        return web.Response(body=data, headers={"Content-Disposition": f'attachment; filename="{name}"'})

    # ---------- actions ----------
    async def rename(self, request):
        b = await request.json()
        await device.rename(self.udid(request), b["name"])
        return web.json_response({"ok": True})

    async def restart(self, request):
        await device.restart(self.udid(request))
        return web.json_response({"ok": True})

    async def uninstall(self, request):
        await device.uninstall(self.udid(request), request.match_info["bundle"])
        return web.json_response({"ok": True})

    async def upload(self, request):
        name = Path(request.headers.get("X-Filename", "app.ipa")).name
        fid = uuid.uuid4().hex
        d = self.cache / fid
        d.mkdir()
        path = d / name
        with open(path, "wb") as f:
            async for chunk in request.content.iter_chunked(1 << 20):
                f.write(chunk)
        return web.json_response({"id": fid, "name": name})

    async def install(self, request):
        b = await request.json()
        d = self.cache / b["file"]
        ipa = next(d.iterdir())
        job = {"events": [], "done": False, "cond": asyncio.Condition()}
        jid = uuid.uuid4().hex[:12]
        self.jobs[jid] = job

        async def emit(**ev):
            job["events"].append(ev)
            async with job["cond"]:
                job["cond"].notify_all()

        async def run():
            try:
                await emit(stage="install", percent=0)
                loop = asyncio.get_running_loop()
                last = [-1]

                def prog(p):
                    if p != last[0]:
                        last[0] = p
                        loop.call_soon_threadsafe(lambda: asyncio.ensure_future(emit(stage="install", percent=p)))

                await device.install(self.udid(request), ipa, prog)
                await emit(stage="done")
            except Exception as e:
                await emit(stage="error", error=str(e) or type(e).__name__)
            finally:
                job["done"] = True
                async with job["cond"]:
                    job["cond"].notify_all()

        asyncio.create_task(run())
        return web.json_response({"id": jid})

    async def job_events(self, request):
        job = self.jobs.get(request.match_info["id"])
        if not job:
            raise web.HTTPNotFound()
        resp = web.StreamResponse(headers={"Content-Type": "text/event-stream", "Cache-Control": "no-cache"})
        await resp.prepare(request)
        i = 0
        while True:
            while i < len(job["events"]):
                await resp.write(f"data: {json.dumps(job['events'][i])}\n\n".encode())
                i += 1
            if job["done"]:
                break
            async with job["cond"]:
                try:
                    await asyncio.wait_for(job["cond"].wait(), timeout=15)
                except asyncio.TimeoutError:
                    await resp.write(b": ping\n\n")
        return resp

    # ---------- live syslog ----------
    async def syslog(self, request):
        udid = self.udid(request)
        resp = web.StreamResponse(headers={"Content-Type": "text/event-stream", "Cache-Control": "no-cache"})
        await resp.prepare(request)
        queue = asyncio.Queue(maxsize=500)
        stop = asyncio.Event()
        task = asyncio.create_task(device.syslog_stream(udid, queue, stop))
        try:
            while not task.done():
                try:
                    item = await asyncio.wait_for(queue.get(), timeout=10)
                    await resp.write(f"data: {json.dumps(item)}\n\n".encode())
                except asyncio.TimeoutError:
                    await resp.write(b": ping\n\n")
        except (ConnectionResetError, asyncio.CancelledError):
            pass
        finally:
            stop.set()
            task.cancel()
        return resp

    async def index(self, request):
        return web.FileResponse(WEB / "index.html", headers={"Cache-Control": "no-store"})

    def build(self):
        app = web.Application(middlewares=[self.guard], client_max_size=8 * 1024 ** 3)
        r = app.router
        r.add_get("/", self.index)
        r.add_get("/api/devices", self.devices)
        r.add_get("/api/dashboard", self.dashboard)
        r.add_get("/api/apps", self.apps)
        r.add_get("/api/files", self.files)
        r.add_get("/api/download", self.download)
        r.add_post("/api/rename", self.rename)
        r.add_post("/api/restart", self.restart)
        r.add_delete("/api/apps/{bundle}", self.uninstall)
        r.add_post("/api/upload", self.upload)
        r.add_post("/api/install", self.install)
        r.add_get("/api/jobs/{id}/events", self.job_events)
        r.add_get("/api/syslog", self.syslog)
        r.add_static("/static/", WEB)
        return app
