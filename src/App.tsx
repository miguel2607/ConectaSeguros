import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingSupport from './components/FloatingSupport'
import QuickChat from './components/QuickChat'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import BlogDetail from './pages/BlogDetail'
import RamaJudicial from './pages/RamaJudicial'
import Admin from './pages/Admin'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8082/api'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Health check al cargar: despertar backend en Render (evita cold start)
  useEffect(() => {
    fetch(`${API_BASE}/health`).catch(() => {})
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Manejar scroll a secciones cuando se navega con hash
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />
      <main className="pt-24 md:pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seguros/:slug" element={<ServiceDetail />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/rama-judicial" element={<RamaJudicial />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <FloatingSupport />
      <QuickChat />
    </div>
  )
}

export default App

