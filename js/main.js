// Pequeña interacción básica para imitar el comportamiento dinámico
const mensajes = [
    "Diseño de sistemas embebidos, firmware en C/C++ y electrónica médica.",
    "Digitalización industrial, automatización de procesos y bases de datos.",
    "Desarrollo de dispositivos IoT (ESP32, BLE, MQTT) y gestión de proyectos I+D+i."
];

let indice = 0;
const boton = document.getElementById("action-btn");
const texto = document.getElementById("info-text");

if (boton) {
    boton.addEventListener("click", () => {
        indice = (indice + 1) % mensajes.length;
        texto.textContent = mensajes[indice];
    });
}

// 🤖 LÓGICA DE LA MASCOTA 🤖

const comentarios = [
    "¡Hola! Soy PatBot, tu guía personal por este CV interactivo.",
    "¿Sabes que fui la primera de mi clase 3 años consecutivos? 🎓",
    "Me encanta la ingeniería biomédica y la digitalización industrial. 💡",
    "¡He trabajado en un vehículo eléctrico de competición! 🏎️",
    "Si quieres contactar conmigo, mis datos están arriba a la derecha.",
    "¿Te gusta el fondo animado? Es pura CSS. ✨",
    "¡Gracias por visitar mi CV! 😊"
];

const mascotaContenedor = document.getElementById('mascota-contenedor');
const mascotaMensaje = document.getElementById('mascota-mensaje');
let comentarioActual = 0;

// Función para cambiar el mensaje
function cambiarComentario() {
    comentarioActual = (comentarioActual + 1) % comentarios.length;
    mascotaMensaje.textContent = comentarios[comentarioActual];
}

// --- Aparecer la mascota ---
window.addEventListener('load', () => {
    setTimeout(() => {
        mascotaContenedor.classList.remove('oculto');
        
        // Cambiar el mensaje cada 10 segundos
        setInterval(cambiarComentario, 10000); 
        
    }, 2000); // Aparece 2 segundos después de cargar la página
});

// --- Interacción al hacer clic en el avatar ---
const avatar = document.querySelector('.mascota-avatar');
avatar.addEventListener('click', cambiarComentario);

// --- (Opcional) Mascota que reacciona al hacer Scroll ---
let ultimoScroll = 0;
window.addEventListener('scroll', () => {
    const scrollActual = window.scrollY;
    if (scrollActual > ultimoScroll && scrollActual > 1000) {
        // Si estás haciendo scroll hacia abajo y has bajado bastante
        if (comentarioActual < 3) cambiarComentario(); // Forzar un comentario de proyecto si no ha salido
    }
    ultimoScroll = scrollActual;
});