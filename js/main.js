// Fondo interactivo animado de partículas en red
const canvas = document.getElementById('tech-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const count = window.innerWidth < 768 ? 25 : 50;

for (let i = 0; i < count; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.6 + 0.8
    });
}

function renderTechBackground() {
    ctx.fillStyle = '#040607';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#BF40FA';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#BF40FA';
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
            let p2 = particles[j];
            let distance = Math.hypot(p.x - p2.x, p.y - p2.y);

            if (distance < 160) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(73, 40, 194, ${0.35 * (1 - distance / 160)})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(renderTechBackground);
}
renderTechBackground();

// Control de desplazamiento y efectos de scroll
const topNavbar = document.getElementById('top-navbar');
const heroSection = document.getElementById('hero');
const contentSections = document.querySelectorAll('.content-section');
const scrollHint = document.querySelector('.scroll-hint');

function updateScrollEffects() {
    const scrollPos = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 600;

    if (heroSection) {
        let heroOpacity = 1 - (scrollPos / (heroHeight * 0.9));
        heroOpacity = Math.max(0, Math.min(1, heroOpacity));
        heroSection.style.opacity = heroOpacity.toString();
        heroSection.style.transform = `translateY(${scrollPos * 0.1}px)`;
    }

    if (scrollHint) {
        const fadeLimit = 100;
        let opacityCalc = 0.4 * (1 - Math.min(scrollPos, fadeLimit) / fadeLimit);
        scrollHint.style.opacity = opacityCalc;
        scrollHint.style.transform = `translateX(-50%) translateY(${scrollPos * 0.3}px)`;
    }

    if (topNavbar) {
        if (scrollPos > heroHeight * 0.7) {
            topNavbar.classList.remove('hidden');
        } else {
            topNavbar.classList.add('hidden');
        }
    }

    contentSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(screenCenter - sectionCenter);
        const threshold = windowHeight * 0.15; 
        const fadeRange = windowHeight * 0.2;

        if (scrollPos === 0) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        } else if (distanceFromCenter < threshold) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        } else {
            let opacity = 1 - (distanceFromCenter - threshold) / fadeRange;
            opacity = Math.max(0.2, Math.min(1, opacity));
            section.style.opacity = opacity.toString();
            let translateY = sectionCenter < screenCenter ? -40 : 40;
            section.style.transform = `translateY(${translateY * (1 - opacity)}px)`;
        }
    });
}

window.addEventListener('scroll', updateScrollEffects);
window.addEventListener('load', updateScrollEffects);
updateScrollEffects();

// Información completa de la trayectoria profesional[cite: 1]
const experienceData = {
    siguiente: {
        title: "Próxima oportunidad",
        date: "Disponibilidad inmediata",
        description: "Ahora es tu turno. Ayúdame a encontrar una empresa donde crecer, con metas a largo plazo y en la que poder asentarme. Si tienes una empresa orientada a la innovación constante, la búsqueda de nuevas tecnologías y oportunidades reales de crecimiento, ¡contáctame! Estoy segura de que ambos encontraremos la oportunidad que estamos buscando. ¡Te espero!"
    },
    mirafutura: {
        title: "Responsable de Digitalización e I+D — Mirafutura Ingeniería S.L.",
        date: "Enero 2025 - Julio 2026",
        description: "En diciembre me llamaron desde Mirafutura: habían visto mi CV y tenían una oportunidad en su departamento de digitalización. Fueron muy claros desde el minuto uno: eran una empresa 100% industrial, sin apenas experiencia en digitalización, y buscaban a alguien polivalente que pudiera guiar esos proyectos casi desde cero. Echando a un lado el vértigo que me dio la gran responsabilidad que me querían asignar, acepté el reto y entré como ingeniera de proyectos. Tras el éxito de los primeros, me ascendieron a responsable del departamento. Desde entonces he llamado a la puerta de más de 10 pymes con proyectos de digitalización e IA, cerrando 6 y con otros 5 en marcha, apoyándome en contenido propio de promoción para abrir puertas antes de descolgar el teléfono. Lidero cada proyecto de principio a fin, desde analizar los flujos de una fábrica hasta dejarla sensorizada dentro de su propia hoja de ruta de Industria 4.0, y cuando hace falta financiación, gestiono la documentación para que mis clientes consigan ayudas de la Junta de Extremadura."
    },
    arus: {
        title: "Ingeniera de Electrónica — ARUS Andalucía Racing Team",
        date: "Septiembre 2024 - Agosto 2025",
        description: "Hay retos que cuando aparecen sabes que tienes que aceptarlos. Ese fue Arus, el equipo de Formula Student de la universidad: muy pocos alumnos son invitados a entrar, y muchos menos consiguen quedarse. Quise ponerme a prueba mientras terminaba el máster (solo me quedaba el TFM), y entré en el Departamento de Electrónica, donde me encargaron directamente el desarrollo de la nueva placa BMS Master del monoplaza: el sistema que gestiona la carga y descarga de la batería de alto voltaje dentro de unos márgenes seguros, cortando antes de que algo se salga de control. El reglamento internacional de la competición es muy exigente, y la fase de pruebas demostró que la teoría y la práctica no siempre terminan de casar. Esa segunda mitad del año la compaginé con mi siguiente experiencia laboral... pero esa historia te la cuento en el siguiente punto. 😉"
    },
    figroup: {
        title: "Consultora Técnica de Proyectos I+D+i — Fi Group",
        date: "Marzo 2024 - Septiembre 2024",
        description: "Tuve que poner punto y final a mi estancia en la biblioteca porque me llegó una oferta de empleo a tiempo completo. Técnicamente hablando, era mi primer 'empleo real': no podía negarme. Además, iba a estar muy cerquita de donde yo quería acabar: la I+D+i. Como consultora técnica, mi trabajo consistía en evaluar y certificar proyectos de empresas industriales, manufactureras y tecnológicas, identificando qué actividades encajaban realmente como investigación industrial o desarrollo tecnológico bajo el marco del RD 1432/2003. La parte más exigente venía después: redactar memorias científico-técnicas que explicaran, con rigor y sin trampas, la novedad real de cada desarrollo, y defender esos expedientes ante entidades certificadoras acreditadas por la ENAC. Proyectos de ingeniería biomédica, inteligencia artificial, transporte ferroviario... Sin duda, fueron 6 meses que supieron a poco y en los que aprendí más incluso que durante la carrera. Bueno, no más, pero sí diferente."
    },
    us: {
        title: "Soporte Técnico Informático — Universidad de Sevilla",
        date: "Octubre 2023 - Marzo 2024",
        description: "Al acabar mis estudios de grado, comencé los de máster. Al mismo tiempo, encontré un empleo a tiempo parcial en la biblioteca de la Universidad de Sevilla. ¿Qué pinta la biblioteca en un CV técnico como este? Muy sencillo: entré a trabajar en el Servicio Central de Informática de la biblioteca, ofreciendo soporte técnico tanto a alumnos como al personal laboral de la universidad, solucionando incidencias, realizando mantenimientos preventivos y alguno correctivo, y trabajando tanto en Windows como en Linux. La velocidad a la que trabaja el servicio técnico tras el telón te resultaría asombrosa: debíamos estar en cualquier punto de todo el complejo universitario a tiempo para resolver una avería antes de que nadie lo notase. Claramente, el mejor soporte técnico es el que parece que no hace falta."
    },
    biotech: {
        title: "Ingeniera de Desarrollo de Producto — Biotechnology and Healthcare Developments S.L.",
        date: "Noviembre 2022 - Febrero 2023",
        description: "Fíjate en las fechas: estuve trabajando al mismo tiempo como alumna interna en la Universidad de Sevilla y haciendo mis prácticas curriculares. Coincidiendo a su vez con mi TFG, el B2 de inglés, B1 de portugués y, en general, el final de mis estudios. Créeme cuando te digo que fue un año duro. Pero aquí estoy: ingeniera titulada, hablando 3 idiomas con fluidez y con una supercapacidad para trabajar bajo presión. ¿Deseable? No mucho. ¿Útil? Lo que más."
    },
    fidetia: {
        title: "Investigadora en Bioelectrónica (Proyecto DeTecBio) — FIDETIA",
        date: "Noviembre 2022 - Febrero 2023",
        description: "Mi primera experiencia laboral fue dentro de un grupo de investigación de la universidad. Es lo bueno de ser admitida como alumna interna: tienes acceso a oportunidades que otros no. De todos los proyectos que se llevaban en este departamento yo elegí el proyecto DeTecBio: un proyecto enfocado en desarrollar nuevos sistemas de adquisición de señales fisiológicas. Mi tarea consistió en actualizar el código y los protocolos de firmware para que fueran compatibles con el nuevo microcontrolador de Nordic, el nRF53. Esta experiencia me permitió dar mis primeros pasos en ese mundo laboral que a veces a veces extraño para los estudiantes."
    }
};

// Control del cuadro de diálogo (Modal de trayectoria)
const nodes = document.querySelectorAll('.path-node-html');
const modal = document.getElementById('experience-modal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalDescription = document.getElementById('modal-description');

nodes.forEach(node => {
    node.addEventListener('click', () => {
        const companyKey = node.getAttribute('data-company');
        const data = experienceData[companyKey];
        
        if (data) {
            modalTitle.textContent = data.title;
            modalDate.textContent = data.date;
            modalDescription.textContent = data.description;
            
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
        }
    });
});

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Datos completos de proyectos y cursos para la Terminal Interactiva
const terminalProjectsData = [
  {
    id: "master-pcb-ams",
    title: "Master PCB for AMS - ARUS Andalucía Racing Team",
    category: "Hardware / PCB Design",
    description: "Diseño y desarrollo de la placa Master PCB para el sistema de gestión de baterías (AMS) del equipo de competición ARUS Andalucía Racing Team.",
    images: ["assets/bms-1.jpg", "assets/bms-2.jpg", "assets/bms-3.jpg"],
    tags: ["PCB Design", "Battery Management", "Automotive", "KiCAD"]
  },
  {
    id: "portable-electrostimulation",
    title: "Portable Electrostimulation Device & Cell Culture Monitoring",
    category: "Embedded Systems / Bioengineering",
    description: "Diseño e implementación de un dispositivo portátil de electroestimulación y monitorización continua de cultivos celulares. El proyecto incluye el diseño de la PCB en KiCAD y la programación del microcontrolador nRF5340 utilizando Zephyr OS y comunicación SPI con el DAC63204.",
    images: ["assets/TFG.jpg"],
    tags: ["KiCAD", "nRF5340", "Zephyr OS", "SPI", "DAC63204", "Bioengineering"]
  },
  {
    id: "nrf5340-microcontroller-update",
    title: "System Update to nRF5340 Microcontroller",
    category: "Embedded Firmware",
    description: "Proyecto de actualización e integración hardware/firmware para migrar un sistema basado previamente en la arquitectura nRF52 hacia el nuevo microcontrolador dual-core nRF5340, optimizando el rendimiento y capacidades de procesamiento.",
    images: ["assets/nrf53.jpg"],
    tags: ["nRF5340", "nRF52", "Microcontrollers", "Embedded Systems", "Firmware Migration"]
  },
  {
    id: "electronic-cardiograph",
    title: "Design and Development of an Electronic Cardiograph",
    category: "Bioengineering / Analog Electronics",
    description: "Dispositivo médico para la captación e interpretación de señales electrocardiográficas. Utiliza etapas de condensadores para estabilizar la señal captada por los electrodos e implementa técnicas de filtrado electrónico para obtener una señal clara y precisa.",
    images: ["assets/ECG.png"],
    tags: ["Medical Devices", "Signal Processing", "Analog Filtering", "ECG", "Bioelectronics"]
  },
  {
    id: "compressor-monitoring-system",
    title: "Sistema de Monitorización de Compresores y Gemelo Digital",
    category: "Industrial IoT / Digital Twin",
    description: "Gemelo digital industrial desarrollado en colaboración con IFM Electronic. Supervisión en tiempo real de salas de compresores y bombas de calor mediante sensores de vibración, inductivos y de temperatura. Procesamiento de señales en edgeGateway y plataforma moneo cloud.",
    images: ["assets/analisis-compresores-1.jpg", "assets/analisis-compresores-2.jpg"],
    tags: ["Industrial IoT", "Digital Twin", "IFM Electronic", "moneo Cloud", "Condition Monitoring", "Predictive Maintenance"]
  },
  {
    id: "wine-fermentation-monitoring",
    title: "Gemelo Digital para Monitorización de Fermentación",
    category: "Industrial IoT / Food & Beverage",
    description: "Gemelo digital para la supervisión continua en tiempo real de la fermentación en depósitos isobáricos, desarrollado en colaboración con IFM Electronic. Sistema alimentado por sensores de proceso para la lectura de variables críticas (temperatura, presión, pH, densidad).",
    images: [
      "assets/fermentacion-vino-1.jpg",
      "assets/fermentacion-vino-2.jpg",
      "assets/fermentacion-vino-3.jpg",
      "assets/fermentacion-vino-4.jpg",
      "assets/fermentacion-vino-5.jpg"
    ],
    tags: ["Industrial IoT", "Digital Twin", "IFM Electronic", "moneo Cloud", "Process Control", "Smart Industry"]
  },
  {
    id: "lung-cancer-detection",
    title: "Algoritmo de Detección de Cáncer de Pulmón en Radiografías",
    category: "AI / Medical Imaging",
    description: "Desarrollo y entrenamiento de un algoritmo de visión por computador capaz de identificar patologías de cáncer de pulmón a partir de imágenes de radiografía de tórax, alcanzando una precisión (accuracy) del 86%.",
    images: ["assets/pulmon-1.jpg", "assets/pulmon-2.jpg", "assets/pulmon-3.jpg"],
    tags: ["Artificial Intelligence", "Machine Learning", "Medical Imaging", "Computer Vision", "X-Ray Analysis"]
  },
  {
    id: "tac-segmentation-3d-printing",
    title: "Segmentación de TACs y Extracción de Volumen para Impresión 3D",
    category: "3D Medical Modeling",
    description: "Procesamiento y segmentación de tomografías axial computarizadas (TAC) mediante el software 3D Slicer para la extracción de modelos volumétricos tridimensionales orientados a planificación quirúrgica e impresión 3D anatómica.",
    images: ["assets/tac-1.jpg", "assets/tac-2.jpg"],
    tags: ["3D Slicer", "TAC Segmentation", "3D Printing", "Biomedical Modeling", "DICOM"]
  }
];

const screenContainer = document.getElementById('terminal-screen-content');
let currentGalleryImages = [];
let currentImageIndex = 0;

function renderHome() {
    if (!screenContainer) return;
    screenContainer.innerHTML = `
        <div class="terminal-screen">
            <p style="color: var(--neon-purple); margin-bottom: 0.5rem;">[SISTEMA DE PROYECTOS V3.0]</p>
            <p>Bienvenido al directorio de desarrollo de Patricia Serrano.</p>
            <p style="opacity: 0.75; font-size: 0.85rem; margin-bottom: 1.5rem;">Selecciona una opción para comenzar la exploración:</p>
            <div class="terminal-menu-options">
                <button class="terminal-action-btn" onclick="renderProjectList()">Listado de proyectos</button>
            </div>
        </div>
    `;
}

function renderProjectList() {
    if (!screenContainer) return;
    let html = `
        <div class="terminal-screen">
            <p style="color: var(--neon-purple); margin-bottom: 0.5rem;">[DIRECTORIO DE PROYECTOS]</p>
            <p style="font-size: 0.85rem; opacity: 0.85; margin-bottom: 1rem;">Haz clic en un proyecto o selecciona una acción:</p>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
    `;
    
    terminalProjectsData.forEach((proj, idx) => {
        html += `<div style="cursor: pointer; padding: 0.4rem 0.6rem; background: rgba(91,42,98,0.12); border-radius: 6px; border: 1px solid var(--border-color); transition: background 0.2s ease;" onclick="renderProjectDetail(${idx})">
            <span style="color: var(--neon-purple); font-weight: bold;">[${idx + 1}]</span> ${proj.title}
        </div>`;
    });

    html += `</div>
            <div class="terminal-nav-buttons">
                <button class="terminal-action-btn" onclick="renderHome()">Reiniciar</button>
            </div>
        </div>
    `;
    screenContainer.innerHTML = html;
}

function renderProjectDetail(index) {
    if (!screenContainer) return;
    const proj = terminalProjectsData[index];
    const tagList = proj.tags ? proj.tags.join(', ') : '';
    screenContainer.innerHTML = `
        <div class="terminal-screen">
            <div style="background: rgba(91, 42, 98, 0.15); border: 1px solid var(--border-color); border-radius: 8px; padding: 1.2rem;">
                <h4 style="margin: 0 0 0.3rem 0; color: var(--text-lavender);">${proj.title}</h4>
                <span style="font-size: 0.75rem; color: var(--neon-purple); display: block; margin-bottom: 0.8rem;">[${proj.category}] — Tags: ${tagList}</span>
                <p style="margin: 0; font-size: 0.85rem; opacity: 0.85; line-height: 1.5;">${proj.description}</p>
            </div>
            <div class="terminal-nav-buttons" style="margin-top: 1rem;">
                <button class="terminal-action-btn" onclick="renderHome()">Reiniciar</button>
                <button class="terminal-action-btn" onclick="renderProjectList()">Volver al listado</button>
                <button class="terminal-action-btn" onclick="renderGallery(${index})" style="border-color: var(--neon-purple);">Ver galería de fotos (${proj.images.length})</button>
            </div>
        </div>
    `;
}

function renderGallery(index) {
    if (!screenContainer) return;
    const proj = terminalProjectsData[index];
    currentGalleryImages = proj.images;
    
    let html = `
        <div class="terminal-screen">
            <h4 style="margin: 0 0 0.2rem 0; color: var(--text-lavender);">${proj.title} — [Galería de capturas]</h4>
            <span style="font-size: 0.75rem; opacity: 0.6; display: block; margin-bottom: 1rem;">Haz clic en una imagen para ampliarla</span>
            
            <div class="terminal-file-grid">
    `;

    proj.images.forEach((imgSrc, imgIdx) => {
        html += `
            <div class="terminal-file-item" onclick="openPhotoModal(${imgIdx})">
                <img src="${imgSrc}" alt="Captura">
                <span>foto_0${imgIdx + 1}.jpg</span>
            </div>
        `;
    });

    html += `
            </div>
            <div class="terminal-nav-buttons" style="margin-top: 1.5rem;">
                <button class="terminal-action-btn" onclick="renderHome()">Reiniciar</button>
                <button class="terminal-action-btn" onclick="renderProjectDetail(${index})">Volver a la descripción</button>
            </div>
        </div>
    `;
    screenContainer.innerHTML = html;
}

// Lightbox para la vista ampliada de imágenes
const photoModal = document.getElementById('terminal-photo-modal');
const modalImg = document.getElementById('terminal-modal-img');
const terminalModalClose = document.querySelector('.terminal-modal-close');
const btnPrev = document.querySelector('.terminal-nav-arrow.prev');
const btnNext = document.querySelector('.terminal-nav-arrow.next');

function openPhotoModal(index) {
    if (!photoModal || !modalImg) return;
    currentImageIndex = index;
    modalImg.src = currentGalleryImages[currentImageIndex];
    photoModal.style.display = 'flex';
}

function closePhotoModal() {
    if (photoModal) photoModal.style.display = 'none';
}

if (terminalModalClose) terminalModalClose.addEventListener('click', closePhotoModal);
if (photoModal) {
    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) closePhotoModal();
    });
}

if (btnPrev) {
    btnPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        modalImg.src = currentGalleryImages[currentImageIndex];
    });
}

if (btnNext) {
    btnNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
        modalImg.src = currentGalleryImages[currentImageIndex];
    });
}

// Entrada manual por consola de comandos
const terminalInput = document.getElementById('terminal-input');
if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = terminalInput.value.trim().toLowerCase();
            const num = parseInt(val, 10);
            
            if (val === 'home' || val === 'reiniciar' || val === 'clear') {
                renderHome();
            } else if (val === 'list' || val === 'listado') {
                renderProjectList();
            } else if (!isNaN(num) && num >= 1 && num <= terminalProjectsData.length) {
                renderProjectDetail(num - 1);
            }
            terminalInput.value = '';
        }
    });
}

// Renderizar vista inicial al cargar
renderHome();