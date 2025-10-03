import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import LoveNotes from './components/LoveNotes';
import FloatingMedia from './components/FloatingMedia';
import CountdownTimer from './components/features/CountdownTimer';
import CelebrationMessage from './components/CelebrationMessage';

const LazyLoadedImage = React.lazy(() => import('./components/LazyLoadedImage'));
const LazyLoadedVideo = React.lazy(() => import('./components/LazyLoadedVideo'));

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <CelebrationMessage />
        <FloatingMedia />
        <section id="loveNotes">
          <LoveNotes />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
