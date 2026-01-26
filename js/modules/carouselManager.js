/*==============================================
            CAROUSEL MANAGER MODULE
================================================*/
export class CarouselManager {
    constructor() {
        this.carousels = [];
    }

    init() {
        this.setupCarousels();

        // Re-initialize when content changes
        const contentElement = document.getElementById('content');
        if (contentElement) {
            const observer = new MutationObserver(() => {
                setTimeout(() => this.setupCarousels(), 100);
            });
            observer.observe(contentElement, { childList: true, subtree: true });
        }
    }

    setupCarousels() {
        const carouselElements = document.querySelectorAll('.carousel:not(.carousel-initialized)');

        carouselElements.forEach(element => {
            if (element.querySelector('.carousel-nav')) {
                return;
            }

            element.classList.add('carousel-initialized');
            const carousel = new Carousel(element);
            this.carousels.push(carousel);
        });
    }

    reinitialize() {
        this.setupCarousels();
    }
}

class Carousel {
    constructor(element) {
        this.element = element;
        this.track = null;
        this.items = [];
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;

        // Settings
        this.autoPlay = element.dataset.autoPlay === 'true';
        this.interval = parseInt(element.dataset.interval) || 3000;

        this.initialize();
    }

    initialize() {
        // Get all figures
        this.items = Array.from(this.element.querySelectorAll('figure'));

        if (this.items.length === 0) return;

        // Create carousel structure
        this.createStructure();
        this.setupNavigation();  // Now just adds click handlers
        this.setupDots();
        this.setupTouchEvents();
        this.setupLightboxIntegration();
        this.updateCarousel();

        // Start autoplay if enabled
        if (this.autoPlay) {
            this.startAutoPlay();
        }

        // Pause autoplay on hover
        this.element.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.element.addEventListener('mouseleave', () => {
            if (this.autoPlay) this.startAutoPlay();
        });
    }

    createStructure() {
        // Check if track already exists
        const existingTrack = this.element.querySelector('.carousel-track');
        if (existingTrack) {
            this.track = existingTrack;
            return;
        }

        // Wrap items in track
        this.track = document.createElement('div');
        this.track.className = 'carousel-track';

        this.items.forEach((item, index) => {
            this.track.appendChild(item);

            // Setup loading state
            const media = item.querySelector('img, video');
            if (media) {
                const onLoad = () => {
                    item.classList.add('loaded');
                };

                if (media.tagName === 'IMG') {
                    if (media.complete) {
                        onLoad();
                    } else {
                        media.addEventListener('load', onLoad);
                    }
                } else {
                    media.addEventListener('loadeddata', onLoad);
                }
            }
        });

        this.element.appendChild(this.track);
    }

    setupNavigation() {
        // Click on side items to navigate
        this.items.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                // If clicking active item, let lightbox handle it
                if (index === this.currentIndex) {
                    return;
                }

                // Otherwise navigate to that slide
                e.preventDefault();
                e.stopPropagation();
                this.goTo(index);
            });
        });
    }

    setupDots() {
        if (this.element.querySelector('.carousel-dots')) {
            return;
        }

        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';

        this.items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => this.goTo(index));
            dotsContainer.appendChild(dot);
        });

        this.element.appendChild(dotsContainer);
    }

    setupTouchEvents() {
        this.element.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        this.element.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }

    setupLightboxIntegration() {
        this.items.forEach((item, index) => {
            const link = item.querySelector('a');
            if (link && window.portfolioApp?.modules?.lightbox) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Build images array for lightbox
                    const images = this.items.map(fig => {
                        const a = fig.querySelector('a');
                        const caption = fig.querySelector('figcaption');
                        return {
                            src: a.getAttribute('href'),
                            caption: caption ? caption.textContent : ''
                        };
                    });

                    window.portfolioApp.modules.lightbox.open(index, images);
                });
            }
        });
    }

    updateCarousel() {
        // Update active states and distance-based classes
        this.items.forEach((item, index) => {
            const isActive = index === this.currentIndex;
            const distance = Math.abs(index - this.currentIndex);
            const isBefore = index < this.currentIndex;
            const isAfter = index > this.currentIndex;

            // Remove all distance classes
            item.classList.remove('active', 'before-active', 'after-active',
                'distance-1', 'distance-2', 'distance-3');

            // Add appropriate classes
            if (isActive) {
                item.classList.add('active');
            } else {
                if (isBefore) item.classList.add('before-active');
                if (isAfter) item.classList.add('after-active');

                // Add distance class
                if (distance <= 3) {
                    item.classList.add(`distance-${distance}`);
                }
            }
        });

        // Update dots
        const dots = this.element.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Calculate transform to center active item
        const carouselWidth = this.element.offsetWidth;
        const activeItem = this.items[this.currentIndex];
        const activeItemLeft = activeItem.offsetLeft;
        const activeItemWidth = activeItem.offsetWidth;

        // Center the active item in the viewport
        const offset = (carouselWidth / 2) - activeItemLeft - (activeItemWidth / 2);

        this.track.style.transform = `translateX(${offset}px)`;
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateCarousel();
    }

    goTo(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), this.interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    destroy() {
        this.stopAutoPlay();
    }
}