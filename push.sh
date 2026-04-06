#!/bin/bash
# Запуск: ./push.sh ВАШ_ТОКЕН
# Или:   TOKEN=ваш_токен ./push.sh

cd "$(dirname "$0")"
TOKEN="${1:-$TOKEN}"

if [ -z "$TOKEN" ] && [ -f "github-token.local" ]; then
  TOKEN=$(tr -d '\r' < "github-token.local" | head -n1 | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
fi

if [ -z "$TOKEN" ]; then
  echo "Использование: ./push.sh ВАШ_ТОКЕН"
  echo "Или положи токен в github-token.local (одна строка, см. .gitignore)"
  echo ""
  echo "Токен создаётся здесь: https://github.com/settings/tokens/new"
  echo "Нужна галочка: repo"
  exit 1
fi

git push https://kulpin808-prog:${TOKEN}@github.com/kulpin808-prog/t-help-widget.git main
