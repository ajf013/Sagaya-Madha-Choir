import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
import { Play, Pause, SkipBack, SkipForward, Music2, Loader2, AlertCircle, Repeat } from 'lucide-react';

const AudioPlayer = ({ audioUrl, fileName }) => {
    const containerRef = useRef(null);
    const wavesurferRef = useRef(null);
    const audioRef = useRef(null);
    const regionsPluginRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [waveformError, setWaveformError] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLooping, setIsLooping] = useState(false);

    useEffect(() => {
        if (!audioUrl || !containerRef.current) return;

        setIsLoading(true);
        setError(null);
        setWaveformError(null);
        setCurrentTime(0);
        setDuration(0);
        setIsPlaying(false);
        setIsLooping(false);

        const audio = new Audio();
        audio.controls = false;
        audio.src = audioUrl;
        audio.crossOrigin = "anonymous";
        audioRef.current = audio;

        let ws;
        try {
            ws = WaveSurfer.create({
                container: containerRef.current,
                waveColor: 'rgba(99, 102, 241, 0.4)',
                progressColor: '#6366f1',
                cursorColor: '#4f46e5',
                barWidth: 2,
                barGap: 3,
                barRadius: 3,
                height: 80,
                responsive: true,
                normalize: true,
                media: audio,
            });
        } catch (e) {
            console.error("WaveSurfer Init Error:", e);
            setWaveformError("Waveform initialization failed.");
            setIsLoading(false);
            return;
        }

        const wsRegions = ws.registerPlugin(RegionsPlugin.create());
        regionsPluginRef.current = wsRegions;

        wsRegions.enableDragSelection({
            color: 'rgba(34, 197, 94, 0.2)',
            drag: true,
            resize: true,
        });

        ws.on('ready', () => {
            setIsLoading(false);
            setDuration(ws.getDuration());
        });

        ws.on('interaction', () => {
            ws.play();
        });

        ws.on('audioprocess', () => {
            setCurrentTime(ws.getCurrentTime());
        });

        ws.on('finish', () => {
            setIsPlaying(false);
        });

        audio.onerror = (e) => {
            console.error("Audio Element Error:", e);
            if (audio.crossOrigin === "anonymous") {
                console.log("Retrying audio without CORS...");
                audio.crossOrigin = null;
                audio.src = audioUrl;
                setWaveformError("Visuals unavailable (CORS restricted). Audio should still play.");
                return;
            }
            console.error("Audio failed to load completely.");
            setWaveformError("Audio might not be loadable.");
            setIsLoading(false);
        };

        ws.on('error', (err) => {
            console.error("WaveSurfer Error:", err);
            setWaveformError("Waveform could not be generated.");
            setIsLoading(false);
        });

        // Loop Logic
        wsRegions.on('region-created', (region) => {
            // Remove other regions to allow only one loop at a time
            const regions = wsRegions.getRegions();
            regions.forEach(r => {
                if (r.id !== region.id) r.remove();
            });
            setIsLooping(true);

            // Jump to start of region and play
            // Note: region.play() plays from start of region and should loop if configured
            // but region.play() in this version loops the region once then continues? 
            // The default behavior of Regions plugin loop is usually auto.
            // Let's force it to play from start.
            region.play();
        });

        wsRegions.on('region-updated', (region) => {
            // When resizing/moving ends, we can also jump?
            // Actually 'region-updated' fires continuously. 'region-update-end' is better.
        });

        wsRegions.on('region-update-end', (region) => {
            region.play();
        });

        wsRegions.on('region-out', (region) => {
            // Loop functionality force
            region.play();
        });

        wsRegions.on('region-clicked', (region, e) => {
            e.stopPropagation();
            region.play();
        });

        ws.on('play', () => setIsPlaying(true));
        ws.on('pause', () => setIsPlaying(false));

        wavesurferRef.current = ws;

        return () => {
            if (ws) ws.destroy();
            if (audio) {
                audio.pause();
                audio.src = '';
            }
        };
    }, [audioUrl]);

    const togglePlayPause = () => {
        if (wavesurferRef.current) {
            try {
                wavesurferRef.current.playPause();
            } catch (e) {
                console.error("Play error:", e);
                if (audioRef.current) {
                    if (audioRef.current.paused) audioRef.current.play();
                    else audioRef.current.pause();
                }
            }
        }
    };

    const skipForward = () => {
        wavesurferRef.current?.skipForward(10);
    };

    const skipBackward = () => {
        wavesurferRef.current?.skipBackward(10);
    };

    const clearLoop = () => {
        if (regionsPluginRef.current) {
            regionsPluginRef.current.clearRegions();
            setIsLooping(false);
        }
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!audioUrl) return null;

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
            {/* Title & Info */}
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
                    background: (error || waveformError) ? '#f59e0b' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                    {(error || waveformError) ? <AlertCircle size={20} color="white" /> : <Music2 size={20} color="white" />}
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
                        fontFamily: 'Outfit, Inter, sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                        {isLooping && (
                            <span style={{
                                color: '#16a34a',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: '#dcfce7',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '0.7rem'
                            }}>
                                • Looping
                            </span>
                        )}
                    </p>
                </div>
            </div>

            {/* Error Message */}
            {(error || waveformError) && (
                <div style={{
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    background: '#fffbeb',
                    border: '1px solid #fcd34d',
                    borderRadius: '8px',
                    color: '#92400e',
                    fontSize: '0.875rem'
                }}>
                    {error || waveformError}
                </div>
            )}

            {/* Waveform Container */}
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                {isLoading && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.5)',
                        zIndex: 10
                    }}>
                        <Loader2 className="animate-spin" size={24} color="#6366f1" />
                    </div>
                )}
                <div ref={containerRef} />
                {!isLoading && !error && !waveformError && !isLooping && (
                    <p style={{
                        fontSize: '0.75rem',
                        color: '#94a3b8',
                        textAlign: 'center',
                        marginTop: '0.5rem',
                        fontStyle: 'italic'
                    }}>
                        Drag on the waveform to create a loop
                    </p>
                )}
            </div>

            {/* Controls */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
            }}>
                {/* Clear Loop Button (only visible when looping) */}
                {isLooping && (
                    <button
                        onClick={clearLoop}
                        title="Clear Loop"
                        style={{
                            padding: '0.75rem',
                            borderRadius: '8px',
                            background: '#fee2e2',
                            border: '1px solid #fca5a5',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            color: '#ef4444'
                        }}
                    >
                        <Repeat size={20} />
                    </button>
                )}

                <button
                    onClick={skipBackward}
                    style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                    }}
                >
                    <SkipBack size={20} color="#1e293b" />
                </button>

                <button
                    onClick={togglePlayPause}
                    style={{
                        padding: '1rem',
                        borderRadius: '50%',
                        background: (error || waveformError) ? '#f59e0b' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                    {isPlaying ? (
                        <Pause size={24} color="white" fill="white" />
                    ) : (
                        <Play size={24} color="white" fill="white" />
                    )}
                </button>

                <button
                    onClick={skipForward}
                    style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                    }}
                >
                    <SkipForward size={20} color="#1e293b" />
                </button>
            </div>
        </div>
    );
};

export default AudioPlayer;
