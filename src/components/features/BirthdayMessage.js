import React, { useState } from 'react';

function BirthdayMessage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = document.getElementById('backgroundAudio');
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="birthday-message animated smooth">
      <button className="fab" onClick={toggleAudio} aria-label="Toggle Music">
        {isPlaying ? '\u23f8\ufe0f' : '\u25b6\ufe0f'}
      </button>
      <audio id="backgroundAudio" src="/assets/audio/romantic-background.mp3" loop />
      <h2 className="subtitle highlighted">My Beautiful Love - Le Gia Linh</h2>
      <p className="romantic-message emphasized">
        Another year of your amazing life, another year of our beautiful journey together.<br />
        Every moment with you feels like a precious memory worth treasuring forever.
      </p>
      <div className="date-stamp highlighted">8th October 2025</div>
    </div>
  );
}

export default BirthdayMessage;
