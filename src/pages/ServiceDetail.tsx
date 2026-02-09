import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../config/api'
import { isIconImage, resolveIconSrc } from '../utils/serviceIcon'

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [serviceData, setServiceData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Manejar scroll a secciones cuando se navega con hash (solo cuando los datos estén cargados)
  useEffect(() => {
    if (!isLoading && serviceData) {
      const hash = globalThis.location?.hash
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1))
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }
  }, [isLoading, serviceData])

  useEffect(() => {
    if (slug) {
      loadService(slug)
    }
  }, [slug])

  const loadService = async (serviceSlug: string) => {
    try {
      setIsLoading(true)
      const data = await api.getServiceBySlug(serviceSlug)
      if (!data) {
        console.error('No se recibieron datos del servicio')
        return
      }
      
      // Mapear datos de la API al formato esperado
      const description = data.description || 'Información detallada disponible al contactarnos.'
      
      // Procesar "¿Qué incluye?" - usar el campo includes si existe, sino generar desde description
      let includesArray: string[] = []
      const includesRaw = data.includes
      if (includesRaw?.trim()) {
        // Si existe el campo includes, dividir por líneas
        includesArray = includesRaw.split('\n')
          .map((line: string) => line.trim())
          .filter((line: string) => line.length > 0)
      } else {
        // Fallback: generar desde description (lógica anterior)
        if (description.includes('\n')) {
          includesArray = description.split('\n')
            .map((line: string) => line.trim())
            .filter((line: string) => line.length > 0)
            .map((line: string) => line.replace(/^[-•*]\s*/, '').replace(/^\d+[.)]\s*/, ''))
        } else if (description.includes('•') || description.includes('-')) {
          includesArray = description.split(/[•-]/)
            .map((item: string) => item.trim())
            .filter((item: string) => item.length > 0)
        } else if (description.includes('.')) {
          includesArray = description.split('.')
            .map((sentence: string) => sentence.trim())
            .filter((sentence: string) => sentence.length > 0 && sentence.length > 10)
        } else {
          includesArray = [description]
        }
      }
      
      if (includesArray.length === 0) {
        includesArray = [description]
      }
      
      // Procesar "¿Cómo funciona?" - usar el campo howItWorks si existe
      let howItWorksArray: string[] = []
      const howItWorksRaw = data.howItWorks
      if (howItWorksRaw?.trim()) {
        // Si existe el campo howItWorks, dividir por líneas
        howItWorksArray = howItWorksRaw.split('\n')
          .map((line: string) => line.trim())
          .filter((line: string) => line.length > 0)
      } else {
        // Fallback: valores por defecto
        howItWorksArray = [
          'Contacta con nosotros para una cotización personalizada',
          'Te presentamos diferentes opciones adaptadas a tus necesidades',
          'Elige el plan que mejor se adapte a tu presupuesto',
          'Disfruta de la tranquilidad de estar protegido',
        ]
      }
      
      // Procesar "¿Para quién es ideal?" - usar el campo idealFor si existe
      const idealForRaw = data.idealFor
      let idealFor: string
      if (idealForRaw?.trim()) {
        idealFor = idealForRaw
      } else if (description.length > 200) {
        idealFor = description.substring(0, 200) + '...'
      } else {
        idealFor = description
      }
      
      setServiceData({
        name: data.title || 'Servicio',
        subtitle: description.length > 150 ? description.substring(0, 150) + '...' : description,
        fullDescription: description,
        priceFrom: data.priceFrom || 'Consultar precio',
        includes: includesArray,
        howItWorks: howItWorksArray,
        idealFor: idealFor,
        icon: data.icon || '🛡️',
      })
    } catch (error) {
      console.error('Error loading service:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-gray-600">Cargando servicio...</p>
        </div>
      </div>
    )
  }

  if (!serviceData) {
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

  const service = serviceData
  const icon = service.icon || '🛡️'

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-5rem)]">
      <div className="bg-conecta-orange text-white py-12 font-medium">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-sm uppercase tracking-[0.2em] mb-2">Seguro</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            {service.name}
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-white/90 leading-relaxed font-medium">
            {service.fullDescription ? (
              service.fullDescription.split(/(\d+[.,]?\d*)/).map((part: string, idx: number) => {
                const key = `${part}-${idx}`
                if (/^\d+[.,]?\d*$/.test(part)) {
                  return <span key={key} className="font-number">{part}</span>
                }
                return <span key={key}>{part}</span>
              })
            ) : (
              service.subtitle.split(/(\d+[.,]?\d*)/).map((part: string, idx: number) => {
                const key = `${part}-${idx}`
                if (/^\d+[.,]?\d*$/.test(part)) {
                  return <span key={key} className="font-number">{part}</span>
                }
                return <span key={key}>{part}</span>
              })
            )}
          </p>
          <p className="mt-4 text-sm font-semibold">
            Desde <span className="text-lg md:text-xl">
              {service.priceFrom.split(/(\d+[.,]?\d*)/).map((part: string, idx: number) => {
                const key = `${part}-${idx}`
                if (/^\d+[.,]?\d*$/.test(part)) {
                  return <span key={key} className="font-number">{part}</span>
                }
                return <span key={key}>{part}</span>
              })}
            </span>*
          </p>
          <p className="text-[11px] text-white/80 mt-1 font-medium">
            *Precio estimado, puede variar según perfil y coberturas.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="space-y-10">
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-conecta-blue mb-6 flex items-center space-x-2">
              <span>📋</span>
              <span>¿Qué incluye este servicio?</span>
            </h2>
            <ul className="space-y-4 text-base text-gray-700 font-medium">
              {service.includes.map((item: string, index: number) => {
                const itemKey = `${item}-${index}`
                return (
                <li key={itemKey} className="flex items-start space-x-3">
                  <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-conecta-orange" />
                  <span className="leading-relaxed">
                    {item.split(/(\d+[.,]?\d*)/).map((part: string, idx: number) => {
                      const key = `${part}-${idx}`
                      if (/^\d+[.,]?\d*$/.test(part)) {
                        return <span key={key} className="font-number font-semibold text-conecta-orange">{part}</span>
                      }
                      return <span key={key}>{part}</span>
                    })}
                  </span>
                </li>
              )})}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-conecta-blue mb-6 flex items-center space-x-2">
              <span>⚙️</span>
              <span>¿Cómo funciona?</span>
            </h2>
            <div className="space-y-5">
              {service.howItWorks.map((step: string, index: number) => {
                const icons = ['📞', '📋', '✅', '🎉']
                const icon = icons[index] || '✓'
                const key = `${step}-${index}`
                return (
                  <div key={key} className="flex items-start space-x-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-conecta-orange/10 flex items-center justify-center text-2xl">
                      {icon}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-base font-semibold text-conecta-blue mb-1">Paso <span className="font-number">{index + 1}</span></p>
                      <p className="text-base text-gray-700 leading-relaxed font-medium">
                        {step.split(/(\d+[.,]?\d*)/).map((part: string, idx: number) => {
                          const key = `${part}-${idx}`
                          if (/^\d+[.,]?\d*$/.test(part)) {
                            return <span key={key} className="font-number">{part}</span>
                          }
                          return <span key={key}>{part}</span>
                        })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-conecta-blue mb-6 flex items-center space-x-2">
              <span>👥</span>
              <span>¿Para quién es ideal este servicio?</span>
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line font-medium">
                {service.idealFor ? (
                  service.idealFor.split(/(\d+[.,]?\d*)/).map((part: string, idx: number) => {
                    const key = `${part}-${idx}`
                    if (/^\d+[.,]?\d*$/.test(part)) {
                      return <span key={key} className="font-number font-semibold text-conecta-orange">{part}</span>
                    }
                    return <span key={key}>{part}</span>
                  })
                ) : (
                  service.fullDescription.split(/(\d+[.,]?\d*)/).map((part: string, idx: number) => {
                    const key = `${part}-${idx}`
                    if (/^\d+[.,]?\d*$/.test(part)) {
                      return <span key={key} className="font-number font-semibold text-conecta-orange">{part}</span>
                    }
                    return <span key={key}>{part}</span>
                  })
                )}
              </p>
            </div>
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

          {/* Side visual (icono o imagen del servicio) - imagen que sobresale */}
          <aside className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="flex justify-center items-center mb-6 -mx-2">
                {isIconImage(icon) ? (
                  <div className="relative w-full max-w-[300px] aspect-square rounded-2xl bg-gradient-to-br from-conecta-orange/15 to-conecta-blue/10 p-5 flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.06)] ring-2 ring-conecta-orange/30 ring-offset-4 ring-offset-white -translate-y-1">
                    <img
                      src={resolveIconSrc(icon)}
                      alt={service.name}
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl bg-gradient-to-br from-conecta-orange/10 to-conecta-blue/5 p-6 min-h-[12rem] flex items-center justify-center">
                    <span className="text-[110px] leading-none" aria-hidden>{icon}</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-conecta-blue mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {service.fullDescription || service.subtitle}
              </p>
              <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-4">
                <p className="text-xs text-gray-500 mb-1">Desde</p>
                <p className="text-2xl font-extrabold text-conecta-blue">
                  {service.priceFrom.split(/(\d+[.,]?\d*)/).map((part: string, idx: number) => {
                    const key = `${part}-${idx}`
                    if (/^\d+[.,]?\d*$/.test(part)) {
                      return <span key={key} className="font-number">{part}</span>
                    }
                    return <span key={key}>{part}</span>
                  })}
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  Precio estimado en COP.
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


