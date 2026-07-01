/*==============================================
            SHOWCASE MANAGER MODULE

    One component that renders either a GRID or a
    CAROUSEL, populated from either inline <figure>
    media or a tag-filtered project list.

    Layout:  data-layout="grid" | "carousel"
    Source:  inferred — a data-tags/data-exclude-tags
             attribute means "generate project items";
             otherwise the authored inline <figure>s are used.
    Click:   follows the item type — media opens the
             lightbox, projects navigate to their page.

    Legacy .image-gallery (grid+media) and .auto-carousel
    (carousel+projects) are still recognised as aliases.
================================================*/

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

export class ShowcaseManager {
    constructor(config, contentManager, lightbox) {
        this.config = config;
        this.contentManager = contentManager;
        this.lightbox = lightbox;
        this.carousels = [];
    }

    initialize() {
        // Tear down carousels from the previous page (intervals, observers)
        this.carousels.forEach(carousel => carousel.destroy());
        this.carousels = [];

        document
            .querySelectorAll('.showcase, .image-gallery, .auto-carousel')
            .forEach(container => this.build(container));
    }

    build(container) {
        const layout = this.getLayout(container);

        // Generated (tag-driven) vs authored (inline figures)
        const generated = container.hasAttribute('data-tags') ||
            container.hasAttribute('data-exclude-tags');

        let generatedFigures = null;
        if (generated) {
            const include = this.parseTags(container.dataset.tags);
            const exclude = this.parseTags(container.dataset.excludeTags);
            const projects = this.contentManager.filterProjectsByTags(include, exclude);
            if (projects.length === 0) {
                container.style.display = 'none';
                return;
            }
            generatedFigures = projects
                .map(project => this.projectFigure(project, layout))
                .join('');
        }

        if (layout === 'carousel') {
            this.renderCarousel(container, generatedFigures);
        } else {
            this.renderGrid(container, generatedFigures);
        }
    }

    getLayout(container) {
        if (container.dataset.layout) return container.dataset.layout;
        // Legacy alias: .auto-carousel -> carousel, everything else -> grid
        return container.classList.contains('auto-carousel') ? 'carousel' : 'grid';
    }

    parseTags(tagString) {
        if (!tagString) return [];
        return tagString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    }

    // A project item. Grid -> a navigable thumbnail; carousel -> a rich card.
    projectFigure(project, layout) {
        if (layout === 'carousel') {
            return `
            <figure data-project="${project.id}" data-folder="${project.folder}">
                <img src="${project.thumbnail}" alt="${project.title}">
                <figcaption>
                    <h3>${project.title}</h3>
                    <p>${project.shortDescription}</p>
                </figcaption>
            </figure>`;
        }
        return `
        <figure>
            <a href="#" data-navigate="/${project.folder}/content.md">
                <img src="${project.thumbnail}" alt="${project.title}">
                <figcaption>${project.title}</figcaption>
            </a>
        </figure>`;
    }

    renderGrid(container, generatedFigures) {
        container.style.display = ''; // undo any previous empty-state hide
        container.classList.add('showcase');
        container.setAttribute('data-layout', 'grid');
        // `image-gallery` is the shared CSS style-hook for a figure grid
        // (defined in css/components/gallery.css); reused here so a showcase
        // grid gets the same layout/hover/loading styling as a legacy gallery.
        container.classList.add('image-gallery');

        const columns = container.dataset.columns;
        if (columns) container.style.setProperty('--gallery-columns', columns);

        // Authored galleries keep their inline figures; generated grids inject theirs.
        if (generatedFigures !== null) container.innerHTML = generatedFigures;

        // Lightbox wiring for media figures is handled centrally by
        // LightboxManager.setupGalleryImages(); project figures (data-navigate)
        // are skipped there and navigate via the global click handler.
    }

    renderCarousel(container, generatedFigures) {
        const title = container.dataset.title;

        // For authored media carousels, capture the inline figures before we
        // overwrite the container with the carousel scaffold.
        const figuresHTML = generatedFigures !== null
            ? generatedFigures
            : Array.from(container.querySelectorAll(':scope > figure'))
                .map(figure => figure.outerHTML).join('');

        container.style.display = ''; // undo any previous empty-state hide
        container.classList.add('showcase');
        container.setAttribute('data-layout', 'carousel');
        container.innerHTML = `
            ${title ? `<h2 class="carousel-heading">${title}</h2>` : ''}
            <div class="carousel">
                <div class="carousel-track">${figuresHTML}</div>
            </div>
        `;

        const carouselElement = container.querySelector('.carousel');
        this.carousels.push(new Carousel(carouselElement, this.config, this.lightbox));
    }
}

/*==============================================
            CAROUSEL (rotating strip)

    Works over any <figure>s in .carousel-track.
    On the active item: a project figure (data-folder)
    navigates; a media figure (<a href>) opens the lightbox.
================================================*/
class Carousel {
    constructor(element, config, lightbox) {
        this.element = element;
        this.config = config;
        this.lightbox = lightbox;
        this.track = element.querySelector('.carousel-track');
        this.originalItems = Array.from(element.querySelectorAll('figure'));
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isTransitioning = false;

        this.interval = 3000; // ms
        this.autoPlay = true;

        // Media items -> lightbox set, aligned 1:1 with originalItems.
        this.images = this.originalItems.map(figure => {
            const link = figure.querySelector('a[href]');
            return link ? {
                src: link.getAttribute('href'),
                caption: figure.querySelector('figcaption')?.textContent || ''
            } : null;
        });

        // Clone items for the infinite-loop effect
        this.cloneCount = 3;
        this.createInfiniteLoop();

        this.items = Array.from(this.track.querySelectorAll('figure'));
        this.currentIndex = this.cloneCount; // start at first real item

        this.initialize();
    }

    createInfiniteLoop() {
        const figures = Array.from(this.track.querySelectorAll('figure'));
        const actualCloneCount = Math.min(this.cloneCount, figures.length);

        const lastClones = [];
        for (let i = figures.length - actualCloneCount; i < figures.length; i++) {
            const clone = figures[i].cloneNode(true);
            clone.classList.add('clone');
            lastClones.push(clone);
        }
        lastClones.reverse().forEach(clone => {
            this.track.insertBefore(clone, this.track.firstChild);
        });

        for (let i = 0; i < actualCloneCount; i++) {
            const clone = figures[i].cloneNode(true);
            clone.classList.add('clone');
            this.track.appendChild(clone);
        }

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

        this.originalItems.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => {
                this.goTo(index + this.cloneCount);
                this.resetAutoPlay();
            });
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
            this.resetAutoPlay();
        }
    }

    setupClickHandlers() {
        this.items.forEach((item, index) => {
            // Clicking an inactive item brings it to the centre.
            item.addEventListener('click', (e) => {
                if (!item.classList.contains('active')) {
                    e.preventDefault();
                    e.stopPropagation();

                    let targetIndex = index;
                    if (index < this.cloneCount) {
                        targetIndex = this.items.length - this.cloneCount - (this.cloneCount - index);
                    } else if (index >= this.items.length - this.cloneCount) {
                        targetIndex = this.cloneCount + (index - (this.items.length - this.cloneCount));
                    }

                    this.goTo(targetIndex);
                }
            });

            // Clicking the active item acts on its type.
            const target = item.querySelector('a') || item.querySelector('img');
            if (target) {
                target.addEventListener('click', (e) => {
                    if (!item.classList.contains('active')) return;
                    e.preventDefault();
                    e.stopPropagation();
                    this.activate(item, index);
                });
            }
        });
    }

    activate(item, index) {
        if (item.dataset.folder) {
            // Project item -> navigate to its page
            const path = `${this.config.baseUrl}/${item.dataset.folder}/content.md`;
            window.handleNavigationClick(path, null);
            return;
        }
        // Media item -> open the lightbox at the matching original index
        if (this.lightbox) {
            const realIndex = (index - this.cloneCount + this.originalItems.length) % this.originalItems.length;
            const images = this.images.filter(Boolean);
            if (images.length) this.lightbox.open(realIndex, images);
        }
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
            this.track.offsetHeight; // force reflow
            this.track.style.transition = '';
        }
    }

    handleInfiniteLoop() {
        if (this.currentIndex < this.cloneCount) {
            this.currentIndex = this.items.length - this.cloneCount - (this.cloneCount - this.currentIndex);
            this.updateCarousel(false);
        } else if (this.currentIndex >= this.items.length - this.cloneCount) {
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

    resetAutoPlay() {
        if (this.autoPlay) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }
}
