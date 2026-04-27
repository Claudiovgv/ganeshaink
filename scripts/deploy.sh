#!/bin/bash
# Ganesha Ink — deploy update (correr no servidor via SSH)
set -e
cd /home/ubuntu/ganeshaink

echo "=== Pull latest code ==="
git pull origin main

echo "=== Backend ==="
cd backend
npm install
npx prisma migrate deploy
cd ..

echo "=== Frontend ==="
cd frontend
npm install
npm run build
cd ..

echo "=== Backoffice ==="
cd backoffice
npm install
npm run build
cd ..

echo "=== Restart apps ==="
pm2 restart ecosystem.config.js --env production

echo "=== Deploy completo ==="
pm2 status
