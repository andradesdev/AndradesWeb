// Modo Oscuro
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Comprobar el estado del modo oscuro en localStorage al cargar la página
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Cambia al ícono de sol
}

// Alternar el modo oscuro al hacer clic en el botón
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode'); // Alternar la clase 'dark-mode' en el body
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled'); // Guardar el estado en localStorage
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Cambia al ícono de sol
    } else {
        localStorage.setItem('dark-mode', 'disabled'); // Guardar el estado en localStorage
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Cambia al ícono de luna
    }
});

// Envío del formulario con Ajax
const form = document.querySelector('form'); // Asegúrate de que el selector corresponda al formulario
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir el envío predeterminado del formulario

    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

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

    // Simulación de envío usando Fetch API
    fetch('ruta-de-tu-api', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                alert(`Gracias, ${name}. Hemos recibido tu mensaje.`);
                form.reset(); // Limpiar el formulario tras el envío exitoso
            } else {
                alert('Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.');
        });
});

// Slider de Proyectos
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

// Evento para el botón siguiente
nextBtn.addEventListener('click', () => {
    slides[currentSlide].classList.remove('active'); // Ocultar slide actual
    currentSlide = (currentSlide + 1) % slides.length; // Ir al siguiente slide
    slides[currentSlide].classList.add('active'); // Mostrar el nuevo slide
});

// Evento para el botón anterior
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
            const styleAttr = skill.parentElement.getAttribute('style'); // Obtener el atributo de estilo
            if (styleAttr) {
                const widthMatch = styleAttr.match(/width:\s?(\d+%)/); // Extraer el porcentaje de ancho
                if (widthMatch) {
                    skill.style.width = widthMatch[1]; // Aplicar el ancho a la barra de progreso
                }
            }
        }
    });
});

// Desplazamiento suave para los enlaces de navegación
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href')); // Obtener la sección de destino
        targetSection.scrollIntoView({
            behavior: 'smooth' // Desplazamiento suave al hacer clic en los enlaces
        });
    });
});

// Mostrar elementos con animación al desplazarse
const animatedElements = document.querySelectorAll('.animate-on-scroll');

window.addEventListener('scroll', () => {
    animatedElements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        // Añadir clase 'visible' cuando el elemento está en la posición deseada
        if (position < screenPosition) {
            element.classList.add('visible');
        }
    });
});
//Galeria de Imagenes
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.querySelector('.close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImage.src = item.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});
/// Suscripcion al Newsletter
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;

    if (!email) {
        alert('Por favor, ingresa un correo electrónico.');
        return;
    }

    // Simulación de envío de correo
    alert(`Gracias por suscribirte, ${email}!`);
    newsletterForm.reset();
});

///Testimonio en Carrusel
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

const nextTestimonialBtn = document.querySelector('.next-testimonial');
const prevTestimonialBtn = document.querySelector('.prev-testimonial');

const showTestimonial = (index) => {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
};

nextTestimonialBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

prevTestimonialBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Inicializar con el primer testimonio
showTestimonial(currentTestimonial);

/// Mapa Interactivo
//<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
//<script>
    //function initMap() {
        //const location = { lat: -34.397, lng: 150.644 }; // Reemplaza con tus coordenadas
        //const map = new google.maps.Map(document.getElementById('map'), {
            //zoom: 8,
            //center: location
        //});
        //new google.maps.Marker({
            //position: location,
            //map: map
        //});
    //}

    //window.onload = initMap;
//</script>


// Funcion de Busqueda
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        section.style.display = text.includes(query) ? 'block' : 'none';
    });
});



// Mostrar el botón de "Volver al inicio" al desplazarse hacia abajo
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block'; // Mostrar botón cuando se baja 300px
    } else {
        backToTopButton.style.display = 'none'; // Ocultar botón al volver hacia arriba
    }
});

// Acción del botón para volver al inicio
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Desplazamiento suave al hacer clic en el botón
    });
});
