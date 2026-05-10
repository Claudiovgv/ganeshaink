#!/bin/bash
# Ganesha Ink — deploy no cPanel (correr no servidor via SSH)
# Uso: bash scripts/cpanel-deploy.sh
set -e

APP_DIR="/home/ganesha/ganeshaink"

echo "=== [1/5] Pull código mais recente ==="
cd "$APP_DIR"
git pull origin main

echo "=== [2/5] Backend — instalar dependências ==="
cd "$APP_DIR/backend"
npm install --omit=dev

echo "=== [3/5] Backend — correr migrações ==="
node prisma/migrate.js

echo "=== [4/5] Frontend — instalar e compilar ==="
cd "$APP_DIR/frontend"
npm install
npm run build

echo "=== [5/5] Reiniciar apps cPanel ==="
# cPanel/Passenger reinicia ao tocar neste ficheiro
mkdir -p "$APP_DIR/backend/tmp"
mkdir -p "$APP_DIR/frontend/tmp"
touch "$APP_DIR/backend/tmp/restart.txt"
touch "$APP_DIR/frontend/tmp/restart.txt"

echo ""
echo "✅ Deploy completo!"
echo "   Backend:  https://comfortable-peach-hawk.62-193-192-119.cpanel.site/"
echo "   Frontend: https://magnificent-ivory-cobra.62-193-192-119.cpanel.site/"
