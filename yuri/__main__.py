"""Starts yuri4iPhone: a local server plus a window (pywebview if present, else browser)."""
import argparse
import asyncio
import os
import secrets
import socket
import sys
import threading
import webbrowser
from pathlib import Path

from aiohttp import web

from .server import App


def cache_dir():
    if sys.platform == "win32":
        base = Path(os.environ.get("LOCALAPPDATA", Path.home()))
    elif sys.platform == "darwin":
        base = Path.home() / "Library" / "Caches"
    else:
        base = Path(os.environ.get("XDG_CACHE_HOME", Path.home() / ".cache"))
    return base / "yuri4iphone"


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def main():
    ap = argparse.ArgumentParser(prog="yuri4iphone")
    ap.add_argument("--port", type=int, default=0)
    ap.add_argument("--no-window", action="store_true")
    args = ap.parse_args()

    token = secrets.token_urlsafe(24)
    port = args.port or free_port()
    url = f"http://127.0.0.1:{port}/#token={token}"
    app = App(token, cache_dir()).build()

    try:
        import webview
    except ImportError:
        webview = None

    if webview and not args.no_window:
        threading.Thread(target=lambda: asyncio.run(_serve(app, port)), daemon=True).start()
        webview.create_window("yuri4iPhone", url, width=1200, height=840, min_size=(430, 640))
        webview.start()
        return

    print(f"yuri4iPhone is running at {url}")
    if not args.no_window:
        threading.Timer(0.8, lambda: webbrowser.open(url)).start()
    web.run_app(app, host="127.0.0.1", port=port, print=None)


async def _serve(app, port):
    runner = web.AppRunner(app)
    await runner.setup()
    await web.TCPSite(runner, "127.0.0.1", port).start()
    await asyncio.Event().wait()


if __name__ == "__main__":
    main()
