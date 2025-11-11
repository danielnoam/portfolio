/*==============================================
        BACKGROUND MANAGER MODULE
================================================*/

export class BackgroundManager {
    constructor() {
        this.container = null;
        this.currentBackground = null;
        this.backgroundConfigs = {
            'about': {
                type: 'network',
                count: 15,
            },
            'chicken-invaders-remake': {
                type: 'particles',
                color: '#4a9eff',
                count: 50
            },
            'project-umn': {
                type: 'binary',
                count: 20
            },
            'square': {
                type: 'shapes',
                count: 25,
            },
            'school-these-shits': {
                type: 'waves',
                count: 1,
            },
            'pixel-knight': {
                type: 'rain',
                count: 15,
                speed: 0.5,
            },
            'bubblerena': {
                type: 'bubbles',
                count: 20,
                color: '#ff6b6b',
            },
        };
    }

    init() {
        this.createContainer();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'page-background';
        document.body.insertBefore(this.container, document.body.firstChild);
    }

    setBackground(pagePath) {
        const pageMatch = pagePath.match(/\/([^\/]+)\/content\.md$/);
        const pageId = pageMatch ? pageMatch[1] : 'default';

        const config = this.backgroundConfigs[pageId];

        if (this.currentBackground === pageId && this.container.classList.contains('active')) {
            return;
        }

        if (!config) {
            this.clearBackground();
            this.currentBackground = null;
            return;
        }

        this.container.classList.remove('active');

        setTimeout(() => {
            this.container.innerHTML = '';

            switch(config.type) {
                case 'rain':
                    this.createRainEffect(config);
                    break;
                case 'particles':
                    this.createParticlesEffect(config);
                    break;
                case 'shapes':
                    this.createShapesEffect(config);
                    break;
                case 'binary':
                    this.createBinaryEffect(config);
                    break;
                case 'waves':
                    this.createWavesEffect(config);
                    break;
                case 'image':
                    this.createImageBackground(config);
                    break;
                case 'bubbles':
                    this.createBubblesEffect(config);
                    break;
                case 'stars':
                    this.createStarsEffect(config);
                    break;
                case 'snow':
                    this.createSnowEffect(config);
                    break;
                case 'confetti':
                    this.createConfettiEffect(config);
                    break;
                case 'dna':
                    this.createDNAEffect(config);
                    break;
                case 'network':
                    this.createNetworkEffect(config);
                    break;
                case 'fireflies':
                    this.createFirefliesEffect(config);
                    break;
            }

            this.currentBackground = pageId;

            setTimeout(() => {
                this.container.classList.add('active');
            }, 50);
        }, 500);
    }

    createRainEffect(config) {
        const rainContainer = document.createElement('div');
        rainContainer.className = 'rain-container';

        for (let i = 0; i < (config.count || 100); i++) {
            const drop = document.createElement('div');
            drop.className = config.image ? 'image-rain-drop rain-drop' : 'rain-drop';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.height = `${Math.random() * 50 + 30}px`;
            drop.style.animationDuration = `${Math.random() * 1 + (config.speed || 2)}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            drop.style.transform = 'translateY(-100vh)';

            if (config.image) {
                drop.style.backgroundImage = `url(${config.image})`;
                drop.style.width = '15px';
            }

            rainContainer.appendChild(drop);
        }

        this.container.appendChild(rainContainer);
    }

    createParticlesEffect(config) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';

        for (let i = 0; i < (config.count || 50); i++) {
            const particle = document.createElement('div');
            particle.className = config.image ? 'image-particle particle' : 'particle';

            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            particle.style.left = `${startX}%`;
            particle.style.top = `${startY}%`;

            const duration = Math.random() * 10 + 15;
            const delay = Math.random() * 5;

            if (config.image) {
                particle.style.backgroundImage = `url(${config.image})`;
            } else if (config.color) {
                particle.style.background = config.color;
            }

            // Create unique animation
            const animationName = `float-particle-${i}`;
            const dx = (Math.random() - 0.5) * 200;
            const dy = (Math.random() - 0.5) * 200;

            const keyframes = `
            @keyframes ${animationName} {
                0% {
                    transform: translate(0, 0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.2;
                }
                90% {
                    opacity: 0.2;
                }
                100% {
                    transform: translate(${dx}px, ${dy}px);
                    opacity: 0;
                }
            }
        `;

            // Inject keyframes
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);

            particle.style.animation = `${animationName} ${duration}s ease-in-out ${delay}s infinite`;

            particlesContainer.appendChild(particle);
        }

        this.container.appendChild(particlesContainer);
    }

    createShapesEffect(config) {
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'shapes-container';

        for (let i = 0; i < (config.count || 20); i++) {
            const shape = document.createElement('div');
            shape.className = `shape ${Math.random() > 0.5 ? 'square' : 'circle'}`;

            const size = Math.random() * 50 + 30;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;

            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            shape.style.left = `${startX}%`;
            shape.style.top = `${startY}%`;

            const duration = Math.random() * 20 + 20;
            const delay = Math.random() * 5;

            // Create unique animation
            const animationName = `rotate-shape-${i}`;
            const dx = (Math.random() - 0.5) * 300;
            const dy = (Math.random() - 0.5) * 300;

            const keyframes = `
            @keyframes ${animationName} {
                from {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.1;
                }
                90% {
                    opacity: 0.1;
                }
                to {
                    transform: translate(${dx}px, ${dy}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;

            // Inject keyframes
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);

            shape.style.animation = `${animationName} ${duration}s linear ${delay}s infinite`;

            shapesContainer.appendChild(shape);
        }

        this.container.appendChild(shapesContainer);
    }

    createBinaryEffect(config) {
        const binaryContainer = document.createElement('div');
        binaryContainer.className = 'binary-container';

        for (let i = 0; i < (config.count || 15); i++) {
            const column = document.createElement('div');
            column.className = 'binary-column';
            column.style.left = `${(i / config.count) * 100}%`;

            let text = '';
            for (let j = 0; j < 30; j++) {
                text += Math.random() > 0.5 ? '1' : '0';
                text += '<br>';
            }
            column.innerHTML = text;

            column.style.animationDuration = `${Math.random() * 5 + 10}s`;
            column.style.animationDelay = `${Math.random() * 3}s`;
            column.style.transform = 'translateY(-100%)';

            binaryContainer.appendChild(column);
        }

        this.container.appendChild(binaryContainer);
    }

    createWavesEffect(config) {
        const wavesContainer = document.createElement('div');
        wavesContainer.className = 'waves-container';

        for (let i = 0; i < (config.count || 3); i++) {
            const wave = document.createElement('div');
            wave.className = 'wave';
            wave.style.left = `${50}%`;
            wave.style.top = `${50}%`;
            wave.style.animationDuration = `${10 + i * 3}s`;
            wave.style.animationDelay = `${i * 2}s`;
            wavesContainer.appendChild(wave);
        }

        this.container.appendChild(wavesContainer);
    }

    createImageBackground(config) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'image-background';
        imageDiv.style.backgroundImage = `url(${config.imagePath})`;
        this.container.appendChild(imageDiv);
    }

    createBubblesEffect(config) {
        const bubblesContainer = document.createElement('div');
        bubblesContainer.className = 'bubbles-container';

        for (let i = 0; i < (config.count || 20); i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';

            const size = Math.random() * 60 + 20;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.bottom = '-100px';

            bubble.style.animationDuration = `${Math.random() * 5 + 8}s`;
            bubble.style.animationDelay = `${Math.random() * 5}s`;

            if (config.color) {
                bubble.style.background = `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), ${config.color})`;
            }

            bubblesContainer.appendChild(bubble);
        }

        this.container.appendChild(bubblesContainer);
    }

    createStarsEffect(config) {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';

        for (let i = 0; i < (config.count || 50); i++) {
            const star = document.createElement('div');
            star.className = 'star';

            const size = Math.random() * 15 + 5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 3}s`;

            if (config.color) {
                star.style.background = config.color;
            }

            starsContainer.appendChild(star);
        }

        this.container.appendChild(starsContainer);
    }

    createSnowEffect(config) {
        const snowContainer = document.createElement('div');
        snowContainer.className = 'snow-container';

        const snowflakes = ['❄', '❅', '❆'];

        for (let i = 0; i < (config.count || 50); i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];

            snowflake.style.left = `${Math.random() * 100}%`;
            snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
            snowflake.style.animationDuration = `${Math.random() * 5 + 10}s`;
            snowflake.style.animationDelay = `${Math.random() * 5}s`;
            snowflake.style.transform = 'translateY(-100vh)';

            snowContainer.appendChild(snowflake);
        }

        this.container.appendChild(snowContainer);
    }

    createConfettiEffect(config) {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';

        const colors = config.colors || ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];

        for (let i = 0; i < (config.count || 50); i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = `${Math.random() * 3 + 3}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confetti.style.transform = 'translateY(-100vh)';

            confettiContainer.appendChild(confetti);
        }

        this.container.appendChild(confettiContainer);
    }

    createDNAEffect(config) {
        const dnaContainer = document.createElement('div');
        dnaContainer.className = 'dna-container';

        const strand = document.createElement('div');
        strand.className = 'dna-strand';

        for (let i = 0; i < (config.count || 30); i++) {
            const particle = document.createElement('div');
            particle.className = 'dna-particle';
            particle.style.top = `${(i / config.count) * 100}%`;
            particle.style.animationDuration = '4s';
            particle.style.animationDelay = `${(i / config.count) * 2}s`;

            if (config.color) {
                particle.style.background = config.color;
            }

            strand.appendChild(particle);
        }

        dnaContainer.appendChild(strand);
        this.container.appendChild(dnaContainer);
    }

    createNetworkEffect(config) {
        const networkContainer = document.createElement('div');
        networkContainer.className = 'network-container';

        const nodes = [];
        const count = config.count || 30;

        // Create nodes
        for (let i = 0; i < count; i++) {
            const node = document.createElement('div');
            node.className = 'network-node';

            const x = Math.random() * 100;
            const y = Math.random() * 100;

            node.style.left = `${x}%`;
            node.style.top = `${y}%`;

            if (config.color) {
                node.style.background = config.color;
            }

            nodes.push({ element: node, x, y });
            networkContainer.appendChild(node);
        }

        // Create lines between close nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[j].x - nodes[i].x;
                const dy = nodes[j].y - nodes[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 20) {
                    const line = document.createElement('div');
                    line.className = 'network-line';

                    line.style.left = `${nodes[i].x}%`;
                    line.style.top = `${nodes[i].y}%`;
                    line.style.width = `${distance}%`;
                    line.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;

                    if (config.color) {
                        line.style.background = config.color;
                    }

                    networkContainer.appendChild(line);
                }
            }
        }

        this.container.appendChild(networkContainer);
    }

    createFirefliesEffect(config) {
        const firefliesContainer = document.createElement('div');
        firefliesContainer.className = 'fireflies-container';

        for (let i = 0; i < (config.count || 20); i++) {
            const firefly = document.createElement('div');
            firefly.className = 'firefly';

            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            firefly.style.left = `${startX}%`;
            firefly.style.top = `${startY}%`;

            const duration = Math.random() * 5 + 5;
            const delay = Math.random() * 3;

            if (config.color) {
                firefly.style.background = config.color;
                firefly.style.boxShadow = `0 0 10px ${config.color}`;
            }

            // Create unique animation
            const animationName = `firefly-float-${i}`;
            const dx = (Math.random() - 0.5) * 300;
            const dy = (Math.random() - 0.5) * 300;

            const keyframes = `
            @keyframes ${animationName} {
                0%, 100% {
                    transform: translate(0, 0);
                    opacity: 0.3;
                }
                25% {
                    opacity: 1;
                }
                50% {
                    transform: translate(${dx}px, ${dy}px);
                    opacity: 0.5;
                }
                75% {
                    opacity: 1;
                }
            }
        `;

            // Inject keyframes
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);

            firefly.style.animation = `${animationName} ${duration}s ease-in-out ${delay}s infinite`;

            firefliesContainer.appendChild(firefly);
        }

        this.container.appendChild(firefliesContainer);
    }

    clearBackground() {
        if (!this.container) return;

        if (this.networkAnimationFrame) {
            cancelAnimationFrame(this.networkAnimationFrame);
            this.networkAnimationFrame = null;
        }

        this.container.classList.remove('active');
        this.currentBackground = null;
        setTimeout(() => {
            if (this.container) {
                this.container.innerHTML = '';
            }
        }, 500);
    }
}