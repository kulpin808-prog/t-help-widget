// Bridge для коммуникации WebView ↔ Native App
// Обеспечивает обмен данными между веб-виджетом и нативным приложением

class THelpBridge {
    constructor() {
        this.platform = this.detectPlatform();
        this.isNativeApp = this.checkNativeEnvironment();
        this.sessionData = {
            userId: null,
            segment: null,
            context: null
        };
        
        this.init();
    }
    
    init() {
        console.log(`🌉 Bridge initialized for ${this.platform}`);
        
        if (this.isNativeApp) {
            this.setupNativeCommunication();
        }
        
        // Слушаем сообщения от нативного приложения
        window.addEventListener('message', (event) => this.handleNativeMessage(event));
    }
    
    detectPlatform() {
        const ua = navigator.userAgent.toLowerCase();
        
        if (/iphone|ipad|ipod/.test(ua)) return 'ios';
        if (/android/.test(ua)) return 'android';
        if (/macintosh|mac os x/.test(ua)) return 'macos';
        if (/windows/.test(ua)) return 'windows';
        
        return 'web';
    }
    
    checkNativeEnvironment() {
        // Проверка WebView окружения
        return !!(
            window.webkit?.messageHandlers?.tHelpBridge || // iOS WebKit
            window.AndroidBridge || // Android
            window.chrome?.webview // Windows WebView2
        );
    }
    
    setupNativeCommunication() {
        console.log('📱 Native environment detected, setting up communication');
        
        // Запрос персонализации от нативного приложения
        this.requestUserContext();
    }
    
    // ==========================================
    // ОТПРАВКА СООБЩЕНИЙ В НАТИВНОЕ ПРИЛОЖЕНИЕ
    // ==========================================
    
    sendToNative(method, params = {}) {
        const message = {
            source: 't-help-widget',
            method: method,
            params: params,
            timestamp: Date.now()
        };
        
        try {
            if (this.platform === 'ios' && window.webkit?.messageHandlers?.tHelpBridge) {
                // iOS WebKit
                window.webkit.messageHandlers.tHelpBridge.postMessage(message);
            } else if (this.platform === 'android' && window.AndroidBridge) {
                // Android
                window.AndroidBridge.handleMessage(JSON.stringify(message));
            } else if (window.chrome?.webview) {
                // Windows WebView2
                window.chrome.webview.postMessage(message);
            } else {
                // Fallback для веба - просто логируем
                console.log('→ Native:', method, params);
            }
        } catch (error) {
            console.error('Bridge send error:', error);
        }
    }
    
    // ==========================================
    // ПОЛУЧЕНИЕ СООБЩЕНИЙ ОТ НАТИВНОГО ПРИЛОЖЕНИЯ
    // ==========================================
    
    handleNativeMessage(event) {
        try {
            const data = typeof event.data === 'string' 
                ? JSON.parse(event.data) 
                : event.data;
            
            console.log('← Native:', data);
            
            switch (data.method) {
                case 'setUserContext':
                    this.sessionData = { ...this.sessionData, ...data.params };
                    break;
                    
                case 'openArticle':
                    this.handleOpenArticle(data.params);
                    break;
                    
                case 'closeWidget':
                    if (window.tHelpWidget) {
                        window.tHelpWidget.close();
                    }
                    break;
                    
                default:
                    console.warn('Unknown method from native:', data.method);
            }
        } catch (error) {
            console.error('Bridge receive error:', error);
        }
    }
    
    // ==========================================
    // СОБЫТИЯ ВИДЖЕТА → НАТИВНОЕ ПРИЛОЖЕНИЕ
    // ==========================================
    
    onWidgetOpened() {
        this.sendToNative('widgetOpened', {
            context: this.sessionData.context
        });
    }
    
    onWidgetClosed(duration) {
        this.sendToNative('widgetClosed', {
            duration_seconds: duration
        });
    }
    
    onProblemSolved(duration) {
        // Ключевое событие для метрики Deflection Rate (15-мин окно)
        this.sendToNative('problemSolved', {
            duration_seconds: duration,
            deflection: true
        });
    }
    
    onCSATRating(rating) {
        // CSAT метрика: цель снизить nCSAT с 11% до 5%
        this.sendToNative('csatRating', {
            rating: rating,
            scale: 3
        });
    }
    
    onEscalation(screen) {
        // Counter-метрика: эскалация к оператору
        this.sendToNative('escalation', {
            from_screen: screen,
            contact_type: 'support_chat'
        });
    }
    
    trackEvent(eventName, params) {
        // Отправка всех аналитических событий
        this.sendToNative('trackEvent', {
            event: eventName,
            ...params
        });
    }
    
    // ==========================================
    // ЗАПРОСЫ К НАТИВНОМУ ПРИЛОЖЕНИЮ
    // ==========================================
    
    requestUserContext() {
        // Запрос персонализации: userId, segment, business line
        this.sendToNative('getUserContext');
    }
    
    openSupportChat() {
        this.sendToNative('openSupportChat');
    }
    
    handleOpenArticle(params) {
        console.log('Opening article:', params.articleId);
        // Логика открытия статьи
    }
    
    // ==========================================
    // DEEPLINKS (для мобильных приложений)
    // ==========================================
    
    openDeeplink(path, params = {}) {
        const deeplink = `tinkoff://help/${path}`;
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${deeplink}?${queryString}` : deeplink;
        
        this.sendToNative('openDeeplink', {
            url: fullUrl
        });
    }
    
    // ==========================================
    // ПЕРСОНАЛИЗАЦИЯ (из нативного приложения)
    // ==========================================
    
    getUserSegment() {
        return this.sessionData.segment || 'unknown';
    }
    
    getUserId() {
        return this.sessionData.userId || null;
    }
    
    getContext() {
        return this.sessionData.context || {};
    }
}

// Initialize bridge
window.THelpBridge = new THelpBridge();

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = THelpBridge;
}
