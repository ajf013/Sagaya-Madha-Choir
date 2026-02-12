import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music2, Repeat } from 'lucide-react';

const AudioPlayer = ({ audioUrl, fileName }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loopStart, setLoopStart] = useState(null);
    const [loopEnd, setLoopEnd] = useState(null);
    const [isLooping, setIsLooping] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);

            // Check if we need to loop
            if (isLooping && loopStart !== null && loopEnd !== null) {
                if (audio.currentTime >= loopEnd) {
                    audio.currentTime = loopStart;
                }
            }
        };

        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audioUrl, isLooping, loopStart, loopEnd]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const skipForward = () => {
        const audio = audioRef.current;
        audio.currentTime = Math.min(audio.currentTime + 10, duration);
    };

    const skipBackward = () => {
        const audio = audioRef.current;
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        const bounds = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - bounds.left) / bounds.width;
        audio.currentTime = percent * duration;
    };

    const setLoopPointA = () => {
        setLoopStart(currentTime);
        if (loopEnd === null || currentTime >= loopEnd) {
            setLoopEnd(null);
        }
    };

    const setLoopPointB = () => {
        if (loopStart !== null && currentTime > loopStart) {
            setLoopEnd(currentTime);
            setIsLooping(true);
        } else {
            alert('Please set Loop Start (A) first, and ensure B is after A');
        }
    };

    const clearLoop = () => {
        setLoopStart(null);
        setLoopEnd(null);
        setIsLooping(false);
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!audioUrl) return null;

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            marginBottom: '1.5rem'
        }}>
            <audio ref={audioRef} src={audioUrl} preload="metadata" />

            {/* Music Icon & Title */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Music2 size={20} color="white" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#1e293b',
                        fontFamily: 'Outfit, Inter, sans-serif',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {fileName || 'Audio Track'}
                    </p>
                    <p style={{
                        fontSize: '0.75rem',
                        color: '#64748b',
                        fontFamily: 'Outfit, Inter, sans-serif'
                    }}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            <div
                onClick={handleSeek}
                style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Loop region highlight */}
                {loopStart !== null && loopEnd !== null && (
                    <div style={{
                        position: 'absolute',
                        left: `${(loopStart / duration) * 100}%`,
                        width: `${((loopEnd - loopStart) / duration) * 100}%`,
                        height: '100%',
                        background: 'rgba(34, 197, 94, 0.3)',
                        zIndex: 1
                    }} />
                )}
                {/* Progress */}
                <div style={{
                    width: `${(currentTime / duration) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '4px',
                    transition: 'width 0.1s linear',
                    position: 'relative',
                    zIndex: 2
                }} />
            </div>

            {/* Playback Controls */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '1rem'
            }}>
                {/* Backward 10s */}
                <button
                    onClick={skipBackward}
                    style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.5)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)'}
                    title="Rewind 10 seconds"
                >
                    <SkipBack size={20} color="#1e293b" />
                </button>

                {/* Play/Pause */}
                <button
                    onClick={togglePlayPause}
                    style={{
                        padding: '1rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {isPlaying ? (
                        <Pause size={24} color="white" fill="white" />
                    ) : (
                        <Play size={24} color="white" fill="white" />
                    )}
                </button>

                {/* Forward 10s */}
                <button
                    onClick={skipForward}
                    style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.5)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)'}
                    title="Forward 10 seconds"
                >
                    <SkipForward size={20} color="#1e293b" />
                </button>
            </div>

            {/* A-B Loop Controls */}
            <div style={{
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                paddingTop: '1rem'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem'
                }}>
                    <Repeat size={16} color="#64748b" />
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#64748b',
                        fontFamily: 'Outfit, Inter, sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Loop Section {isLooping && '(Active)'}
                    </span>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem'
                }}>
                    <button
                        onClick={setLoopPointA}
                        style={{
                            padding: '0.5rem',
                            background: loopStart !== null ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'rgba(255, 255, 255, 0.5)',
                            color: loopStart !== null ? 'white' : '#1e293b',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        title={`Set loop start at ${formatTime(currentTime)}`}
                    >
                        {loopStart !== null ? `A: ${formatTime(loopStart)}` : 'Set A'}
                    </button>
                    <button
                        onClick={setLoopPointB}
                        style={{
                            padding: '0.5rem',
                            background: loopEnd !== null ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'rgba(255, 255, 255, 0.5)',
                            color: loopEnd !== null ? 'white' : '#1e293b',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        title={`Set loop end at ${formatTime(currentTime)}`}
                    >
                        {loopEnd !== null ? `B: ${formatTime(loopEnd)}` : 'Set B'}
                    </button>
                    <button
                        onClick={clearLoop}
                        disabled={loopStart === null && loopEnd === null}
                        style={{
                            padding: '0.5rem',
                            background: 'rgba(239, 68, 68, 0.2)',
                            color: '#dc2626',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            cursor: loopStart === null && loopEnd === null ? 'not-allowed' : 'pointer',
                            opacity: loopStart === null && loopEnd === null ? 0.5 : 1,
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => loopStart !== null && (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseOut={(e) => loopStart !== null && (e.currentTarget.style.transform = 'scale(1)')}
                        title="Clear loop points"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
