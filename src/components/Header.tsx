import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  isScrolled: boolean
}

const Header = ({ isScrolled }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const menuItems = [
    'INICIO',
    'NOSOTROS',
    'SOLUCIONES',
    'SERVICIOS DIGITALES',
    'BLOG',
    'CONTACTO',
    'RAMA JUDICIAL-SURA'
  ]

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = searchQuery.toLowerCase()

    if (!query.trim()) {
      setIsSearchOpen(false)
      return
    }

    // Búsqueda sencilla por palabras clave hacia secciones
    if (query.includes('hogar') || query.includes('casa')) {
      document.getElementById('soluciones')?.scrollIntoView({ behavior: 'smooth' })
    } else if (query.includes('auto') || query.includes('veh') || query.includes('coche')) {
      document.getElementById('soluciones')?.scrollIntoView({ behavior: 'smooth' })
    } else if (query.includes('vida') || query.includes('salud') || query.includes('familia')) {
      document.getElementById('soluciones')?.scrollIntoView({ behavior: 'smooth' })
    } else if (query.includes('digital') || query.includes('app') || query.includes('plataforma')) {
      document.getElementById('servicios-digitales')?.scrollIntoView({ behavior: 'smooth' })
    } else if (query.includes('rama') || query.includes('judicial') || query.includes('sura')) {
      window.location.href = '/rama-judicial'
    } else if (query.includes('contacto') || query.includes('telefono') || query.includes('whatsapp')) {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Por defecto, llevamos a contacto
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
    }

    setIsSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-conecta-blue shadow-lg'
          : 'bg-conecta-blue'
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/fonts/logo.png" 
              alt="CONECTA Seguros" 
              className="h-16 md:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => {
              if (item === 'INICIO') {
                return (
                  <Link
                    key={item}
                    to="/"
                    className="text-white hover:text-conecta-orange transition-colors duration-200 text-sm font-medium"
                  >
                    {item}
                  </Link>
                )
              } else if (item === 'RAMA JUDICIAL-SURA') {
                return (
                  <Link
                    key={item}
                    to="/rama-judicial"
                    className="text-white hover:text-conecta-orange transition-colors duration-200 text-sm font-medium"
                  >
                    {item}
                  </Link>
                )
              } else {
                const sectionId = item.toLowerCase().replace(/\s+/g, '-')
                return (
                  <Link
                    key={item}
                    to={`/#${sectionId}`}
                    className="text-white hover:text-conecta-orange transition-colors duration-200 text-sm font-medium"
                    onClick={(e) => {
                      // Si ya estamos en la página principal, hacer scroll suave
                      if (window.location.pathname === '/') {
                        e.preventDefault()
                        const element = document.getElementById(sectionId)
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' })
                        }
                      }
                    }}
                  >
                    {item}
                  </Link>
                )
              }
            })}
          </div>

          {/* Search Icon */}
          <div className="hidden lg:flex items-center relative">
            <button
              className="text-conecta-blue bg-white p-2 rounded-full hover:bg-conecta-orange hover:text-white transition-colors duration-200"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              aria-label="Buscar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {isSearchOpen && (
              <form
                onSubmit={handleSearch}
                className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg flex items-center px-3 py-2 space-x-2 w-72"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm outline-none border border-gray-200 rounded-md px-2 py-1 focus:border-conecta-orange"
                  placeholder="Buscar seguros, servicios, contacto..."
                  autoFocus
                />
                <button
                  type="submit"
                  className="text-xs font-semibold text-white bg-conecta-orange rounded-md px-3 py-1 hover:bg-conecta-orange-dark transition-colors"
                >
                  Ir
                </button>
              </form>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-conecta-blue-light">
            {menuItems.map((item) => {
              if (item === 'INICIO') {
                return (
                  <Link
                    key={item}
                    to="/"
                    className="block py-2 text-white hover:text-conecta-orange transition-colors duration-200 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                )
              } else if (item === 'RAMA JUDICIAL-SURA') {
                return (
                  <Link
                    key={item}
                    to="/rama-judicial"
                    className="block py-2 text-white hover:text-conecta-orange transition-colors duration-200 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                )
              } else {
                const sectionId = item.toLowerCase().replace(/\s+/g, '-')
                return (
                  <Link
                    key={item}
                    to={`/#${sectionId}`}
                    className="block py-2 text-white hover:text-conecta-orange transition-colors duration-200 text-sm font-medium"
                    onClick={(e) => {
                      setIsMenuOpen(false)
                      // Si ya estamos en la página principal, hacer scroll suave
                      if (window.location.pathname === '/') {
                        e.preventDefault()
                        setTimeout(() => {
                          const element = document.getElementById(sectionId)
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                        }, 100)
                      }
                    }}
                  >
                    {item}
                  </Link>
                )
              }
            })}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

