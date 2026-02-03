import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

const Statistics = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const stats = [
    { number: '50,000+', label: 'Clientes Satisfechos', icon: '👥' },
    { number: '10+', label: 'Años de Experiencia', icon: '⭐' },
    { number: '98%', label: 'Satisfacción del Cliente', icon: '💯' },
    { number: '24/7', label: 'Atención al Cliente', icon: '🕐' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-conecta-blue via-conecta-blue-light to-conecta-blue text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-conecta-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-conecta-orange rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <motion.div
                className="text-4xl md:text-5xl font-extrabold mb-2 font-number"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  delay: index * 0.2 + 0.3,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                {stat.number}
              </motion.div>
              <p className="text-gray-200 text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Statistics

