/*==============================================
            AUTO CAROUSEL MODULE
================================================*/

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

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
        this.originalItems = Array.from(element.querySelectorAll('figure'));
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isTransitioning = false;

        this.interval = 3000; // seconds
        this.autoPlay = true;

        // Clone items for infinite effect
        this.cloneCount = 3; // Number of clones on each side
        this.createInfiniteLoop();

        this.items = Array.from(this.track.querySelectorAll('figure'));
        this.currentIndex = this.cloneCount; // Start at first real item

        this.initialize();
    }

    createInfiniteLoop() {
        const figures = Array.from(this.track.querySelectorAll('figure'));

        // If we don't have enough items for cloning, reduce clone count
        const actualCloneCount = Math.min(this.cloneCount, figures.length);

        // Clone last few items and prepend (in correct order)
        const lastClones = [];
        for (let i = figures.length - actualCloneCount; i < figures.length; i++) {
            const clone = figures[i].cloneNode(true);
            clone.classList.add('clone');
            lastClones.push(clone);
        }
        lastClones.reverse().forEach(clone => {
            this.track.insertBefore(clone, this.track.firstChild);
        });

        // Clone first few items and append
        for (let i = 0; i < actualCloneCount; i++) {
            const clone = figures[i].cloneNode(true);
            clone.classList.add('clone');
            this.track.appendChild(clone);
        }

        // Update clone count for positioning calculations
        this.cloneCount = actualCloneCount;
    }

    initialize() {
        if (this.items.length === 0) return;

        this.setupDots();
        this.setupTouchEvents();
        this.setupClickHandlers();
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.updateCarousel(false);
            });
        });

        if (this.autoPlay) {
            this.startAutoPlay();
        }

        this.element.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.element.addEventListener('mouseleave', () => {
            if (this.autoPlay) this.startAutoPlay();
        });

        this.track.addEventListener('transitionend', () => {
            this.handleInfiniteLoop();
        });

        const onResize = debounce(() => this.updateCarousel(false), 100);
        this.resizeObserver = new ResizeObserver(onResize);
        this.resizeObserver.observe(this.element);
    }

    setupDots() {
        if (this.element.querySelector('.carousel-dots')) {
            return;
        }

        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';

        // Only create dots for original items, not clones
        this.originalItems.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => this.goTo(index + this.cloneCount));
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
            item.addEventListener('click', (e) => {
                if (!item.classList.contains('active')) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Map clone index to real item index
                    let targetIndex = index;
                    if (index < this.cloneCount) {
                        // Clicked on start clone, map to real item at end
                        targetIndex = this.items.length - this.cloneCount - (this.cloneCount - index);
                    } else if (index >= this.items.length - this.cloneCount) {
                        // Clicked on end clone, map to real item at start
                        targetIndex = this.cloneCount + (index - (this.items.length - this.cloneCount));
                    }

                    this.goTo(targetIndex);
                    return;
                }
            });

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

    updateCarousel(useTransition = true) {
        if (!useTransition) {
            this.track.style.transition = 'none';
        }

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

        // Update dots (map current index to original item)
        const dots = this.element.querySelectorAll('.carousel-dot');
        const realIndex = (this.currentIndex - this.cloneCount + this.originalItems.length) % this.originalItems.length;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });

        const carouselWidth = this.element.offsetWidth;
        const activeItem = this.items[this.currentIndex];
        const activeItemLeft = activeItem.offsetLeft;
        const activeItemWidth = activeItem.offsetWidth;

        const offset = (carouselWidth / 2) - activeItemLeft - (activeItemWidth / 2);
        this.track.style.transform = `translateX(${offset}px)`;

        if (!useTransition) {
            // Force reflow
            this.track.offsetHeight;
            this.track.style.transition = '';
        }
    }

    handleInfiniteLoop() {
        // If we're at a clone, jump to the real item without transition
        if (this.currentIndex < this.cloneCount) {
            // At start clones, jump to end
            this.currentIndex = this.items.length - this.cloneCount - (this.cloneCount - this.currentIndex);
            this.updateCarousel(false);
        } else if (this.currentIndex >= this.items.length - this.cloneCount) {
            // At end clones, jump to start
            this.currentIndex = this.cloneCount + (this.currentIndex - (this.items.length - this.cloneCount));
            this.updateCarousel(false);
        }
    }

    next() {
        this.currentIndex++;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex--;
        this.updateCarousel();
    }

    goTo(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            let nextIndex = this.currentIndex + 1;

            if (nextIndex >= this.items.length - this.cloneCount) {
                nextIndex = this.cloneCount;
            }

            this.goTo(nextIndex);
        }, this.interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    destroy() {
        this.stopAutoPlay();
        if (this.resizeObserver) this.resizeObserver.disconnect();
    }
}