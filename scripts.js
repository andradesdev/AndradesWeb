// Gestión de estado de popups
const popupState = {
    current: null,
    history: []
};

// Función para abrir popups con animación
function openPopup(id) {
    // Cerrar popup actual si existe
    if (popupState.current) {
        closePopup(popupState.current);
    }
    
    const popup = document.getElementById(id);
    if (!popup) return;
    
    // Guardar elemento activo para restaurar foco
    popupState.history.push(document.activeElement);
    popupState.current = id;
    
    // Mostrar popup
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = `${getScrollbarWidth()}px`;
    
    // Manejar foco
    managePopupFocus(id);
    
    // Emitir evento personalizado
    document.dispatchEvent(new CustomEvent('popupChange', { 
        detail: { action: 'open', id } 
    }));
}

// Función para cerrar popups con animación
function closePopup(id) {
    const popup = document.getElementById(id);
    
    // Para los popups de proyecto, usamos la animación de salida
    if (popup.classList.contains('project-popup')) {
        popup.classList.add('hiding');
        
        // Esperar a que termine la animación antes de ocultar
        popup.addEventListener('animationend', function handler() {
            if (popup.classList.contains('hiding')) {
                popup.classList.remove('show', 'hiding');
                popup.removeEventListener('animationend', handler);
                
                // Restaurar scroll y foco
                document.body.style.overflow = '';
                document.documentElement.style.paddingRight = '';
                restoreFocus();
            }
        }, { once: true });
    } else {
        // Para otros popups (como el de contacto) usamos transición simple
        popup.classList.remove('show');
        document.body.style.overflow = '';
        document.documentElement.style.paddingRight = '';
        restoreFocus();
    }
    
    // Limpiar estado
    popupState.current = null;
    
    // Emitir evento personalizado
    document.dispatchEvent(new CustomEvent('popupChange', { 
        detail: { action: 'close', id } 
    }));
}

// Función para restaurar el foco al elemento anterior
function restoreFocus() {
    if (popupState.history.length > 0) {
        const previousElement = popupState.history.pop();
        if (previousElement && typeof previousElement.focus === 'function') {
            previousElement.focus();
        }
    }
}

// Función para obtener ancho de scrollbar
function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

// Función para manejar el foco dentro del popup
function managePopupFocus(popupId) {
    const popup = document.getElementById(popupId);
    const focusableElements = popup.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    if (focusableElements.length === 0) return;
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    // Atrapar el foco dentro del popup
    const trapFocus = function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
        
        // Cerrar con Escape
        if (e.key === 'Escape') {
            closePopup(popupId);
        }
    };
    
    // Añadir event listener
    popup.addEventListener('keydown', trapFocus);
    
    // Guardar referencia para remover luego
    popup._trapFocus = trapFocus;
    
    // Enfocar el primer elemento
    setTimeout(() => {
        firstFocusable.focus();
    }, 10);
}

// Función para enviar email
function sendEmail() {
    window.location.href = 'mailto:contacto@andradesdev.com?subject=Contacto desde portfolio&body=Hola Manuel,';
}

// Debounce para eventos de resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.dispatchEvent(new CustomEvent('optimizedResize'));
    }, 250);
});

// Cerrar popup al hacer clic fuera del contenido
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target.id);
    }
});

// Cerrar con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupState.current) {
        closePopup(popupState.current);
    }
});

// Manejo del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = document.getElementById('submit-btn');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                
                // Simular envío (en producción se enviaría realmente)
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    alert('¡Mensaje enviado con éxito! Te responderé pronto.');
                    closePopup('contact-popup');
                    contactForm.reset();
                }, 1500);
                
                e.preventDefault();
            }
        });
    }
    
    // Toggle de tema claro/oscuro
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
        observer.observe(el);
    });
    
    // Google Analytics (reemplazar con tu ID)
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
    
    // Monitor de performance
    if ('PerformanceObserver' in window) {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('[Performance]', entry.name, entry.duration);
            }
        });
        perfObserver.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
    }
});

// Service Worker para funcionalidad offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}