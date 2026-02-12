import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpg';

const SplashScreen = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            overflow: 'hidden'
        }}>
            {/* Glassmorphism Orbs */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '20rem',
                height: '20rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                filter: 'blur(80px)'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-10%',
                width: '20rem',
                height: '20rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                filter: 'blur(80px)'
            }}></div>

            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    padding: '3rem 2rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}
            >
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{
                        fontSize: '2.25rem',
                        fontWeight: 'bold',
                        fontFamily: 'Outfit, Inter, sans-serif',
                        textAlign: 'center',
                        letterSpacing: '-0.025em',
                        color: 'white',
                        marginBottom: '1.5rem',
                        textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                >
                    Sagaya Madha<br />Choir
                </motion.h1>

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '150px',
                        height: '150px',
                        overflow: 'hidden'
                    }}
                >
                    <img
                        src={logo}
                        alt="Sagaya Madha Choir Logo"
                        style={{
                            maxWidth: '150px',
                            maxHeight: '150px',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                            borderRadius: '12px',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                            border: '2px solid rgba(255, 255, 255, 0.3)'
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SplashScreen;
