/*==============================================
            AUTO CAROUSEL MODULE
================================================*/

export class AutoCarousel {
    constructor(config, contentManager) {
        this.config = config;
        this.contentManager = contentManager;
        this.carousels = [];
    }

    initialize() {
        console.log('AutoCarousel initialize called');
        console.log('Existing carousels:', this.carousels.length);
        
        
        this.carousels.forEach(carousel => carousel.destroy());
        this.carousels = [];

        const carouselContainers = document.querySelectorAll('.auto-carousel');

        carouselContainers.forEach(container => {
            container.innerHTML = '';
            
            const includeTags = this.parseTags(container.dataset.tags);
            const excludeTags = this.parseTags(container.dataset.excludeTags);

            const filteredProjects = this.contentManager.filterProjectsByTags(includeTags, excludeTags);

            if (filteredProjects.length === 0) {
                container.style.display = 'none';
                return;
            }

            this.buildCarousel(container, filteredProjects);
        });
    }

    parseTags(tagString) {
        if (!tagString) return [];
        return tagString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    }

    buildCarousel(container, projects) {
        container.innerHTML = `
        <div class="carousel project-auto-carousel">
            <div class="carousel-track">
                ${projects.map(project => this.createProjectCard(project)).join('')}
            </div>
        </div>
    `;

        const carouselElement = container.firstElementChild;
        const carousel = new ProjectCarousel(carouselElement, this.config, projects);
        this.carousels.push(carousel);
    }

    createProjectCard(project) {
        return `
            <figure data-project="${project.id}" data-folder="${project.folder}">
                <img src="${project.thumbnail}" alt="${project.title}">
                <figcaption>
                    <h3>${project.title}</h3>
                    <p>${project.shortDescription}</p>
                </figcaption>
            </figure>
        `;
    }
}

class ProjectCarousel {
    constructor(element, config, projects) {
        this.element = element;
        this.config = config;
        this.projects = projects;
        this.track = element.querySelector('.carousel-track');
        this.items = Array.from(element.querySelectorAll('figure'));
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.interval = 5000;
        this.autoPlay = true;

        this.initialize();
    }

    initialize() {
        if (this.items.length === 0) return;
        
        this.setupDots();
        this.setupTouchEvents();
        this.setupClickHandlers();
        this.updateCarousel();

        if (this.autoPlay) {
            this.startAutoPlay();
        }

        this.element.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.element.addEventListener('mouseleave', () => {
            if (this.autoPlay) this.startAutoPlay();
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

    setupClickHandlers() {
        this.items.forEach((item, index) => {
            // Click on the figure itself (non-active) makes it active
            item.addEventListener('click', (e) => {
                // If clicking on an inactive item, just make it active
                if (!item.classList.contains('active')) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.goTo(index);
                    return;
                }
            });

            // Click on the image of active item navigates
            const img = item.querySelector('img');
            if (img) {
                img.addEventListener('click', (e) => {
                    if (item.classList.contains('active')) {
                        e.stopPropagation();
                        const folder = item.dataset.folder;
                        const path = `${this.config.baseUrl}/${folder}/content.md`;
                        window.handleNavigationClick(path, null);
                    }
                });
            }
        });
    }
    updateCarousel() {
        this.items.forEach((item, index) => {
            const isActive = index === this.currentIndex;
            const distance = Math.abs(index - this.currentIndex);
            const isBefore = index < this.currentIndex;
            const isAfter = index > this.currentIndex;

            item.classList.remove('active', 'before-active', 'after-active',
                'distance-1', 'distance-2', 'distance-3');

            if (isActive) {
                item.classList.add('active');
            } else {
                if (isBefore) item.classList.add('before-active');
                if (isAfter) item.classList.add('after-active');

                if (distance <= 3) {
                    item.classList.add(`distance-${distance}`);
                }
            }
        });

        const dots = this.element.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        const carouselWidth = this.element.offsetWidth;
        const activeItem = this.items[this.currentIndex];
        const activeItemLeft = activeItem.offsetLeft;
        const activeItemWidth = activeItem.offsetWidth;

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
        console.log('Starting autoplay for carousel');
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
        console.log('Destroying carousel');
        this.stopAutoPlay();
    }
}