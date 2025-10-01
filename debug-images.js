// Quick test to check image loading
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 Testing image paths...');
    
    // Test loading each image directly
    for (let i = 1; i <= 14; i++) {
        const img = new Image();
        const path = `assets/images/${i}.png`;
        
        img.onload = () => {
            console.log(`✅ SUCCESS: ${path} loaded`);
        };
        
        img.onerror = (error) => {
            console.log(`❌ FAILED: ${path} could not load`, error);
        };
        
        img.src = path;
    }
    
    // Check if images exist in the DOM
    setTimeout(() => {
        const floatingItems = document.querySelectorAll('.floating-item');
        console.log(`🎨 Found ${floatingItems.length} floating items in DOM`);
        
        floatingItems.forEach((item, index) => {
            const src = item.getAttribute('data-media');
            console.log(`${index + 1}. Item: ${src}`);
        });
    }, 1000);
});
