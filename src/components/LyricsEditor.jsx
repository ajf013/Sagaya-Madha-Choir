import React, { useState } from 'react';
import { X, Type, Palette } from 'lucide-react';

const LyricsEditor = ({ song, onClose, onSave, initialLyrics = '' }) => {
    const [lyrics, setLyrics] = useState(initialLyrics);
    const [selectedColor, setSelectedColor] = useState('#000000');

    const colors = [
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#FFFFFF' },
        { name: 'Red', value: '#ef4444' },
        { name: 'Cornflower Blue', value: '#6366f1' }
    ];

    const handleTextChange = (e) => {
        setLyrics(e.target.value);
    };

    const applyColorToSelection = () => {
        const textarea = document.getElementById('lyrics-textarea');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (start === end) {
            alert('Please select some text first!');
            return;
        }

        const selectedText = lyrics.substring(start, end);
        const coloredText = `<span style="color: ${selectedColor};">${selectedText}</span>`;
        const newLyrics = lyrics.substring(0, start) + coloredText + lyrics.substring(end);

        setLyrics(newLyrics);
    };

    const handleSave = () => {
        if (!lyrics.trim()) {
            alert('Please enter some lyrics!');
            return;
        }

        // Save to localStorage
        const savedLyrics = JSON.parse(localStorage.getItem('userLyrics') || '{}');
        savedLyrics[song.id] = lyrics;
        localStorage.setItem('userLyrics', JSON.stringify(savedLyrics));

        onSave(lyrics);
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
                }}>
                    <div>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: '#1e293b',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            marginBottom: '0.25rem'
                        }}>Add Lyrics</h2>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#64748b',
                            fontFamily: 'Noto Sans Tamil, sans-serif'
                        }}>{song.title}</p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            background: 'rgba(0, 0, 0, 0.05)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'}
                    >
                        <X size={20} color="#1e293b" />
                    </button>
                </div>

                {/* Color Palette */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.75rem'
                    }}>
                        <Palette size={18} color="#64748b" />
                        <span style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#475569',
                            fontFamily: 'Outfit, Inter, sans-serif'
                        }}>Color Palette</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        flexWrap: 'wrap'
                    }}>
                        {colors.map(color => (
                            <button
                                key={color.value}
                                onClick={() => setSelectedColor(color.value)}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '8px',
                                    background: color.value,
                                    border: selectedColor === color.value ? '3px solid #6366f1' : '2px solid rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer',
                                    boxShadow: selectedColor === color.value ? '0 0 0 4px rgba(99, 102, 241, 0.1)' : 'none',
                                    transition: 'all 0.2s',
                                    position: 'relative'
                                }}
                                title={color.name}
                            />
                        ))}
                    </div>
                    <button
                        onClick={applyColorToSelection}
                        style={{
                            marginTop: '0.75rem',
                            padding: '0.5rem 1rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'transform 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Type size={16} />
                        Apply Color to Selected Text
                    </button>
                </div>

                {/* Textarea */}
                <div style={{ padding: '1.5rem' }}>
                    <textarea
                        id="lyrics-textarea"
                        value={lyrics}
                        onChange={handleTextChange}
                        placeholder="Type or paste lyrics here...&#10;&#10;1. Select text&#10;2. Choose a color&#10;3. Click 'Apply Color to Selected Text'"
                        style={{
                            width: '100%',
                            minHeight: '300px',
                            padding: '1rem',
                            border: '2px solid rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            fontFamily: 'Noto Sans Tamil, sans-serif',
                            fontSize: '1rem',
                            lineHeight: '1.75',
                            resize: 'vertical',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)'}
                    />

                    {/* Preview */}
                    {lyrics && (
                        <div style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: 'rgba(0, 0, 0, 0.02)',
                            borderRadius: '8px',
                            border: '1px solid rgba(0, 0, 0, 0.05)'
                        }}>
                            <p style={{
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                color: '#64748b',
                                marginBottom: '0.5rem',
                                fontFamily: 'Outfit, Inter, sans-serif',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>Preview</p>
                            <div
                                style={{
                                    fontFamily: 'Noto Sans Tamil, sans-serif',
                                    fontSize: '1rem',
                                    lineHeight: '1.75',
                                    whiteSpace: 'pre-wrap'
                                }}
                                dangerouslySetInnerHTML={{ __html: lyrics }}
                            />
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div style={{
                    padding: '1.5rem',
                    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(0, 0, 0, 0.05)',
                            color: '#475569',
                            border: 'none',
                            borderRadius: '8px',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Save Lyrics
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LyricsEditor;
