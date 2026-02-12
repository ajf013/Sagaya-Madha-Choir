import React, { useState, useEffect } from 'react';
import { ArrowLeft, Music, Calendar, Upload } from 'lucide-react';
import LyricsEditor from './LyricsEditor';

const SongDetail = ({ song, onBack }) => {
    const [showEditor, setShowEditor] = useState(false);
    const [displayLyrics, setDisplayLyrics] = useState(song.lyrics || '');

    useEffect(() => {
        // Load user-contributed lyrics from localStorage
        const savedLyrics = JSON.parse(localStorage.getItem('userLyrics') || '{}');
        if (savedLyrics[song.id]) {
            setDisplayLyrics(savedLyrics[song.id]);
        } else {
            setDisplayLyrics(song.lyrics || '');
        }
    }, [song.id, song.lyrics]);

    const handleSaveLyrics = (newLyrics) => {
        setDisplayLyrics(newLyrics);
    };

    return (
        <div style={{
            minHeight: '100vh',
            paddingBottom: '5rem'
        }}>
            {/* Header */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 40,
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        color: '#1e293b',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                >
                    <ArrowLeft size={24} />
                </button>
                <div style={{ flex: 1 }}>
                    <h2 style={{
                        fontSize: '1.125rem',
                        fontWeight: 'bold',
                        color: '#1e293b',
                        fontFamily: 'Outfit, Inter, sans-serif',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>Song details</h2>
                </div>
            </div>

            {/* Content */}
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '0 1rem',
                marginTop: '1.5rem'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}>
                    <div style={{
                        marginBottom: '1.5rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                        paddingBottom: '1.5rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '0.5rem'
                        }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '3rem',
                                height: '3rem',
                                borderRadius: '9999px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                fontWeight: 'bold',
                                fontFamily: 'Outfit, Inter, sans-serif',
                                fontSize: '1.25rem',
                                boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)'
                            }}>
                                {song.id}
                            </span>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.75rem',
                                color: '#475569',
                                fontFamily: 'Outfit, Inter, sans-serif',
                                background: 'rgba(255, 255, 255, 0.5)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '9999px'
                            }}>
                                <Calendar size={12} />
                                <span>{song.category}</span>
                            </div>
                        </div>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#1e293b',
                            fontFamily: 'Noto Sans Tamil, sans-serif',
                            lineHeight: '1.625',
                            marginTop: '1rem'
                        }}>
                            {song.title}
                        </h1>
                    </div>

                    {/* Upload Lyrics Button */}
                    <button
                        onClick={() => setShowEditor(true)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginBottom: '1.5rem',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Upload size={18} />
                        {displayLyrics ? 'Edit Lyrics' : 'Upload Lyrics'}
                    </button>

                    <div>
                        {displayLyrics ? (
                            <div
                                style={{
                                    fontFamily: 'Noto Sans Tamil, sans-serif',
                                    fontSize: '1.125rem',
                                    lineHeight: '1.75',
                                    whiteSpace: 'pre-wrap'
                                }}
                                dangerouslySetInnerHTML={{ __html: displayLyrics }}
                            />
                        ) : (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2.5rem 0',
                                color: '#94a3b8',
                                gap: '1rem'
                            }}>
                                <Music size={48} style={{ opacity: 0.3 }} />
                                <p style={{ fontFamily: 'Outfit, Inter, sans-serif', fontSize: '0.875rem' }}>
                                    No lyrics available yet
                                </p>
                                <p style={{ fontFamily: 'Outfit, Inter, sans-serif', fontSize: '0.75rem', color: '#cbd5e1' }}>
                                    Click "Upload Lyrics" to add them!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lyrics Editor Modal */}
            {showEditor && (
                <LyricsEditor
                    song={song}
                    initialLyrics={displayLyrics}
                    onClose={() => setShowEditor(false)}
                    onSave={handleSaveLyrics}
                />
            )}
        </div>
    );
};

export default SongDetail;
