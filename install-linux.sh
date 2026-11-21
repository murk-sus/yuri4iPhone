#!/bin/sh
set -e
cd "$(dirname "$0")"
if command -v pipx >/dev/null; then pipx install --force .; else python3 -m pip install --user --break-system-packages . 2>/dev/null || python3 -m pip install --user .; fi
ICON="$HOME/.local/share/icons/hicolor/256x256/apps"; mkdir -p "$ICON" "$HOME/.local/share/applications"
cp assets/icon-180.png "$ICON/yuri4iphone.png" 2>/dev/null || true
cat > "$HOME/.local/share/applications/yuri4iphone.desktop" <<DESK
[Desktop Entry]
Name=yuri4iPhone
Comment=iPhone toolbox for the desktop
Exec=yuri4iphone
Icon=yuri4iphone
Terminal=false
Type=Application
Categories=Utility;
DESK
echo "Done. Launch 'yuri4iPhone' from your menu or run: yuri4iphone"
echo "iPhone not detected? Install usbmuxd (Arch: pacman -S usbmuxd, Debian: apt install usbmuxd)."
