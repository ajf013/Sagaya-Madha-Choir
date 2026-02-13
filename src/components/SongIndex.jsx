import React, { useState, useMemo } from 'react';
import { songData } from '../data/songData';
import { Search, Calendar } from 'lucide-react';

const SongIndex = ({ onSongSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        if (!searchTerm) {
            const groups = {};
            songData.forEach(song => {
                if (!groups[song.category]) {
                    groups[song.category] = [];
                }
                groups[song.category].push(song);
            });
            return Object.entries(groups).map(([category, songs]) => ({
                type: 'group',
                category,
                songs
            }));
        } else {
            const lowerTerm = searchTerm.toLowerCase();
            const matches = songData.filter(song =>
                song.id.toString().includes(lowerTerm) ||
                song.title.toLowerCase().includes(lowerTerm)
            );
            return [{ type: 'search_results', songs: matches }];
        }
    }, [searchTerm]);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
            {/* Header & Search */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 40,
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    padding: '1rem'
                }}>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '1rem',
                        fontFamily: 'Outfit, Inter, sans-serif'
                    }}>
                        Sagaya Madha Choir Jothipuram
                    </h1>
                    <div style={{ position: 'relative' }}>
                        <Search style={{
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#475569'
                        }} size={20} />
                        <input
                            type="search"
                            placeholder="Search by number or title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 3rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontFamily: 'Outfit, Inter, sans-serif',
                                color: '#1e293b',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.2)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Table Header - Single at top */}
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '0 1rem',
                marginTop: '1.5rem'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    position: 'sticky',
                    top: '104px',
                    zIndex: 30,
                    borderRadius: '12px 12px 0 0',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderBottom: 'none',
                    overflow: 'hidden'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{
                                    textAlign: 'left',
                                    padding: '0.75rem 1rem',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    color: '#475569',
                                    fontFamily: 'Outfit, Inter, sans-serif',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    width: '80px'
                                }}>No.</th>
                                <th style={{
                                    textAlign: 'left',
                                    padding: '0.75rem 1rem',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    color: '#475569',
                                    fontFamily: 'Outfit, Inter, sans-serif',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>Song Title</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/* Content */}
                {filteredData.length === 0 || (filteredData[0].songs && filteredData[0].songs.length === 0) ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '5rem 0',
                        color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                        <p>No songs found matching "{searchTerm}"</p>
                    </div>
                ) : (
                    filteredData.map((group, groupIndex) => (
                        <div key={group.category || 'search-results'} style={{ marginBottom: groupIndex === filteredData.length - 1 ? '2rem' : '0' }}>
                            {/* Category Header */}
                            {group.type === 'group' && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'white',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    backdropFilter: 'blur(10px)',
                                    fontFamily: 'Outfit, Inter, sans-serif',
                                    borderLeft: '1px solid rgba(255, 255, 255, 0.18)',
                                    borderRight: '1px solid rgba(255, 255, 255, 0.18)',
                                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <Calendar size={16} />
                                    <h2 style={{
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>{group.category}</h2>
                                </div>
                            )}

                            {/* Song Rows */}
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                borderTop: group.type === 'group' ? 'none' : '1px solid rgba(255, 255, 255, 0.18)',
                                borderRadius: groupIndex === filteredData.length - 1 ? '0 0 12px 12px' : '0',
                                boxShadow: groupIndex === filteredData.length - 1 ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)' : 'none'
                            }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <tbody>
                                        {group.songs.map((song) => (
                                            <tr
                                                key={song.id}
                                                onClick={() => onSongSelect(song)}
                                                style={{
                                                    cursor: 'pointer',
                                                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                                    transition: 'background 0.2s ease'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <td style={{
                                                    padding: '0.75rem 1rem',
                                                    color: '#667eea',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Outfit, Inter, sans-serif',
                                                    fontSize: '0.875rem',
                                                    width: '80px'
                                                }}>
                                                    {song.id}
                                                </td>
                                                <td style={{
                                                    padding: '0.75rem 1rem',
                                                    color: '#1e293b',
                                                    fontFamily: 'Noto Sans Tamil, sans-serif'
                                                }}>
                                                    {song.title}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SongIndex;
