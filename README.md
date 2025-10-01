# 🎂💕 Digital Birthday Card for My Love

A beautiful, interactive retro/vintage-styled birthday card website featuring floating photos and videos.

## ✨ Features

- **Retro/Vintage Design**: Warm sepia tones, vintage fonts, and paper textures
- **Floating Media**: Photos and videos that gently float around the screen
- **Interactive Elements**: Click to enlarge and view media in beautiful modals
- **Love Notes**: Hidden clickable hearts with personal messages
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: CSS animations for floating effects and transitions
- **Background Music**: Optional romantic background music

## 🚀 Setup Instructions

1. **Add Your Media** ✨ **SUPER EASY!**:
   - Place your photos in `assets/images/` with **ANY FILENAME**
   - Place your videos in `assets/videos/` with **ANY FILENAME**
   - The system automatically detects ALL your files!
   - Supported: JPG, PNG, WebP, MP4, WebM, MOV
   - Add background music in `assets/audio/romantic-background.mp3` (optional)

2. **Customize the Message**:
   - Edit the title and romantic message in `index.html`
   - Update the love notes with your personal messages
   - Change the date stamp to the actual birthday date

3. **Deploy to GitHub Pages**:
   - Push this repository to GitHub
   - Go to repository Settings → Pages
   - Select "Deploy from a branch" → main branch
   - Your site will be available at `https://yourusername.github.io/repository-name`

## 📁 File Structure

```
sn-2d/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main styles
│   └── vintage-theme.css  # Retro/vintage specific styles
├── js/
│   ├── main.js           # Core functionality
│   └── floating-media.js # Floating animations
├── assets/
│   ├── images/           # Your photos go here
│   ├── videos/           # Your videos go here
│   └── audio/            # Background music (optional)
└── README.md             # This file
```

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `css/vintage-theme.css`:
```css
:root {
    --vintage-brown: #8B4513;
    --vintage-tan: #D2B48C;
    --vintage-cream: #F5F5DC;
    --vintage-gold: #DAA520;
}
```

### Adding More Photos/Videos
1. Simply add files to the appropriate `assets/` folder
2. **Any filename works** - the system automatically detects them!
3. Refresh the page to see new media floating around
4. No code changes needed!

### Personalizing Messages
- Update the main title and subtitle
- Change the romantic message
- Modify the love notes data-message attributes
- Add your own personal touches!

## 💝 Love Notes

The floating hearts contain hidden messages that appear when clicked. Update these in the HTML:
```html
<div class="love-note" data-message="Your custom message here! 💕">
    <span class="note-heart">💝</span>
</div>
```

## 🎵 Background Music

To add background music:
1. Add your music file to `assets/audio/romantic-background.mp3`
2. The music toggle button will allow users to play/pause
3. Make sure to use royalty-free music for public deployment

## 📱 Mobile Responsiveness

The card is fully responsive and works beautifully on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen orientations

## 🌟 Browser Compatibility

Works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## 💕 Made with Love

This digital birthday card is designed to create a magical, romantic experience that your girlfriend will treasure forever. Every floating photo and video tells your story together!

---

**Happy Birthday to your amazing girlfriend! 🎂✨💕**
