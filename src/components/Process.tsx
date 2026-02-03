import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Consulta Gratuita',
    description:
      'Agenda una consulta sin costo con nuestros asesores. Analizamos tu situación y necesidades específicas.',
    icon: '📞',
  },
  {
    number: '02',
    title: 'Cotización Personalizada',
    description:
      'Te presentamos opciones de seguros adaptadas a tu presupuesto y objetivos, con toda la información clara.',
    icon: '📋',
  },
  {
    number: '03',
    title: 'Contratación Rápida',
    description:
      'Una vez que elijas tu plan, el proceso de contratación es rápido y sencillo, todo digital.',
    icon: '✍️',
  },
  {
    number: '04',
    title: 'Acompañamiento Continuo',
    description:
      'Te acompañamos durante toda la vigencia de tu póliza, ayudándote cuando lo necesites.',
    icon: '🤝',
  },
]

const Process = () => {
  return (
    <section className="py-16 lg:py-24 bg-conecta-blue text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-conecta-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-conecta-orange rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-3">
            CÓMO FUNCIONA
          </h2>
          <div className="w-24 h-1 bg-conecta-orange mx-auto mb-4"></div>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Un proceso simple y transparente para obtener tu seguro
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center relative"
            >
              <div className="absolute -top-4 -right-4 text-8xl font-extrabold text-white/10 font-number">
                {step.number}
              </div>
              <div className="text-5xl mb-4 relative z-10">{step.icon}</div>
              <h3 className="text-xl mb-3 relative z-10">
                {step.title}
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed relative z-10">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <svg
                    className="w-8 h-8 text-conecta-orange"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process

