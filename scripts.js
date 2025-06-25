// Funciones para manejar popups
function openPopup(id) {
    const popup = document.getElementById(id);
    popup.classList.add('show');
}

function closePopup(id) {
    const popup = document.getElementById(id);
    popup.classList.remove('show');
}

// Cerrar popup al hacer clic fuera del contenido
window.onclick = function(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target.id);
    }
}

// Event listeners para los botones de popup (opcional, alternativa a onclick en HTML)
document.addEventListener('DOMContentLoaded', function() {
    // Podrías agregar aquí event listeners si prefieres
    // esta aproximación en lugar de los atributos onclick
});