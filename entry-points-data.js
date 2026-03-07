/**
 * Каталог точек входа Т-Помощь
 * Единый источник истины — редактируйте здесь, обновляется везде
 * Порядок: от простого к сложному
 *
 * Поля: id, name, whenToUse, exampleUrl
 */
const T_HELP_ENTRY_POINTS = [
    {
        id: 'keyboard-shortcut',
        name: 'Горячая клавиша',
        whenToUse: 'Power users, частые обращения к справке.',
        exampleUrl: 'prototype.html'
    },
    {
        id: 'inline-form-help',
        name: 'Контекстная подсказка в форме',
        whenToUse: 'Сложные формы, поля с особыми правилами. Иконка ? рядом с полем.',
        exampleUrl: 'prototype.html'
    },
    {
        id: 'contextual-hyperlink',
        name: 'Контекстная гиперссылка',
        whenToUse: 'Рядом с формами, настройками, сложными разделами. Когда контекст очевиден.',
        exampleUrl: 'prototype.html#helpWidget'
    },
    {
        id: 'info-icon-thirdparty',
        name: 'Иконка инфо на виджетах других продуктов Т-Банка',
        whenToUse: 'Виджеты Т-Инвест, Т-Бизнес, мобильное приложение. Единая точка входа в справку.',
        exampleUrl: 'prototype.html'
    },
    {
        id: 'collapsed-widget',
        name: 'Схлопнутый виджет',
        whenToUse: 'Десктоп, когда нужна панель справа/слева/снизу. Не отвлекает в свёрнутом виде.',
        exampleUrl: 'prototype.html'
    },
    {
        id: 'round-button-lk',
        name: 'Круглая кнопка в ЛК',
        whenToUse: 'Главная ЛК, ключевые разделы. Рядом с чатом — выбор: самопомощь или оператор.',
        exampleUrl: 'prototype.html'
    },
    {
        id: 'chat-first-item',
        name: 'Первый пункт в чате поддержки',
        whenToUse: 'Когда пользователь открывает чат поддержки — первым делом предлагаем базу знаний.',
        exampleUrl: 'prototype.html'
    },
    {
        id: 'embed-widget',
        name: 'Виджет Т-Помощь',
        whenToUse: 'Сторонние сайты, лендинги, порталы. Копируй-вставь код.',
        exampleUrl: 'prototype.html'
    }
];
