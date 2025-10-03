import React, { useState } from 'react';

function Carousel({ mediaItems }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel-container smooth">
      <button className="carousel-button prev smooth" onClick={goToPrevious}>
        &#8249;
      </button>
      <div className="carousel-item smooth" style={{ transition: 'transform 0.5s ease-in-out' }}>
        {mediaItems[currentIndex].type === 'image' ? (
          <img src={mediaItems[currentIndex].src} alt={mediaItems[currentIndex].alt} />
        ) : (
          <video src={mediaItems[currentIndex].src} controls />
        )}
      </div>
      <button className="carousel-button next smooth" onClick={goToNext}>
        &#8250;
      </button>
    </div>
  );
}

export default Carousel;
