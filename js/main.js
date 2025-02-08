// Datos de ejemplo para los restaurantes
const restaurants = [
    {
        name: "La Huerta Verde",
        type: "Vegetariano",
        savings: 156,
        icon: "fa-leaf"
    },
    {
        name: "Sushi Kai",
        type: "Japonés",
        savings: 203,
        icon: "fa-fish"
    },
    {
        name: "El Rincón",
        type: "Mediterráneo",
        savings: 178,
        icon: "fa-pizza-slice"
    }
];

// Funciones de utilidad
const safeQuerySelector = (selector) => document.querySelector(selector);
const safeQuerySelectorAll = (selector) => document.querySelectorAll(selector);

// Generar tarjetas de restaurantes
function generateRestaurantCards() {
    const container = safeQuerySelector('.restaurant-grid');
    if (!container) return;

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.innerHTML = `
            <div class="restaurant-icon">
                <i class="fas ${restaurant.icon}"></i>
            </div>
            <div class="restaurant-content">
                <h3>${restaurant.name}</h3>
                <p class="restaurant-type">${restaurant.type}</p>
                <div class="savings">
                    <i class="fas fa-utensils"></i>
                    <span>${restaurant.savings} platos salvados</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Animación de contadores
function animateCounters() {
    const counters = safeQuerySelectorAll('.counter');
    if (!counters.length) return;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    });
}

// Scroll suave
function initSmoothScroll() {
    safeQuerySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = safeQuerySelector(targetId);
            
            if (targetElement) {
                const navHeight = safeQuerySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Crear burbujas
function createBubbles() {
    const bubblesContainer = safeQuerySelector('.bubbles');
    if (!bubblesContainer) return;

    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const styles = {
            '--size': `${Math.random() * 4 + 2}`,
            '--distance': `${Math.random() * 6 + 4}`,
            '--position': `${Math.random() * 100}`,
            '--time': `${Math.random() * 2 + 2}`,
            '--delay': `${Math.random() * 4}`
        };

        Object.entries(styles).forEach(([property, value]) => {
            bubble.style.setProperty(property, value);
        });

        bubblesContainer.appendChild(bubble);
    }
}

// Observador de intersección para animaciones
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('metrics-container')) {
                    animateCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    safeQuerySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Actualizar navegación activa
function updateActiveNavigation() {
    const sections = safeQuerySelectorAll('section[id]');
    const navLinks = safeQuerySelectorAll('.nav-links a');
    
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    generateRestaurantCards();
    createBubbles();
    initSmoothScroll();
    initIntersectionObserver();

    // Event Listeners
    window.addEventListener('scroll', updateActiveNavigation);

    // Inicializar animación del hero
    setTimeout(() => {
        const hero = safeQuerySelector('.hero');
        if (hero) hero.classList.add('animate-in');
    }, 100);

    // Inicializar efectos de los botones CTA
    safeQuerySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.add('loading');
            
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1500);
        });
    });
});
