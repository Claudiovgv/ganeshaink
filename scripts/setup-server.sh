#!/bin/bash
# Ganesha Ink — VPS initial setup (Ubuntu 22.04)
# Run as root: bash setup-server.sh
set -e

echo "=== 1. System update ==="
apt update && apt upgrade -y

echo "=== 2. Node.js 18 ==="
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

echo "=== 3. MySQL 8 ==="
apt install -y mysql-server
mysql -e "CREATE DATABASE IF NOT EXISTS ganesha_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -e "CREATE USER IF NOT EXISTS 'ganesha_user'@'localhost' IDENTIFIED BY 'CHANGE_THIS_PASSWORD';"
mysql -e "GRANT ALL PRIVILEGES ON ganesha_db.* TO 'ganesha_user'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

echo "=== 4. PM2 ==="
npm install -g pm2

echo "=== 5. Nginx ==="
apt install -y nginx

echo "=== 6. Clone repo ==="
mkdir -p /home/ubuntu
cd /home/ubuntu
git clone https://github.com/Claudiovgv/ganeshaink.git ganeshaink
cd ganeshaink

echo "=== 7. Backend dependencies + Prisma ==="
cd backend
cp .env.example .env
echo ">>> EDIT /home/ubuntu/ganeshaink/backend/.env before continuing!"
echo ">>> Press Enter when done..."
read
npm install
npx prisma migrate deploy
node prisma/seed.js
cd ..

echo "=== 8. Frontend ==="
cd frontend
npm install
npm run build
cd ..

echo "=== 9. Backoffice ==="
cd backoffice
npm install
npm run build
cd ..

echo "=== 10. Nginx config ==="
cp scripts/nginx.conf /etc/nginx/sites-available/ganeshaink
ln -sf /etc/nginx/sites-available/ganeshaink /etc/nginx/sites-enabled/ganeshaink
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "=== 11. Start with PM2 ==="
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup | tail -1 | bash

echo "=== Done! ==="
echo "Backend:    http://YOUR_IP:3001"
echo "Frontend:   http://YOUR_IP:3000"
echo "Backoffice: http://YOUR_IP:3002"
