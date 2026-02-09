import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../../config/api'

interface PricingData {
  empleado: {
    planA: string
    planB: string
    planC: string
    planD: string
    planE: string
    planF: string
    planG: string
  }
  conyuge: {
    planA: string
    planB: string
    planC: string
    planD: string
    planE: string
    planF: string
    planG: string
  }
  progenitores: {
    vida: { planA: string; planB: string; planC: string; planD: string; planE: string }
    invalidez: { planA: string; planB: string; planC: string; planD: string; planE: string }
    funerario: { planA: string; planB: string; planC: string; planD: string; planE: string }
  }
  coberturas: {
    vida: { planA: string; planB: string; planC: string; planD: string; planE: string; planF: string; planG: string }
    invalidez: { planA: string; planB: string; planC: string; planD: string; planE: string; planF: string; planG: string }
    enfermedadesGraves: { planA: string; planB: string; planC: string; planD: string; planE: string; planF: string; planG: string }
    auxilioFunerario: string
    bonoCanasta: { planA: string; planB: string; planC: string; planD: string; planE: string; planF: string; planG: string }
    auxilioMaternidad: { planA: string; planB: string; planC: string; planD: string; planE: string; planF: string; planG: string }
    muerteAccidental: { planA: string; planB: string; planC: string; planD: string; planE: string; planF: string; planG: string }
    invalidezDesmembracion: { planA: string; planB: string; planC: string; planD: string; planE: string; planF: string; planG: string }
  }
  otros: {
    desde: string
    hasta: string
    salud: string
    autos: string
    motos: string
  }
}

const AdminPricing = () => {
  const [pricing, setPricing] = useState<PricingData>({
    empleado: {
      planA: '241,600',
      planB: '195,000',
      planC: '107,900',
      planD: '84,000',
      planE: '55,800',
      planF: '34,500',
      planG: '23,000',
    },
    conyuge: {
      planA: '241,600',
      planB: '195,000',
      planC: '107,900',
      planD: '84,000',
      planE: '55,800',
      planF: '34,500',
      planG: '23,000',
    },
    progenitores: {
      vida: { planA: '50M', planB: '40M', planC: '30M', planD: '20M', planE: '10M' },
      invalidez: { planA: '50M', planB: '40M', planC: '30M', planD: '20M', planE: '10M' },
      funerario: { planA: '5M', planB: '4M', planC: '3M', planD: '2M', planE: '1M' },
    },
    coberturas: {
      vida: { planA: '250M', planB: '200M', planC: '100M', planD: '80M', planE: '50M', planF: '30M', planG: '20M' },
      invalidez: { planA: '250M', planB: '200M', planC: '100M', planD: '80M', planE: '50M', planF: '30M', planG: '20M' },
      enfermedadesGraves: { planA: '125M', planB: '100M', planC: '50M', planD: '40M', planE: '25M', planF: '15M', planG: '10M' },
      auxilioFunerario: '4.000.000',
      bonoCanasta: { planA: '8.4M', planB: '7.2M', planC: '6M', planD: '4.8M', planE: '3.6M', planF: '2.4M', planG: '1.2M' },
      auxilioMaternidad: { planA: '1M', planB: '1M', planC: '1M', planD: '800K', planE: '500K', planF: '300K', planG: '200K' },
      muerteAccidental: { planA: '250M', planB: '200M', planC: '100M', planD: '80M', planE: '50M', planF: '30M', planG: '20M' },
      invalidezDesmembracion: { planA: '250M', planB: '200M', planC: '100M', planD: '80M', planE: '50M', planF: '30M', planG: '20M' },
    },
    otros: {
      desde: '23.000',
      hasta: '250.000',
      salud: '179.900',
      autos: '91.700',
      motos: '41.700',
    },
  })

  const [saved, setSaved] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadPricing()
  }, [])

  const loadPricing = async () => {
    try {
      setIsLoading(true)
      const data = await api.getPricing()
      console.log('Datos recibidos del backend:', data)
      if (data) {
        // Asegurarse de que todos los campos estén presentes
        const updatedPricing: PricingData = {
          empleado: data.empleado || pricing.empleado,
          conyuge: data.conyuge || pricing.conyuge,
          progenitores: data.progenitores || pricing.progenitores,
          coberturas: {
            vida: data.coberturas?.vida || pricing.coberturas.vida,
            invalidez: data.coberturas?.invalidez || pricing.coberturas.invalidez,
            enfermedadesGraves: data.coberturas?.enfermedadesGraves || pricing.coberturas.enfermedadesGraves,
            auxilioFunerario: data.coberturas?.auxilioFunerario || pricing.coberturas.auxilioFunerario,
            bonoCanasta: data.coberturas?.bonoCanasta || pricing.coberturas.bonoCanasta,
            auxilioMaternidad: data.coberturas?.auxilioMaternidad || pricing.coberturas.auxilioMaternidad,
            muerteAccidental: data.coberturas?.muerteAccidental || pricing.coberturas.muerteAccidental,
            invalidezDesmembracion: data.coberturas?.invalidezDesmembracion || pricing.coberturas.invalidezDesmembracion,
          },
          otros: data.otros || pricing.otros,
        }
        setPricing(updatedPricing)
      }
    } catch (error: any) {
      console.error('Error loading pricing data:', error)
      // Si hay error, mantener valores por defecto
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = () => {
    setHasChanges(true)
    setSaved(false)
  }

  const handleSave = async () => {
    // Verificar autenticación antes de guardar
    if (!api.isAuthenticated()) {
      alert('No estás autenticado. Por favor, inicia sesión nuevamente.')
      return
    }

    try {
      setIsSaving(true)
      console.log('Enviando pricing:', JSON.stringify(pricing, null, 2))
      const result = await api.updatePricing(pricing)
      console.log('Pricing guardado exitosamente:', result)
      setSaved(true)
      setHasChanges(false)
      // Recargar los datos actualizados desde el servidor
      await loadPricing()
      setTimeout(() => setSaved(false), 3000)
    } catch (error: any) {
      console.error('Error saving pricing:', error)
      let errorMessage = 'Error desconocido al guardar los precios'
      
      if (error?.message) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      
      // Verificar si es un error de autenticación
      if (errorMessage.includes('401') || errorMessage.includes('Sesión expirada') || errorMessage.includes('Unauthorized')) {
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.')
        window.location.href = '/admin'
      } else {
        alert(`Error al guardar los precios: ${errorMessage}\n\nPor favor, verifica que estés autenticado y que el backend esté funcionando.`)
      }
    } finally {
      setIsSaving(false)
    }
  }

  const updateCobertura = (key: keyof typeof pricing.coberturas, plan: string, value: string) => {
    if (key === 'auxilioFunerario') {
      setPricing({
        ...pricing,
        coberturas: { ...pricing.coberturas, auxilioFunerario: value },
      })
    } else {
      setPricing({
        ...pricing,
        coberturas: {
          ...pricing.coberturas,
          [key]: {
            ...pricing.coberturas[key],
            [`plan${plan}`]: value,
          } as any,
        },
      })
    }
    handleChange()
  }

  const sections = [
    {
      title: 'Precios - Afiliado Principal',
      icon: '👤',
      data: pricing.empleado,
      plans: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      updateFn: (plan: string, value: string) => {
        setPricing({
          ...pricing,
          empleado: { ...pricing.empleado, [`plan${plan}`]: value },
        })
        handleChange()
      },
    },
    {
      title: 'Precios - Cónyuge y Familiares',
      icon: '👨‍👩‍👧‍👦',
      data: pricing.conyuge,
      plans: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      updateFn: (plan: string, value: string) => {
        setPricing({
          ...pricing,
          conyuge: { ...pricing.conyuge, [`plan${plan}`]: value },
        })
        handleChange()
      },
    },
  ]

  const coberturaSections = [
    { key: 'vida', label: 'Vida', icon: '🛡️' },
    { key: 'invalidez', label: 'Invalidez o pérdida por accidente o enfermedad', icon: '♿' },
    { key: 'enfermedadesGraves', label: 'Enfermedades Graves (50% de anticipo)', icon: '🏥' },
    { key: 'bonoCanasta', label: 'Bono Canasta', icon: '🛒' },
    { key: 'auxilioMaternidad', label: 'Auxilio maternidad/paternidad', icon: '👶' },
    { key: 'muerteAccidental', label: 'Muerte Accidental', icon: '⚰️' },
    { key: 'invalidezDesmembracion', label: 'Invalidez, desmembración o inutilización', icon: '🦽' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-conecta-blue to-blue-900 rounded-3xl shadow-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl mb-2 flex items-center space-x-3">
              <span className="text-4xl">💰</span>
              <span>Gestión de Precios</span>
            </h2>
            <p className="text-white/80">Administra todos los precios de la Rama Judicial - SURA</p>
          </div>
          <motion.button
            whileHover={{ scale: isLoading || isSaving ? 1 : 1.05 }}
            whileTap={{ scale: isLoading || isSaving ? 1 : 0.95 }}
            onClick={handleSave}
            disabled={!hasChanges || isLoading || isSaving}
            className={`px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 flex items-center space-x-2 ${
              saved
                ? 'bg-green-500 hover:bg-green-600'
                : hasChanges && !isSaving
                ? 'bg-conecta-orange hover:bg-conecta-orange-dark'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Guardando...</span>
              </>
            ) : saved ? (
              <>
                <span>✓</span>
                <span>Guardado</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Guardar Cambios</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Secciones de precios principales */}
      {sections.map((section, idx) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
        >
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-3xl">{section.icon}</span>
            <h3 className="text-2xl text-conecta-blue">{section.title}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {section.plans.map((plan, planIdx) => (
              <motion.div
                key={plan}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (idx * 0.1) + (planIdx * 0.05) }}
                className="space-y-2"
              >
                <label className="block text-sm font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                  Plan {plan}
                </label>
                <input
                  type="text"
                  value={section.data[`plan${plan}` as keyof typeof section.data]}
                  onChange={(e) => section.updateFn(plan, e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-conecta-orange focus:border-conecta-orange outline-none transition-all duration-300 font-number text-lg hover:border-gray-300"
                  placeholder={`Plan ${plan}`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Coberturas de Vida Grupo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
      >
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-3xl">📋</span>
          <h3 className="text-2xl text-conecta-blue">Coberturas de Vida Grupo</h3>
        </div>
        <div className="space-y-6">
          {coberturaSections.map((section, idx) => (
            <div key={section.key} className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">{section.icon}</span>
                <h4 className="text-lg text-conecta-blue">{section.label}</h4>
              </div>
              {section.key === 'auxilioFunerario' ? (
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 bg-white px-3 py-2 rounded-lg">
                    Auxilio Funerario (Todos los planes)
                  </label>
                  <input
                    type="text"
                    value={pricing.coberturas.auxilioFunerario}
                    onChange={(e) => updateCobertura('auxilioFunerario', '', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-conecta-orange focus:border-conecta-orange outline-none transition-all duration-300 font-number text-lg hover:border-gray-300"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((plan, planIdx) => (
                    <motion.div
                      key={plan}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (idx * 0.05) + (planIdx * 0.02) }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-bold text-gray-700 bg-white px-3 py-2 rounded-lg">
                        Plan {plan}
                      </label>
                      <input
                        type="text"
                        value={
                          (pricing.coberturas[section.key as keyof typeof pricing.coberturas] as any)?.[`plan${plan}`] || ''
                        }
                        onChange={(e) => updateCobertura(section.key as keyof typeof pricing.coberturas, plan, e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-conecta-orange focus:border-conecta-orange outline-none transition-all duration-300 font-number text-lg hover:border-gray-300"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Progenitores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
      >
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-3xl">👴👵</span>
          <h3 className="text-2xl text-conecta-blue">Precios - Progenitores</h3>
        </div>
        <div className="space-y-8">
          {[
            { key: 'vida', label: 'Vida', icon: '🛡️' },
            { key: 'invalidez', label: 'Invalidez', icon: '♿' },
            { key: 'funerario', label: 'Bono Funerario', icon: '⚱️' },
          ].map((category) => (
            <div key={category.key} className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h4 className="text-xl text-conecta-blue">{category.label}</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {['A', 'B', 'C', 'D', 'E'].map((plan, planIdx) => (
                  <motion.div
                    key={plan}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: planIdx * 0.05 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-bold text-gray-700 bg-white px-3 py-2 rounded-lg">
                      Plan {plan}
                    </label>
                    <input
                      type="text"
                      value={
                        pricing.progenitores[category.key as keyof typeof pricing.progenitores][
                          `plan${plan}` as keyof typeof pricing.progenitores.vida
                        ]
                      }
                      onChange={(e) => {
                        setPricing({
                          ...pricing,
                          progenitores: {
                            ...pricing.progenitores,
                            [category.key]: {
                              ...pricing.progenitores[category.key as keyof typeof pricing.progenitores],
                              [`plan${plan}`]: e.target.value,
                            },
                          },
                        })
                        handleChange()
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-conecta-orange focus:border-conecta-orange outline-none transition-all duration-300 font-number text-lg hover:border-gray-300"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Otros Precios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
      >
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-3xl">📊</span>
          <h3 className="text-2xl text-conecta-blue">Otros Precios</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { key: 'desde', label: 'Desde', icon: '⬇️' },
            { key: 'hasta', label: 'Hasta', icon: '⬆️' },
            { key: 'salud', label: 'Salud', icon: '🏥' },
            { key: 'autos', label: 'Autos', icon: '🚗' },
            { key: 'motos', label: 'Motos', icon: '🏍️' },
          ].map((item, idx) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
              className="space-y-2"
            >
              <label className="block text-sm font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-lg flex items-center space-x-2">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </label>
              <input
                type="text"
                value={pricing.otros[item.key as keyof typeof pricing.otros]}
                onChange={(e) => {
                  setPricing({
                    ...pricing,
                    otros: { ...pricing.otros, [item.key]: e.target.value },
                  })
                  handleChange()
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-conecta-orange focus:border-conecta-orange outline-none transition-all duration-300 font-number text-lg hover:border-gray-300"
              />
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={!hasChanges}
          className={`mt-6 px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 ${
            saved
              ? 'bg-green-500 hover:bg-green-600'
              : hasChanges
              ? 'bg-conecta-orange hover:bg-orange-600'
              : 'bg-gray-400 cursor-not-allowed'
          } text-white`}
        >
          {saved ? '✓ Guardado Exitosamente' : 'Guardar Cambios'}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default AdminPricing
