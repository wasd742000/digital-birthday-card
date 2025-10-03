import React, { useState } from 'react';
import './LoveNotes.css';

function LoveNotes() {
  const [notes] = useState([
    'You are my sunshine on a cloudy day.',
    'Every moment with you is a treasure.',
    'You make my heart skip a beat.',
    'Forever grateful for your love.',
    'You are my everything.',
  ]);

  return (
    <div className="love-notes-container">
      <h2>Notes for you</h2>
      <ul className="love-notes-list">
        {notes.map((note, index) => (
          <li key={index} className="love-note-item">
            <div className="hidden-love-note">
              <div className="hidden-love-note-inner">
                <div className="hidden-love-note-front">
                  <p>Check it out</p>
                </div>
                <div className="hidden-love-note-back">
                  <p>{note}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoveNotes;
