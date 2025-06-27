// Función para abrir popups con animación
function openPopup(id) {
  const popup = document.getElementById(id);
  popup.classList.add('show');
  
  // Si es un popup de proyecto, añadimos la clase específica
  if (popup.classList.contains('project-popup')) {
    popup.classList.add('project-popup');
  }
  
  // Reset animation
  popup.classList.remove('hiding');
  const content = popup.querySelector('.popup-content');
  content.style.animation = 'none';
  void content.offsetWidth; // Trigger reflow
  content.style.animation = '';
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
      }
    }, { once: true });
  } else {
    // Para otros popups (como el de contacto) usamos transición simple
    popup.classList.remove('show');
  }
}

// Cerrar popup al hacer clic fuera del contenido
window.onclick = function(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target.id);
  }
}

// Cerrar con ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const openPopup = document.querySelector('.popup.show');
    if (openPopup) {
      closePopup(openPopup.id);
    }
  }
});