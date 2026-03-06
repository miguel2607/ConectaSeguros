import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOGOS_BASE = '/logos/aseguradoras'
const CONECTA_WHATSAPP = '573226467073'
const CONECTA_WHATSAPP_DISPLAY = '322 646 7073'

// Primeras 4 = principales; el resto se muestran al expandir
const aseguradoras = [
  { name: 'SURA Seguros', number: '#888', logo: 'sura' },
  { name: 'Allianz Colombia', number: '#265', logo: 'allianz' },
  { name: 'MAPFRE Colombia', number: '#624', logo: 'mapfre' },
  { name: 'Seguros Bolívar', number: '#322', logo: 'bolivar' },
  { name: 'Equidad Seguros', number: '#324', logo: 'equidad' },
  { name: 'AXA Colpatria', number: '#247', logo: 'axa-colpatria' },
  { name: 'Liberty Seguros', number: '#224', logo: 'liberty' },
  { name: 'Aseguradora Solidaria', number: '#789', logo: 'aseguradora-solidaria' },
  { name: 'SBS', number: '#360', logo: 'sbs' },
  { name: 'Seguros del Estado', number: '#338', logo: 'seguros-estado' },
  { name: 'HDI Seguros', number: '#204', logo: 'hdi' },
]

const PRINCIPALES_COUNT = 4

const lineasEmergencia = [
  { name: 'Policía', number: '112 / 123', logo: 'policia' },
  { name: 'Policía Carretera', number: '#767', logo: 'policia-carretera' },
  { name: 'Bomberos', number: '#119', logo: 'bomberos' },
  { name: 'Emergencias', number: '127', logo: 'emergencias' },
]

type AseguradoraItem = { name: string; number: string; logo: string }

function AseguradoraCard({ aseg, index }: { readonly aseg: AseguradoraItem; readonly index: number }) {
  const [logoError, setLogoError] = useState(false)
  const logoPath = `${LOGOS_BASE}/${aseg.logo}.png`
  const whatsappUrl = `https://wa.me/${CONECTA_WHATSAPP}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index, 7) * 0.05, duration: 0.4 }}
      className="rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col bg-[#ffffff]"
    >
      {/* Logo + nombre: mismo blanco que el fondo de los logos para que no se vea la partecita blanca de la imagen */}
      <div className="p-5 pb-3 bg-[#ffffff]">
        <div className="w-full h-20 flex items-center justify-center mb-3">
          {logoError ? (
            <span className="text-conecta-blue font-bold text-lg text-center line-clamp-2">{aseg.name}</span>
          ) : (
            <img
              src={logoPath}
              alt={aseg.name}
              className="max-h-full w-auto object-contain"
              onError={() => setLogoError(true)}
            />
          )}
        </div>
        <h4 className="text-conecta-blue font-bold text-center text-base md:text-lg">{aseg.name}</h4>
      </div>

      {/* Contactos */}
      <div className="p-4 pt-2 space-y-3 flex-1">
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-conecta-orange/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-conecta-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Desde celular (numeral)</p>
            <p className="text-conecta-blue font-bold font-number">{aseg.number}</p>
          </div>
        </div>

        {/* WhatsApp CONECTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 transition-colors"
        >
          <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide opacity-90">Asesoría CONECTA</p>
            <p className="font-bold font-number">{CONECTA_WHATSAPP_DISPLAY}</p>
          </div>
        </a>
      </div>
    </motion.div>
  )
}

function EmergenciaCard({ aseg, index }: { readonly aseg: AseguradoraItem; readonly index: number }) {
  const [logoError, setLogoError] = useState(false)
  const logoPath = `${LOGOS_BASE}/${aseg.logo}.png`
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center"
    >
      <div className="h-14 flex items-center justify-center mb-3">
        {logoError ? (
          <span className="text-conecta-blue font-bold text-base md:text-lg">{aseg.name}</span>
        ) : (
          <img src={logoPath} alt={aseg.name} className="max-h-full w-auto object-contain" onError={() => setLogoError(true)} />
        )}
      </div>
      <h4 className="text-conecta-blue font-bold text-base md:text-lg mb-2">{aseg.name}</h4>
      <p className="text-conecta-orange font-bold font-number text-lg md:text-xl">{aseg.number}</p>
    </motion.div>
  )
}

const DirectorioAseguradoras = () => {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? aseguradoras : aseguradoras.slice(0, PRINCIPALES_COUNT)
  const hasMore = aseguradoras.length > PRINCIPALES_COUNT

  return (
    <div className="mb-12">
      <h3 className="text-xl md:text-2xl font-semibold text-white/95 mb-6 text-center">
        Aseguradoras
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="wait">
          {visible.map((aseg, index) => (
            <AseguradoraCard key={aseg.name} aseg={aseg} index={index} />
          ))}
        </AnimatePresence>
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all bg-white text-conecta-blue hover:bg-conecta-orange hover:text-white border-2 border-white"
          >
            {showAll ? 'Ver menos' : 'Ver todas las aseguradoras'}
            <svg className={`w-5 h-5 transition-transform ${showAll ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

const Process = () => {
  return (
    <section className="py-16 lg:py-24 bg-conecta-blue text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-conecta-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-conecta-orange rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Directorio de Aseguradoras */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex justify-center mb-6">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contacto Directo
            </a>
          </div>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-3">
              Directorio de Aseguradoras
            </h2>
            <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto">
              Accede rápidamente a los contactos de emergencia de las principales aseguradoras de Colombia
            </p>
          </div>

          {/* Aseguradoras: 4 principales + botón ver más */}
          <DirectorioAseguradoras />
          {/* Líneas de emergencia */}
          <div className="mt-14">
            <h3 className="text-xl md:text-2xl font-semibold text-white/95 mb-6 text-center">
              Líneas de emergencia
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
              {lineasEmergencia.map((aseg, index) => (
                <EmergenciaCard key={aseg.name} aseg={aseg} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Process

