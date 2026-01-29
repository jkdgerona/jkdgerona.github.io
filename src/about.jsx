import './about.css'
import Header from './header.jsx'
import Footer from './footer.jsx'
import SplashCursor from './components/splashcursor.jsx'
import LightRays from './components/lightrays.jsx'
import html5 from './assets/Portfolio/html5-fill.png'
import react from './assets/Portfolio/reactjs-fill.png'
import figma from './assets/Portfolio/Figma.png'
import javascript from './assets/Portfolio/javascript-fill.png'
import css3 from './assets/Portfolio/css3-fill.png'
import gitBranch from './assets/Portfolio/git-branch-fill.png'
import copilot from './assets/Portfolio/copilot-fill.png'
import github from './assets/Portfolio/github-fill.png'
import treasureMap from './assets/Portfolio/treasure-map-fill.png'
import copyright from './assets/Portfolio/copyright-fill.png'
import profileImage from './assets/Portfolio/ChatGPT Image Jan 24, 2026, 04_59_57 PM.png'

function About() {
  return (
    <>
      <SplashCursor 
  colors={[
    { r: 0.137, g: 0.475, b: 0.663 }, // Matches var(--color-2)
    { r: 0.071, g: 0.239, b: 0.329 }, // Matches var(--color-3)
  ]}
  style={{ opacity: 0.1 }} 
/>
      <div className="light-rays-wrapper" style={{ height: '100lvh', position: 'fixed', top: 0, left: 0, opacity: 0.2, zIndex: 2, pointerEvents: 'none' }}>
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

      <main className="about-content">
        <Header />

        <section className="about-section">
          <div className="about-left">
            <h1 className="about-title">About KENET</h1>

            <div className="about-text">
              <p>
                Figma file management remains one of Figma's most significant challenges. Many designers report
                spending significant time trying to organize files in Figma rather than focusing on actual design
                work. If I didn't know better, I might even call it a growth strategy, gouging users out of money
                for having project files... But that would be cynical.
              </p>

              <p>
                Navigating through projects sometimes feels cumbersome, especially when working on multiple
                projects simultaneously. The current Figma folder system lacks robust structures and intuitive
                metadata sorting mechanisms.
              </p>

              <p>
                Given Figma's strength in other areas of the design experience, there's significant potential for
                improvement in file organization and management—creating a more streamlined and intuitive
                workflow to improve designer productivity—something the community has consistently raised through Figma
                feature feedback channels.
              </p>
            </div>

            <button className="resume-button">RÉSUMÉ</button>
          </div>

          <div className="about-right">
            <img src={profileImage} alt="Kenet" className="profile-image" />
          </div>
        </section>

        <section className="tech-section">
          <h2 className="tech-title">technologies I fuck with...</h2>

          <div className="tech-icons">
            <div className="tech-row">
              <img src={html5} alt="HTML5" className="tech-icon" />
              <img src={react} alt="React" className="tech-icon" />
              <img src={figma} alt="Figma" className="tech-icon" />
              <img src={javascript} alt="JavaScript" className="tech-icon" />
              <img src={css3} alt="CSS3" className="tech-icon" />
            </div>
            <div className="tech-row">
              <img src={gitBranch} alt="Git" className="tech-icon" />
              <img src={copilot} alt="GitHub Copilot" className="tech-icon" />
              <img src={github} alt="GitHub" className="tech-icon" />
              <img src={treasureMap} alt="Other" className="tech-icon" />
              <img src={copyright} alt="Copyright" className="tech-icon" />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

export default About
