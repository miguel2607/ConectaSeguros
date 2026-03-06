import { motion } from 'framer-motion'

const benefits = [
  {
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80',
    title: 'Protección Completa',
    description:
      'Coberturas diseñadas para proteger lo que más valoras, desde tu hogar hasta tu negocio.',
  },
  {
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80',
    title: 'Precios Competitivos',
    description:
      'Planes flexibles que se adaptan a tu presupuesto sin comprometer la calidad del servicio.',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    title: 'Proceso Rápido',
    description:
      'Contrata tu seguro en minutos con nuestro proceso digitalizado y sin complicaciones.',
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
    title: 'Asesoría Personalizada',
    description:
      'Expertos dedicados a ayudarte a encontrar la mejor solución para tus necesidades específicas.',
  },
  {
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80',
    title: 'Plataforma Digital',
    description:
      'Gestiona tus pólizas, reporta siniestros y accede a toda la información desde cualquier dispositivo.',
  },
  {
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80',
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
              <div className="w-full h-32 md:h-36 mb-4 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={benefit.image}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
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

