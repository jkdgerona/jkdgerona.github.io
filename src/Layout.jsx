import { useState, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header.jsx'
import musicFile from './assets/portfolio-music.mp3'

const Layout = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      {/* The Persistent Audio Player */}
      <audio ref={audioRef} src={musicFile} loop />

      {/* The Header stays here and controls the audio */}
      <Header isPlaying={isPlaying} toggleMusic={toggleMusic} />

      {/* "Outlet" is where App, About, and Projects will appear */}
      <Outlet />
      
    </>
  )
}

export default Layout