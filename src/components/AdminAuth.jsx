import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

const AdminAuth = ({ onClose, onSuccess }) => {
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState('');

    const ADMIN_PASSCODE = 'SMChoir47'; // Change this to your preferred passcode

    const handleSubmit = (e) => {
        e.preventDefault();

        if (passcode === ADMIN_PASSCODE) {
            localStorage.setItem('isAdmin', 'true');
            onSuccess();
            onClose();
        } else {
            setError('Invalid passcode. Please try again.');
            setPasscode('');
        }
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
            zIndex: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                maxWidth: '400px',
                width: '100%',
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
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <div style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                        }}>
                            <Lock size={20} color="white" />
                        </div>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: '#1e293b',
                            fontFamily: 'Outfit, Inter, sans-serif'
                        }}>Admin Access</h2>
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

                {/* Content */}
                <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
                    <p style={{
                        fontSize: '0.875rem',
                        color: '#64748b',
                        fontFamily: 'Outfit, Inter, sans-serif',
                        marginBottom: '1rem'
                    }}>
                        Enter admin passcode to delete audio files
                    </p>

                    <input
                        type="password"
                        value={passcode}
                        onChange={(e) => {
                            setPasscode(e.target.value);
                            setError('');
                        }}
                        placeholder="Enter passcode"
                        autoFocus
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: error ? '2px solid #ef4444' : '2px solid rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            fontSize: '0.875rem',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => !error && (e.target.style.borderColor = '#6366f1')}
                        onBlur={(e) => !error && (e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)')}
                    />

                    {error && (
                        <p style={{
                            marginTop: '0.5rem',
                            fontSize: '0.75rem',
                            color: '#ef4444',
                            fontFamily: 'Outfit, Inter, sans-serif'
                        }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            marginTop: '1rem',
                            padding: '0.75rem',
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminAuth;
