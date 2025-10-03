import React, { useEffect, useState } from 'react';
import './Modal.css';

function Modal({ imageSrc, imageAlt, onClose, onNext, onPrev, currentIndex, totalImages }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [imageSrc]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (onPrev) onPrev();
          break;
        case 'ArrowRight':
          if (onNext) onNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Restore scrolling
    };
  }, [onClose, onNext, onPrev]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {!imageLoaded && (
          <div className="modal-loading">
            <div className="loading-spinner"></div>
          </div>
        )}
        <img 
          src={imageSrc} 
          alt={imageAlt || "Full-size view"} 
          className={`modal-image ${imageLoaded ? 'loaded' : 'loading'}`}
          onLoad={handleImageLoad}
        />
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        
        {totalImages > 1 && (
          <>
            <button 
              className="modal-prev" 
              onClick={onPrev}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              className="modal-next" 
              onClick={onNext}
              aria-label="Next image"
            >
              ›
            </button>
            <div className="modal-counter">
              {currentIndex + 1} of {totalImages}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
