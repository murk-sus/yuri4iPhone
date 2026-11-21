// yuri4iPhone — front-end. Talks only to the local server with a per-launch token.

const S = {
  en: {
    navDash: "Device", navCustom: "Customize", navApps: "Apps", navFiles: "Files", navLogs: "Logs", donate: "Support",
    dashTitle: "Device", customTitle: "Customize", customSub: "yuri picks the tools that work on your iPhone right now.",
    noDevice: "No iPhone found. Connect it with a cable, unlock it and tap Trust.",
    model: "Model", ios: "iOS", storage: "Storage", battery: "Battery", cycles: "Battery cycles", serial: "Serial",
    udid: "UDID", cpu: "Chip", wifi: "Wi-Fi", used: "used", free: "free", charging: "charging", health: "health",
    userApps: "My apps", systemApps: "System", installIpa: "＋ Install IPA", search: "Search apps…", logFilter: "Filter…",
    uninstall: "Delete", uninstallConfirm: "Delete {name} from the iPhone?", deleted: "Deleted", installing: "Installing…", installed: "Installed 🎀",
    filesSub: "Browse the media partition (photos, downloads, recordings).", download: "download", empty: "Empty",
    startLog: "▶ Start", stopLog: "⏹ Stop", clear: "Clear",
    cancel: "Cancel", ok: "OK", rename: "Rename device", renamed: "Renamed", restart: "Restart iPhone", restartConfirm: "Restart the iPhone now?", restarting: "Restarting…",
    stock: "Stock (no jailbreak)", jailbroken: "Jailbroken", trollstore: "TrollStore",
    bannerStock: "Your iPhone is not jailbroken. These tools work on any iPhone — no jailbreak needed.",
    bannerJb: "Jailbreak detected 🔓 — every tool is unlocked, including tweak injection and respring.",
    bannerTroll: "TrollStore detected — permanent signing tools are available alongside the standard ones.",
    needJb: "needs jailbreak", needTroll: "needs TrollStore",
    t_rename: "Rename device", t_rename_d: "Give your iPhone a new name.",
    t_restart: "Restart", t_restart_d: "Reboot the device.",
    t_battery: "Battery health", t_battery_d: "Cycle count and charge level.",
    t_logs: "Live logs", t_logs_d: "Watch the system log in real time.",
    t_install: "Install app", t_install_d: "Install a signed IPA over USB.",
    t_sign: "Sign IPA", t_sign_d: "Open SayoSign to sign with a .p12 or Apple ID.",
    t_files: "Export files", t_files_d: "Pull photos and files off the device.",
    t_respring: "Respring", t_respring_d: "Restart the SpringBoard UI (jailbroken only).",
    t_tweak: "Install tweak", t_tweak_d: "Install a .deb tweak to the device.",
    t_sources: "Tweak sources", t_sources_d: "Open the SayoSign tweak repo.",
  },
  ru: {
    navDash: "Устройство", navCustom: "Кастомизация", navApps: "Приложения", navFiles: "Файлы", navLogs: "Логи", donate: "Поддержать",
    dashTitle: "Устройство", customTitle: "Кастомизация", customSub: "yuri сам подбирает инструменты, которые работают на твоём айфоне прямо сейчас.",
    noDevice: "Айфон не найден. Подключи кабелем, разблокируй и нажми «Доверять».",
    model: "Модель", ios: "iOS", storage: "Память", battery: "Батарея", cycles: "Циклы батареи", serial: "Серийный номер",
    udid: "UDID", cpu: "Чип", wifi: "Wi-Fi", used: "занято", free: "свободно", charging: "зарядка", health: "здоровье",
    userApps: "Мои приложения", systemApps: "Системные", installIpa: "＋ Установить IPA", search: "Поиск приложений…", logFilter: "Фильтр…",
    uninstall: "Удалить", uninstallConfirm: "Удалить {name} с айфона?", deleted: "Удалено", installing: "Установка…", installed: "Установлено 🎀",
    filesSub: "Просмотр медиа-раздела (фото, загрузки, записи).", download: "скачать", empty: "Пусто",
    startLog: "▶ Старт", stopLog: "⏹ Стоп", clear: "Очистить",
    cancel: "Отмена", ok: "ОК", rename: "Переименовать", renamed: "Переименовано", restart: "Перезагрузить айфон", restartConfirm: "Перезагрузить айфон сейчас?", restarting: "Перезагрузка…",
    stock: "Без джейлбрейка", jailbroken: "Джейлбрейк", trollstore: "TrollStore",
    bannerStock: "Твой айфон без джейлбрейка. Эти инструменты работают на любом айфоне — джейл не нужен.",
    bannerJb: "Обнаружен джейлбрейк 🔓 — открыты все инструменты, включая инжект твиков и respring.",
    bannerTroll: "Обнаружен TrollStore — доступны инструменты постоянной подписи вместе со стандартными.",
    needJb: "нужен джейл", needTroll: "нужен TrollStore",
    t_rename: "Переименовать", t_rename_d: "Дать айфону новое имя.",
    t_restart: "Перезагрузка", t_restart_d: "Перезагрузить устройство.",
    t_battery: "Здоровье батареи", t_battery_d: "Циклы и уровень заряда.",
    t_logs: "Живые логи", t_logs_d: "Системный лог в реальном времени.",
    t_install: "Установить приложение", t_install_d: "Установить подписанный IPA по USB.",
    t_sign: "Подписать IPA", t_sign_d: "Открыть SayoSign для подписи через .p12 или Apple ID.",
    t_files: "Экспорт файлов", t_files_d: "Выгрузить фото и файлы с устройства.",
    t_respring: "Respring", t_respring_d: "Перезапустить SpringBoard (только джейл).",
    t_tweak: "Установить твик", t_tweak_d: "Установить .deb-твик на устройство.",
    t_sources: "Источники твиков", t_sources_d: "Открыть репозиторий твиков SayoSign.",
  },
  zh: {
    navDash: "设备", navCustom: "自定义", navApps: "应用", navFiles: "文件", navLogs: "日志", donate: "支持",
    dashTitle: "设备", customTitle: "自定义", customSub: "yuri 会自动挑选当前 iPhone 可用的工具。",
    noDevice: "未找到 iPhone。请用数据线连接、解锁并点击“信任”。",
    model: "型号", ios: "iOS", storage: "存储", battery: "电池", cycles: "电池循环", serial: "序列号",
    udid: "UDID", cpu: "芯片", wifi: "Wi-Fi", used: "已用", free: "可用", charging: "充电中", health: "健康度",
    userApps: "我的应用", systemApps: "系统", installIpa: "＋ 安装 IPA", search: "搜索应用…", logFilter: "筛选…",
    uninstall: "删除", uninstallConfirm: "从 iPhone 删除 {name}？", deleted: "已删除", installing: "安装中…", installed: "已安装 🎀",
    filesSub: "浏览媒体分区（照片、下载、录音）。", download: "下载", empty: "空",
    startLog: "▶ 开始", stopLog: "⏹ 停止", clear: "清除",
    cancel: "取消", ok: "确定", rename: "重命名设备", renamed: "已重命名", restart: "重启 iPhone", restartConfirm: "现在重启 iPhone？", restarting: "重启中…",
    stock: "无越狱", jailbroken: "已越狱", trollstore: "TrollStore",
    bannerStock: "你的 iPhone 没有越狱。这些工具适用于任何 iPhone，无需越狱。",
    bannerJb: "检测到越狱 🔓 — 所有工具已解锁，包括插件注入和注销。",
    bannerTroll: "检测到 TrollStore — 永久签名工具与标准工具均可用。",
    needJb: "需要越狱", needTroll: "需要 TrollStore",
    t_rename: "重命名设备", t_rename_d: "给 iPhone 起个新名字。",
    t_restart: "重启", t_restart_d: "重新启动设备。",
    t_battery: "电池健康", t_battery_d: "循环次数与电量。",
    t_logs: "实时日志", t_logs_d: "实时查看系统日志。",
    t_install: "安装应用", t_install_d: "通过 USB 安装已签名的 IPA。",
    t_sign: "签名 IPA", t_sign_d: "打开 SayoSign 用 .p12 或 Apple ID 签名。",
    t_files: "导出文件", t_files_d: "从设备导出照片和文件。",
    t_respring: "注销 (Respring)", t_respring_d: "重启 SpringBoard（仅越狱）。",
    t_tweak: "安装插件", t_tweak_d: "向设备安装 .deb 插件。",
    t_sources: "插件源", t_sources_d: "打开 SayoSign 插件仓库。",
  },
};
let lang = (() => { try { return localStorage.getItem("yurilang"); } catch { return null; } })() || (navigator.language || "en").slice(0, 2);
if (!S[lang]) lang = "en";
const t = (k, v = {}) => (S[lang][k] || S.en[k] || k).replace(/\{(\w+)\}/g, (_, x) => v[x]);

const token = new URLSearchParams(location.hash.slice(1)).get("token") || sessionStorage.getItem("ytok") || "";
sessionStorage.setItem("ytok", token);
history.replaceState(null, "", "/");
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const fmtSize = (n) => { if (n == null) return "—"; const u = ["B", "KB", "MB", "GB"]; let i = 0; while (n >= 1024 && i < 3) { n /= 1024; i++; } return `${n.toFixed(i >= 2 ? 1 : 0)} ${u[i]}`; };

async function api(path, opts = {}) {
  const r = await fetch(path, { ...opts, headers: { "X-Token": token, ...(opts.body ? { "Content-Type": "application/json" } : {}), ...(opts.headers || {}) } });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || r.statusText);
  return data;
}
function toast(m) { const e = $("#toast"); e.textContent = m; e.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => (e.hidden = true), 2600); }
function ask(title, value = "") {
  return new Promise((res) => {
    const d = $("#prompt"); $("#prompt-title").textContent = title; const inp = $("#prompt-input"); inp.value = value;
    d.onclose = () => res(d.returnValue === "ok" ? inp.value : null);
    d.showModal(); inp.focus(); inp.select();
  });
}
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach((e) => (e.textContent = t(e.dataset.t)));
  document.querySelectorAll("[data-tp]").forEach((e) => (e.placeholder = t(e.dataset.tp)));
  document.querySelectorAll("[data-lang]").forEach((b) => b.classList.toggle("on", b.dataset.lang === lang));
}

const state = { device: null, dash: null, appKind: "User", apps: [], path: "/", logOn: false, logES: null };

// ---------- nav ----------
document.querySelectorAll(".nav").forEach((b) => b.addEventListener("click", () => {
  document.querySelectorAll(".nav").forEach((x) => x.classList.toggle("on", x === b));
  document.querySelectorAll(".view").forEach((v) => v.classList.toggle("on", v.id === "view-" + b.dataset.view));
  const v = b.dataset.view;
  if (v === "apps") loadApps();
  if (v === "files") loadFiles("/");
  if (v === "custom") renderCustom();
}));
document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => {
  lang = b.dataset.lang; try { localStorage.setItem("yurilang", lang); } catch {}
  applyLang(); renderDash(); renderCustom();
}));

// ---------- device + dashboard ----------
async function poll() {
  try {
    const devs = await api("/api/devices");
    const d = devs.find((x) => x.paired) || devs[0];
    if (!d) { state.device = null; renderDash(); return; }
    if (!state.device || state.device.udid !== d.udid) { state.device = d; await refresh(); }
    else state.device = d;
    sideDevice();
  } catch { state.device = null; renderDash(); }
}
async function refresh() {
  if (!state.device) return;
  try { state.dash = await api(`/api/dashboard?udid=${encodeURIComponent(state.device.udid)}`); } catch (e) { state.dash = null; }
  renderDash(); sideDevice();
}
function sideDevice() {
  const el = $("#side-device");
  if (!state.device) { el.innerHTML = `<span class="dot off"></span>${esc(t("noDevice").split(".")[0])}`; return; }
  el.innerHTML = `<b>${esc(state.device.name || "iPhone")}</b><span class="dot"></span>${esc(state.device.connection)} · iOS ${esc(state.device.ios || "?")}`;
}
function renderDash() {
  const el = $("#dash");
  if (!state.device) { el.innerHTML = `<div class="card empty">${esc(t("noDevice"))}</div>`; return; }
  const d = state.dash;
  if (!d) { el.innerHTML = `<div class="card empty">…</div>`; return; }
  const jb = d.jailbroken?.state || "stock";
  const st = d.storage, bat = d.battery;
  const usedPct = st && st.total ? (st.used / st.total) * 100 : 0;
  el.innerHTML = `
    <div class="card dash-hero">
      <div class="phone">📱</div>
      <div>
        <h2>${esc(d.name || "iPhone")}</h2>
        <div class="sub">${esc(d.model || d.product)} · iOS ${esc(d.ios)} (${esc(d.build)})</div>
        <span class="jb ${jb}">${esc(t(jb))}</span>
      </div>
    </div>
    <div class="grid">
      <div class="stat"><div class="k">${t("storage")}</div><div class="v">${st ? fmtSize(st.used) : "—"} <span class="muted small">/ ${st ? fmtSize(st.total) : "—"}</span></div><div class="meter"><i style="width:${usedPct}%"></i></div></div>
      ${bat ? `<div class="stat"><div class="k">${t("battery")}</div><div class="v">${bat.level ?? "—"}%${bat.charging ? " ⚡" : ""}</div><div class="meter bat"><i style="width:${bat.level || 0}%"></i></div></div>` : ""}
      ${bat && bat.cycles != null ? `<div class="stat"><div class="k">${t("cycles")}</div><div class="v">${bat.cycles}${bat.health ? ` · ${bat.health}% ${t("health")}` : ""}</div></div>` : ""}
    </div>
    <div class="card" style="margin-top:14px">
      <dl class="kv2">
        <dt>${t("model")}</dt><dd>${esc(d.model || "")} <span class="muted mono">${esc(d.product)}</span></dd>
        <dt>${t("cpu")}</dt><dd>${esc(d.cpu)}</dd>
        <dt>${t("serial")}</dt><dd class="mono">${esc(d.serial)}</dd>
        <dt>${t("udid")}</dt><dd class="mono">${esc(d.udid)}</dd>
        <dt>${t("wifi")}</dt><dd class="mono">${esc(d.wifi || "—")}</dd>
      </dl>
    </div>`;
}

// ---------- customization ----------
const TOOLS = [
  { id: "rename", icon: "✏️", need: "any", run: toolRename },
  { id: "battery", icon: "🔋", need: "any", run: () => go("dash") },
  { id: "install", icon: "📥", need: "any", run: () => go("apps") },
  { id: "files", icon: "🗂️", need: "any", run: () => go("files") },
  { id: "logs", icon: "📜", need: "any", run: () => go("logs") },
  { id: "sign", icon: "🎀", need: "any", run: () => open("https://github.com/murk-sus/SayoSign", "_blank") },
  { id: "restart", icon: "🔄", need: "any", run: toolRestart },
  { id: "respring", icon: "💫", need: "jb", run: () => toast("respring — " + t("needJb")) },
  { id: "tweak", icon: "🧩", need: "jb", run: () => toast(".deb — " + t("needJb")) },
  { id: "sources", icon: "📚", need: "jb", run: () => open("https://github.com/murk-sus/VoidGram-plugins", "_blank") },
];
function go(view) { document.querySelector(`.nav[data-view=${view}]`).click(); }
function renderCustom() {
  const jb = state.dash?.jailbroken?.state || "stock";
  const unlocked = jb === "jailbroken" || jb === "trollstore";
  $("#custom-banner").innerHTML = `<div class="banner ${jb}"><span class="big">${jb === "stock" ? "📱" : "🔓"}</span><span>${esc(jb === "stock" ? t("bannerStock") : jb === "trollstore" ? t("bannerTroll") : t("bannerJb"))}</span></div>`;
  $("#custom-grid").innerHTML = TOOLS.map((tool) => {
    const locked = tool.need === "jb" && !unlocked;
    return `<button class="tool ${locked ? "locked" : ""}" data-tool="${tool.id}">
      <div class="ic">${tool.icon}</div>
      <h3>${esc(t("t_" + tool.id))}</h3>
      <p>${esc(t("t_" + tool.id + "_d"))}</p>
      ${locked ? `<span class="lock">🔒 ${esc(t("needJb"))}</span>` : ""}
    </button>`;
  }).join("");
}
$("#custom-grid").addEventListener("click", (e) => {
  const b = e.target.closest("[data-tool]");
  if (!b || b.classList.contains("locked")) return;
  TOOLS.find((x) => x.id === b.dataset.tool).run();
});
async function toolRename() {
  const name = await ask(t("rename"), state.device?.name || "");
  if (name == null || !name.trim()) return;
  await api(`/api/rename?udid=${encodeURIComponent(state.device.udid)}`, { method: "POST", body: JSON.stringify({ name: name.trim() }) });
  toast(t("renamed")); refresh();
}
async function toolRestart() {
  if (!confirm(t("restartConfirm"))) return;
  await api(`/api/restart?udid=${encodeURIComponent(state.device.udid)}`, { method: "POST" });
  toast(t("restarting"));
}

// ---------- apps ----------
document.querySelectorAll("[data-kind]").forEach((b) => b.addEventListener("click", () => {
  document.querySelectorAll("[data-kind]").forEach((x) => x.classList.toggle("on", x === b));
  state.appKind = b.dataset.kind; loadApps();
}));
async function loadApps() {
  if (!state.device) { $("#apps-list").innerHTML = `<div class="empty">${esc(t("noDevice"))}</div>`; return; }
  try { state.apps = await api(`/api/apps?udid=${encodeURIComponent(state.device.udid)}&kind=${state.appKind}`); }
  catch (e) { state.apps = []; toast(e.message); }
  renderApps();
}
function renderApps() {
  const q = $("#apps-search").value.toLowerCase();
  const list = state.apps.filter((a) => !q || a.name.toLowerCase().includes(q) || a.bundleId.toLowerCase().includes(q));
  $("#apps-list").innerHTML = list.length ? list.map((a) => `<div class="app-row"><div><b>${esc(a.name)}</b><span class="mono muted small">${esc(a.bundleId)} · ${esc(a.version || "")}</span></div>
    ${state.appKind === "User" ? `<button class="danger" data-un="${esc(a.bundleId)}" data-name="${esc(a.name)}">${t("uninstall")}</button>` : ""}</div>`).join("") : `<div class="empty">—</div>`;
}
$("#apps-search").addEventListener("input", renderApps);
$("#apps-list").addEventListener("click", async (e) => {
  const b = e.target.closest("[data-un]");
  if (!b || !confirm(t("uninstallConfirm", { name: b.dataset.name }))) return;
  b.disabled = true;
  try { await api(`/api/apps/${encodeURIComponent(b.dataset.un)}?udid=${encodeURIComponent(state.device.udid)}`, { method: "DELETE" }); toast(t("deleted")); loadApps(); }
  catch (err) { toast(err.message); b.disabled = false; }
});
$("#ipa-input").addEventListener("change", async (e) => {
  const file = e.target.files[0]; e.target.value = "";
  if (!file || !state.device) return;
  const job = $("#job"); job.hidden = false; job.innerHTML = `<b>${esc(t("installing"))}</b><div class="bar"><i id="jb"></i></div>`;
  try {
    const up = await new Promise((ok, fail) => {
      const x = new XMLHttpRequest(); x.open("POST", "/api/upload");
      x.setRequestHeader("X-Token", token); x.setRequestHeader("X-Filename", encodeURIComponent(file.name).replace(/%20/g, " "));
      x.upload.onprogress = (ev) => { if (ev.lengthComputable) $("#jb").style.width = ev.loaded / ev.total * 40 + "%"; };
      x.onload = () => x.status === 200 ? ok(JSON.parse(x.responseText)) : fail(new Error(x.responseText)); x.onerror = () => fail(new Error("upload failed")); x.send(file);
    });
    const { id } = await api(`/api/install?udid=${encodeURIComponent(state.device.udid)}`, { method: "POST", body: JSON.stringify({ file: up.id }) });
    await new Promise((done) => {
      const es = new EventSource(`/api/jobs/${id}/events?token=${encodeURIComponent(token)}`);
      es.onmessage = (m) => { const ev = JSON.parse(m.data);
        if (ev.stage === "install") $("#jb").style.width = 40 + ev.percent * 0.6 + "%";
        if (ev.stage === "done") { job.innerHTML = `<b>${esc(t("installed"))}</b>`; es.close(); done(); loadApps(); }
        if (ev.stage === "error") { job.innerHTML = `<b style="color:var(--bad)">${esc(ev.error)}</b>`; es.close(); done(); }
      };
      es.onerror = () => { es.close(); done(); };
    });
  } catch (err) { job.innerHTML = `<b style="color:var(--bad)">${esc(err.message)}</b>`; }
});

// ---------- files ----------
async function loadFiles(path) {
  if (!state.device) { $("#files-list").innerHTML = `<div class="empty">${esc(t("noDevice"))}</div>`; return; }
  try {
    const r = await api(`/api/files?udid=${encodeURIComponent(state.device.udid)}&path=${encodeURIComponent(path)}`);
    state.path = r.path; renderFiles(r.entries);
  } catch (e) { toast(e.message); }
}
function renderFiles(entries) {
  const parts = state.path.split("/").filter(Boolean);
  $("#crumbs").innerHTML = `<a data-p="/">💾</a>` + parts.map((p, i) => ` <span>/</span> <a data-p="/${parts.slice(0, i + 1).join("/")}">${esc(p)}</a>`).join("");
  $("#files-list").innerHTML = entries.length ? entries.map((e) => {
    const full = (state.path === "/" ? "" : state.path) + "/" + e.name;
    return `<div class="file-row ${e.dir ? "dir" : ""}" ${e.dir ? `data-dir="${esc(full)}"` : ""}>
      <span class="fi">${e.dir ? "📁" : "📄"}</span>
      <span>${esc(e.name)}</span>
      <span class="muted small">${e.dir ? "" : fmtSize(e.size)}</span>
      ${e.dir ? "<span></span>" : `<a class="dl" href="/api/download?udid=${encodeURIComponent(state.device.udid)}&path=${encodeURIComponent(full)}&token=${encodeURIComponent(token)}">${t("download")}</a>`}
    </div>`;
  }).join("") : `<div class="empty">${esc(t("empty"))}</div>`;
}
$("#crumbs").addEventListener("click", (e) => { const a = e.target.closest("[data-p]"); if (a) loadFiles(a.dataset.p); });
$("#files-list").addEventListener("click", (e) => { const r = e.target.closest("[data-dir]"); if (r) loadFiles(r.dataset.dir); });

// ---------- logs ----------
$("#log-toggle").addEventListener("click", () => {
  if (state.logOn) { state.logES?.close(); state.logOn = false; $("#log-toggle").textContent = t("startLog"); return; }
  if (!state.device) return toast(t("noDevice"));
  state.logOn = true; $("#log-toggle").textContent = t("stopLog");
  const es = new EventSource(`/api/syslog?udid=${encodeURIComponent(state.device.udid)}&token=${encodeURIComponent(token)}`);
  state.logES = es;
  es.onmessage = (m) => {
    const ev = JSON.parse(m.data); const f = $("#log-filter").value.toLowerCase();
    const line = `${ev.process || ""} ${ev.message || ""}`;
    if (f && !line.toLowerCase().includes(f)) return;
    const box = $("#logs"); const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 40;
    const div = document.createElement("div");
    div.innerHTML = `<span class="proc">${esc(ev.process || "")}</span> ${esc(ev.message || "")}`;
    box.appendChild(div);
    while (box.childElementCount > 2000) box.firstChild.remove();
    if (atBottom) box.scrollTop = box.scrollHeight;
  };
  es.onerror = () => { es.close(); state.logOn = false; $("#log-toggle").textContent = t("startLog"); };
});
$("#log-clear").addEventListener("click", () => ($("#logs").innerHTML = ""));

// ---------- boot ----------
applyLang();
poll();
setInterval(() => { if (!document.hidden) poll(); }, 5000);
