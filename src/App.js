import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import LoveNotes from './components/LoveNotes';
import FloatingMedia from './components/FloatingMedia';
import Carousel from './components/Carousel';
import CountdownTimer from './components/features/CountdownTimer';

const LazyLoadedImage = React.lazy(() => import('./components/LazyLoadedImage'));
const LazyLoadedVideo = React.lazy(() => import('./components/LazyLoadedVideo'));

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div className="main-content birthday-celebration">
          <h2 className="celebration-title">My Beautiful Love - Le Gia Linh</h2>
          <p className="celebration-message">
            Another year of your amazing life, another year of our beautiful journey together.<br />
            Every moment with you feels like a precious memory worth treasuring forever.
          </p>
          <p className="celebration-date">8th October 2025</p>
          <CountdownTimer />
        </div>
      </header>
      <main>
        <FloatingMedia />
        <section id="loveNotes">
          <LoveNotes />
        </section>
        <section id="carouselMemories">
          <h2>Memories of Journey</h2>
          <Carousel mediaItems={[
            { src: '/assets/videos/1.mp4', type: 'video' },
            { src: '/assets/images/1.png', type: 'image', alt: 'Memory 1' },
          ]} />
        </section>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyLoadedImage />
          <LazyLoadedVideo />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
