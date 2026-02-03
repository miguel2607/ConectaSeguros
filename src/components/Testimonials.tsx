import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'María González',
    role: 'Empresaria',
    image: '👩‍💼',
    text: 'CONECTA Seguros me ayudó a proteger mi negocio con un plan completo. El servicio es excepcional y siempre están disponibles cuando los necesito.',
    rating: 5,
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Padre de Familia',
    image: '👨‍👩‍👧',
    text: 'Contratamos el seguro de vida y hogar con ellos. La tranquilidad que nos dan es invaluable. Recomiendo totalmente sus servicios.',
    rating: 5,
  },
  {
    name: 'Ana Martínez',
    role: 'Profesional',
    image: '👩‍💻',
    text: 'El proceso fue muy sencillo y rápido. Me asesoraron perfectamente y encontré el seguro que mejor se adaptaba a mis necesidades.',
    rating: 5,
  },
  {
    name: 'Roberto Sánchez',
    role: 'Emprendedor',
    image: '👨‍💼',
    text: 'Excelente atención y seguimiento. Cuando tuve un siniestro, el proceso fue muy ágil y me ayudaron en cada paso.',
    rating: 5,
  },
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl text-conecta-blue mb-3">
            LO QUE DICEN NUESTROS CLIENTES
          </h2>
          <div className="w-24 h-1 bg-conecta-orange mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Miles de clientes confían en nosotros para proteger lo que más valoran
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <div className="text-6xl mr-4">{currentTestimonial.image}</div>
                <div>
                  <h3 className="text-xl text-conecta-blue">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{currentTestimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "{currentTestimonial.text}"
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-conecta-orange w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ver testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

