import React from 'react';

function Modal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {content.type === 'image' ? (
          <img src={content.src} alt={content.alt} />
        ) : (
          <video src={content.src} controls />
        )}
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
