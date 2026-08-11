#!/usr/bin/env bash
# Deploy de uma app Next.js para o cPanel via API token (sem browser, sem SSH).
#
#   ./scripts/deploy.sh frontend
#   ./scripts/deploy.sh backoffice
#
# Requer:  ~/.ganesha-cpanel-token  (cPanel > Security > Manage API Tokens)

set -euo pipefail

APP="${1:-}"
if [[ -z "$APP" ]]; then
  echo "uso: $0 <frontend|backoffice>" >&2
  exit 1
fi

HOST="cpp77.webserver.pt:2083"
USER="ganesha"
REMOTE_ROOT="/home/ganesha/ganeshaink/$APP"
API_URL="https://api.ganeshaink.pt/v1"

TOKEN_FILE="$HOME/.ganesha-cpanel-token"
[[ -f "$TOKEN_FILE" ]] || { echo "falta $TOKEN_FILE" >&2; exit 1; }
TOKEN="$(<"$TOKEN_FILE")"
AUTH="Authorization: cpanel $USER:$TOKEN"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$REPO_ROOT/$APP"
ZIP="$(mktemp -d)/${APP}-next.zip"

# 1. Build com as variáveis de produção (ficam compiladas no output).
echo "==> build $APP"
cd "$APP_DIR"
NEXT_PUBLIC_API_URL="$API_URL" npm run build

# 2. Empacota só o .next, sem a cache (que é grande e inútil em runtime).
echo "==> zip"
rm -rf .next/cache
zip -rq "$ZIP" .next

# 3. Verifica que empacotámos a app certa antes de enviar seja o que for.
ROUTES="$(unzip -l "$ZIP" | grep -o 'server/app/[a-z()_-]*/' | cut -d/ -f3 | sort -u | tr '\n' ' ')"
echo "    rotas: $ROUTES"
case "$APP" in
  frontend)   [[ "$ROUTES" == *marcar*  ]] || { echo "!! zip nao parece o frontend" >&2; exit 1; } ;;
  backoffice) [[ "$ROUTES" == *login*   ]] || { echo "!! zip nao parece o backoffice" >&2; exit 1; } ;;
esac
unzip -l "$ZIP" | grep -q node_modules && { echo "!! node_modules no zip" >&2; exit 1; }

# 4. Upload.
echo "==> upload ($(du -h "$ZIP" | cut -f1))"
curl -sS -H "$AUTH" \
  -F "dir=$REMOTE_ROOT" \
  -F "file-1=@$ZIP" \
  "https://$HOST/execute/Fileman/upload_files" | grep -q '"errors":null' \
  || { echo "!! upload falhou" >&2; exit 1; }

# 5. Guarda o build anterior, extrai o novo.
STAMP="$(date +%Y%m%d-%H%M%S)"
echo "==> backup .next -> .next-$STAMP"
curl -sS -H "$AUTH" --get \
  --data-urlencode "sourcefiles=$REMOTE_ROOT/.next" \
  --data-urlencode "destfiles=$REMOTE_ROOT/.next-$STAMP" \
  "https://$HOST/execute/Fileman/rename_files" >/dev/null

echo "==> extrai"
curl -sS -H "$AUTH" --get \
  --data-urlencode "sourcefiles=$REMOTE_ROOT/$(basename "$ZIP")" \
  --data-urlencode "destfiles=$REMOTE_ROOT" \
  "https://$HOST/execute/Fileman/extract_files" >/dev/null

# 6. Reinicia o Passenger.
echo "==> restart"
curl -sS -H "$AUTH" --get \
  --data-urlencode "dir=$REMOTE_ROOT/tmp" \
  --data-urlencode "name=restart.txt" \
  "https://$HOST/execute/Fileman/touch_file" >/dev/null

# 7. Confirma que o site respondeu com o conteúdo novo.
sleep 5
case "$APP" in
  frontend)   URL="https://ganeshaink.pt/servicos" ;;
  backoffice) URL="https://admin.ganeshaink.pt/login" ;;
esac
echo "==> verifica $URL"
curl -s -o /dev/null -w "    HTTP %{http_code}\n" "$URL" -m 20

rm -rf "$(dirname "$ZIP")"
echo "==> feito"
