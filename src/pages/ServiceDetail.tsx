import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const servicesConfig = {
  'seguro-hogar': {
    name: 'Seguro de Hogar',
    subtitle: 'Protege tu casa, tu familia y todo lo que has construido.',
    priceFrom: '$80.000 COP al mes',
    includes: [
      'Daños por incendio, robo, fenómenos naturales y responsabilidad civil',
      'Cobertura para muebles, electrodomésticos y objetos de valor',
      'Asistencia en el hogar (plomería, electricidad, cristales, etc.)',
      'Coberturas opcionales para equipos electrónicos, bicicletas y otros bienes específicos',
    ],
    howItWorks: [
      'Definimos contigo el valor de la vivienda y contenidos que quieres proteger.',
      'Te presentamos diferentes niveles de cobertura, deducibles y formas de pago.',
      'Contratas en minutos y recibes tu póliza digital lista para usar cuando la necesites.',
      'Te acompañamos en todo el proceso de reclamación en caso de siniestro.',
    ],
    idealFor:
      'Personas y familias en Colombia que quieren cuidar su patrimonio, proteger su hogar frente a eventos inesperados (incendios, robos, daños por agua, etc.) y contar con un respaldo económico para reparar o reemplazar sus bienes.',
  },
  'seguro-vida': {
    name: 'Seguro de Vida',
    subtitle: 'Tranquilidad financiera para quienes más quieres.',
    priceFrom: '$70.000 COP al mes',
    includes: [
      'Suma asegurada personalizada para tus objetivos',
      'Cobertura por fallecimiento y opciones con invalidez',
      'Posibilidad de ahorro e inversión a largo plazo (según el plan)',
      'Beneficios adicionales como anticipo por enfermedades graves (según el plan contratado)',
    ],
    howItWorks: [
      'Analizamos tu situación actual en Colombia: ingresos, deudas, dependientes económicos y metas.',
      'Definimos una suma asegurada y un plazo que se adapten a tu presupuesto mensual.',
      'Te presentamos distintas alternativas (vida temporal, vida entera, con ahorro, etc.) de forma clara y sin letra chiquita.',
      'Tendrás acompañamiento permanente para ajustar tu plan si tu situación cambia con los años.',
    ],
    idealFor:
      'Personas que quieren proteger a su familia, asegurar el pago de deudas (como créditos de vivienda o educativos) y garantizar estabilidad económica en caso de fallecimiento o invalidez.',
  },
  'seguro-vehicular': {
    name: 'Seguro de Auto',
    subtitle: 'Conduce en Colombia con la confianza de estar respaldado.',
    priceFrom: '$120.000 COP al mes',
    includes: [
      'Responsabilidad civil obligatoria',
      'Cobertura amplia por daños, robo total y parcial',
      'Asistencia vial 24/7 y auto sustituto (según plan)',
      'Coberturas adicionales como pérdida de llaves, rotura de vidrios y daños en rines (según plan)',
    ],
    howItWorks: [
      'Cotizamos tu vehículo de acuerdo con modelo, año, ciudad y uso (particular o empresarial).',
      'Eliges entre cobertura básica (solo RC), media o amplia, según el nivel de protección que busques.',
      'Definimos el valor asegurado y las asistencias adicionales que deseas incluir.',
      'Puedes pagar de contado o mes a mes con diferentes medios de pago disponibles en Colombia.',
    ],
    idealFor:
      'Personas que utilizan su vehículo todos los días, viajan con su familia o usan el auto para trabajar y necesitan respaldo ante accidentes, robos o daños a terceros.',
  },
  'seguro-empresarial': {
    name: 'Seguro Empresarial',
    subtitle: 'Protección integral para tu negocio y tus colaboradores.',
    priceFrom: 'Planes a la medida en COP',
    includes: [
      'Cobertura para inmuebles, maquinaria y stock',
      'Responsabilidad civil frente a terceros',
      'Seguros para flotillas, accidentes personales y gastos médicos',
      'Opciones para proteger equipos electrónicos, transporte de mercancías y responsabilidad profesional',
    ],
    howItWorks: [
      'Realizamos un diagnóstico de riesgos de tu negocio (sector, ubicación, activos, personal, etc.).',
      'Diseñamos un programa de seguros a la medida, combinando diferentes productos según tu realidad.',
      'Definimos sumas aseguradas, deducibles y condiciones especiales para que el costo sea competitivo.',
      'Asignamos un ejecutivo de cuenta que te acompaña en la operación diaria y en la atención de siniestros.',
    ],
    idealFor:
      'Empresas pequeñas, medianas y grandes en Colombia que buscan estabilidad, continuidad operativa y protección frente a pérdidas inesperadas o reclamaciones de terceros.',
  },
  'seguro-salud': {
    name: 'Seguro de Salud',
    subtitle: 'Atención médica privada cuando más la necesitas, en Colombia y el exterior (según plan).',
    priceFrom: '$250.000 COP al mes',
    includes: [
      'Cobertura por hospitalización, cirugías y estudios',
      'Red de hospitales y médicos a nivel nacional',
      'Cobertura internacional opcional (según plan)',
      'Atención en emergencias, maternidad y acceso a especialistas sin largas filas (según el plan elegido)',
    ],
    howItWorks: [
      'Seleccionamos el plan según tu edad, composición familiar, ciudad y presupuesto mensual en COP.',
      'Definimos deducible y coaseguro para equilibrar el costo de la prima con el nivel de protección que necesitas.',
      'Te explicamos claramente cómo usar tu póliza: autorizaciones, copagos y canales de atención.',
      'Recibes tu póliza digital y acceso a la red médica para empezar a usar tu seguro de inmediato.',
    ],
    idealFor:
      'Personas y familias colombianas que desean atención médica de calidad en clínicas privadas sin poner en riesgo sus ahorros ante una hospitalización o tratamiento costoso.',
  },
  'asesoria-personalizada': {
    name: 'Asesoría Personalizada',
    subtitle: 'Te ayudamos a elegir el seguro correcto para cada etapa de tu vida en Colombia.',
    priceFrom: 'Sin costo por asesoría',
    includes: [
      'Análisis de tu situación actual',
      'Comparación de diferentes alternativas',
      'Acompañamiento antes, durante y después de la contratación',
      'Acompañamiento en renovaciones y ajustes cuando cambian tus necesidades o proyectos',
    ],
    howItWorks: [
      'Agendamos una sesión por teléfono, videollamada o presencial según tu ubicación.',
      'Analizamos tus objetivos, riesgos y etapa de vida (inicio laboral, familia en crecimiento, emprendimiento, retiro, etc.).',
      'Comparamos diferentes aseguradoras y alternativas para presentarte solo las opciones que encajan contigo.',
      'Te entregamos una propuesta clara, con ejemplos en pesos colombianos y sin letra chiquita.',
    ],
    idealFor:
      'Personas y empresas que quieren tomar decisiones informadas, entender bien qué están comprando y tener un aliado de confianza a largo plazo.',
  },
} as const

type ServiceSlug = keyof typeof servicesConfig

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: ServiceSlug }>()

  if (!slug || !servicesConfig[slug]) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <p className="text-center text-gray-600 mb-4">
          No encontramos la información de este seguro.
        </p>
        <div className="text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-conecta-orange text-white font-semibold rounded-lg hover:bg-conecta-orange-dark transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  const service = servicesConfig[slug]
  const serviceEmoji: Record<ServiceSlug, string> = {
    'seguro-hogar': '🏠',
    'seguro-vida': '🛡️',
    'seguro-vehicular': '🚗',
    'seguro-empresarial': '🏢',
    'seguro-salud': '🏥',
    'asesoria-personalizada': '🤝',
  }
  const emoji = serviceEmoji[slug]

  // Manejar scroll a secciones cuando se navega con hash
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-5rem)]">
      <div className="bg-conecta-orange text-white py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-sm uppercase tracking-[0.2em] mb-2">Seguro</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            {service.name}
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-white/90">
            {service.subtitle.split(/(COP|pesos colombianos|\d+[.,]?\d*)/).map((part, idx) => {
              if (/^\d+[.,]?\d*$/.test(part) || part === 'COP' || part === 'pesos colombianos') {
                return <span key={idx} className="font-number">{part}</span>
              }
              return <span key={idx}>{part}</span>
            })}
          </p>
          <p className="mt-4 text-sm font-semibold">
            Desde <span className="text-lg md:text-xl font-number">
              {service.priceFrom.split(/(\$|COP|\d+[.,]?\d*)/).map((part, idx) => {
                if (/^\$/.test(part) || part === 'COP' || /^\d+[.,]?\d*$/.test(part)) {
                  return <span key={idx} className="font-number">{part}</span>
                }
                return <span key={idx}>{part}</span>
              })}
            </span>*
          </p>
          <p className="text-[11px] text-white/80 mt-1">
            *Precio estimado, puede variar según perfil y coberturas.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="space-y-10">
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-conecta-blue mb-4">
              ¿Qué incluye?
            </h2>
            <ul className="space-y-2 text-base text-gray-700">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start space-x-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-conecta-orange" />
                  <span>
                    {item.split(/(COP|\d+[.,]?\d*|24\/7)/).map((part, idx) => {
                      if (part === 'COP' || /^\d+[.,]?\d*$/.test(part) || part === '24/7') {
                        return <span key={idx} className="font-number">{part}</span>
                      }
                      return <span key={idx}>{part}</span>
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-conecta-blue mb-4">
              ¿Cómo funciona?
            </h2>
            <div className="space-y-4">
              {service.howItWorks.map((step, index) => {
                const icons = ['🏠', '📋', '⏱️', '🤝']
                const icon = icons[index] || '✓'
                return (
                  <div key={step} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                      {icon}
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed flex-1 pt-2">
                      {step.split(/(COP|\d+[.,]?\d*)/).map((part, idx) => {
                        if (part === 'COP' || /^\d+[.,]?\d*$/.test(part)) {
                          return <span key={idx} className="font-number">{part}</span>
                        }
                        return <span key={idx}>{part}</span>
                      })}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-conecta-blue mb-4">
              ¿Para quién es ideal?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              {service.idealFor.split(/(COP|\d+[.,]?\d*)/).map((part, idx) => {
                if (part === 'COP' || /^\d+[.,]?\d*$/.test(part)) {
                  return <span key={idx} className="font-number">{part}</span>
                }
                return <span key={idx}>{part}</span>
              })}
            </p>
          </div>
          <div className="bg-conecta-blue text-white rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Cotiza este seguro
              </h3>
              <p className="text-sm text-gray-200 mb-4">
                Déjanos tus datos en la sección de contacto y un asesor se
                pondrá en contacto contigo para darte una cotización
                personalizada.
              </p>
            </div>
            <Link
              to="/#contacto"
              className="inline-block text-center px-4 py-3 bg-conecta-orange text-white font-semibold rounded-lg hover:bg-conecta-orange-dark transition-colors text-sm"
            >
              Ir a Contacto
            </Link>
          </div>
        </section>

        <div className="text-center text-xs text-gray-400">
          La información mostrada es de carácter informativo y puede variar según
          condiciones de aseguradoras y regulación vigente.
        </div>
          </div>

          {/* Side visual (emoticón grande) */}
          <aside className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-[110px] leading-none mb-4">{emoji}</div>
              <h3 className="text-xl font-semibold text-conecta-blue mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.subtitle}
              </p>
              <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-4">
                <p className="text-xs text-gray-500 mb-1">Desde</p>
                <p className="text-2xl font-extrabold text-conecta-blue">
                  {service.priceFrom.split(/(\$|COP|\d+[.,]?\d*)/).map((part, idx) => {
                    if (/^\$/.test(part) || part === 'COP' || /^\d+[.,]?\d*$/.test(part)) {
                      return <span key={idx} className="font-number">{part}</span>
                    }
                    return <span key={idx}>{part}</span>
                  })}
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  Precio estimado en <span className="font-number">COP</span>.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/#contacto"
                  className="inline-block w-full text-center px-4 py-3 bg-conecta-orange text-white font-semibold rounded-lg hover:bg-conecta-orange-dark transition-colors text-sm"
                >
                  Hablar con un asesor
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail


