// Т-Помощь Widget - Main Logic
class THelpWidget {
    constructor() {
        this.overlay = document.getElementById('widgetOverlay');
        this.widget = document.getElementById('helpWidget');
        this.entryPoint = document.getElementById('helpEntryPoint');
        this.closeBtn = document.getElementById('widgetClose');
        this.backBtn = document.getElementById('widgetBack');
        this.contactSupportBtn = document.getElementById('contactSupport');
        
        this.problemSolvedBtn = document.getElementById('problemSolved');
        this.showMoreHelpBtn = document.getElementById('showMoreHelp');
        
        this.ratingBtns = document.querySelectorAll('.rating-btn');
        
        this.currentScreen = 'qa';
        this.sessionStartTime = null;
        
        this.init();
    }
    
    init() {
        this.entryPoint.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
        
        this.problemSolvedBtn.addEventListener('click', () => this.onProblemSolved());
        this.showMoreHelpBtn.addEventListener('click', () => this.showScreen('topics'));
        this.contactSupportBtn.addEventListener('click', () => this.contactSupport());
        
        this.ratingBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.onRating(e.target.dataset.rating));
        });
        
        document.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => this.openTopic(card));
        });
        
        this.backBtn.addEventListener('click', () => this.goBack());
    }
    
    open() {
        this.sessionStartTime = Date.now();
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Analytics event
        this.trackEvent('widget_opened', {
            source: 'entry_point',
            context: 'transaction_declined',
            terminal: '48392'
        });
        
        // Bridge notification
        if (window.THelpBridge) {
            window.THelpBridge.onWidgetOpened();
        }
    }
    
    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        const sessionDuration = this.sessionStartTime 
            ? Math.round((Date.now() - this.sessionStartTime) / 1000)
            : 0;
        
        this.trackEvent('widget_closed', {
            duration_seconds: sessionDuration,
            final_screen: this.currentScreen
        });
        
        if (window.THelpBridge) {
            window.THelpBridge.onWidgetClosed(sessionDuration);
        }
        
        setTimeout(() => {
            this.showScreen('qa');
        }, 400);
    }
    
    showScreen(screenName) {
        document.querySelectorAll('.help-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.querySelector(`[data-screen="${screenName}"]`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
            
            this.trackEvent('screen_view', { screen: screenName });
        }
    }
    
    goBack() {
        if (this.currentScreen === 'topics') {
            this.showScreen('qa');
        } else if (this.currentScreen === 'feedback') {
            this.showScreen('qa');
        }
    }
    
    onProblemSolved() {
        const sessionDuration = this.sessionStartTime 
            ? Math.round((Date.now() - this.sessionStartTime) / 1000)
            : 0;
        
        this.trackEvent('problem_solved', {
            duration_seconds: sessionDuration,
            topic: 'transaction_declined_code_51'
        });
        
        // Update metrics display
        document.querySelector('.metric-value').textContent = `${sessionDuration} сек`;
        
        this.showScreen('feedback');
        
        // Deflection Rate event (15-мин окно)
        if (window.THelpBridge) {
            window.THelpBridge.onProblemSolved(sessionDuration);
        }
    }
    
    onRating(rating) {
        this.ratingBtns.forEach(btn => btn.classList.remove('selected'));
        event.target.classList.add('selected');
        
        this.trackEvent('csat_rating', {
            rating: parseInt(rating),
            topic: 'transaction_declined_code_51'
        });
        
        // CSAT метрика для снижения nCSAT с 11% до 5%
        if (window.THelpBridge) {
            window.THelpBridge.onCSATRating(parseInt(rating));
        }
        
        setTimeout(() => {
            this.close();
        }, 1500);
    }
    
    contactSupport() {
        this.trackEvent('escalation_to_support', {
            screen: this.currentScreen,
            topic: 'transaction_declined_code_51'
        });
        
        // Counter-метрика: эскалация
        if (window.THelpBridge) {
            window.THelpBridge.onEscalation(this.currentScreen);
        }
        
        alert('Переход в чат поддержки...\n(В продакшене это откроет чат или бота)');
        this.close();
    }
    
    openTopic(card) {
        const title = card.querySelector('.topic-title').textContent;
        
        this.trackEvent('topic_clicked', {
            topic: title,
            source: 'related_topics'
        });
        
        alert(`Открытие темы: "${title}"\n(В продакшене загрузится контент статьи)`);
    }
    
    trackEvent(eventName, params = {}) {
        console.log('📊 Analytics Event:', eventName, params);
        
        // В продакшене отправка в систему аналитики
        // Метрики: CR после хелпа, Deflection Rate, SSR, CSAT
        
        if (window.THelpBridge) {
            window.THelpBridge.trackEvent(eventName, params);
        }
    }
}

// Initialize widget when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.tHelpWidget = new THelpWidget();
    console.log('✅ Т-Помощь Widget initialized');
});
