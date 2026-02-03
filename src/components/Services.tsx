import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'

interface Service {
  id: string
  title: string
  description: string
  slug: string
  icon: string
  priceFrom?: string
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('services_list')
    if (saved) {
      setServices(JSON.parse(saved))
    } else {
      // Datos por defecto
      const defaultServices: Service[] = [
        {
          id: '1',
          title: 'Seguros de Hogar',
          description: 'Protección completa para tu vivienda y bienes personales.',
          slug: 'seguro-hogar',
          icon: '🏠',
        },
        {
          id: '2',
          title: 'Seguros de Vida',
          description: 'Tranquilidad para ti y tu familia con coberturas flexibles.',
          slug: 'seguro-vida',
          icon: '🛡️',
        },
        {
          id: '3',
          title: 'Seguros Vehiculares',
          description: 'Cobertura integral para tu automóvil, moto o flota.',
          slug: 'seguro-vehicular',
          icon: '🚗',
        },
        {
          id: '4',
          title: 'Seguros Empresariales',
          description: 'Protección completa para tu negocio y empleados.',
          slug: 'seguro-empresarial',
          icon: '🏢',
        },
        {
          id: '5',
          title: 'Seguros de Salud',
          description: 'Atención médica de calidad cuando más la necesitas.',
          slug: 'seguro-salud',
          icon: '💊',
        },
        {
          id: '6',
          title: 'Asesoría Personalizada',
          description: 'Expertos que te ayudan a elegir la mejor opción.',
          slug: 'asesoria-personalizada',
          icon: '🤝',
        },
      ]
      setServices(defaultServices)
      localStorage.setItem('services_list', JSON.stringify(defaultServices))
    }
  }, [])

  const getIconComponent = (icon: string) => {
    const iconMap: Record<string, JSX.Element> = {
      '🏠': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      '🛡️': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      '🚗': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      '🏢': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      '💊': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      '🤝': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    }
    return iconMap[icon] || <span className="text-5xl">{icon}</span>
  }

  return (
    <section
      id="soluciones"
      className="py-16 lg:py-24 bg-gray-50 section-fade-in"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-conecta-blue mb-3">
            SOLUCIONES
          </h2>
          <div className="w-24 h-1 bg-conecta-orange mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ofrecemos una amplia gama de productos de seguros diseñados para
            proteger lo que más valoras
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Link
                to={`/seguros/${service.slug}`}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 block"
              >
              <div className="text-conecta-orange mb-6">
                {getIconComponent(service.icon)}
              </div>
              <h3 className="text-2xl text-conecta-blue mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {service.description}
              </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services

