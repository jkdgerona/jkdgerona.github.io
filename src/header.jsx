import { useState } from 'react'
import './header.css'
import logo from './assets/Portfolio/Logo2.png'
import dots from './assets/Portfolio/frame 10.png'
import play from './assets/Portfolio/9.png'
import BubbleOverlay from './components/BubbleMenu.jsx'

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

  return (
    <>

      <BubbleOverlay
        isOpen={isMenuOpen}
        items={items}
        onClose={() => setIsMenuOpen(false)}
      />

      <header className="header">
        <div className="header-container">
          <div className="logo">
            <a href="/"><img src={logo} alt="Logo" /></a>
          </div>
          <nav className="nav">
            <div className='play'><img src={play} alt="Play Icon" /></div>
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