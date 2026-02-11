import { useNavigate } from 'react-router-dom'
import './about.css'
import Header from './header.jsx'
import Footer from './footer.jsx'
import SplashCursor from './components/splashcursor.jsx'
import LightRays from './components/LightRays.jsx'
import {
  FaJava, FaHtml5, FaCss3Alt, FaNodeJs,
  FaReact, FaGithub, FaFigma
} from "react-icons/fa";
import {
  SiC, SiCplusplus, SiCanva, SiPostgresql
} from "react-icons/si";
import { PiFileCSharp } from "react-icons/pi";
import { TbBrandPython } from "react-icons/tb";
import { RiJavascriptLine } from "react-icons/ri";
import { GrMysql } from "react-icons/gr";
import { GiTreasureMap } from "react-icons/gi";
import profileImage from './assets/Portfolio/ChatGPT Image Jan 24, 2026, 04_59_57 PM.png'
import AnimatedContent from './components/AnimatedContent.jsx'

function About() {
  const navigate = useNavigate()

  const handleTreasureClick = () => {
    navigate('/hidden') // or whatever your hidden page route is
  }
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
        <section className="about-section">

          {/* left side */}
          <div className="about-left">
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
              <div><h1 className="about-title">About KENET</h1></div>
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
              <div className="about-text">
                <p>
                  I am a third-year Computer Science student at Ateneo de Davao University and an active student leader. I have completed three years of the Computer Science curriculum and have consistently maintained strong academic standing as a President’s List and Dean’s List awardee since my first year.
                </p>
              </div>
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
              delay={0.8}
            >
              <div className="about-text">
                <p>
                  I am involved in multiple student organizations, including the Student Executive Council
                  of the Computer Studies Department, BAHAGHARI political party, and two SAMAHAN
                  departments. I am also helping found the DOST–Ateneo student group. Through these, along with my passion for dance and sports, I have
                  developed leadership, teamwork, and communication skills while working with people from
                  different backgrounds.
                </p>
              </div>
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
              delay={1}
            >
              <div className="about-text">
                <p>
                  I have experience or have taken courses in Programming, Discrete Structures, DSA, Object Oriented
                  Programming, Information Management, Application Development, Event-Driven Programming, Software Engineering,
                  Machine Learning, and Figma Design. My technical skills include
                  Java, JavaScript, C, C++, C#, Python, HTML, CSS, Node.js, React, SQL/MySQLite, GitHub,
                  Figma, and Canva.
                </p>
              </div>
            </AnimatedContent>
            <AnimatedContent
              distance={50}
              direction="vertical"
              reverse={false}
              duration={2}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={1.5}
            >
              <div><button className="resume-button">RÉSUMÉ</button></div>
            </AnimatedContent>

          </div>

          {/* right side */}


          <div className="about-right">
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={4}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0}
            >
              <div>  <img src={profileImage} alt="Kenet" className="profile-image" /></div>
            </AnimatedContent>
          </div>
        </section>

        <section className="tech-section">
          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={0}
          >
            <div><h2 className="tech-title">technologies I fuck with...</h2>
                  <h2 className="tech-subtitle">non-stop learning from school to online courses</h2></div>
          </AnimatedContent>

          <div className="tech-icons">
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={1}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0.5}
            > 
              <h1 className="tech-category">Programming & Scripting Languages</h1>
              <div className="tech-row">
                <FaJava className="tech-icon" title="Java" />
                <RiJavascriptLine className="tech-icon" title="JavaScript" />
                <SiC className="tech-icon" title="C" />
                <SiCplusplus className="tech-icon" title="C++" />
                <PiFileCSharp className="tech-icon" title="C#" />
                <TbBrandPython className="tech-icon" title="Python" />
                <FaHtml5 className="tech-icon" title="HTML5" />
              </div>
            </AnimatedContent>
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={1}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0.5}
            > 
              <h1 className="tech-category">Web Development</h1>
              <div className="tech-row">
                <FaHtml5 className="tech-icon" title="HTML5" />
                <FaCss3Alt className="tech-icon" title="CSS3" />
                <FaNodeJs className="tech-icon" title="Node.js" />
                <FaReact className="tech-icon" title="React" />
              </div>
            </AnimatedContent>
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={1}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0.5}
            >
              <h1 className="tech-category">Databases & Version Control</h1>
              <div className="tech-row">
                <GrMysql className="tech-icon" title="MySQL" />
                <SiPostgresql className="tech-icon" title="PostgreSQL" />
                <FaGithub className="tech-icon" title="GitHub" />
              </div>
            </AnimatedContent>
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={1}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0.5}
            >
              <h1 className="tech-category">Design & Other Tools</h1>
              <div className="tech-row">
                <FaFigma className="tech-icon" title="Figma" />
                <SiCanva className="tech-icon" title="Canva" />
                <GiTreasureMap
                  className="tech-icon glowing"
                  onClick={handleTreasureClick}
                  title="Hidden Treasure"
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </AnimatedContent>

          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

export default About
