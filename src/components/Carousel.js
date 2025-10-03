import React, { useState } from 'react';
import './Carousel.css';

function Carousel({ mediaItems }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
  };

  return (
    <div className="carousel-container">
      <button className="carousel-arrow left-arrow" onClick={prevSlide}>
        &lt;
      </button>
      <div className="carousel-slide">
        {mediaItems.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            {item.type === 'image' ? (
              <img src={item.src} alt={item.alt} />
            ) : (
              <video src={item.src} controls />
            )}
          </div>
        ))}
      </div>
      <button className="carousel-arrow right-arrow" onClick={nextSlide}>
        &gt;
      </button>
      <div className="carousel-indicators">
        {mediaItems.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
