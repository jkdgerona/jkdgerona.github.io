import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import Header from './header.jsx'
import Footer from './footer.jsx'
import './App.css' // Keep your styles

function Home() {
  const navigate = useNavigate()
  const { setPageTheme } = useTheme()

  useEffect(() => {
    // Set theme for Home Page
    setPageTheme(
      // Colors
      [
        { r: 0.208, g: 0.714, b: 0.992 },
        { r: 0.137, g: 0.475, b: 0.663 },
      ],
      // Ray Opacity
      0.4,
      // Background Gradient
      'linear-gradient(to bottom, var(--color-1), var(--color-2))'
    )
  }, [setPageTheme])

  return (
    // Removed main-content background in CSS or override here with transparent
    <main className="main-content" style={{ background: 'transparent' }}>
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
  )
}

export default Home