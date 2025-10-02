// Floating Media Animation Controller
class FloatingMediaController {
    constructor() {
        this.mediaItems = [];
        this.animationSpeed = 0.5;
        this.init();
    }

    init() {
        this.collectMediaItems();
        this.startFloatingAnimation();
        this.setupRandomPositions();
    }

    collectMediaItems() {
        this.mediaItems = Array.from(document.querySelectorAll('.floating-item'));
        console.log(`Found ${this.mediaItems.length} floating media items`);
    }

    setupRandomPositions() {
        this.mediaItems.forEach((item, index) => {
            // Create more natural starting positions
            const startX = Math.random() * 40 + 5; // Maximally adjusted to move far left (5% to 45%)
            const startY = Math.random() * 30 + 5; // Maximally adjusted to move far up (5% to 35%)
            
            item.style.left = `${startX}%`;
            item.style.top = `${startY}%`;
            
            // Add slight random delay to animations
            const delay = Math.random() * 2;
            item.style.animationDelay = `${delay}s`;
            
            // Random scale variation
            const scale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
            item.style.transform = `scale(${scale})`;
        });
    }

    startFloatingAnimation() {
        this.mediaItems.forEach((item, index) => {
            this.animateFloating(item, index);
        });
    }

    // Optimize floating animations
    animateFloating(item, index) {
        const floatData = {
            x: parseFloat(item.style.left) || Math.random() * 50 + 5,
            y: parseFloat(item.style.top) || Math.random() * 40 + 5,
            vx: (Math.random() - 0.5) * this.animationSpeed * 0.3, // Reduced speed
            vy: (Math.random() - 0.5) * this.animationSpeed * 0.3, // Restored vertical movement
            oscillationOffset: Math.random() * Math.PI * 2 // Randomize oscillation phase
        };

        // Use requestAnimationFrame for smoother animations
        const updatePosition = () => {
            const time = performance.now() / 1000; // Time in seconds

            // Add subtle oscillation effect to simulate tethered movement
            floatData.x += floatData.vx + Math.sin(time + floatData.oscillationOffset) * 0.1; // Reduced oscillation
            floatData.y += floatData.vy + Math.cos(time + floatData.oscillationOffset) * 0.1; // Reduced oscillation

            // Boundary checks
            if (floatData.x < 5 || floatData.x > 45) floatData.vx *= -1; // Maximally restricted horizontal boundaries
            if (floatData.y < 5 || floatData.y > 35) floatData.vy *= -1; // Maximally restricted vertical boundaries

            item.style.transform = `translate(${floatData.x}vw, ${floatData.y}vh)`;
            requestAnimationFrame(updatePosition);
        };

        requestAnimationFrame(updatePosition);
    }

    // Method to add new media items dynamically
    addMediaItem(mediaSrc, type = 'image') {
        const container = document.querySelector('.floating-media-container');
        const newItem = document.createElement('div');
        newItem.className = `floating-item ${type}-item`;
        newItem.setAttribute('data-media', mediaSrc);
        newItem.setAttribute('data-type', type);

        const frame = document.createElement('div');
        frame.className = 'vintage-frame';

        if (type === 'image') {
            const img = document.createElement('img');
            img.src = mediaSrc;
            img.alt = 'Our Memory';
            img.className = 'floating-photo';
            frame.appendChild(img);
        } else if (type === 'video') {
            frame.className += ' video-frame';
            const video = document.createElement('video');
            video.className = 'floating-video';
            video.muted = true;
            
            const source = document.createElement('source');
            source.src = mediaSrc;
            source.type = 'video/mp4';
            video.appendChild(source);
            
            const playOverlay = document.createElement('div');
            playOverlay.className = 'play-overlay';
            playOverlay.textContent = '▶️';
            
            frame.appendChild(video);
            frame.appendChild(playOverlay);
        }

        newItem.appendChild(frame);
        container.appendChild(newItem);

        // Add to our tracking array
        this.mediaItems.push(newItem);
        
        // Set initial position and start animation
        const startX = Math.random() * 40 + 30; // Centered horizontally (30% to 70%)
        const startY = 50; // Fixed vertical position
        newItem.style.left = `${startX}%`;
        newItem.style.top = `${startY}%`;
        
        this.animateFloating(newItem, this.mediaItems.length - 1);

        // Add click event
        newItem.addEventListener('click', () => {
            window.modalController.openModal(mediaSrc, type);
        });

        return newItem;
    }

    // Method to pause/resume animations
    toggleAnimation() {
        this.mediaItems.forEach(item => {
            const currentState = item.style.animationPlayState;
            item.style.animationPlayState = currentState === 'paused' ? 'running' : 'paused';
        });
    }

    // Method to change animation speed
    setAnimationSpeed(speed) {
        this.animationSpeed = speed;
        this.mediaItems.forEach(item => {
            item.style.animationDuration = `${8 / speed}s`;
        });
    }
}

// Enhanced floating hearts animation
class FloatingHeartsController {
    constructor() {
        this.hearts = ['💕', '💖', '💝', '❤️', '💗', '💘', '💞', '💓'];
        this.heartElements = [];
        this.init();
    }

    init() {
        this.createHearts();
        this.startHeartAnimation();
    }

    createHearts() {
        const container = document.querySelector('.floating-hearts');
        
        // Create additional hearts
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = this.hearts[Math.floor(Math.random() * this.hearts.length)];
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.animationDelay = `${Math.random() * 6}s`;
            heart.style.animationDuration = `${4 + Math.random() * 4}s`;
            
            container.appendChild(heart);
            this.heartElements.push(heart);
        }
    }

    startHeartAnimation() {
        this.heartElements.forEach((heart, index) => {
            const floatData = {
                x: Math.random() * 100,
                y: Math.random() * 100,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                opacity: 0.3 + Math.random() * 0.4
            };

            const animate = () => {
                floatData.x += floatData.vx;
                floatData.y += floatData.vy;

                // Wrap around edges
                if (floatData.x < -5) floatData.x = 105;
                if (floatData.x > 105) floatData.x = -5;
                if (floatData.y < -5) floatData.y = 105;
                if (floatData.y > 105) floatData.y = -5;

                // Pulse opacity
                const pulse = Math.sin(Date.now() * 0.002 + index) * 0.2 + 0.6;
                heart.style.opacity = floatData.opacity * pulse;

                heart.style.left = `${floatData.x}%`;
                heart.style.top = `${floatData.y}%`;

                requestAnimationFrame(animate);
            };

            // Start with a delay
            setTimeout(animate, index * 500);
        });
    }

    // Method to add temporary celebration hearts
    celebrate() {
        const container = document.querySelector('.floating-hearts');
        
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart celebration-heart';
            heart.textContent = this.hearts[Math.floor(Math.random() * this.hearts.length)];
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.fontSize = `${1.5 + Math.random()}rem`;
            heart.style.opacity = '1';
            heart.style.animation = 'heartFloat 2s ease-out forwards';
            
            container.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }
    }
}

// Initialize floating controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.floatingController = new FloatingMediaController();
    window.heartsController = new FloatingHeartsController();
    
    console.log('Floating media controllers initialized');
});

function adjustFloatingMediaForSmallScreens() {
    const floatingElements = document.querySelectorAll('.floating-media');
    floatingElements.forEach(element => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            element.style.position = 'relative';
            element.style.margin = '10px auto';
        }
    });
}

window.addEventListener('resize', adjustFloatingMediaForSmallScreens);
adjustFloatingMediaForSmallScreens();
