// Fondo animado de partículas original
const canvas = document.getElementById('tech-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const count = window.innerWidth < 768 ? 20 : 40;

for (let i = 0; i < count; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.8
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
                ctx.strokeStyle = `rgba(73, 40, 194, ${0.3 * (1 - distance / 160)})`;
                ctx.lineWidth = 0.7;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(renderTechBackground);
}
renderTechBackground();

// Control de comportamiento al hacer scroll
const topNavbar = document.getElementById('top-navbar');
const heroSection = document.getElementById('hero');
const contentSections = document.querySelectorAll('.content-section');
const scrollHint = document.querySelector('.scroll-hint');

function updateScrollEffects() {
    const scrollPos = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 600;

    // 1. Control del Hero: 100% nítido arriba y se desvanece suavemente al hacer scroll
    if (heroSection) {
        let heroOpacity = 1 - (scrollPos / (heroHeight * 0.9)); // Rango más amplio para que dure nítido más tiempo
        heroOpacity = Math.max(0, Math.min(1, heroOpacity));
        heroSection.style.opacity = heroOpacity.toString();
        heroSection.style.transform = `translateY(${scrollPos * 0.1}px)`;
    }

    // 2. Desvanecimiento del indicador "desliza para descubrir" en los primeros 100px
    if (scrollHint) {
        const fadeLimit = 100;
        let opacityCalc = 0.4 * (1 - Math.min(scrollPos, fadeLimit) / fadeLimit);
        scrollHint.style.opacity = opacityCalc;
        scrollHint.style.transform = `translateX(-50%) translateY(${scrollPos * 0.3}px)`;
    }

    // 3. Mostrar/Ocultar barra superior cuando sales del Hero
    if (topNavbar) {
        if (scrollPos > heroHeight * 0.7) {
            topNavbar.classList.remove('hidden');
        } else {
            topNavbar.classList.add('hidden');
        }
    }

    // 4. Efecto de desvanecimiento en las secciones de contenido
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

// Ejecutar al hacer scroll y también inmediatamente al cargar la página
window.addEventListener('scroll', updateScrollEffects);
window.addEventListener('load', updateScrollEffects);
updateScrollEffects();

// Datos de experiencia profesional extraídos íntegramente del currículum[cite: 1]
const experienceData = {
    mirafutura: {
        title: "Responsable de Digitalización e I+D — Mirafutura Ingeniería S.L.",
        date: "Enero 2025 - Actualidad",
        description: "Liderazgo de proyectos de digitalización industrial, definición de hojas de ruta de Industria 4.0, automatización de flujos de trabajo, coordinación técnica con clientes y gestión de proyectos de I+D+i[cite: 1]."
    },
    arus: {
        title: "Ingeniera de Electrónica — ARUS Andalucía Racing Team",
        date: "Septiembre 2024 - Agosto 2025",
        description: "Diseño de PCBs para el Sistema de Gestión de Batería (BMS) de vehículo eléctrico de competición Formula Student, prototipado, ensamblaje y validación experimental bajo restricciones normativas estrictas[cite: 1]."
    },
    figroup: {
        title: "Consultora Técnica de Proyectos I+D+i — Fi Group",
        date: "Marzo 2024 - Septiembre 2024",
        description: "Gestión y certificación de proyectos de I+D+i en sectores industriales de desarrollo de producto, redacción de memorias técnicas y defensa ante organismos públicos[cite: 1]."
    },
    us: {
        title: "Soporte Técnico Informático — Universidad de Sevilla",
        date: "Octubre 2023 - Marzo 2024",
        description: "Soporte técnico, mantenimiento de sistemas y gestión integral de incidencias de hardware y software en el Servicio Central de Informática[cite: 1]."
    },
    biotech: {
        title: "Ingeniera de Desarrollo de Producto — Biotechnology and Healthcare Developments S.L.",
        date: "Noviembre 2022 - Febrero 2023",
        description: "Diseño y desarrollo de dispositivo electrónico médico (pulsioxímetro bluetooth) bajo estrictos estándares normativos de seguridad eléctrica y compatibilidad electromagnética[cite: 1]."
    },
    fidetia: {
        title: "Investigadora en Bioelectrónica (Proyecto DeTecBio) — FIDETIA",
        date: "Noviembre 2022 - Febrero 2023",
        description: "Desarrollo de sistemas embebidos de bajo consumo para la adquisición de señales bioeléctricas en entornos de laboratorio e investigación aplicada[cite: 1]."
    }
};

// Lógica para el control del cuadro de diálogo (Modal)
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
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Lógica de la Terminal Interactiva Híbrida
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalActiveView = document.getElementById('terminal-active-view');
const terminalBody = document.getElementById('terminal-body');
const quickButtons = document.querySelectorAll('.terminal-quick-btn');

// Datos completos de proyectos con sus respectivas galerías de fotos
const terminalProjectsData = [
  {
    id: "master-pcb-ams",
    title: "Master PCB for AMS - ARUS Andalucía Racing Team",
    category: "Hardware / PCB Design",
    description: "Diseño y desarrollo de la placa Master PCB para el sistema de gestión de baterías (AMS) del equipo de competición ARUS Andalucía Racing Team.",
    images: [
      "assets/bms-1.jpg",
      "assets/bms-2.jpg",
      "assets/bms-3.jpg"
    ],
    tags: ["PCB Design", "Battery Management", "Automotive", "KiCAD"]
  },
  {
    id: "portable-electrostimulation",
    title: "Portable Electrostimulation Device & Cell Culture Monitoring",
    category: "Embedded Systems / Bioengineering",
    description: "Diseño e implementación de un dispositivo portátil de electroestimulación y monitorización continua de cultivos celulares. El proyecto incluye el diseño de la PCB en KiCAD y la programación del microcontrolador nRF5340 utilizando Zephyr OS y comunicación SPI con el DAC63204. Optimizado para aplicaciones de regeneración tisular, integrando electrónica avanzada para permitir experimentos eficientes y de bajo consumo energético.",
    images: [
      "assets/TFG.jpg"
    ],
    tags: ["KiCAD", "nRF5340", "Zephyr OS", "SPI", "DAC63204", "Bioengineering"]
  },
  {
    id: "nrf5340-microcontroller-update",
    title: "System Update to nRF5340 Microcontroller",
    category: "Embedded Firmware",
    description: "Proyecto de actualización e integración hardware/firmware para migrar un sistema basado previamente en la arquitectura nRF52 hacia el nuevo microcontrolador dual-core nRF5340, optimizando el rendimiento y capacidades de procesamiento.",
    images: [
      "assets/nrf53.jpg"
    ],
    tags: ["nRF5340", "nRF52", "Microcontrollers", "Embedded Systems", "Firmware Migration"]
  },
  {
    id: "electronic-cardiograph",
    title: "Design and Development of an Electronic Cardiograph",
    category: "Bioengineering / Analog Electronics",
    description: "Dispositivo médico para la captación e interpretación de señales electrocardiográficas. Utiliza etapas de condensadores para estabilizar la señal captada por los electrodos e implementa técnicas de filtrado electrónico para obtener una señal clara y precisa. Optimizado para futuras aplicaciones en monitorización médica portátil y de alta fiabilidad.",
    images: [
      "assets/ECG.png"
    ],
    tags: ["Medical Devices", "Signal Processing", "Analog Filtering", "ECG", "Bioelectronics"]
  },
  {
    id: "compressor-monitoring-system",
    title: "Sistema de Monitorización de Compresores y Gemelo Digital",
    category: "Industrial IoT / Digital Twin",
    description: "Gemelo digital industrial desarrollado en colaboración con IFM Electronic. Supervisión en tiempo real de salas de compresores y bombas de calor mediante sensores de vibración, inductivos y de temperatura. Procesamiento de señales en edgeGateway y plataforma moneo cloud, ofreciendo indicadores de salud de maquinaria, detección de holguras/fatiga, análisis de tendencias y gestión automatizada de alarmas de mantenimiento.",
    images: [
      "assets/analisis-compresores-1.jpg",
      "assets/analisis-compresores-2.jpg"
    ],
    tags: ["Industrial IoT", "Digital Twin", "IFM Electronic", "moneo Cloud", "Condition Monitoring", "Predictive Maintenance"]
  },
  {
    id: "wine-fermentation-monitoring",
    title: "Gemelo Digital para Monitorización de Fermentación",
    category: "Industrial IoT / Food & Beverage",
    description: "Gemelo digital para la supervisión continua en tiempo real de la fermentación en depósitos isobáricos, desarrollado en colaboración con IFM Electronic. Sistema alimentado por sensores de proceso para la lectura de variables críticas (temperatura, presión, pH, densidad y caudales de refrigeración/CO2). Ofrece vistas generales y detalladas en plataforma cloud, reglas de supervisión y gestión de alertas tempranas.",
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
    images: [
      "assets/pulmon-1.jpg",
      "assets/pulmon-2.jpg",
      "assets/pulmon-3.jpg"
    ],
    tags: ["Artificial Intelligence", "Machine Learning", "Medical Imaging", "Computer Vision", "X-Ray Analysis"]
  },
  {
    id: "tac-segmentation-3d-printing",
    title: "Segmentación de TACs y Extracción de Volumen para Impresión 3D",
    category: "3D Medical Modeling",
    description: "Procesamiento y segmentación de tomografías axial computarizadas (TAC) mediante el software 3D Slicer para la extracción de modelos volumétricos tridimensionales orientados a planificación quirúrgica e impresión 3D anatómica.",
    images: [
      "assets/tac-1.jpg",
      "assets/tac-2.jpg"
    ],
    tags: ["3D Slicer", "TAC Segmentation", "3D Printing", "Biomedical Modeling", "DICOM"]
  }
];

const screenContainer = document.getElementById('terminal-screen-content');
let currentGalleryImages = [];
let currentImageIndex = 0;

// Renderizar pantalla de Inicio Genérica
function renderHome() {
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

// Renderizar Listado de Proyectos Numerados
function renderProjectList() {
    let html = `
        <div class="terminal-screen">
            <p style="color: var(--neon-purple); margin-bottom: 0.5rem;">[DIRECTORIO DE PROYECTOS]</p>
            <p style="font-size: 0.85rem; opacity: 0.85; margin-bottom: 1rem;">Selecciona el número de un proyecto o usa los botones:</p>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
    `;
    
    for (let key in terminalProjectsData) {
        html += `<div style="cursor: pointer; padding: 0.3rem 0.5rem; background: rgba(91,42,98,0.1); border-radius: 4px;" onclick="renderProjectDetail(${key})">
            <span style="color: var(--neon-purple);">[${key}]</span> ${terminalProjectsData[key].title}
        </div>`;
    }

    html += `</div>
            <div class="terminal-nav-buttons">
                <button class="terminal-action-btn" onclick="renderHome()">Reiniciar</button>
            </div>
        </div>
    `;
    screenContainer.innerHTML = html;
}

// Renderizar Detalle del Proyecto (Estilo caja limpia con opciones)
function renderProjectDetail(key) {
    const proj = terminalProjectsData[key];
    screenContainer.innerHTML = `
        <div class="terminal-screen">
            <div style="background: rgba(91, 42, 98, 0.12); border: 1px solid var(--border-color); border-radius: 8px; padding: 1.2rem;">
                <h4 style="margin: 0 0 0.3rem 0; color: var(--text-lavender);">${proj.title}</h4>
                <span style="font-size: 0.75rem; color: var(--neon-purple); display: block; margin-bottom: 0.8rem;">[${proj.tag}]</span>
                <p style="margin: 0; font-size: 0.85rem; opacity: 0.85; line-height: 1.5;">${proj.description}</p>
            </div>
            <div class="terminal-nav-buttons" style="margin-top: 1rem;">
                <button class="terminal-action-btn" onclick="renderHome()">Reiniciar</button>
                <button class="terminal-action-btn" onclick="renderProjectList()">Volver al listado</button>
                <button class="terminal-action-btn" onclick="renderGallery(${key})" style="border-color: var(--neon-purple);">Ver galería de fotos</button>
            </div>
        </div>
    `;
}

// Renderizar Explorador de Fotos en Cuadrícula
function renderGallery(key) {
    const proj = terminalProjectsData[key];
    currentGalleryImages = proj.images;
    
    let html = `
        <div class="terminal-screen">
            <h4 style="margin: 0 0 0.2rem 0; color: var(--text-lavender);">${proj.title} — [Explorador de Fotos]</h4>
            <span style="font-size: 0.75rem; opacity: 0.6; display: block; margin-bottom: 1rem;">Haz clic en una imagen para ampliarla</span>
            
            <div class="terminal-file-grid">
    `;

    proj.images.forEach((imgSrc, index) => {
        html += `
            <div class="terminal-file-item" onclick="openPhotoModal(${index})">
                <img src="${imgSrc}" alt="Captura">
                <span>foto_0${index + 1}.jpg</span>
            </div>
        `;
    });

    html += `
            </div>
            <div class="terminal-nav-buttons" style="margin-top: 1.5rem;">
                <button class="terminal-action-btn" onclick="renderHome()">Reiniciar</button>
                <button class="terminal-action-btn" onclick="renderProjectDetail(${key})">Volver a descripción</button>
            </div>
        </div>
    `;
    screenContainer.innerHTML = html;
}

// Lógica del Visor Ampliado (Lightbox con Flechas)
const photoModal = document.getElementById('terminal-photo-modal');
const modalImg = document.getElementById('terminal-modal-img');

const btnPrev = document.querySelector('.terminal-nav-arrow.prev');
const btnNext = document.querySelector('.terminal-nav-arrow.next');

function openPhotoModal(index) {
    currentImageIndex = index;
    modalImg.src = currentGalleryImages[currentImageIndex];
    photoModal.style.display = 'flex';
}

function closePhotoModal() {
    photoModal.style.display = 'none';
}

modalClose.addEventListener('click', closePhotoModal);
photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal) closePhotoModal();
});

btnPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    modalImg.src = currentGalleryImages[currentImageIndex];
});

btnNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
    modalImg.src = currentGalleryImages[currentImageIndex];
});

// Soporte opcional para comandos escritos en escritorio (ej: escribir "1", "2", "home", etc.)
if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = terminalInput.value.trim().toLowerCase();
            if (val === 'home' || val === 'reiniciar') renderHome();
            else if (val === 'list' || val === 'listado') renderProjectList();
            else if (terminalProjectsData[val]) renderProjectDetail(val);
            terminalInput.value = '';
        }
    });
}

// Inicializar al cargar la página
renderHome();