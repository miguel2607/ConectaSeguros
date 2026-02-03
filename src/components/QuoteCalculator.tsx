import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const QuoteCalculator = () => {
  const [selectedType, setSelectedType] = useState('')
  const [age, setAge] = useState('')
  const [value, setValue] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const insuranceTypes = [
    { id: 'auto', name: 'Seguro de Auto', icon: '🚗' },
    { id: 'hogar', name: 'Seguro de Hogar', icon: '🏠' },
    { id: 'vida', name: 'Seguro de Vida', icon: '🛡️' },
    { id: 'salud', name: 'Seguro de Salud', icon: '🏥' },
  ]

  const calculateQuote = () => {
    if (!selectedType || !age || !value) {
      alert('Por favor completa todos los campos')
      return
    }

    const ageNum = parseInt(age)
    const valueNum = parseFloat(value)

    // Cálculo simplificado (en producción esto vendría de un backend)
    let baseRate = 0
    switch (selectedType) {
      case 'auto':
        baseRate = 0.03 // 3% del valor del auto
        break
      case 'hogar':
        baseRate = 0.002 // 0.2% del valor de la casa
        break
      case 'vida':
        baseRate = 0.01 // 1% del valor asegurado
        break
      case 'salud':
        baseRate = 150000 // Tarifa base mensual
        break
    }

    let monthlyPremium = 0
    if (selectedType === 'salud') {
      monthlyPremium = baseRate + (ageNum - 18) * 5000
    } else {
      monthlyPremium = (valueNum * baseRate) / 12
      // Ajuste por edad
      if (ageNum > 50) monthlyPremium *= 1.2
      if (ageNum < 30) monthlyPremium *= 0.9
    }

    setResult(Math.round(monthlyPremium))
  }

  return (
    <section className="py-16 lg:py-24 bg-conecta-orange text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-3">
            CALCULA TU COTIZACIÓN "esto puede ser opccional"
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-4"></div>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Obtén una estimación rápida del costo de tu seguro, puede variar el precio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto bg-white/20 rounded-2xl p-8 md:p-12"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3">
                Tipo de Seguro
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {insuranceTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedType === type.id
                        ? 'border-white bg-white/20 scale-105'
                        : 'border-white/30 hover:border-white/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className="text-xs font-medium">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Edad
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white"
                  placeholder="Ej: 35"
                  min="18"
                  max="80"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {selectedType === 'salud'
                    ? 'Número de Beneficiarios'
                    : 'Valor a Asegurar (COP)'}
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white"
                  placeholder={
                    selectedType === 'salud'
                      ? 'Ej: 2'
                      : 'Ej: 50000000'
                  }
                  min="0"
                />
              </div>
            </div>

            <button
              onClick={calculateQuote}
              className="w-full py-4 bg-white text-conecta-orange font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Calcular Cotización
            </button>

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/30 rounded-xl p-6 text-center border border-white/30"
              >
                <p className="text-sm mb-2">Precio estimado mensual</p>
                <p className="text-4xl font-extrabold mb-4 font-number">
                  ${result.toLocaleString('es-CO')} COP
                </p>
                <p className="text-xs text-white/80 mb-4">
                  * Esta es una estimación. El precio final puede variar según
                  tu perfil y coberturas seleccionadas.
                </p>
                <Link
                  to="/#contacto"
                  className="inline-block px-6 py-3 bg-conecta-blue text-white font-semibold rounded-lg hover:bg-conecta-blue-light transition-colors"
                >
                  Solicitar Cotización Exacta
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default QuoteCalculator

