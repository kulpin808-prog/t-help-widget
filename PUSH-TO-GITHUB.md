════════════════════════════════════════
КАК ЗАЛИТЬ ВИДЖЕТ НА GITHUB (1 РАЗ)
════════════════════════════════════════

Всё уже настроено. Осталось одно действие — создать токен и выполнить команду.

────────────────────────────────────────
ШАГ 1. Создай токен (2 минуты)
────────────────────────────────────────

1. Открой в браузере:
   https://github.com/settings/tokens/new

2. В поле "Note" введи: t-help-widget

3. Срок: выбери 90 days (или No expiration)

4. Поставь галочку: repo

5. Нажми "Generate token"

6. СКОПИРУЙ токен (он показывается один раз, выглядит как ghp_xxxxxxxxxxxx)

────────────────────────────────────────
ШАГ 2. Выполни в терминале
────────────────────────────────────────

Открой Терминал (Cmd+Space → "Терминал" → Enter) и вставь:

cd "/Users/s.kulpin/Documents/Kools Super Agent/t-help-widget"
git push https://kulpin808-prog:ВСТАВЬ_ТОКЕН_СЮДА@github.com/kulpin808-prog/t-help-widget.git main

Замени ВСТАВЬ_ТОКЕН_СЮДА на скопированный токен.

Пример (не копируй, токен другой):
git push https://kulpin808-prog:ghp_abc123xyz@github.com/kulpin808-prog/t-help-widget.git main

────────────────────────────────────────
ШАГ 3. Включи GitHub Pages
────────────────────────────────────────

1. Открой: https://github.com/kulpin808-prog/t-help-widget/settings/pages

2. Source: Deploy from a branch

3. Branch: main, папка: / (root)

4. Save

Через 1–2 минуты виджет будет доступен по адресу:
https://kulpin808-prog.github.io/t-help-widget/prototype.html

════════════════════════════════════════
