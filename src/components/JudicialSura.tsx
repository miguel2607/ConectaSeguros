import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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
  coberturas?: {
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

const JudicialSura = () => {
  const [activeTab, setActiveTab] = useState<'vida' | 'salud' | 'autos'>('vida')
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

  useEffect(() => {
    const saved = localStorage.getItem('judicial_pricing')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPricing({
          ...pricing,
          ...parsed,
          coberturas: parsed.coberturas || pricing.coberturas,
        })
      } catch (e) {
        console.error('Error loading pricing data:', e)
      }
    }
  }, [])

  return (
    <section
      id="rama-judicial-sura"
      className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="bg-conecta-orange rounded-2xl p-8 md:p-12 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-conecta-blue">sura</div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl text-white mb-4">
                RAMA JUDICIAL – SURA
              </h2>
              <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto font-medium">
                FUNCIONARIO DE LA RAMA JUDICIAL, RECUERDA LOS BENEFICIOS DE SEGUROS QUE TIENES A DISPOSICIÓN
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { id: 'vida', label: 'Seguro de Vida Grupo', icon: '🛡️' },
            { id: 'salud', label: 'Seguro de Salud', icon: '🏥' },
            { id: 'autos', label: 'Autos y Motos', icon: '🚗' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'vida' | 'salud' | 'autos')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-conecta-orange text-white shadow-lg scale-105'
                  : 'bg-white text-conecta-blue hover:bg-gray-100 shadow-md'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Seguro de Vida Grupo */}
        {activeTab === 'vida' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Intro Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl md:text-3xl text-conecta-blue mb-6">
                Seguro de Vida Grupo
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span><span className="font-number">6</span> planes diferentes que se ajustan a tus necesidades</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span>Aseguramos a todos los empleados de la rama sin importar cargo</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span>Extendemos los beneficios a padres, hijos y cónyuge del empleado</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span>Valores mensuales unificados sin considerar la edad del funcionario</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span className="font-semibold">Planes con cuota mensual desde <span className="font-number">${pricing.otros.desde}</span> hasta <span className="font-number">${pricing.otros.hasta}</span> COP</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-conecta-blue to-conecta-blue-light rounded-xl p-6 text-white">
                  <h4 className="text-xl mb-4">Beneficios Especiales</h4>
                  <p className="text-white/90 leading-relaxed">
                    Como funcionario de la Rama Judicial, tienes acceso a planes diseñados especialmente para ti y tu familia, con coberturas completas y tarifas preferenciales.
                  </p>
                </div>
              </div>
            </div>

            {/* Tabla de Coberturas - Afiliado Principal y Familiares */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 overflow-x-auto">
              <h4 className="text-xl text-conecta-blue mb-6">Afiliado Principal y sus Familiares</h4>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-sm">
                  <thead>
                    <tr className="bg-conecta-orange text-white">
                      <th className="px-4 py-3 text-left font-bold">AMPARO</th>
                      <th className="px-3 py-3 text-center font-bold">PLAN A</th>
                      <th className="px-3 py-3 text-center font-bold">PLAN B</th>
                      <th className="px-3 py-3 text-center font-bold">PLAN C</th>
                      <th className="px-3 py-3 text-center font-bold">PLAN D</th>
                      <th className="px-3 py-3 text-center font-bold">PLAN E</th>
                      <th className="px-3 py-3 text-center font-bold">PLAN F</th>
                      <th className="px-3 py-3 text-center font-bold">PLAN G</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50">
                      <td colSpan={8} className="px-4 py-2 font-semibold text-conecta-blue">COBERTURAS DE VIDA GRUPO</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Vida</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.vida.planA || '250M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.vida.planB || '200M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.vida.planC || '100M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.vida.planD || '80M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.vida.planE || '50M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.vida.planF || '30M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.vida.planG || '20M'}</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3">Invalidez o pérdida por accidente o enfermedad</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidez.planA || '250M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidez.planB || '200M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidez.planC || '100M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidez.planD || '80M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidez.planE || '50M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidez.planF || '30M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidez.planG || '20M'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Enfermedades Graves <span className="font-number">50%</span> de anticipo</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.enfermedadesGraves.planA || '125M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.enfermedadesGraves.planB || '100M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.enfermedadesGraves.planC || '50M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.enfermedadesGraves.planD || '40M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.enfermedadesGraves.planE || '25M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.enfermedadesGraves.planF || '15M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.enfermedadesGraves.planG || '10M'}</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3">Auxilio funerario</td>
                      <td colSpan={7} className="px-3 py-3 text-center font-semibold"><span className="font-number">{pricing.coberturas?.auxilioFunerario || '4.000.000'}</span> (Todos los planes)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Bono Canasta</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.bonoCanasta.planA || '8.4M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.bonoCanasta.planB || '7.2M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.bonoCanasta.planC || '6M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.bonoCanasta.planD || '4.8M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.bonoCanasta.planE || '3.6M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.bonoCanasta.planF || '2.4M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.bonoCanasta.planG || '1.2M'}</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3">Auxilio maternidad/paternidad</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.auxilioMaternidad.planA || '1M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.auxilioMaternidad.planB || '1M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.auxilioMaternidad.planC || '1M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.auxilioMaternidad.planD || '800K'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.auxilioMaternidad.planE || '500K'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.auxilioMaternidad.planF || '300K'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.auxilioMaternidad.planG || '200K'}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td colSpan={8} className="px-4 py-2 font-semibold text-conecta-blue">COBERTURAS DE ACCIDENTES PERSONALES</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Muerte Accidental</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.muerteAccidental.planA || '250M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.muerteAccidental.planB || '200M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.muerteAccidental.planC || '100M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.muerteAccidental.planD || '80M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.muerteAccidental.planE || '50M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.muerteAccidental.planF || '30M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.muerteAccidental.planG || '20M'}</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3">Invalidez, desmembración o inutilización</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidezDesmembracion.planA || '250M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidezDesmembracion.planB || '200M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidezDesmembracion.planC || '100M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidezDesmembracion.planD || '80M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidezDesmembracion.planE || '50M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidezDesmembracion.planF || '30M'}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.coberturas?.invalidezDesmembracion.planG || '20M'}</td>
                    </tr>
                    <tr className="bg-conecta-orange/10">
                      <td className="px-4 py-3 font-bold">TOTAL PRIMA EMPLEADO</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.empleado.planA}</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.empleado.planB}</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.empleado.planC}</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.empleado.planD}</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.empleado.planE}</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.empleado.planF}</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.empleado.planG}</td>
                    </tr>
                    <tr className="bg-conecta-orange/10">
                      <td className="px-4 py-3 font-bold">TOTAL PRIMA CÓNYUGE, HIJOS, HERMANOS, SOBRINOS</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.conyuge.planA}</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.conyuge.planB}</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.conyuge.planC}</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.conyuge.planD}</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.conyuge.planE}</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.conyuge.planF}</td>
                      <td className="px-3 py-3 text-center font-bold font-number">${pricing.conyuge.planG}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabla Progenitores */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 overflow-x-auto">
              <h4 className="text-xl text-conecta-orange mb-6">Progenitores</h4>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="bg-conecta-orange text-white">
                      <th className="px-4 py-3 text-left font-bold">AMPARO</th>
                      <th className="px-3 py-3 text-center font-bold">PLAN A</th>
                      <th className="px-3 py-3 text-center font-bold">PLAN B</th>
                      <th className="px-3 py-3 text-center font-bold">PLAN C</th>
                      <th className="px-3 py-3 text-center font-bold">PLAN D</th>
                      <th className="px-3 py-3 text-center font-bold">PLAN E</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="px-4 py-2 font-semibold text-conecta-blue">COBERTURAS DE VIDA GRUPO</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Vida</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.vida.planA}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.vida.planB}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.vida.planC}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.vida.planD}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.vida.planE}</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3">Invalidez Desmembración o Inutilización por Accidente o Enfermedad</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.invalidez.planA}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.invalidez.planB}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.invalidez.planC}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.invalidez.planD}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.invalidez.planE}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Bono para Gastos Funerarios</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.funerario.planA}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.funerario.planB}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.funerario.planC}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.funerario.planD}</td>
                      <td className="px-3 py-3 text-center font-number">{pricing.progenitores.funerario.planE}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Seguro de Salud */}
        {activeTab === 'salud' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl md:text-3xl text-conecta-blue mb-6">
                Seguro de Salud
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span><strong><span className="font-number">3</span> planes seguro salud:</strong> Plan Evoluciona, Plan Clásico y Plan Global que se ajustan a tus necesidades</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span><strong>Cobertura Internacional</strong> - Asistencia en viaje al Exterior</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span>Extendemos los beneficios a padres, hijos, nietos y cónyuge del empleado</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span>Con la red más amplia Médico-Hospitalaria de Colombia</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span className="font-semibold text-conecta-blue">Planes desde <span className="font-number">${pricing.otros.salud}</span> al mes</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-conecta-blue to-conecta-blue-light rounded-xl p-6 text-white">
                  <h4 className="text-xl mb-4">Red de Atención</h4>
                  <p className="text-white/90 leading-relaxed mb-4">
                    Acceso a la red médica más amplia de Colombia, con cobertura nacional e internacional para ti y tu familia.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span>🏥</span>
                      <span>Hospitales y clínicas de alta calidad</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>👨‍⚕️</span>
                      <span>Especialistas en todas las áreas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>✈️</span>
                      <span>Cobertura en viajes al exterior</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Seguro de Autos y Motos */}
        {activeTab === 'autos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl md:text-3xl font-extrabold text-conecta-blue mb-6">
                Seguro de Autos y Motos
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span><strong>Póliza Todo Riesgo Plan Global Sura</strong></span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span><strong>Tarifas Preferenciales</strong> para funcionarios de la Rama Judicial</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span>Servicios de valor agregado en AutosSura en ciudades principales</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span>Acompañamiento especializado y de calidad en todo lo relacionado con tu vehículo</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-conecta-orange text-xl">✓</span>
                      <span className="font-semibold text-conecta-blue">
                        Prima Mensual desde: Autos <span className="font-number">${pricing.otros.autos}</span> | Motos desde <span className="font-number">${pricing.otros.motos}</span> (IVA Incluido)
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-conecta-orange to-conecta-orange-dark rounded-xl p-6 text-white">
                  <h4 className="text-xl mb-4">Servicios AutosSura</h4>
                  <p className="text-white/90 leading-relaxed mb-4">
                    Acceso a servicios exclusivos en las principales ciudades de Colombia para el cuidado y mantenimiento de tu vehículo.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span>🔧</span>
                      <span>Talleres especializados</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>🚑</span>
                      <span>Grúa y asistencia vial <span className="font-number">24/7</span></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>📱</span>
                      <span>App AutosSura para gestión</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-gradient-to-r from-conecta-blue to-conecta-blue-light rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl mb-4">
            ¿Necesitas más información?
          </h3>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Nuestro equipo especializado está listo para ayudarte a elegir el plan que mejor se adapte a tus necesidades y las de tu familia.
          </p>
          <a
            href="#contacto"
            className="inline-block px-8 py-4 bg-conecta-orange text-white font-bold rounded-lg hover:bg-conecta-orange-dark transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Solicitar Asesoría Especializada
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default JudicialSura
