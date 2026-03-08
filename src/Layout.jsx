import { useState, useRef, useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom' // We changed Outlet to useOutlet
import Header from './header.jsx'
import musicFile from './assets/portfolio-music.mp3'
import UnderWater from './components/UnderWater.jsx'
import BubbleTransition from './components/BubbleTransition';

const Layout = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false) 
  
  const audioRef = useRef(null)
  
  // 1. Get the current route information
  const location = useLocation()
  const currentOutlet = useOutlet() 
  
  // 2. State to hold the "frozen" page and path
  const [displayOutlet, setDisplayOutlet] = useState(currentOutlet)
  const [displayPath, setDisplayPath] = useState(location.pathname)

  const toggleMusic = () => {
    if (isPlaying) { audioRef.current.pause() } 
    else { audioRef.current.play() }
    setIsPlaying(!isPlaying)
  }

  // 3. Tie header logic to the FROZEN path, not the instant path
  const isProjectDetailsPage = displayPath.startsWith('/project/')

  useEffect(() => {
    // Step 1: The moment a link is clicked, drop the bubbles
    setIsPageLoaded(false);
    
    // Step 2: Wait until the bubbles form a thick wall (600ms), 
    // THEN swap the content in the background so the user doesn't see it change.
    const swapTimer = setTimeout(() => {
      setDisplayOutlet(currentOutlet);
      setDisplayPath(location.pathname);
    }, 600); // 👈 Tweak this if the page changes too early or too late

    // Step 3: Reset the state machine after the bubbles fly off screen
    const resetTimer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 1500); 

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(resetTimer);
    };
  }, [location.pathname]);

  return (
    <>
      <BubbleTransition isLoaded={isPageLoaded} />

      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 5, pointerEvents: 'none' }}>
        <UnderWater speed={0.2} sway={0.1} bubbleCount={2000} />
      </div>

      <audio ref={audioRef} src={musicFile} loop />

      {!isProjectDetailsPage && <Header isPlaying={isPlaying} toggleMusic={toggleMusic} />}

      <div className="content-wrapper" style={{ zIndex: 20 }}>
        {/* Step 4: Render the frozen outlet instead of the instant <Outlet /> component */}
        {displayOutlet}
      </div>
    </>
  )
}

export default Layout