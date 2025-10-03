import React, { useState } from 'react';
import './FloatingMedia.css'; // Import the CSS file for FloatingMedia
import Modal from '../layout/Modal';

function FloatingMedia() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
  };

  const mediaItems = [
    { src: '/assets/images/1.png', alt: 'Memory 1' },
    { src: '/assets/images/2.png', alt: 'Memory 2' },
    { src: '/assets/images/3.png', alt: 'Memory 3' },
    { src: '/assets/images/4.png', alt: 'Memory 4' },
    { src: '/assets/images/5.png', alt: 'Memory 5' },
    { src: '/assets/images/6.png', alt: 'Memory 6' },
    { src: '/assets/images/7.png', alt: 'Memory 7' },
    { src: '/assets/images/8.png', alt: 'Memory 8' },
    { src: '/assets/images/9.png', alt: 'Memory 9' },
    { src: '/assets/images/10.png', alt: 'Memory 10' },
    { src: '/assets/images/11.png', alt: 'Memory 11' },
    { src: '/assets/images/12.png', alt: 'Memory 12' },
    { src: '/assets/images/13.png', alt: 'Memory 13' },
    { src: '/assets/images/14.png', alt: 'Memory 14' },
  ];

  return (
    <div className="floating-media-container vintage-paper-effect">
      {mediaItems.map((item, index) => (
        <div
          className="floating-item polaroid-effect"
          key={index}
          data-caption={item.alt}
          onClick={() => handleImageClick(index)}
        >
          <div className="vintage-frame vintage-border-ornate">
            <img
              src={item.src}
              alt={item.alt}
              className="floating-photo sepia-filter"
              loading="lazy"
              aria-label={`Floating media item ${index + 1}`}
            />
          </div>
        </div>
      ))}
      {selectedImageIndex !== null && (
        <Modal
          imageSrc={mediaItems[selectedImageIndex].src}
          imageAlt={mediaItems[selectedImageIndex].alt}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
          currentIndex={selectedImageIndex}
          totalImages={mediaItems.length}
        />
      )}
    </div>
  );
}

export default FloatingMedia;
