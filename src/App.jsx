import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import SongIndex from './components/SongIndex';
import SongDetail from './components/SongDetail';
import Footer from './components/Footer/Footer';

function App() {
  const [view, setView] = useState('splash'); // 'splash' | 'index' | 'detail'
  const [selectedSong, setSelectedSong] = useState(null);

  const handleSplashFinish = () => {
    setView('index');
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setView('detail');
  };

  const handleBack = () => {
    setSelectedSong(null);
    setView('index');
  };

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
