import React from 'react';

function Navbar() {
  return (
    <nav className="navbar sticky transparent">
      <ul>
        <li><a href="#" aria-label="Home">Home</a></li>
        <li><a href="#loveNotes" aria-label="Notes for you">Notes for you</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
