import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import LightRays from './components/LightRays.jsx'
import Header from './header.jsx'
import Footer from './footer.jsx'
import SplashCursor from './components/splashcursor.jsx'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  return (
    <>
      <SplashCursor
        colors={[
          { r: 0.208, g: 0.714, b: 0.992 }, // Matches var(--color-1)
          { r: 0.137, g: 0.475, b: 0.663 }, // Matches var(--color-2)
        ]}
        style={{ opacity: 0.4 }}
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
        <Header />
        <section className="hero-section">
          <h1 className="hero-title">KENET</h1>
          <div className="hero-content">
            <div className="hero-greeting">
              HI, I'M JAN <span id='kenneth'>KENNETH</span> GERONA<br />I GO BY THE NICKNAME "HANDSOME"
            </div>
            <div className="hero-description">
              I'M A STUDENT ASPIRING TO BE A PROGRAM DEVELOPER<br />AND SOFTWARE ENGINEER
            </div>
          </div>
        </section>
        <div className="buttons">
          <button className="button" onClick={() => navigate('/about')}>ABOUT KENET</button>
          <button className="button" onClick={() => navigate('/projects')}>KENET'S PROJECTS</button>
        </div>
        <Footer />
      </main>

    </>
  )
}

export default App
