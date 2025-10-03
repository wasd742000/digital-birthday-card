import React from 'react';

function Navbar() {
  return (
    <nav className="navbar sticky smooth">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#mediaContainer">Memories</a></li>
        <li><a href="#carouselMemories" className="memories-journey">Memories of Journey</a></li>
        <li><a href="#loveNotes" className="hidden-love-note">Hidden Love Notes</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
