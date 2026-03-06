import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

const iconPólizas = (
  <svg className="w-full h-full" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 4L8 10v10c0 10 6 18 16 22 10-4 16-12 16-22V10L24 4z" />
    <path d="M24 22v14M18 30h12" />
  </svg>
)
const iconClientes = (
  <svg className="w-full h-full" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="14" r="5" />
    <circle cx="30" cy="14" r="5" />
    <path d="M10 32c0-4 3.5-8 8-8s8 4 8 8M26 32c0-4 3.5-8 8-8s8 4 8 8" />
  </svg>
)
const iconValoración = (
  <svg className="w-full h-full" viewBox="0 0 48 48" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
    <path d="M24 6l4 8 9 1.5-6.5 6 1.5 9L24 26l-8 4.5 1.5-9-6.5-6 9-1.5L24 6z" />
  </svg>
)
const icon24_7 = (
  <svg className="w-full h-full" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="18" />
    <path d="M24 12v12l6 6" />
  </svg>
)

const stats = [
  { number: '5.000+', label: 'Pólizas', icon: iconPólizas },
  { number: '+10.000', label: 'Clientes', icon: iconClientes },
  { number: '+4,5 de 5', label: 'Valoración', icon: iconValoración },
  { number: '24/7', label: 'Atención al Cliente', icon: icon24_7 },
]

const Statistics = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <section className="py-20 lg:py-28 bg-conecta-blue text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-conecta-orange/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-conecta-orange/15 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.08),transparent)]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 text-center hover:bg-white/15 hover:border-conecta-orange/40 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-conecta-orange/0 to-conecta-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-conecta-orange/20 text-conecta-orange mb-4 group-hover:bg-conecta-orange/30 group-hover:scale-110 transition-all duration-300">
                  <span className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center" aria-hidden>
                    {stat.icon}
                  </span>
                </div>
                <motion.div
                  className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 font-number tracking-tight"
                  initial={{ scale: 0.8 }}
                  animate={isInView ? { scale: 1 } : { scale: 0.8 }}
                  transition={{
                    delay: index * 0.12 + 0.2,
                    type: 'spring',
                    stiffness: 180,
                    damping: 18,
                  }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-white/80 text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Statistics

