import { useState, useRef } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import logo from './assets/Portfolio/Logo2.png'
import dots from './assets/Portfolio/Frame 10.png'
import play from './assets/Portfolio/9.png'
import pause from './assets/Portfolio/8.png'
import BubbleOverlay from './components/BubbleMenu.jsx'
import musicFile from './assets/portfolio-music.mp3'

const items = [
  {
    label: 'home',
    href: '/',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'about',
    href: '/about',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'projects',
    href: '/projects',
    ariaLabel: 'Projects',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <BubbleOverlay
        isOpen={isMenuOpen}
        items={items}
        onClose={() => setIsMenuOpen(false)}
      />

      <audio ref={audioRef} src={musicFile} loop />

      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/"><img src={logo} alt="Logo" /></Link>
          </div>
          <nav className="nav">
            
            <div className='play' onClick={toggleMusic} style={{cursor: 'pointer'}}>
              <img 
                src={isPlaying ? pause : play} 
                alt={isPlaying ? "Pause Music" : "Play Music"} 
              />
            </div>

            <div className="dots" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img src={dots} alt="Dots" />
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header