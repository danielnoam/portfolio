/*==============================================
                LIGHTBOX FUNCTIONALITY
================================================*/
document.addEventListener('DOMContentLoaded', function() {
    // Create a mutation observer to detect when content changes
    const contentElement = document.getElementById('content');
    if (contentElement) {
        const contentObserver = new MutationObserver(() => {
            // Short delay to ensure DOM is fully updated
            setTimeout(initLightbox, 100);
        });
        contentObserver.observe(contentElement, { childList: true, subtree: true });
    }

    // Run once on an initial page load
    initLightbox();
});

function initLightbox() {
    // Create lightbox elements if they don't exist
    if (!document.getElementById('lightbox-container')) {
        createLightboxElements();
    }

    // Get all gallery images and add click events
    setupGalleryImages();
}

function setupGalleryImages() {
    // Find all gallery images
    const galleryLinks = document.querySelectorAll('.image-gallery figure a');

    // Store all images for navigation
    const galleryImages = Array.from(galleryLinks).map(link => ({
        src: link.getAttribute('href'),
        caption: link.querySelector('figcaption')?.textContent || ''
    }));

    // Add click event to all gallery images
    galleryLinks.forEach((link, index) => {
        // Check if this gallery should have the lightbox disabled
        const gallery = link.closest('.image-gallery');
        const lightboxDisabled = gallery && gallery.classList.contains('no-lightbox');

        // Check if this link is a video and add indicator
        const href = link.getAttribute('href');
        const isVideo = href && isVideoFile(href);

        if (isVideo) {
            addVideoIndicator(link);
        }

        if (lightboxDisabled) {
            // For galleries with lightbox disabled, preserve the link's default behavior
            if (!link.hasAttribute('data-has-custom-click')) {
                const originalOnClick = link.onclick;
                link.setAttribute('data-has-custom-click', 'true');

                if (originalOnClick) {
                    // Keep original onclick handler
                } else {
                    link.onclick = null;
                }
            }
        } else {
            // For regular galleries with lightbox enabled
            link.removeAttribute('target');

            // Create a new click handler for lightbox
            link.onclick = function(e) {
                e.preventDefault();
                openLightbox(index, galleryImages);
                return false;
            };
        }
    });
}


function isVideoFile(url) {
    const extension = url.split('.').pop().toLowerCase();
    return ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(extension);
}


function addVideoIndicator(link) {
    const figure = link.closest('figure');
    const img = figure.querySelector('img');

    // Check if indicator already exists to avoid duplicates
    if (figure.querySelector('.video-indicator')) {
        return;
    }

    if (!img) {
        return;
    }

    // Create the indicator
    const indicator = document.createElement('div');
    indicator.className = 'video-indicator';
    indicator.textContent = '';
    figure.appendChild(indicator);

    // Function to position indicator relative to image
    function positionIndicator() {
        const imgRect = img.getBoundingClientRect();
        const figureRect = figure.getBoundingClientRect();

        // Calculate position relative to figure
        const top = imgRect.top - figureRect.top + 8;
        const right = figureRect.right - imgRect.right + 8;

        indicator.style.top = top + 'px';
        indicator.style.right = right + 'px';
    }

    // Position immediately if image is loaded
    if (img.complete && img.naturalWidth > 0) {
        positionIndicator();
    } else {
        img.addEventListener('load', positionIndicator);
    }

    // Reposition on window resize
    window.addEventListener('resize', positionIndicator);
}


function openLightbox(index, images) {
    const lightboxContainer = document.getElementById('lightbox-container');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    // Set current image index
    let currentIndex = index;

    // Update the content based on media type
    function updateLightboxContent() {
        const currentMedia = images[currentIndex];
        const mediaContainer = document.getElementById('lightbox-image-container');

        // Clear existing content
        mediaContainer.innerHTML = '';

        // Determine media type based on file extension
        const src = currentMedia.src;
        const extension = src.split('.').pop().toLowerCase();

        if (['mp4', 'webm', 'ogg', 'mov'].includes(extension)) {
            // Video
            mediaContainer.className = 'lightbox-media-container';
            const video = document.createElement('video');
            video.className = 'lightbox-video';
            video.src = src;
            video.controls = true;
            video.autoplay = false;
            video.loop = true;
            mediaContainer.appendChild(video);
        } else if (['wav', 'mp3', 'ogg', 'm4a'].includes(extension)) {
            // Audio
            mediaContainer.className = 'lightbox-audio-container';
            const audioTitle = document.createElement('div');
            audioTitle.className = 'lightbox-audio-title';
            audioTitle.textContent = currentMedia.caption || 'Audio File';

            const audio = document.createElement('audio');
            audio.className = 'lightbox-audio';
            audio.src = src;
            audio.controls = true;

            mediaContainer.appendChild(audioTitle);
            mediaContainer.appendChild(audio);
        } else {
            // Image (default)
            mediaContainer.className = 'lightbox-image-container';
            const image = document.createElement('img');
            image.className = 'lightbox-image';
            image.src = src;
            image.alt = 'Enlarged view';
            mediaContainer.appendChild(image);
        }

        // Set caption and counter
        lightboxCaption.textContent = currentMedia.caption;
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;

        // Update navigation buttons
        lightboxPrev.classList.toggle('disabled', currentIndex === 0);
        lightboxNext.classList.toggle('disabled', currentIndex === images.length - 1);
    }

    // Set initial content
    updateLightboxContent();

    // Show lightbox
    lightboxContainer.style.display = 'flex';
    setTimeout(() => {
        lightboxContainer.classList.add('active');
    }, 10);

    // Disable page scrolling
    document.body.classList.add('lightbox-open');

    // Navigation functions
    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightboxContent();
        }
    }

    function nextImage() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateLightboxContent();
        }
    }

    // Close function
    function closeLightbox() {
        lightboxContainer.classList.remove('active');
        setTimeout(() => {
            lightboxContainer.style.display = 'none';
        }, 300);

        // Re-enable page scrolling
        document.body.classList.remove('lightbox-open');

        // Remove event listeners
        document.removeEventListener('keydown', handleKeyboard);
        lightboxContainer.removeEventListener('click', handleOutsideClick);
        lightboxPrev.removeEventListener('click', prevImage);
        lightboxNext.removeEventListener('click', nextImage);
    }

    // Handle keyboard navigation
    function handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Escape':
                closeLightbox();
                break;
            case 'a':
                prevImage();
                break;
            case 'd':
                nextImage();
                break;
        }
    }

    // Handle clicks outside the media
    function handleOutsideClick(e) {
        if (e.target === lightboxContainer) {
            closeLightbox();
        }
    }

    // Add event listeners
    document.addEventListener('keydown', handleKeyboard);
    lightboxContainer.addEventListener('click', handleOutsideClick);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightboxContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightboxContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;

        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left -> next image
            nextImage();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right -> previous image
            prevImage();
        }
    });
}

function createLightboxElements() {
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
}