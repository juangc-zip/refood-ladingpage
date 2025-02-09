// Datos de ejemplo para los restaurantes
const restaurants = [
    {
        name: "Orosia",
        type: "Tapas originales, con opciones vegetarianas y veganas",
        savings: 156,
        image: "assets/restaurants/restaurante-orosia.jpg"
    },
    {
        name: "Mesón Restaurante Octavio",
        type: "Carnes a la brasa y cocina tradicional manchega",
        savings: 203,
        image: "assets/restaurants/restaurante-octiavia.jpg"
    },
    {
        name: "Asador Restaurante San Huberto",
        type: "Cochinillo, cordero y pescados al horno de leña",
        savings: 178,
        image: "assets/restaurants/restaurante-san-huberto.jpg"
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
            <div class="restaurant-image" style="
                width: 100%;
                height: 250px;
                overflow: hidden;
                position: relative;
            ">
                <img src="${restaurant.image}" 
                     alt="${restaurant.name}" 
                     style="
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: center;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                     ">
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

// Crear efectos visuales
function createVisualEffects() {
    const cards = safeQuerySelectorAll('.restaurant-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    generateRestaurantCards();
    initSmoothScroll();
    createVisualEffects();

    // Event Listeners
    safeQuerySelectorAll('.restaurant-card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        });
    });

    // Asegurar que las imágenes se ajusten correctamente al redimensionar
    window.addEventListener('resize', () => {
        const images = safeQuerySelectorAll('.restaurant-image img');
        images.forEach(img => {
            img.style.width = '100%';
            img.style.height = '100%';
        });
    });
});