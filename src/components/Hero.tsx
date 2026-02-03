import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-conecta-orange flex items-center justify-center overflow-hidden pt-12 md:pt-16 section-fade-in"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>

      {/* Background Image */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none z-0">
        <img
          src="/fonts/fondo.png"
          alt="Fondo decorativo"
          className="w-full h-full object-contain max-w-4xl"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 mb-6"
          >
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl text-conecta-blue leading-tight"
            >
              HACIENDO
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl text-conecta-blue leading-tight"
            >
              CONEXIONES
            </motion.h1>
          </motion.div>

          {/* Separator Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-1 bg-white mb-8"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight text-shadow-lg">
              GENERANDO
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight text-shadow-lg">
              TRANQUILIDAD
            </h2>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-conecta-blue text-white font-bold rounded-lg hover:bg-conecta-blue-light transition-all duration-300 shadow-xl"
            >
              Contáctanos
            </motion.a>
            <motion.a
              href="#soluciones"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-conecta-blue font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              Nuestras Soluciones
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white opacity-70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero

