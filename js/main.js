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
        this.setupFadeInEffect();
        this.initializeMediaLoader();
        this.setupScrollToTopButton();
        
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

        // Set initial volume
        backgroundMusic.volume = 0.3;

        // Try autoplay when page loads
        this.attemptAutoplay(backgroundMusic, musicToggle);

        // Add loading state indicator
        backgroundMusic.addEventListener('loadstart', () => {
            musicToggle.textContent = '⏳';
            musicToggle.title = 'Loading music...';
        });

        backgroundMusic.addEventListener('canplaythrough', () => {
            musicToggle.textContent = '🎵';
            musicToggle.title = 'Click to play background music';
        });

        backgroundMusic.addEventListener('error', (e) => {
            console.log('Audio loading error:', e);
            musicToggle.textContent = '🎵';
            musicToggle.style.opacity = '0.5';
            musicToggle.title = 'Music not available';
        });

        musicToggle.addEventListener('click', () => {
            if (this.isPlaying) {
                backgroundMusic.pause();
                musicToggle.textContent = '🎵';
                musicToggle.style.opacity = '0.7';
                musicToggle.title = 'Click to play music';
                this.isPlaying = false;
            } else {
                // Try to play with better error handling
                const playPromise = backgroundMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        musicToggle.textContent = '🎶';
                        musicToggle.style.opacity = '1';
                        musicToggle.title = 'Click to pause music';
                        this.isPlaying = true;
                    }).catch(error => {
                        console.log('Music autoplay prevented:', error);
                        // Show user-friendly message
                        this.showMusicMessage('Click the music button to enable background music! 🎵');
                        musicToggle.textContent = '�';
                        musicToggle.style.opacity = '0.7';
                        this.isPlaying = false;
                    });
                }
            }
        });

        // Handle music end
        backgroundMusic.addEventListener('ended', () => {
            musicToggle.textContent = '🎵';
            musicToggle.style.opacity = '0.7';
            musicToggle.title = 'Click to play music';
            this.isPlaying = false;
        });

        // Handle successful play
        backgroundMusic.addEventListener('play', () => {
            this.isPlaying = true;
            musicToggle.textContent = '🎶';
            musicToggle.style.opacity = '1';
            musicToggle.title = 'Click to pause music';
        });

        // Handle pause/stop
        backgroundMusic.addEventListener('pause', () => {
            this.isPlaying = false;
            musicToggle.textContent = '🎵';
            musicToggle.style.opacity = '0.7';
            musicToggle.title = 'Click to play music';
        });

        // Preload audio
        backgroundMusic.load();

        // Attempt to autoplay
        this.attemptAutoplay(backgroundMusic, musicToggle);
    }

    attemptAutoplay(audio, musicButton) {
        // Try to autoplay the music when page loads
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay successful
                console.log('🎵 Background music started automatically!');
                this.isPlaying = true;
                musicButton.textContent = '🎶';
                musicButton.style.opacity = '1';
                musicButton.title = 'Click to pause music';
            }).catch(error => {
                // Autoplay blocked - this is normal in most browsers
                console.log('Autoplay blocked by browser (normal behavior)');
                this.isPlaying = false;
                musicButton.textContent = '🎵';
                musicButton.style.opacity = '0.7';
                musicButton.title = 'Click to play background music';
                
                // Show a subtle message after page loads
                setTimeout(() => {
                    this.showMusicMessage('🎵 Click the music button to add romantic background music!');
                }, 3000);
            });
        }
    }

    setupFadeInEffect() {
        const message = document.querySelector('.romantic-message');
        if (message) {
            message.style.opacity = 0;
            message.style.transition = 'opacity 2s ease-in-out';
            setTimeout(() => {
                message.style.opacity = 1;
            }, 2000); // Start fade-in after a delay
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

    refreshMediaItems() {
        this.mediaItems = Array.from(document.querySelectorAll('.floating-item'));
        console.log('Media items refreshed:', this.mediaItems.length);
    }

    handleMediaClick(mediaItem) {
        // Ensure we have the latest media items
        this.refreshMediaItems();
        
        const mediaSrc = mediaItem.getAttribute('data-media');
        const mediaType = mediaItem.getAttribute('data-type');
        
        if (!mediaSrc) return;

        // Find the index of clicked item by data-media attribute
        this.currentMediaIndex = this.mediaItems.findIndex(item => 
            item.getAttribute('data-media') === mediaSrc
        );
        
        console.log('Current media index:', this.currentMediaIndex, 'Total items:', this.mediaItems.length);
        
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

    showMusicMessage(message) {
        // Create floating message for music feedback
        const musicMessage = document.createElement('div');
        musicMessage.className = 'floating-music-message';
        musicMessage.textContent = message;
        musicMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(145deg, #f4f1e8, #e8dcc0);
            border: 2px solid #8B4513;
            border-radius: 10px;
            padding: 1rem 1.5rem;
            font-family: 'Dancing Script', cursive;
            font-size: 1.2rem;
            color: #8B4513;
            box-shadow: 0 10px 25px rgba(139, 69, 19, 0.3);
            z-index: 1500;
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
        `;

        document.body.appendChild(musicMessage);

        // Remove after 4 seconds
        setTimeout(() => {
            musicMessage.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (musicMessage.parentNode) {
                    musicMessage.parentNode.removeChild(musicMessage);
                }
            }, 300);
        }, 4000);
    }

    setupScrollToTopButton() {
        const scrollToTopButton = document.createElement('button');
        scrollToTopButton.classList.add('scroll-to-top');
        scrollToTopButton.innerHTML = '⬆';
        document.body.appendChild(scrollToTopButton);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add('show');
            } else {
                scrollToTopButton.classList.remove('show');
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    setupLightboxEffect() {
        const mediaItems = document.querySelectorAll('.floating-photo');
        mediaItems.forEach(item => {
            item.addEventListener('click', () => {
                const lightbox = document.createElement('div');
                lightbox.classList.add('lightbox');
                lightbox.innerHTML = `<img src="${item.src}" alt="${item.alt}" class="lightbox-image">`;
                document.body.appendChild(lightbox);

                lightbox.addEventListener('click', () => {
                    document.body.removeChild(lightbox);
                });
            });
        });
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
        
        // First, collect any existing floating items from HTML
        this.collectExistingItems();
        
        // Add some demo floating elements to show how it works
        this.createDemoElements();
        
        // Load the 14 specific images via JavaScript (as backup)
        console.log('📸 Loading numbered images 1.png to 14.png...');
        
        for (let i = 1; i <= 14; i++) {
            const imageName = `${i}.png`;
            const success = await this.tryLoadImage(imageName);
            if (success) {
                console.log(`✅ Loaded ${imageName}`);
            } else {
                console.log(`❌ Failed to load ${imageName}`);
            }
        }
        
        console.log(`📸 Total media items: ${this.mediaItems.length}`);
        
        // Setup floating animation for all items
        this.setupFloatingAnimation();
        
        // Show instructions after a delay
        setTimeout(() => {
            this.showMediaInstructions();
        }, 2000);
    }

    collectExistingItems() {
        // Collect pre-existing floating items from HTML
        const existingItems = document.querySelectorAll('.floating-item');
        existingItems.forEach(item => {
            this.mediaItems.push(item);
            this.setupItemEventHandlers(item);
            this.setRandomPosition(item);
        });
        
        console.log(`🔍 Found ${existingItems.length} pre-existing media items`);
    }

    setupItemEventHandlers(item) {
        // Add click handler
        item.addEventListener('click', () => {
            window.birthdayApp.handleMediaClick(item);
        });
    }

    setupFloatingAnimation() {
        // Initialize floating animation for all items
        if (window.floatingController) {
            window.floatingController.collectMediaItems();
            window.floatingController.setupRandomPositions();
        }
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
                    <text x="100" y="90" font-family="serif" font-size="14" text-anchor="middle" fill="#8B4513">♥</text>
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
            const fullPath = `assets/images/${imageName}`;
            
            // Increase timeout to 3 seconds for better loading
            const timeout = setTimeout(() => {
                console.log(`⏰ Timeout loading ${fullPath}`);
                resolve(false);
            }, 3000);
            
            img.onload = () => {
                clearTimeout(timeout);
                console.log(`✅ Successfully loaded ${fullPath}`);
                this.createImageElement(fullPath);
                this.loadedCount++;
                resolve(true);
            };
            
            img.onerror = (error) => {
                clearTimeout(timeout);
                console.log(`❌ Error loading ${fullPath}:`, error);
                resolve(false);
            };
            
            console.log(`🔄 Attempting to load ${fullPath}`);
            img.src = fullPath;
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
        // Check if this image already exists in HTML
        const existingItem = document.querySelector(`[data-media="${imagePath}"]`);
        if (existingItem) {
            console.log(`⚠️ Image ${imagePath} already exists in HTML, skipping duplicate`);
            return;
        }
        
        const container = document.getElementById('mediaContainer');
        const item = document.createElement('div');
        item.className = 'floating-item photo-item js-loaded';
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
        this.setupItemEventHandlers(item);
        
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
