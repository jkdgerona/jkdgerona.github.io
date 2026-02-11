import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import LightRays from './components/LightRays.jsx'
import Footer from './footer.jsx'
import SplashCursor from './components/splashcursor.jsx'
import AnimatedContent from './components/AnimatedContent.jsx'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  return (
    <>
      <SplashCursor
        SIM_RESOLUTION={64} 
        DYE_RESOLUTION={512}
        DENSITY_DISSIPATION={4}
        PRESSURE_ITERATIONS={10} 
        colors={[
          { r: 0.208, g: 0.714, b: 0.992 },
          { r: 0.137, g: 0.475, b: 0.663 },
        ]}
      />
      <div className="light-rays-wrapper" style={{ height: '100lvh', position: 'fixed', top: 0, left: 0, opacity: 0.4, zIndex: 10, pointerEvents: 'none' }}>
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

      <main className="main-content">
        {/* Header Removed - it is now in Layout.jsx */}
        
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
        >
          <div><section className="hero-section">
            <h1 className="hero-title">KENET</h1>
            <div className="hero-content">
              <div className="hero-greeting">
                HI, I'M JAN <span id='kenneth'>KENNETH</span> GERONA<br />I GO BY THE NICKNAME "HANDSOME"
              </div>
              <div className="hero-description">
                I'M A STUDENT ASPIRING TO BE A PROGRAM DEVELOPER<br />AND SOFTWARE ENGINEER
              </div>
            </div>
          </section></div>
        </AnimatedContent>

        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0.5}
        >
          <div><div className="buttons">
          <button className="button" onClick={() => navigate('/about')}>ABOUT KENET</button>
          <button className="button" onClick={() => navigate('/projects')}>KENET'S PROJECTS</button>
        </div></div>
        </AnimatedContent>

        <Footer />
      </main>

    </>
  )
}

export default App