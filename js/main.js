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

// Datos de la experiencia profesional por empresa
const experienceData = {
    empresa1: {
        title: "Ingeniera de Automatización - TechCorp",
        date: "2023 - Presente",
        description: "Liderazgo en la implantación de herramientas digitales y optimización de flujos mediante IA para reducir tiempos operativos en un 40%."
    },
    empresa2: {
        title: "Consultora de Transformación Digital - InnovaSol",
        date: "2021 - 2023",
        description: "Diseño y despliegue de arquitectura en la nube para procesos industriales y automatización de reportes analíticos."
    },
    empresa3: {
        title: "Desarrolladora de Software - DataSystems",
        date: "2019 - 2021",
        description: "Creación de scripts avanzados y APIs conectadas a bases de datos relacionales para la monitorización de sistemas."
    },
    empresa4: {
        title: "Junior Data Analyst - StartUp Lab",
        date: "2018 - 2019",
        description: "Análisis preliminar de datos operativos y soporte en la transición hacia entornos de trabajo digitalizados."
    }
};

// Control del Modal de Experiencia
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