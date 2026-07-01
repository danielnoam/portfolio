/*==============================================
            LIGHTBOX MANAGER MODULE
================================================*/
import { observeContentChanges } from '../core/domUtils.js';

// Single source of truth for media-type detection by file extension.
const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];
const AUDIO_EXTENSIONS = ['wav', 'mp3', 'ogg', 'm4a'];

export class LightboxManager {
    constructor() {
        this.container = null;
        this.currentIndex = 0;
        this.images = [];
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isInitialized = false;
    }

    init() {
        if (!this.isInitialized) {
            this.createLightboxElements();
            this.isInitialized = true;
        }
        this.setupGalleryImages();
    }

    createLightboxElements() {
        const lightboxHTML = `
            <div id="lightbox-container" class="lightbox-container">
                <div class="lightbox-content">
                    <div class="lightbox-header">
                        <div id="lightbox-counter" class="lightbox-counter"></div>
                        <div id="lightbox-caption" class="lightbox-caption"></div>
                        <button id="lightbox-close" class="lightbox-close" aria-label="Close lightbox">×</button>
                    </div>
                    <div id="lightbox-image-container" class="lightbox-image-container">
                        <img id="lightbox-image" class="lightbox-image" src="" alt="Enlarged view">
                    </div>
                    <div class="lightbox-controls">
                        <button id="lightbox-prev" class="lightbox-nav" aria-label="Previous image">❮</button>
                        <button id="lightbox-next" class="lightbox-nav" aria-label="Next image">❯</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        this.container = document.getElementById('lightbox-container');
        this.adjustCaptionSizes();
    }

    setupGalleryImages() {
        // Grid showcases (and the legacy .image-gallery). Each gallery gets its
        // own lightbox set; project items (a[data-navigate]) are skipped — they
        // navigate instead of opening the lightbox.
        const galleries = document.querySelectorAll('.image-gallery, .showcase[data-layout="grid"]');

        galleries.forEach(gallery => {
            const lightboxDisabled = gallery.classList.contains('no-lightbox');

            // Loading state + video indicator for every figure (media or project)
            gallery.querySelectorAll('figure').forEach(figure => {
                const media = figure.querySelector('img, video');
                if (media) this.wireLoadingState(figure, media);

                const link = figure.querySelector('a');
                const href = link && link.getAttribute('href');
                if (href && !link.hasAttribute('data-navigate') && this.isVideoFile(href)) {
                    this.addVideoIndicator(link);
                }
            });

            // Lightbox click wiring for media links only
            const mediaLinks = Array.from(gallery.querySelectorAll('figure a'))
                .filter(link => link.getAttribute('href') && !link.hasAttribute('data-navigate'));

            if (lightboxDisabled) return;

            const images = mediaLinks.map(link => ({
                src: link.getAttribute('href'),
                caption: link.querySelector('figcaption')?.textContent || ''
            }));

            mediaLinks.forEach((link, index) => {
                link.removeAttribute('target');
                link.onclick = (e) => {
                    e.preventDefault();
                    this.open(index, images);
                    return false;
                };
            });
        });
    }

    wireLoadingState(figure, media) {
        const onMediaLoaded = () => {
            figure.classList.add('loaded');
            media.classList.add('loaded');
        };

        if (media.tagName === 'IMG') {
            if (media.complete && media.naturalWidth > 0) {
                onMediaLoaded();
            } else {
                media.addEventListener('load', onMediaLoaded);
                media.addEventListener('error', onMediaLoaded); // Handle errors gracefully
            }
        } else if (media.tagName === 'VIDEO') {
            if (media.readyState >= 2) { // HAVE_CURRENT_DATA or higher
                onMediaLoaded();
            } else {
                media.addEventListener('loadeddata', onMediaLoaded);
                media.addEventListener('error', onMediaLoaded);
            }
        }
    }

    isVideoFile(url) {
        const extension = url.split('.').pop().toLowerCase();
        return VIDEO_EXTENSIONS.includes(extension);
    }

    addVideoIndicator(link) {
        const figure = link.closest('figure');
        const media = figure.querySelector('img, video');

        if (figure.querySelector('.video-indicator') || !media) {
            return;
        }

        const href = link.getAttribute('href');
        const hasAudio = link.getAttribute('data-has-audio') === 'true';

        // Only add indicator if it's a video with audio
        if (!this.isVideoFile(href) || !hasAudio) {
            return;
        }

        const indicator = document.createElement('div');
        indicator.className = 'video-indicator';
        indicator.textContent = '';
        figure.appendChild(indicator);

        const positionIndicator = () => {
            const mediaRect = media.getBoundingClientRect();
            const figureRect = figure.getBoundingClientRect();
            const top = mediaRect.top - figureRect.top + 8;
            const right = figureRect.right - mediaRect.right + 8;
            indicator.style.top = top + 'px';
            indicator.style.right = right + 'px';
        };

        if ((media.tagName === 'IMG' && media.complete && media.naturalWidth > 0) ||
            (media.tagName === 'VIDEO' && media.readyState >= 1)) {
            positionIndicator();
        } else {
            media.addEventListener('load', positionIndicator);
            media.addEventListener('loadedmetadata', positionIndicator);
        }

        window.addEventListener('resize', positionIndicator);
    }
    open(index, images) {
        this.currentIndex = index;
        this.images = images;

        this.updateContent();
        this.container.style.display = 'flex';
        setTimeout(() => this.container.classList.add('active'), 10);

        document.body.classList.add('lightbox-open');
        this.attachEventListeners();
    }

    close() {
        // Stop any playing media
        const video = this.container.querySelector('video');
        const audio = this.container.querySelector('audio');

        if (video) {
            video.pause();
            video.currentTime = 0;
        }

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        // Existing close logic
        this.container.classList.remove('active');
        setTimeout(() => {
            this.container.style.display = 'none';
        }, 300);

        document.body.classList.remove('lightbox-open');
        this.detachEventListeners();
    }

    updateContent() {
        const currentMedia = this.images[this.currentIndex];
        const mediaContainer = document.getElementById('lightbox-image-container');
        const caption = document.getElementById('lightbox-caption');
        const counter = document.getElementById('lightbox-counter');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');

        mediaContainer.innerHTML = '';

        const src = currentMedia.src;
        const extension = src.split('.').pop().toLowerCase();

        if (VIDEO_EXTENSIONS.includes(extension)) {
            this.createVideoElement(mediaContainer, src);
        } else if (AUDIO_EXTENSIONS.includes(extension)) {
            this.createAudioElement(mediaContainer, src, currentMedia.caption);
        } else {
            this.createImageElement(mediaContainer, src);
        }

        caption.textContent = currentMedia.caption;
        counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;

        prevBtn.classList.toggle('disabled', this.currentIndex === 0);
        nextBtn.classList.toggle('disabled', this.currentIndex === this.images.length - 1);
    }

    createImageElement(container, src) {
        container.className = 'lightbox-image-container';
        const image = document.createElement('img');
        image.className = 'lightbox-image';
        image.src = src;
        image.alt = 'Enlarged view';
        container.appendChild(image);
    }

    createVideoElement(container, src) {
        container.className = 'lightbox-media-container';
        const video = document.createElement('video');
        video.className = 'lightbox-video';
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.volume = 0.5;
        video.loop = true;
        container.appendChild(video);
    }

    createAudioElement(container, src, caption) {
        container.className = 'lightbox-audio-container';

        const audioTitle = document.createElement('div');
        audioTitle.className = 'lightbox-audio-title';
        audioTitle.textContent = caption || 'Audio File';

        const audio = document.createElement('audio');
        audio.className = 'lightbox-audio';
        audio.src = src;
        audio.controls = true;

        container.appendChild(audioTitle);
        container.appendChild(audio);
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateContent();
        }
    }

    next() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
            this.updateContent();
        }
    }

    handleKeyboard = (e) => {
        switch(e.key) {
            case 'ArrowLeft':
            case 'a':
                this.prev();
                break;
            case 'ArrowRight':
            case 'd':
                this.next();
                break;
            case 'Escape':
                this.close();
                break;
        }
    }

    handleOutsideClick = (e) => {
        if (e.target === this.container) {
            this.close();
        }
    }

    handleTouchStart = (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd = (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;

        if (this.touchEndX < this.touchStartX - swipeThreshold) {
            this.next();
        } else if (this.touchEndX > this.touchStartX + swipeThreshold) {
            this.prev();
        }
    }

    attachEventListeners() {
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        const closeBtn = document.getElementById('lightbox-close');

        document.addEventListener('keydown', this.handleKeyboard);
        this.container.addEventListener('click', this.handleOutsideClick);
        this.container.addEventListener('touchstart', this.handleTouchStart);
        this.container.addEventListener('touchend', this.handleTouchEnd);

        prevBtn.addEventListener('click', () => this.prev());
        nextBtn.addEventListener('click', () => this.next());
        closeBtn.addEventListener('click', () => this.close());
    }

    detachEventListeners() {
        document.removeEventListener('keydown', this.handleKeyboard);
        this.container.removeEventListener('click', this.handleOutsideClick);
        this.container.removeEventListener('touchstart', this.handleTouchStart);
        this.container.removeEventListener('touchend', this.handleTouchEnd);
    }

    adjustCaptionSizes() {
        observeContentChanges(() => {
            const captions = document.querySelectorAll('.image-gallery figcaption, .showcase[data-layout="grid"] figcaption');
            captions.forEach(caption => {
                const textLength = caption.textContent.length;
                if (textLength > 30) {
                    caption.style.fontSize = '0.8rem';
                } else if (textLength > 20) {
                    caption.style.fontSize = '0.85rem';
                }
            });
        });
    }

    reinitialize() {
        this.setupGalleryImages();
    }
}