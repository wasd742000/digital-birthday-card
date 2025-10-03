import React, { useState } from 'react';

function LoveNotes() {
  const [notes] = useState([
    'You are my sunshine on a cloudy day.',
    'Every moment with you is a treasure.',
    'You make my heart skip a beat.',
    'Forever grateful for your love.',
    'You are my everything.',
  ]);

  const [visibleNoteIndex, setVisibleNoteIndex] = useState(null);

  const toggleNoteVisibility = (index) => {
    setVisibleNoteIndex(visibleNoteIndex === index ? null : index);
  };

  return (
    <div className="love-notes-container">
      <h2>Hidden Love Notes</h2>
      <ul className="love-notes-list">
        {notes.map((note, index) => (
          <li key={index} className="love-note-item">
            <button onClick={() => toggleNoteVisibility(index)}>
              {visibleNoteIndex === index ? 'Hide Note' : 'Show Note'}
            </button>
            {visibleNoteIndex === index && <p className="love-note-text">{note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoveNotes;
