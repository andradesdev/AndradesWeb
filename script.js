// Selección del formulario de contacto por su ID
const form = document.getElementById('contact-form');

// Evento que se activa al enviar el formulario
form.addEventListener('submit', function (e) {
    // Previene el comportamiento por defecto de recargar la página
    e.preventDefault();

    // Obtener los valores de los campos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulación de envío del formulario
    alert(`Gracias, ${name}. Hemos recibido tu mensaje.`);
    
    // Limpieza de los campos del formulario
    form.reset();
});
