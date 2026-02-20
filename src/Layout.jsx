import { useState, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './header.jsx'
import musicFile from './assets/portfolio-music.mp3'

const Layout = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const location = useLocation()

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Hide header on project details page
  const isProjectDetailsPage = location.pathname.startsWith('/project/')

  return (
    <>
      {/* The Persistent Audio Player */}
      <audio ref={audioRef} src={musicFile} loop />

      {/* The Header stays here and controls the audio */}
      {!isProjectDetailsPage && <Header isPlaying={isPlaying} toggleMusic={toggleMusic} />}

      {/* "Outlet" is where App, About, and Projects will appear */}
      <Outlet />
      
    </>
  )
}

export default Layout