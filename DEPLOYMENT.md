# 🚀 Deployment Guide

## Quick Setup (5 minutes!)

### 1. Add Your Photos & Videos ✨ **SUPER EASY NOW!**
- Place your photos in `assets/images/` with **ANY FILENAME** you want!
- Place your videos in `assets/videos/` with **ANY FILENAME** you want!  
- The system automatically detects and loads ALL your media files
- Supported formats:
  - **Images**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
  - **Videos**: `.mp4`, `.webm`, `.mov`

**Examples of filenames that work:**
- `our-first-date.jpg` ✅
- `vacation_beach.png` ✅  
- `IMG_001.jpeg` ✅
- `anniversary-dinner.mp4` ✅
- `proposal-moment.webm` ✅

### 2. Personalize the Message
Edit `index.html` and change these lines:
```html
<h1 class="main-title">Happy Birthday</h1>
<h2 class="subtitle">My Beautiful Love</h2>
<p class="romantic-message">
    Replace this with your personal birthday message!
</p>
```

### 3. Update Love Notes
Find these sections in `index.html` and add your messages:
```html
<div class="love-note" data-message="Your sweet message here! 💕">
```

### 4. Deploy to GitHub Pages

#### Option A: GitHub Web Interface
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch" → main branch
5. Your site will be live at `https://yourusername.github.io/repository-name`

#### Option B: Command Line (if you have git installed)
```bash
# Initialize git repository
git init
git add .
git commit -m "🎂 Initial birthday card commit"

# Add your GitHub repository
git remote add origin https://github.com/yourusername/birthday-card.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
```

## 🌟 Alternative Free Hosting Options

### Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `sn-2d` folder
3. Get instant live URL!

### Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import from GitHub or upload files
3. Automatic deployment!

### GitHub Codespaces (For Editing)
1. Press `.` while in your GitHub repository
2. Edit files directly in browser
3. Changes auto-deploy!

## 📱 Sharing Your Card

Once deployed, share the URL with:
- Direct link
- QR code (generate from URL)
- Social media post
- Text message

## 🛠️ Troubleshooting

### Images not showing?
- Make sure images are in `assets/images/` folder
- Supported formats: JPG, PNG, WebP, JPEG, GIF
- **Any filename works now** - no specific naming required!
- Check browser console (F12) for any error messages

### Videos not playing?
- Use MP4, WebM, or MOV format
- Keep file sizes under 50MB for web performance
- Place in `assets/videos/` folder
- **Any filename works now** - no specific naming required!

### Site not loading?
- Wait a few minutes after enabling GitHub Pages
- Check repository is public
- Verify `index.html` is in root folder

## 💝 Pro Tips

1. **Any filename works**: `our-memories.jpg`, `IMG_001.png`, `vacation.mp4` - all work perfectly!
2. **Optimize images**: Resize to 800x600px for faster loading
3. **Short videos**: 10-30 second clips work best
4. **Mobile test**: Always test on phone before sharing
5. **Custom domain**: You can add your own domain in GitHub Pages settings
6. **Updates**: Just upload new files to update the live site
7. **Unlimited photos**: Add as many as you want - the system handles them all!

## 🎊 Make it Extra Special

- Add more floating items by copying the HTML pattern
- Change colors in `css/vintage-theme.css`
- Add background music (royalty-free)
- Include special date milestones
- Add anniversary photos chronologically

---

**Your girlfriend will absolutely love this! 💕🎂✨**
