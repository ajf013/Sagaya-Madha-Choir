import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import SongIndex from './components/SongIndex';
import SongDetail from './components/SongDetail';
import Footer from './components/Footer/Footer';

function App() {
  const [view, setView] = useState('splash'); // 'splash' | 'index' | 'detail'
  const [selectedSong, setSelectedSong] = useState(null);

  const handleSplashFinish = () => {
    setView('index');
    window.history.pushState({ view: 'index' }, '', '/');
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setView('detail');
    window.history.pushState({ view: 'detail', songId: song.id }, '', `#song-${song.id}`);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedSong(null);
    setView('index');
  };

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        if (event.state.view === 'index') {
          handleBack();
        }
      } else {
        // If no state, go back to index
        handleBack();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      {view === 'splash' && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}

      {view === 'index' && (
        <>
          <SongIndex onSongSelect={handleSongSelect} />
          <Footer />
        </>
      )}

      {view === 'detail' && selectedSong && (
        <>
          <SongDetail song={selectedSong} onBack={handleBack} />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
