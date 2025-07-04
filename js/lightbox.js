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

    // Preload video metadata for better performance
    preloadVideoMetadata();
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

        // Check if this link is a video
        const href = link.getAttribute('href');
        const isVideo = href && isVideoFile(href);

        if (isVideo) {
            addInPlaceVideoPreview(link);
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

// Helper function to check if a file is a video
function isVideoFile(url) {
    const extension = url.split('.').pop().toLowerCase();
    return ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(extension);
}

// Function to add in-place video preview
function addInPlaceVideoPreview(link) {
    const figure = link.closest('figure');
    const href = link.getAttribute('href');

    // Add video indicator
    const indicator = document.createElement('div');
    indicator.className = 'video-indicator';
    indicator.textContent = 'Video';
    figure.appendChild(indicator);

    // Create video element that will overlay the image
    const video = document.createElement('video');
    video.className = 'video-preview';
    video.src = href;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';

    // Insert video after the image but before figcaption
    const img = figure.querySelector('img');
    if (img) {
        img.parentNode.insertBefore(video, img.nextSibling);
    }

    // Add hover events to the figure
    let hoverTimeout;
    let isPlaying = false;

    figure.addEventListener('mouseenter', function() {
        // Small delay to prevent accidental triggers
        hoverTimeout = setTimeout(() => {
            if (!isPlaying) {
                video.currentTime = 0; // Start from beginning
                video.play().then(() => {
                    isPlaying = true;
                }).catch(e => {
                    console.log('Video autoplay prevented:', e);
                });
            }
        }, 200);
    });

    figure.addEventListener('mouseleave', function() {
        clearTimeout(hoverTimeout);
        if (isPlaying) {
            video.pause();
            video.currentTime = 0;
            isPlaying = false;
        }
    });

    // Ensure video is properly sized to match the thumbnail
    video.addEventListener('loadedmetadata', function() {
        const img = figure.querySelector('img');
        if (img) {
            // Match the video dimensions to the image
            video.style.width = getComputedStyle(img).width;
            video.style.height = getComputedStyle(img).height;
        }
    });
}

function preloadVideoMetadata() {
    const videoLinks = document.querySelectorAll('.image-gallery figure a');

    videoLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (isVideoFile(href)) {
            // Create a hidden video element just for preloading
            const video = document.createElement('video');
            video.src = href;
            video.preload = 'metadata';
            video.muted = true;
            video.style.display = 'none';
            document.body.appendChild(video);

            // Remove after metadata is loaded
            video.addEventListener('loadedmetadata', function() {
                setTimeout(() => {
                    if (video.parentNode) {
                        video.parentNode.removeChild(video);
                    }
                }, 1000);
            });
        }
    });
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