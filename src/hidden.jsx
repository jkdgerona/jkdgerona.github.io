import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import LightRays from './components/LightRays.jsx';
import SplashCursor from './components/splashcursor';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack.jsx';
import TreasureChest from './assets/Portfolio/TreasureChest.svg';
import './hidden.css';
import AnimatedContent from './components/AnimatedContent.jsx';
import factImg1 from './assets/facts/486611510_1098880395585496_5204341198694754676_n.jpg';

function Hidden() {
    const [showFirst, setShowFirst] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFirst(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

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
                    { r: 0.137, g: 0.475, b: 0.663 },
                    { r: 0.071, g: 0.239, b: 0.329 },
                    { r: 0.0, g: 0.0, b: 0.0 },
                ]}
                style={{ opacity: 0.15 }}
            />

            <div className="hidden-page">
                {/* Transition Container */}
                <div className="main-transition-container">

                    {/* SECTION 1: Treasure Chest */}
                    <div className={`hidden-content ${!showFirst ? 'is-hidden' : ''}`}>
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
                            <div><img src={TreasureChest} alt="Treasure Chest" id='treasure-image' /></div>
                        </AnimatedContent>
                        <div className='text-space'>
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
                                delay={0.8}
                            >
                                <div><h1 className="heading">Congratulations, you've found the hidden treasure!</h1></div>
                            </AnimatedContent>
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
                                delay={2}
                            >
                                <div><p className="description">and it’s full of...</p></div>
                            </AnimatedContent>
                        </div>
                    </div>

                    {/* SECTION 2: Scroll Stack */}
                    <div className={`hidden-content2 ${showFirst ? 'is-hidden' : 'fade-in'}`}>
                        {/* Moved Header OUTSIDE ScrollStack so we can control its stickiness manually */}
                        <div className="stack-header sticky-stack-header">
                            <h2 className="stack-title-correct">Useful                       everybody</h2>
                            <h2 className="stack-title">
                                <span id='erased'>Useless</span> shits about kenet that <span id='erased'>nobody</span> asked for...
                            </h2>
                        </div>

                        <ScrollStack stackPosition="320">
                            <ScrollStackItem itemClassName="treasure-card background-card card-fact-1">
                                <h2>I am a Student Leader</h2>
                            </ScrollStackItem>
                            <ScrollStackItem itemClassName="treasure-card background-card card-fact-2">
                                <h2>I love Developing</h2>
                            </ScrollStackItem>
                            <ScrollStackItem itemClassName="treasure-card background-card card-fact-3">
                                <h2>I love Math</h2>
                            </ScrollStackItem>
                            <ScrollStackItem itemClassName="treasure-card background-card card-fact-4">
                                <h2>I Dance</h2>
                            </ScrollStackItem>
                            <ScrollStackItem itemClassName="treasure-card background-card card-fact-5">
                                <h2>I Play Sports</h2>
                            </ScrollStackItem>
                            <ScrollStackItem itemClassName="treasure-card background-card card-fact-6">
                                <h2>I love cats</h2>
                            </ScrollStackItem>
                        </ScrollStack>
                    </div>

                </div>

                <Footer style={{ position: 'relative', width: '100%' }} />
            </div>
        </>
    );
}

export default Hidden;