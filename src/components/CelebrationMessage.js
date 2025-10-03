import React from 'react';
import CountdownTimer from './features/CountdownTimer';
import './CelebrationMessage.css';

function CelebrationMessage() {
  return (
    <div className="celebration-message-container">
      <div className="celebration-header">
        <h1 className="celebration-title">Happy Birthday, My Beautiful Love - Le Gia Linh</h1>
        <p className="celebration-subtitle">Celebrating the most wonderful person in my life</p>
      </div>
      <div className="celebration-content">
        <p className="celebration-message">
          Another year of your amazing life, another year of our beautiful journey together.<br />
          Every moment with you feels like a precious memory worth treasuring forever.
        </p>
        <p className="celebration-wish">
          May your day be filled with endless joy, laughter, and love. You are my sunshine, my everything.
          Here's to more adventures, more laughter, and a lifetime of happiness together.
        </p>
        <p className="celebration-date">8th October 2025</p>
      </div>
      <div className="countdown-timer-wrapper">
        <CountdownTimer />
      </div>
      <div className="celebration-footer">
        <p className="footer-note">Forever yours, with all my love ❤️</p>
      </div>
    </div>
  );
}

export default CelebrationMessage;
