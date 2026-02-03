import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: '¿Cómo elijo el seguro adecuado para mí?',
    answer:
      'Te recomendamos analizar tus necesidades específicas: qué quieres proteger (casa, auto, vida, salud), tu presupuesto y tus objetivos a largo plazo. Nuestros asesores pueden ayudarte a evaluar tu situación y recomendarte la mejor opción.',
  },
  {
    question: '¿Cuánto tiempo tarda el proceso de contratación?',
    answer:
      <>El proceso puede ser muy rápido, desde minutos hasta unos días dependiendo del tipo de seguro. Para seguros básicos como auto o hogar, puedes tener tu póliza el mismo día. Para seguros más complejos como vida o empresariales, puede tomar de <span className="font-number">3</span> a <span className="font-number">7</span> días hábiles.</>,
  },
  {
    question: '¿Qué pasa si necesito hacer un reclamo?',
    answer:
      <>Nuestro proceso de reclamos es sencillo: puedes reportarlo por teléfono, nuestra plataforma digital o app móvil. Un ajustador evaluará tu caso y te guiará en cada paso. Estamos disponibles <span className="font-number">24/7</span> para asistirte.</>,
  },
  {
    question: '¿Puedo cambiar mi seguro en el futuro?',
    answer:
      'Sí, puedes actualizar tu cobertura, cambiar de plan o incluso cambiar de aseguradora. Te recomendamos revisar tu seguro al menos una vez al año para asegurarte de que sigue siendo adecuado para tus necesidades.',
  },
  {
    question: '¿Ofrecen descuentos por contratar múltiples seguros?',
    answer:
      'Sí, ofrecemos paquetes y descuentos cuando contratas varios seguros con nosotros. Por ejemplo, si contratas seguro de auto y hogar juntos, puedes obtener un descuento significativo. Consulta con nuestros asesores para conocer las promociones vigentes.',
  },
  {
    question: '¿Qué documentos necesito para contratar un seguro?',
    answer:
      'Los documentos varían según el tipo de seguro. Generalmente necesitarás identificación oficial, comprobante de domicilio y, dependiendo del seguro, documentos específicos (como factura del auto para seguro vehicular). Nuestros asesores te indicarán exactamente qué necesitas.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl text-conecta-blue mb-3">
            PREGUNTAS FRECUENTES
          </h2>
          <div className="w-24 h-1 bg-conecta-orange mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Resolvemos las dudas más comunes sobre nuestros seguros
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-conecta-blue pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-5 h-5 text-conecta-orange flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 text-gray-700 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

