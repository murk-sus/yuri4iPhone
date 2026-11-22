<p align="center"><img src="assets/icon-180.png" width="104" alt="yuri4iPhone"></p>
<h1 align="center">yuri4iPhone</h1>
<p align="center">
  <b>Удобный набор инструментов для айфона на компьютере — как 3uTools, но открытый, кроссплатформенный и милый.</b><br>
  Работает на <b>Linux, Windows и macOS</b>. С джейлом или без — yuri показывает только те инструменты, что работают на твоём устройстве.
</p>
<p align="center">
  <a href="README.md">English</a> · <a href="README_ZH.md">简体中文</a> ·
  <a href="https://github.com/murk-sus/yuri4iPhone/releases/latest"><b>⬇ Скачать</b></a>
</p>

## Что умеет

- **📱 Дашборд устройства** — модель, iOS, память, **заряд, циклы и здоровье батареи**, серийник, UDID, чип, Wi-Fi — вживую по USB или Wi-Fi.
- **✨ Кастомизация** — главная фишка: yuri определяет, **без джейла у тебя телефон, TrollStore или джейлбрейк**, и **открывает ровно те инструменты, что работают**. Джейл-инструменты на обычном телефоне честно заблокированы с подписью почему.
- **📦 Приложения** — список своих и системных приложений, удаление и **установка подписанного IPA** по USB с прогрессом.
- **🗂️ Файлы** — просмотр медиа-раздела (фото, загрузки, записи) и выгрузка файлов.
- **📜 Живые логи** — системный лог в реальном времени с фильтром.
- `EN · RU · 中文`, светлая и тёмная тема.

Всё работает локально на сервере `127.0.0.1` со свежим токеном при каждом запуске. Устройство никуда в облако не ходит.

## Установка

**Linux**
```sh
git clone https://github.com/murk-sus/yuri4iPhone && cd yuri4iPhone
./install-linux.sh
yuri4iphone
```
Нужен `usbmuxd` (Arch: `pacman -S usbmuxd`, Debian/Ubuntu: `apt install usbmuxd`) и Python 3.10+.

**Windows / macOS** — бери сборку из [Releases](https://github.com/murk-sus/yuri4iPhone/releases). На Windows поставь iTunes или Apple Devices для драйвера.

## 💖 Поддержать

Бесплатно, лицензия MIT. **[Страница донатов с QR](https://murk-sus.github.io/donate/)** (USDT TRC20, TON, BTC, ETH, SOL) · Telegram [@jailbreak_IOS_and_tweaks](https://t.me/jailbreak_IOS_and_tweaks)

Название и фиолетово-книжный стиль — отсылка к Yuri. Арт из *Doki Doki Literature Club* не используется.

MIT © murk. На базе [pymobiledevice3](https://github.com/doronz88/pymobiledevice3). Не связан с Apple и с 3uTools.
