"""iPhone access for yuri4iPhone, built on pymobiledevice3 (usbmuxd, USB or Wi-Fi)."""
import asyncio
import plistlib

from pymobiledevice3 import usbmux
from pymobiledevice3.lockdown import create_using_usbmux
from pymobiledevice3.services.afc import AfcService
from pymobiledevice3.services.diagnostics import DiagnosticsService
from pymobiledevice3.services.installation_proxy import InstallationProxyService
from pymobiledevice3.services.os_trace import OsTraceService

# ProductType -> marketing name (common recent models).
MODELS = {
    "iPhone14,7": "iPhone 13", "iPhone14,8": "iPhone 13 Plus", "iPhone14,2": "iPhone 13 Pro",
    "iPhone14,3": "iPhone 13 Pro Max", "iPhone14,4": "iPhone 13 mini", "iPhone14,6": "iPhone SE (3rd gen)",
    "iPhone15,2": "iPhone 14 Pro", "iPhone15,3": "iPhone 14 Pro Max", "iPhone14,5": "iPhone 14",
    "iPhone15,4": "iPhone 14 Plus (15,4)", "iPhone15,5": "iPhone 15 Plus", "iPhone15,6": "iPhone 15",
    "iPhone16,1": "iPhone 15 Pro", "iPhone16,2": "iPhone 15 Pro Max",
    "iPhone17,3": "iPhone 16", "iPhone17,4": "iPhone 16 Plus", "iPhone17,1": "iPhone 16 Pro",
    "iPhone17,2": "iPhone 16 Pro Max", "iPhone17,5": "iPhone 16e",
    "iPhone18,1": "iPhone 17 Pro", "iPhone18,2": "iPhone 17 Pro Max", "iPhone18,3": "iPhone 17",
    "iPad13,1": "iPad Air (4th gen)", "iPad14,3": "iPad Pro 11 (4th gen)",
}
COLORS = {"1": "Black / Space", "2": "White / Silver", "3": "Gold", "4": "Rose", "5": "Red",
          "6": "Blue", "7": "Green", "8": "Yellow", "9": "Purple", "10": "Pink"}
JB_APPS = {"org.coolstar.SileoStore", "xyz.willy.Zebra", "com.opa334.Dopamine", "org.coolstar.sileo",
           "com.roothide.bootstrap", "com.opa334.trollstorehelper", "science.xnu.undecimus", "com.electra1112.electra"}
TROLL_APPS = {"com.opa334.trollstorehelper", "com.opa334.trollstore", "com.opa334.ts"}


async def _lockdown(udid=None):
    return await create_using_usbmux(serial=udid, autopair=True)


def model_name(product_type):
    return MODELS.get(product_type, product_type)


async def list_devices():
    seen = {}
    for d in await usbmux.list_devices():
        if d.serial in seen:
            continue
        info = {"udid": d.serial, "connection": "USB" if d.is_usb else "Wi-Fi"}
        try:
            ld = await _lockdown(d.serial)
            v = ld.all_values
            info.update(name=v.get("DeviceName"), model=model_name(v.get("ProductType")),
                        product=v.get("ProductType"), ios=v.get("ProductVersion"), paired=True)
            await ld.close()
        except Exception as e:
            info.update(paired=False, error=str(e) or type(e).__name__)
        seen[d.serial] = info
    return list(seen.values())


async def dashboard(udid=None):
    ld = await _lockdown(udid)
    try:
        v = ld.all_values
        out = {
            "name": v.get("DeviceName"),
            "model": model_name(v.get("ProductType")),
            "product": v.get("ProductType"),
            "ios": v.get("ProductVersion"),
            "build": v.get("BuildVersion"),
            "udid": v.get("UniqueDeviceID"),
            "serial": v.get("SerialNumber"),
            "cpu": v.get("CPUArchitecture"),
            "color": COLORS.get(str(v.get("DeviceColor")), v.get("DeviceColor")),
            "wifi": v.get("WiFiAddress"),
            "bluetooth": v.get("BluetoothAddress"),
            "regionInfo": v.get("RegionInfo"),
            "model_hw": v.get("HardwareModel"),
        }
        try:
            cap = await ld.get_value("com.apple.disk_usage", "TotalDataCapacity")
            avail = await ld.get_value("com.apple.disk_usage", "TotalDataAvailable")
            out["storage"] = {"total": cap, "available": avail, "used": (cap - avail) if cap and avail else None}
        except Exception:
            out["storage"] = None
        try:
            d = DiagnosticsService(lockdown=ld)
            io = await d.ioregistry(ioclass="AppleSmartBattery")
            if io:
                out["battery"] = {
                    "level": io.get("CurrentCapacity"),
                    "charging": io.get("IsCharging"),
                    "cycles": io.get("CycleCount"),
                    "health": round(io["AppleRawMaxCapacity"] / io["DesignCapacity"] * 100) if io.get("AppleRawMaxCapacity") and io.get("DesignCapacity") else None,
                }
            await d.close()
        except Exception:
            out["battery"] = None
        out["jailbroken"] = await _detect_jailbreak(ld)
        return out
    finally:
        await ld.close()


async def _detect_jailbreak(ld):
    try:
        apps = await InstallationProxyService(lockdown=ld).get_apps(application_type="User")
        bundles = set(apps)
        if bundles & JB_APPS:
            return {"state": "jailbroken", "trollstore": bool(bundles & TROLL_APPS)}
        if bundles & TROLL_APPS:
            return {"state": "trollstore", "trollstore": True}
        return {"state": "stock", "trollstore": False}
    except Exception:
        return {"state": "unknown", "trollstore": False}


async def apps(udid=None, kind="User"):
    ld = await _lockdown(udid)
    try:
        svc = InstallationProxyService(lockdown=ld)
        data = await svc.get_apps(application_type=kind)
        out = []
        for bid, a in data.items():
            out.append({
                "bundleId": bid,
                "name": a.get("CFBundleDisplayName") or a.get("CFBundleName") or bid,
                "version": a.get("CFBundleShortVersionString"),
                "build": a.get("CFBundleVersion"),
                "signer": a.get("SignerIdentity"),
                "container": bool(a.get("Container")),
            })
        return sorted(out, key=lambda x: (x["name"] or "").lower())
    finally:
        await ld.close()


async def uninstall(udid, bundle_id):
    ld = await _lockdown(udid)
    try:
        await InstallationProxyService(lockdown=ld).uninstall(bundle_id)
    finally:
        await ld.close()


async def install(udid, ipa_path, progress):
    ld = await _lockdown(udid)
    try:
        await InstallationProxyService(lockdown=ld).install_from_local(ipa_path, handler=lambda p, *a: progress(p))
    finally:
        await ld.close()


async def rename(udid, name):
    ld = await _lockdown(udid)
    try:
        await ld.set_value(name, "com.apple.mobile.wireless_lockdown", "DeviceName")
    finally:
        await ld.close()


# ---------- files (AFC: media partition, or an app's container) ----------
async def _call(v):
    return await v if asyncio.iscoroutine(v) else v


def _afc(ld, bundle_id=None):
    if bundle_id:
        from pymobiledevice3.services.house_arrest import HouseArrestService
        return HouseArrestService(lockdown=ld, bundle_id=bundle_id)
    return AfcService(lockdown=ld)


async def browse(udid, path="/", bundle_id=None):
    ld = await _lockdown(udid)
    afc = _afc(ld, bundle_id)
    try:
        entries = []
        for name in await _call(afc.listdir(path)):
            if name in (".", ".."):
                continue
            full = (path.rstrip("/") + "/" + name) if path != "/" else "/" + name
            try:
                st = await _call(afc.stat(full))
                entries.append({
                    "name": name,
                    "dir": st.get("st_ifmt") == "S_IFDIR",
                    "size": int(st.get("st_size", 0)),
                    "mtime": str(st.get("st_mtime", "")),
                })
            except Exception:
                entries.append({"name": name, "dir": False, "size": 0})
        entries.sort(key=lambda e: (not e["dir"], e["name"].lower()))
        return {"path": path, "entries": entries}
    finally:
        try:
            await _call(afc.close())
        except Exception:
            pass
        await ld.close()


async def read_file(udid, path, bundle_id=None):
    ld = await _lockdown(udid)
    afc = _afc(ld, bundle_id)
    try:
        return await _call(afc.get_file_contents(path))
    finally:
        try:
            await _call(afc.close())
        except Exception:
            pass
        await ld.close()


# ---------- live syslog ----------
async def syslog_stream(udid, queue, stop):
    ld = await _lockdown(udid)
    svc = OsTraceService(lockdown=ld)
    try:
        async for entry in svc.syslog():
            if stop.is_set():
                break
            await queue.put({
                "pid": getattr(entry, "pid", None),
                "process": getattr(entry, "label", None) and entry.label.subsystem or getattr(entry, "image_name", ""),
                "message": getattr(entry, "message", ""),
                "level": str(getattr(entry, "level", "")),
            })
    finally:
        try:
            await svc.close()
        except Exception:
            pass
        await ld.close()


async def restart(udid):
    ld = await _lockdown(udid)
    try:
        d = DiagnosticsService(lockdown=ld)
        await d.restart()
    finally:
        await ld.close()
