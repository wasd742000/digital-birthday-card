import React from 'react';
import './Modal.css';

function Modal({ imageSrc, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Full-size view" className="modal-image" />
        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
