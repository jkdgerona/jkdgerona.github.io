import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx' // Import the new Layout
import App from './App.jsx'
import About from './about.jsx'
import Projects from './projects.jsx'
import Hidden from './hidden.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Wrap all pages inside the Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/hidden" element={<Hidden />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)