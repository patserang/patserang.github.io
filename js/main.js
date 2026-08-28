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
    const heroHeight = heroSection.offsetHeight;

    // Desvanecimiento agresivo del indicador "desliza para descubrir" en los primeros 100px
    if (scrollHint) {
        const fadeLimit = 100;
        let opacityCalc = 0.4 * (1 - Math.min(scrollPos, fadeLimit) / fadeLimit);
        scrollHint.style.opacity = opacityCalc;
        scrollHint.style.transform = `translateX(-50%) translateY(${scrollPos * 0.3}px)`;
    }

    // 1. Mostrar/Ocultar barra superior cuando sales del Hero
    if (scrollPos > heroHeight * 0.7) {
        topNavbar.classList.remove('hidden');
    } else {
        topNavbar.classList.add('hidden');
    }

    // 2. Efecto de desvanecimiento agresivo y opacidad 100% nítida en el centro
    contentSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const sectionCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(screenCenter - sectionCenter);
        
        const threshold = windowHeight * 0.15; 
        const fadeRange = windowHeight * 0.2;

        if (distanceFromCenter < threshold) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        } else {
            let opacity = 1 - (distanceFromCenter - threshold) / fadeRange;
            opacity = Math.max(0, Math.min(1, opacity));
            
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



// Datos de experiencia profesional extraídos íntegramente del currículum
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