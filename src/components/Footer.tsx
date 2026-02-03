import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-conecta-blue text-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-conecta-orange"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl leading-tight">
                  CONECTA
                </span>
                <span className="text-conecta-orange font-semibold text-xs leading-tight">
                  seguros
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Generando tranquilidad y haciendo conexiones que protegen lo que más valoras.
            </p>
          </div>

          {/* Quick Links */}
          <div className="section-fade-in-delayed">
            <h4 className="mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#inicio" className="hover:text-conecta-orange transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-conecta-orange transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#soluciones" className="hover:text-conecta-orange transition-colors">
                  Soluciones
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-conecta-orange transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="section-fade-in-delayed">
            <h4 className="mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#soluciones" className="hover:text-conecta-orange transition-colors">
                  Seguros de Hogar
                </a>
              </li>
              <li>
                <a href="#soluciones" className="hover:text-conecta-orange transition-colors">
                  Seguros de Vida
                </a>
              </li>
              <li>
                <a href="#soluciones" className="hover:text-conecta-orange transition-colors">
                  Seguros Vehiculares
                </a>
              </li>
              <li>
                <a href="#soluciones" className="hover:text-conecta-orange transition-colors">
                  Seguros Empresariales
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="section-fade-in-delayed">
            <h4 className="mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/#aviso-de-privacidad" className="hover:text-conecta-orange transition-colors">
                  Aviso de Privacidad
                </a>
              </li>
              <li>
                <a href="/#terminos-y-condiciones" className="hover:text-conecta-orange transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="/#politica-de-cookies" className="hover:text-conecta-orange transition-colors">
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-conecta-blue-light pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <p className="text-gray-300 text-sm">
              © <span className="font-number">{new Date().getFullYear()}</span> CONECTA Seguros. Todos los derechos reservados.
            </p>
            <Link
              to="/admin"
              className="text-xs text-white/40 hover:text-white/60 transition-colors mt-2 md:mt-0"
            >
              Panel de Administración
            </Link>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://www.instagram.com/conectaseguros.co/?hl=es"
              className="text-gray-300 hover:text-conecta-orange transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@conectaseguros.co"
              className="text-gray-300 hover:text-conecta-orange transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a
              href="mailto:info@conectaseguros.co"
              className="text-gray-300 hover:text-conecta-orange transition-colors"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

