#!/bin/bash
set -e

# In Money CLI One-Line Installer
# Author: Moch. Erik Irriansyah (NIM 04123003 — Universitas Narotama)

echo "💎 Installing In Money CLI..."

INSTALL_DIR="$HOME/.local/bin"
mkdir -p "$INSTALL_DIR"

TARGET="$INSTALL_DIR/inmoney"
URL_API="https://api.github.com/repos/MochErik/in-money/contents/bin/inmoney"
URL_RAW="https://raw.githubusercontent.com/MochErik/in-money/main/bin/inmoney"

if command -v curl &> /dev/null; then
    curl -fsSL -H "Accept: application/vnd.github.raw" "$URL_API" -o "$TARGET" || curl -fsSL "$URL_RAW" -o "$TARGET"
elif command -v wget &> /dev/null; then
    wget -qO "$TARGET" --header="Accept: application/vnd.github.raw" "$URL_API" || wget -qO "$TARGET" "$URL_RAW"
else
    echo "❌ Error: curl or wget is required."
    exit 1
fi

chmod +x "$TARGET"

# Check if ~/.local/bin is in PATH
SHELL_RC=""
if [ -n "$ZSH_VERSION" ] || [ "$SHELL" = "/bin/zsh" ]; then
    SHELL_RC="$HOME/.zshrc"
elif [ -n "$BASH_VERSION" ] || [ "$SHELL" = "/bin/bash" ]; then
    SHELL_RC="$HOME/.bashrc"
fi

if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
    if [ -n "$SHELL_RC" ] && [ -f "$SHELL_RC" ]; then
        if ! grep -q 'export PATH="$HOME/.local/bin:$PATH"' "$SHELL_RC"; then
            echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$SHELL_RC"
            echo "✅ Added $INSTALL_DIR to PATH in $SHELL_RC"
        fi
    fi
    export PATH="$INSTALL_DIR:$PATH"
fi

echo "✨ In Money CLI installed successfully to $TARGET!"
echo ""
echo "🚀 Cara Menjalankan:"
echo "   inmoney           # Buka menu interaktif terminal"
echo "   inmoney open      # Buka live web app di browser"
echo "   inmoney serve     # Jalankan server offline lokal"
echo ""
"$TARGET" -h || true
