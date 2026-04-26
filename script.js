document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initPromoCodeButtons();
    initSmoothScroll();
    initFixedHeader();
});

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn') &&
            navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function initPromoCodeButtons() {
    const copyButtons = document.querySelectorAll('.copy-button, [data-copy-promo]');
    
    if (copyButtons.length === 0) return;
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            let promoCode = '';
            const promoElement = document.querySelector('.promo-code-display, #promoCode');
            
            if (promoElement) {
                promoCode = promoElement.textContent.trim();
            } else {
                promoCode = 'ICE2026WIN';
            }
            
            copyToClipboard(promoCode, this);
        });
    });
}

function copyToClipboard(text, buttonElement = null) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showCopySuccess(buttonElement);
                showNotification('Промокод скопирован: ' + text, 'success');
            })
            .catch(err => {
                console.error('Ошибка при копировании: ', err);
                fallbackCopy(text, buttonElement);
            });
    } else {
        fallbackCopy(text, buttonElement);
    }
}

function fallbackCopy(text, buttonElement) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            showCopySuccess(buttonElement);
            showNotification('Промокод скопирован: ' + text, 'success');
        } else {
            throw new Error('Copy command failed');
        }
    } catch (err) {
        console.error('Ошибка при копировании: ', err);
        showNotification('Не удалось скопировать. Скопируйте код вручную: ' + text, 'error');
    }
}

function showCopySuccess(buttonElement) {
    if (!buttonElement) return;
    
    const originalText = buttonElement.innerHTML;
    const originalBg = buttonElement.style.background;
    const originalShadow = buttonElement.style.boxShadow;
    
    buttonElement.innerHTML = '✓ Скопировано!';
    buttonElement.style.background = 'linear-gradient(90deg, #00ff00, #00cc00)';
    buttonElement.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
    
    setTimeout(() => {
        buttonElement.innerHTML = originalText;
        buttonElement.style.background = originalBg;
        buttonElement.style.boxShadow = originalShadow;
    }, 2000);
}

function showNotification(message, type = 'info') {
    const oldNotification = document.querySelector('.custom-notification');
    if (oldNotification) oldNotification.remove();
    
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    
    let bgColor, textColor;
    if (type === 'success') {
        bgColor = 'linear-gradient(90deg, #00cc00, #009900)';
        textColor = '#ffffff';
    } else if (type === 'error') {
        bgColor = 'linear-gradient(90deg, #ff3333, #cc0000)';
        textColor = '#ffffff';
    } else {
        bgColor = 'linear-gradient(90deg, #00f3ff, #0088ff)';
        textColor = '#0c1a2d';
    }
    
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: ${textColor};
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 25px rgba(0,0,0,0.3);
            z-index: 99999;
            font-weight: 600;
            max-width: 400px;
            word-break: break-word;
            animation: notificationSlideIn 0.3s ease;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.querySelector('div').style.animation = 'notificationSlideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes notificationSlideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes notificationSlideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header')?.offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initFixedHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(10, 25, 47, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
    }, { passive: true });
}

window.CasinoUtils = {
    copyPromoCode: function() {
        const promoElement = document.querySelector('.promo-code-display, #promoCode');
        const promoCode = promoElement ? promoElement.textContent.trim() : 'ICE2026WIN';
        copyToClipboard(promoCode);
    },
    showNotification: showNotification
};

window.copyPromoCode = function() {
    window.CasinoUtils.copyPromoCode();
};
