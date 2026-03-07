#!/bin/bash
# Запуск: ./push.sh ВАШ_ТОКЕН
# Или:   TOKEN=ваш_токен ./push.sh

cd "$(dirname "$0")"
TOKEN="${1:-$TOKEN}"

if [ -z "$TOKEN" ]; then
  echo "Использование: ./push.sh ВАШ_ТОКЕН"
  echo ""
  echo "Токен создаётся здесь: https://github.com/settings/tokens/new"
  echo "Нужна галочка: repo"
  exit 1
fi

git push https://kulpin808-prog:${TOKEN}@github.com/kulpin808-prog/t-help-widget.git main
