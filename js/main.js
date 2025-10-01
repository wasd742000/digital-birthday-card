// Main Application Controller
class BirthdayCardApp {
    constructor() {
        this.currentMediaIndex = 0;
        this.mediaItems = [];
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupModal();
        this.setupLoveNotes();
        this.setupMusic();
        this.setupTypewriterEffect();
        this.initializeMediaLoader();
        
        console.log('Birthday Card App initialized! 🎂❤️');
    }

    async initializeMediaLoader() {
        this.mediaLoader = new MediaLoader();
        await this.mediaLoader.loadAllMedia();
        this.mediaItems = this.mediaLoader.mediaItems;
    }

    setupEventListeners() {
        // Media item clicks
        document.addEventListener('click', (e) => {
            const mediaItem = e.target.closest('.floating-item');
            if (mediaItem) {
                this.handleMediaClick(mediaItem);
            }
        });

        // Love note clicks
        document.addEventListener('click', (e) => {
            const loveNote = e.target.closest('.love-note');
            if (loveNote) {
                this.handleLoveNoteClick(loveNote);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('mediaModal').style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.previousMedia();
                        break;
                    case 'ArrowRight':
                        this.nextMedia();
                        break;
                }
            }
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    setupModal() {
        const modal = document.getElementById('mediaModal');
        const closeBtn = document.querySelector('.modal-close');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        // Close modal events
        closeBtn.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        // Navigation events
        prevBtn.addEventListener('click', () => this.previousMedia());
        nextBtn.addEventListener('click', () => this.nextMedia());

        window.modalController = this;
    }

    setupLoveNotes() {
        const loveNotes = document.querySelectorAll('.love-note');
        loveNotes.forEach((note, index) => {
            note.addEventListener('click', () => {
                this.showLoveMessage(note);
            });

            // Add hover effect
            note.addEventListener('mouseenter', () => {
                note.style.transform = 'scale(1.3) rotate(10deg)';
                note.style.filter = 'brightness(1.2)';
            });

            note.addEventListener('mouseleave', () => {
                note.style.transform = 'scale(1) rotate(0deg)';
                note.style.filter = 'brightness(1)';
            });
        });
    }

    setupMusic() {
        const musicToggle = document.getElementById('musicToggle');
        const backgroundMusic = document.getElementById('backgroundMusic');

        musicToggle.addEventListener('click', () => {
            if (this.isPlaying) {
                backgroundMusic.pause();
                musicToggle.textContent = '🎵';
                musicToggle.style.opacity = '0.7';
                this.isPlaying = false;
            } else {
                backgroundMusic.play().catch(e => {
                    console.log('Music autoplay prevented by browser');
                });
                musicToggle.textContent = '🎶';
                musicToggle.style.opacity = '1';
                this.isPlaying = true;
            }
        });

        // Handle music end
        backgroundMusic.addEventListener('ended', () => {
            musicToggle.textContent = '🎵';
            musicToggle.style.opacity = '0.7';
            this.isPlaying = false;
        });
    }

    setupTypewriterEffect() {
        const message = document.querySelector('.romantic-message');
        if (message && !message.classList.contains('typewriter-done')) {
            const text = message.textContent;
            message.textContent = '';
            message.classList.add('typewriter');
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    message.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                } else {
                    message.classList.remove('typewriter');
                    message.classList.add('typewriter-done');
                }
            };
            
            // Start typewriter effect after a delay
            setTimeout(typeWriter, 2000);
        }
    }

    preloadMedia() {
        this.mediaItems = Array.from(document.querySelectorAll('.floating-item'));
        
        // Preload images
        this.mediaItems.forEach(item => {
            const mediaSrc = item.getAttribute('data-media');
            const mediaType = item.getAttribute('data-type');
            
            if (mediaType === 'image' && mediaSrc) {
                const img = new Image();
                img.src = mediaSrc;
            }
        });
    }

    handleMediaClick(mediaItem) {
        const mediaSrc = mediaItem.getAttribute('data-media');
        const mediaType = mediaItem.getAttribute('data-type');
        
        if (!mediaSrc) return;

        // Find the index of clicked item
        this.currentMediaIndex = this.mediaItems.indexOf(mediaItem);
        
        this.openModal(mediaSrc, mediaType);
        
        // Celebration effect
        if (window.heartsController) {
            window.heartsController.celebrate();
        }
    }

    openModal(mediaSrc, mediaType) {
        const modal = document.getElementById('mediaModal');
        const modalImage = document.getElementById('modalImage');
        const modalVideo = document.getElementById('modalVideo');
        const modalVideoSource = document.getElementById('modalVideoSource');

        // Hide both initially
        modalImage.style.display = 'none';
        modalVideo.style.display = 'none';

        if (mediaType === 'image') {
            modalImage.src = mediaSrc;
            modalImage.style.display = 'block';
        } else if (mediaType === 'video') {
            modalVideoSource.src = mediaSrc;
            modalVideo.load();
            modalVideo.style.display = 'block';
        }

        modal.style.display = 'block';
        
        // Add animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'modalFadeIn 0.3s ease-out';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('mediaModal');
        const modalVideo = document.getElementById('modalVideo');
        
        // Pause video if playing
        modalVideo.pause();
        
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    previousMedia() {
        if (this.mediaItems.length === 0) return;
        
        this.currentMediaIndex = (this.currentMediaIndex - 1 + this.mediaItems.length) % this.mediaItems.length;
        const item = this.mediaItems[this.currentMediaIndex];
        const mediaSrc = item.getAttribute('data-media');
        const mediaType = item.getAttribute('data-type');
        
        this.openModal(mediaSrc, mediaType);
    }

    nextMedia() {
        if (this.mediaItems.length === 0) return;
        
        this.currentMediaIndex = (this.currentMediaIndex + 1) % this.mediaItems.length;
        const item = this.mediaItems[this.currentMediaIndex];
        const mediaSrc = item.getAttribute('data-media');
        const mediaType = item.getAttribute('data-type');
        
        this.openModal(mediaSrc, mediaType);
    }

    showLoveMessage(noteElement) {
        const message = noteElement.getAttribute('data-message');
        if (!message) return;

        // Create floating message
        const floatingMessage = document.createElement('div');
        floatingMessage.className = 'floating-love-message';
        floatingMessage.textContent = message;
        floatingMessage.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(145deg, #f4f1e8, #e8dcc0);
            border: 3px solid #8B4513;
            border-radius: 15px;
            padding: 1.5rem 2rem;
            font-family: 'Dancing Script', cursive;
            font-size: 1.8rem;
            color: #8B4513;
            text-align: center;
            box-shadow: 0 15px 40px rgba(139, 69, 19, 0.4);
            z-index: 2000;
            animation: modalFadeIn 0.5s ease-out;
            max-width: 80vw;
            word-wrap: break-word;
        `;

        document.body.appendChild(floatingMessage);

        // Remove after 3 seconds
        setTimeout(() => {
            floatingMessage.style.animation = 'modalFadeIn 0.3s ease-out reverse';
            setTimeout(() => {
                if (floatingMessage.parentNode) {
                    floatingMessage.parentNode.removeChild(floatingMessage);
                }
            }, 300);
        }, 3000);

        // Celebration effect
        if (window.heartsController) {
            window.heartsController.celebrate();
        }
    }

    handleResize() {
        // Adjust floating items positions on resize
        if (window.floatingController) {
            window.floatingController.setupRandomPositions();
        }
    }

    // Method to add new photos/videos dynamically
    addMedia(files) {
        if (!window.floatingController) return;

        Array.from(files).forEach(file => {
            const url = URL.createObjectURL(file);
            const type = file.type.startsWith('video/') ? 'video' : 'image';
            
            const newItem = window.floatingController.addMediaItem(url, type);
            this.mediaItems.push(newItem);
        });
    }

    // Method to export the card (for sharing)
    exportCard() {
        // This could be used to generate a shareable link or download
        const cardData = {
            title: document.querySelector('.main-title').textContent,
            message: document.querySelector('.romantic-message').textContent,
            mediaCount: this.mediaItems.length,
            timestamp: new Date().toISOString()
        };
        
        console.log('Card exported:', cardData);
        return cardData;
    }
}

// Automatic Media Loader
class MediaLoader {
    constructor() {
        this.supportedImages = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        this.supportedVideos = ['.mp4', '.webm', '.mov', '.avi'];
        this.mediaItems = [];
        this.loadedCount = 0;
    }

    async loadAllMedia() {
        console.log('🎨 Loading your photos and videos...');
        
        // Add some demo floating elements to show how it works
        this.createDemoElements();
        
        // Load specific known images first (1.png through 14.png exist in your folder)
        const knownImages = [];
        for (let i = 1; i <= 14; i++) {
            knownImages.push(`${i}.png`);
        }
        
        // Load the known images
        for (const imageName of knownImages) {
            await this.tryLoadImage(imageName);
        }
        
        // Try to load common user file patterns
        const imageNames = this.generateCommonNames();
        const videoNames = this.generateCommonVideoNames();
        
        // Load additional images
        for (const imageName of imageNames) {
            await this.tryLoadImage(imageName);
        }
        
        // Load videos  
        for (const videoName of videoNames) {
            await this.tryLoadVideo(videoName);
        }
        
        console.log(`📸 Loaded ${this.loadedCount} media files!`);
        
        // Show instructions
        setTimeout(() => {
            this.showMediaInstructions();
        }, 2000);
    }

    createDemoElements() {
        // Create demo elements with data URLs to avoid 404 errors
        const demoImages = [
            {
                data: 'data:image/svg+xml;base64,' + btoa(`<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f4f1e8"/>
                    <rect x="5" y="5" width="190" height="140" fill="none" stroke="#8B4513" stroke-width="2"/>
                    <circle cx="100" cy="75" r="30" fill="#DAA520" opacity="0.7"/>
                    <text x="100" y="120" font-family="serif" font-size="14" text-anchor="middle" fill="#8B4513">Demo Photo 1</text>
                    <text x="100" y="135" font-family="serif" font-size="10" text-anchor="middle" fill="#8B4513">Replace with yours!</text>
                </svg>`),
                alt: 'Demo Photo 1'
            },
            {
                data: 'data:image/svg+xml;base64,' + btoa(`<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#e8dcc0"/>
                    <rect x="5" y="5" width="190" height="140" fill="none" stroke="#8B4513" stroke-width="2"/>
                    <polygon points="100,25 120,65 160,65 130,95 140,135 100,115 60,135 70,95 40,65 80,65" fill="#8B4513" opacity="0.6"/>
                    <text x="100" y="120" font-family="serif" font-size="14" text-anchor="middle" fill="#8B4513">Demo Photo 2</text>
                    <text x="100" y="135" font-family="serif" font-size="10" text-anchor="middle" fill="#8B4513">Add your memories!</text>
                </svg>`),
                alt: 'Demo Photo 2'
            },
            {
                data: 'data:image/svg+xml;base64,' + btoa(`<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#d4c4a0"/>
                    <rect x="5" y="5" width="190" height="140" fill="none" stroke="#8B4513" stroke-width="2"/>
                    <path d="M 100 30 C 90 40, 90 60, 100 70 C 110 60, 110 40, 100 30 Z" fill="#8B4513" opacity="0.7"/>
                    <text x="100" y="90" font-family="serif" font-size="14" text-anchor="middle" fill="#8B4513">💕</text>
                    <text x="100" y="120" font-family="serif" font-size="14" text-anchor="middle" fill="#8B4513">Demo Photo 3</text>
                    <text x="100" y="135" font-family="serif" font-size="10" text-anchor="middle" fill="#8B4513">Your love story!</text>
                </svg>`),
                alt: 'Demo Photo 3'
            }
        ];

        demoImages.forEach((demo, index) => {
            this.createImageElementFromData(demo.data, demo.alt);
        });

        this.loadedCount += demoImages.length;
    }

    createImageElementFromData(dataUrl, alt) {
        const container = document.getElementById('mediaContainer');
        const item = document.createElement('div');
        item.className = 'floating-item photo-item demo-item';
        item.setAttribute('data-media', dataUrl);
        item.setAttribute('data-type', 'image');
        
        item.innerHTML = `
            <div class="vintage-frame">
                <img src="${dataUrl}" alt="${alt}" class="floating-photo">
            </div>
        `;
        
        container.appendChild(item);
        this.mediaItems.push(item);
        
        // Add click handler
        item.addEventListener('click', () => {
            window.birthdayApp.handleMediaClick(item);
        });
        
        // Set random position
        this.setRandomPosition(item);
    }

    generateCommonNames() {
        const names = [];
        const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const prefixes = ['photo', 'img', 'image', 'pic', 'picture'];
        
        // Generate simple numbered files (1.png, 2.jpg, etc.) - common pattern
        for (let i = 1; i <= 20; i++) {
            for (const ext of extensions) {
                names.push(`${i}${ext}`);
            }
        }
        
        // Generate numbered variations with prefixes
        for (let i = 1; i <= 20; i++) {
            for (const prefix of prefixes) {
                for (const ext of extensions) {
                    names.push(`${prefix}${i}${ext}`);
                    names.push(`${prefix}_${i}${ext}`);
                    names.push(`${prefix}-${i}${ext}`);
                }
            }
        }
        
        // Add common file naming patterns
        const commonNames = [
            'DSC_', 'IMG_', 'PHOTO_', 'PIC_', 'IMAGE_'
        ];
        
        for (const prefix of commonNames) {
            for (let i = 1; i <= 50; i++) {
                const num = i.toString().padStart(4, '0');
                for (const ext of extensions) {
                    names.push(`${prefix}${num}${ext}`);
                }
            }
        }
        
        return names;
    }

    generateCommonVideoNames() {
        const names = [];
        const extensions = ['.mp4', '.webm', '.mov'];
        const prefixes = ['video', 'vid', 'movie', 'clip'];
        
        for (let i = 1; i <= 10; i++) {
            for (const prefix of prefixes) {
                for (const ext of extensions) {
                    names.push(`${prefix}${i}${ext}`);
                    names.push(`${prefix}_${i}${ext}`);
                    names.push(`${prefix}-${i}${ext}`);
                }
            }
        }
        
        return names;
    }

    async tryLoadImage(imageName) {
        return new Promise((resolve) => {
            const img = new Image();
            
            // Set a timeout to avoid hanging on missing files
            const timeout = setTimeout(() => {
                resolve(false);
            }, 1000);
            
            img.onload = () => {
                clearTimeout(timeout);
                this.createImageElement(`assets/images/${imageName}`);
                this.loadedCount++;
                resolve(true);
            };
            
            img.onerror = () => {
                clearTimeout(timeout);
                resolve(false);
            };
            
            img.src = `assets/images/${imageName}`;
        });
    }

    async tryLoadVideo(videoName) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            
            // Set a timeout to avoid hanging on missing files
            const timeout = setTimeout(() => {
                resolve(false);
            }, 1000);
            
            video.onloadedmetadata = () => {
                clearTimeout(timeout);
                this.createVideoElement(`assets/videos/${videoName}`);
                this.loadedCount++;
                resolve(true);
            };
            
            video.onerror = () => {
                clearTimeout(timeout);
                resolve(false);
            };
            
            video.src = `assets/videos/${videoName}`;
        });
    }

    createImageElement(imagePath) {
        const container = document.getElementById('mediaContainer');
        const item = document.createElement('div');
        item.className = 'floating-item photo-item';
        item.setAttribute('data-media', imagePath);
        item.setAttribute('data-type', 'image');
        
        item.innerHTML = `
            <div class="vintage-frame">
                <img src="${imagePath}" alt="Our Memory" class="floating-photo">
            </div>
        `;
        
        container.appendChild(item);
        this.mediaItems.push(item);
        
        // Add click handler
        item.addEventListener('click', () => {
            window.birthdayApp.handleMediaClick(item);
        });
        
        // Set random position
        this.setRandomPosition(item);
    }

    createVideoElement(videoPath) {
        const container = document.getElementById('mediaContainer');
        const item = document.createElement('div');
        item.className = 'floating-item video-item';
        item.setAttribute('data-media', videoPath);
        item.setAttribute('data-type', 'video');
        
        item.innerHTML = `
            <div class="vintage-frame video-frame">
                <video class="floating-video" muted>
                    <source src="${videoPath}" type="video/mp4">
                </video>
                <div class="play-overlay">▶️</div>
            </div>
        `;
        
        container.appendChild(item);
        this.mediaItems.push(item);
        
        // Add click handler
        item.addEventListener('click', () => {
            window.birthdayApp.handleMediaClick(item);
        });
        
        // Set random position
        this.setRandomPosition(item);
    }

    setRandomPosition(item) {
        const startX = Math.random() * 80 + 10;
        const startY = Math.random() * 70 + 15;
        item.style.left = `${startX}%`;
        item.style.top = `${startY}%`;
        
        // Add to floating animation
        if (window.floatingController) {
            window.floatingController.mediaItems.push(item);
            window.floatingController.animateFloating(item, window.floatingController.mediaItems.length - 1);
        }
    }

    showMediaInstructions() {
        const container = document.getElementById('mediaContainer');
        const message = document.createElement('div');
        message.className = 'media-instructions';
        message.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                background: rgba(255, 255, 255, 0.95);
                padding: 2rem;
                border-radius: 20px;
                border: 3px solid #8B4513;
                box-shadow: 0 15px 40px rgba(139, 69, 19, 0.4);
                font-family: 'Dancing Script', cursive;
                color: #8B4513;
                max-width: 90vw;
                backdrop-filter: blur(10px);
                z-index: 100;
            ">
                <h3 style="font-size: 2.5rem; margin-bottom: 1rem;">� Ready for Your Photos!</h3>
                <div style="font-size: 1.3rem; margin-bottom: 1.5rem; line-height: 1.6;">
                    <p><strong>📸 Add Your Photos:</strong></p>
                    <p style="margin: 0.5rem 0;">1. Place photos in <code style="background: #f4f1e8; padding: 2px 8px; border-radius: 4px;">assets/images/</code></p>
                    <p style="margin: 0.5rem 0;">2. Place videos in <code style="background: #f4f1e8; padding: 2px 8px; border-radius: 4px;">assets/videos/</code></p>
                    <p style="margin: 0.5rem 0;">3. Use ANY filename you want!</p>
                    <p style="margin: 0.5rem 0;">4. Refresh the page to see them float! ✨</p>
                </div>
                <div style="font-size: 1.1rem; opacity: 0.8; margin-bottom: 1rem;">
                    <p><strong>Supported formats:</strong></p>
                    <p>📷 Images: .jpg, .jpeg, .png, .webp, .gif, .svg</p>
                    <p>🎥 Videos: .mp4, .webm, .mov</p>
                </div>
                ${this.loadedCount > 0 ? 
                    `<p style="color: #28a745; font-size: 1.2rem; margin-bottom: 1rem;">✅ Found ${this.loadedCount} files!</p>` : 
                    '<p style="color: #8B4513; font-size: 1.1rem; margin-bottom: 1rem;">No media files found yet</p>'
                }
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #8B4513;
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 25px;
                    font-family: 'Dancing Script', cursive;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='#A0522D'" onmouseout="this.style.background='#8B4513'">
                    Got it! 💕
                </button>
            </div>
        `;
        container.appendChild(message);
    }
}

// Utility Functions
const utils = {
    // Format date for display
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },

    // Generate random romantic messages
    getRandomMessage() {
        const messages = [
            "You light up my world! ✨",
            "Every moment with you is precious 💝",
            "You're my favorite person ever! 😍",
            "Thank you for being amazing! 🌟",
            "My heart belongs to you ❤️",
            "You make life beautiful! 🌹",
            "Forever grateful for you 🙏",
            "You're my sunshine! ☀️"
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    },

    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.birthdayApp = new BirthdayCardApp();
    window.mediaLoader = new MediaLoader();
    
    // Add some welcome effects
    setTimeout(() => {
        if (window.heartsController) {
            window.heartsController.celebrate();
        }
    }, 1000);
    
    console.log('🎂 Happy Birthday Card is ready! 💕');
});

// Service Worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
