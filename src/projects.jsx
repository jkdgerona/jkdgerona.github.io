import React from 'react';
import Header from './header';
import Footer from './footer';
import './projects.css';
import LightRays from './components/LightRays.jsx'
import SplashCursor from './components/splashcursor';
import MagicBento from './components/MagicBento.jsx';
import AnimatedContent from './components/AnimatedContent.jsx';

function Projects() {
    return (
        <>
            <div className="light-rays-wrapper" style={{ height: '100lvh', position: 'fixed', top: 0, left: 0, opacity: 0.05, zIndex: 2, pointerEvents: 'none' }}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1}
                    lightSpread={10}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.03}
                    noiseAmount={0}
                    distortion={0}
                    className="custom-rays"
                    pulsating={false}
                    fadeDistance={100}
                    saturation={1}
                />
            </div>
            <SplashCursor
                colors={[
                    { r: 0.137, g: 0.475, b: 0.663 }, // Color 2 (Highlight)
                    { r: 0.071, g: 0.239, b: 0.329 }, // Color 3 (Base)
                    { r: 0.0, g: 0.0, b: 0.0 },       // Color 4 (Shadow)
                ]}
                style={{ opacity: 0.15 }} // Lower opacity for dark mode feel
            />
            <div className="projects-page">
                <main className="projects-content">
                    <AnimatedContent
                        distance={100}
                        direction="vertical"
                        reverse={false}
                        duration={1.5}
                        ease="power3.out"
                        initialOpacity={0}
                        animateOpacity
                        scale={1}
                        threshold={0.1}
                        delay={0}
                    >
                        <div><MagicBento
                            textAutoHide={true}
                            enableStars
                            enableSpotlight
                            enableBorderGlow={true}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect
                            spotlightRadius={400}
                            particleCount={12}
                            glowColor="53, 182, 253"
                            disableAnimations={false}
                        /></div>
                    </AnimatedContent>
                </main>
                <Footer style={{ position: 'relative', bottom: 0, width: '100%' }} />
            </div>

        </>
    );
}

export default Projects;