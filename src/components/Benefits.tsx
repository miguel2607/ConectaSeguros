import { motion } from 'framer-motion'

const benefits = [
  {
    icon: '🛡️',
    title: 'Protección Completa',
    description:
      'Coberturas diseñadas para proteger lo que más valoras, desde tu hogar hasta tu negocio.',
  },
  {
    icon: '💰',
    title: 'Precios Competitivos',
    description:
      'Planes flexibles que se adaptan a tu presupuesto sin comprometer la calidad del servicio.',
  },
  {
    icon: '⚡',
    title: 'Proceso Rápido',
    description:
      'Contrata tu seguro en minutos con nuestro proceso digitalizado y sin complicaciones.',
  },
  {
    icon: '👥',
    title: 'Asesoría Personalizada',
    description:
      'Expertos dedicados a ayudarte a encontrar la mejor solución para tus necesidades específicas.',
  },
  {
    icon: '📱',
    title: 'Plataforma Digital',
    description:
      'Gestiona tus pólizas, reporta siniestros y accede a toda la información desde cualquier dispositivo.',
  },
  {
    icon: '🕐',
    title: 'Atención 24/7',
    description:
      'Estamos disponibles cuando más nos necesitas, con soporte continuo para emergencias.',
  },
]

const Benefits = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl text-conecta-blue mb-3">
            ¿POR QUÉ ELEGIRNOS?
          </h2>
          <div className="w-24 h-1 bg-conecta-orange mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ventajas que nos hacen la mejor opción para proteger tu futuro
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl text-conecta-blue mb-3">
                {benefit.title === 'Atención 24/7' ? (
                  <>Atención <span className="font-number">24/7</span></>
                ) : (
                  benefit.title
                )}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Benefits

