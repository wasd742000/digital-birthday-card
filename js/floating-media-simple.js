// Ultra-Simple Floating Media Controller - Zero Lag
class FloatingMediaController {
    constructor() {
        this.mediaItems = [];
        this.init();
    }

    init() {
        this.collectMediaItems();
        this.setupCleanPositions();
    }

    collectMediaItems() {
        this.mediaItems = Array.from(document.querySelectorAll('.floating-item'));
        console.log(`Found ${this.mediaItems.length} floating media items`);
    }

    setupCleanPositions() {
        // Clean grid-like positions to avoid overlap
        const positions = [
            { top: '10%', left: '8%' },
            { top: '20%', right: '12%' },
            { top: '35%', left: '65%' },
            { top: '12%', right: '35%' },
            { bottom: '25%', left: '15%' },
            { bottom: '30%', right: '20%' },
            { top: '55%', left: '3%' },
            { top: '30%', right: '3%' },
            { top: '60%', left: '45%' },
            { bottom: '40%', left: '50%' },
            { top: '22%', left: '38%' },
            { bottom: '20%', right: '40%' },
            { top: '75%', right: '8%' },
            { bottom: '12%', left: '70%' }
        ];

        this.mediaItems.forEach((item, index) => {
            const position = positions[index % positions.length];
            
            // Apply position cleanly
            Object.entries(position).forEach(([key, value]) => {
                item.style[key] = value;
            });

            // Remove any conflicting transforms
            item.style.transform = '';
            
            // Simple hover effect only
            item.addEventListener('mouseenter', () => {
                item.style.animationPlayState = 'paused';
                item.style.transform = 'scale(1.05)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.animationPlayState = 'running';
                item.style.transform = '';
            });
        });
    }

    // Simplified method to add new items
    addMediaItem(element) {
        this.mediaItems.push(element);
        this.setupCleanPositions();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.floatingController = new FloatingMediaController();
    console.log('✨ Ultra-simple floating controller initialized');
});
