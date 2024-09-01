// Modo Oscuro
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Comprobar el estado del modo oscuro en localStorage al cargar la página
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Cambia al ícono de sol
}

darkModeToggle.addEventListener('click', () => {
    // Alternar la clase 'dark-mode' en el body
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled'); // Guardar el estado en localStorage
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Cambia al ícono de sol
    } else {
        localStorage.setItem('dark-mode', 'disabled'); // Guardar el estado en localStorage
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Cambia al ícono de luna
    }
});

// Validación del Formulario de Contacto
const form = document.getElementById('contact-form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validar que los campos no estén vacíos
    if (name === '' || email === '' || message === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Validar el formato del email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    alert(`Gracias, ${name}. Hemos recibido tu mensaje.`);
    form.reset(); // Restablecer el formulario después de enviar
});

// Slider de Proyectos
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

nextBtn.addEventListener('click', () => {
    slides[currentSlide].classList.remove('active'); // Ocultar slide actual
    currentSlide = (currentSlide + 1) % slides.length; // Ir al siguiente slide
    slides[currentSlide].classList.add('active'); // Mostrar el nuevo slide
});

prevBtn.addEventListener('click', () => {
    slides[currentSlide].classList.remove('active'); // Ocultar slide actual
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Ir al slide anterior
    slides[currentSlide].classList.add('active'); // Mostrar el nuevo slide
});

// Animación de barras de progreso
window.addEventListener('scroll', () => {
    const skills = document.querySelectorAll('.progress');
    skills.forEach(skill => {
        const skillPosition = skill.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        // Animar la barra de progreso solo cuando esté visible en la pantalla
        if (skillPosition < screenPosition) {
            // Asegúrate de que el atributo 'style' y 'width' están presentes
            const styleAttr = skill.parentElement.getAttribute('style');
            if (styleAttr) {
                const widthMatch = styleAttr.match(/width:\s?(\d+%)/);
                if (widthMatch) {
                    skill.style.width = widthMatch[1];
                }
            }
        }
    });
});
