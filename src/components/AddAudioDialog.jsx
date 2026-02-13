import React, { useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import { audioStorage } from '../utils/audioStorage';

const AddAudioDialog = ({ song, onClose, onSave }) => {
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState(0);
    const [isDragging, setIsDragging] = useState(false); // New state for drag visual

    const [progress, setProgress] = useState(0);
    const [uploadedBytes, setUploadedBytes] = useState(0);

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const processFile = async (file) => {
        if (!file) return;

        // Check file type
        if (!file.type.startsWith('audio/')) {
            alert('Please select a valid audio file (MP3, WAV, OGG, M4A)');
            return;
        }

        // Check file size (limit to 50MB)
        if (file.size > 50 * 1024 * 1024) {
            alert('File size too large! Please select a file smaller than 50MB.');
            return;
        }

        setFileName(file.name);
        setFileSize(file.size);
        setUploading(true);
        setProgress(0);
        setUploadedBytes(0);

        try {
            // Pass the file object directly and a progress callback
            const publicUrl = await audioStorage.saveAudio(song.id, file, file.name, (loaded, total) => {
                setUploadedBytes(loaded);
                setProgress(Math.round((loaded / total) * 100));
            });

            setUploading(false);
            onSave({ audio: publicUrl, fileName: file.name });
            onClose();

        } catch (error) {
            console.error('Error uploading file:', error);
            setUploading(false);
            alert(`Failed to upload audio: ${error.message}`);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        processFile(file);
    };

    // Drag and Drop Handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        if (!uploading) setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (uploading) return;

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
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
                maxWidth: '500px',
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
                    <div>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: '#1e293b',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            marginBottom: '0.25rem'
                        }}>Upload Audio File</h2>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#64748b',
                            fontFamily: 'Noto Sans Tamil, sans-serif'
                        }}>{song.title}</p>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={uploading}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            background: 'rgba(0, 0, 0, 0.05)',
                            border: 'none',
                            cursor: uploading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'background 0.2s',
                            opacity: uploading ? 0.5 : 1
                        }}
                        onMouseOver={(e) => !uploading && (e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)')}
                        onMouseOut={(e) => !uploading && (e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)')}
                    >
                        <X size={20} color="#1e293b" />
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                    {/* File Upload Area */}
                    <label
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '2rem',
                            border: `2px dashed ${isDragging ? '#4f46e5' : 'rgba(99, 102, 241, 0.3)'}`,
                            borderRadius: '12px',
                            background: isDragging ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
                            cursor: uploading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            textAlign: 'center',
                            transform: isDragging ? 'scale(1.02)' : 'scale(1)'
                        }}
                        onMouseOver={(e) => !uploading && !isDragging && (e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)')}
                        onMouseOut={(e) => !uploading && !isDragging && (e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)')}
                    >
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileSelect}
                            disabled={uploading}
                            style={{ display: 'none' }}
                        />
                        <Upload
                            size={48}
                            color={isDragging ? "#4f46e5" : "#6366f1"}
                            style={{
                                opacity: isDragging ? 1 : 0.7,
                                marginBottom: '1rem',
                                transform: isDragging ? 'translateY(-5px)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        />
                        <p style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#1e293b',
                            fontFamily: 'Outfit, Inter, sans-serif',
                            marginBottom: '0.5rem'
                        }}>
                            {uploading ? 'Uploading...' : isDragging ? 'Drop audio file here' : 'Click or Drag audio file here'}
                        </p>
                        {fileName && (
                            <p style={{
                                fontSize: '0.875rem',
                                color: '#6366f1',
                                fontFamily: 'Outfit, Inter, sans-serif',
                                marginTop: '0.5rem'
                            }}>
                                {fileName} ({formatFileSize(fileSize)})
                            </p>
                        )}
                    </label>

                    {/* Progress Bar */}
                    {uploading && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <div style={{
                                width: '100%',
                                height: '8px',
                                background: 'rgba(99, 102, 241, 0.1)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                marginBottom: '0.5rem'
                            }}>
                                <div style={{
                                    width: `${progress}%`,
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                                    borderRadius: '4px',
                                    transition: 'width 0.2s ease-out'
                                }} />
                            </div>
                            <p style={{
                                fontSize: '0.875rem',
                                color: '#64748b',
                                fontFamily: 'Outfit, Inter, sans-serif',
                                textAlign: 'center'
                            }}>
                                {formatFileSize(uploadedBytes)} of {formatFileSize(fileSize)} uploaded
                            </p>
                        </div>
                    )}

                    {/* Info */}
                    {!uploading && (
                        <div style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: 'rgba(59, 130, 246, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            gap: '0.75rem'
                        }}>
                            <AlertCircle size={20} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div>
                                <p style={{
                                    fontSize: '0.75rem',
                                    color: '#1e40af',
                                    fontFamily: 'Outfit, Inter, sans-serif',
                                    lineHeight: '1.5'
                                }}>
                                    <strong>Supported formats:</strong> MP3, WAV, OGG, M4A<br />
                                    <strong>Max file size:</strong> 50MB<br />
                                    <strong>Storage:</strong> Files are stored in the cloud and available to all users
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddAudioDialog;
