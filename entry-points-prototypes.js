/**
 * Интерактивные прототипы точек входа для каталога
 * Каждый прототип — кликабельный, открывает prototype.html
 */
function getEntryPointPrototype(id, exampleUrl) {
    const prototypes = {
        'contextual-hyperlink': () => `
            <div class="ep-prototype ep-link" data-open>
                <div class="ep-block">
                    <div class="ep-block-text">Настройки платежей. Укажите реквизиты.</div>
                    <a class="ep-hyperlink" href="#" data-open>Как заполнить реквизиты?</a>
                </div>
            </div>`,
        'info-icon-thirdparty': () => `
            <div class="ep-prototype ep-widget" data-open>
                <div class="ep-widget-box">
                    <div class="ep-widget-header">Т-Инвест</div>
                    <div class="ep-widget-body">Портфель, сделки</div>
                    <button class="ep-info-btn" data-open title="Помощь">?</button>
                </div>
            </div>`,
        'collapsed-widget': () => `
            <div class="ep-prototype ep-collapsed" data-open>
                <div class="ep-collapsed-bar">
                    <span class="ep-collapsed-text">Помощь</span>
                    <span class="ep-collapsed-icon" data-open>?</span>
                </div>
            </div>`,
        'embed-widget': () => `
            <div class="ep-prototype ep-embed" data-open>
                <div class="ep-embed-widget">
                    <div class="ep-embed-header"><span class="ep-embed-title">Помощь</span></div>
                    <div class="ep-embed-chips">
                        <span class="ep-embed-chip ep-embed-chip-active">Все</span>
                        <span class="ep-embed-chip">Терминалы</span>
                        <span class="ep-embed-chip">Тарифы</span>
                    </div>
                    <div class="ep-embed-search">
                        <input type="text" placeholder="Терминал, возврат..." readonly>
                    </div>
                    <div class="ep-embed-footer"><a href="#" data-open>Не нашли ответ?</a></div>
                </div>
            </div>`,
        'round-button-lk': () => `
            <div class="ep-prototype ep-buttons" data-open>
                <button class="ep-float-btn" data-open title="Т-Помощь">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </button>
                <button class="ep-float-btn ep-float-chat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </button>
            </div>`,
        'chat-first-item': () => `
            <div class="ep-prototype ep-chat" data-open>
                <div class="ep-chat-thelp" data-open>
                    <span class="ep-chat-icon">?</span>
                    <span>Т-Помощь</span>
                </div>
                <div class="ep-chat-section">Чаты</div>
                <div class="ep-chat-item"><span>Авто</span></div>
                <div class="ep-chat-item"><span>Business</span></div>
            </div>`,
        'inline-form-help': () => `
            <div class="ep-prototype ep-form" data-open>
                <label class="ep-form-label">Сумма платежа</label>
                <div class="ep-form-row">
                    <input class="ep-form-input" placeholder="0" readonly>
                    <button class="ep-form-info" data-open title="Подсказка">?</button>
                </div>
            </div>`,
        'keyboard-shortcut': () => `
            <div class="ep-prototype ep-keyboard" data-open>
                <div class="ep-keyboard-row">
                    <span class="ep-key">⌘</span>
                    <span class="ep-key">+</span>
                    <span class="ep-key ep-key-highlight">Shift</span>
                    <span class="ep-key">+</span>
                    <span class="ep-key ep-key-highlight">/</span>
                </div>
                <div class="ep-keyboard-label">Mac</div>
                <div class="ep-keyboard-row">
                    <span class="ep-key">Ctrl</span>
                    <span class="ep-key">+</span>
                    <span class="ep-key ep-key-highlight">Shift</span>
                    <span class="ep-key">+</span>
                    <span class="ep-key ep-key-highlight">/</span>
                </div>
                <div class="ep-keyboard-label">Windows</div>
            </div>`
    };
    return (prototypes[id] || (() => '<div class="ep-prototype ep-placeholder">—</div>'))();
}
