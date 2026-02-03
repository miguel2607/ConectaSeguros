import { Link, useParams } from 'react-router-dom'

const blogConfig = {
  '5-tips-seguro-adecuado': {
    title: '5 Tips para Elegir el Seguro Adecuado',
    date: '15 Ene 2024',
    sections: [
      {
        title: '1. Define qué quieres proteger',
        content:
          'Antes de comparar precios en pesos colombianos, piensa si necesitas proteger tu auto, tu casa, tu salud, tu vida o tu negocio. Cada tipo de seguro cubre riesgos diferentes y tiene condiciones específicas para Colombia.',
      },
      {
        title: '2. Compara coberturas, no solo el precio',
        content:
          'Dos pólizas con el mismo valor en COP pueden ofrecer coberturas muy distintas. Además de la prima, revisa sumas aseguradas, deducibles, coaseguros, exclusiones y redes de atención. Eso marcará la diferencia en el momento de usar el seguro.',
      },
      {
        title: '3. Revisa la red de atención y servicios',
        content:
          'En seguros de salud y autos es clave saber a qué hospitales, clínicas, talleres o proveedores tendrás acceso en tu ciudad y en el resto del país, así como la calidad del servicio y los tiempos de respuesta.',
      },
      {
        title: '4. Consulta la asesoría de un experto',
        content:
          'Un asesor puede ayudarte a traducir la “letra chiquita”, explicarte cómo se calculan las primas en Colombia y adaptar el plan a tu realidad y presupuesto, sin que pagues por coberturas que no necesitas.',
      },
      {
        title: '5. Actualiza tu seguro con el tiempo',
        content:
          'Tu vida cambia: casa nueva, matrimonio, hijos, negocio propio, mudanza de ciudad, etc. Es importante revisar y ajustar tus pólizas al menos una vez al año para que las sumas aseguradas y coberturas sigan siendo suficientes.',
      },
    ],
  },
  'importancia-seguro-vida': {
    title: 'Importancia del Seguro de Vida',
    date: '10 Ene 2024',
    sections: [
      {
        title: 'Protección para tu familia',
        content:
          'El seguro de vida garantiza que, ante tu fallecimiento o invalidez, tus seres queridos cuenten con recursos para mantener su nivel de vida, cubrir deudas en pesos colombianos y seguir adelante con metas como estudios, vivienda o emprendimientos.',
      },
      {
        title: 'Complemento de tu plan financiero',
        content:
          'Puede funcionar como un respaldo para tu plan de retiro, pago de estudios universitarios o protección de patrimonio, según el tipo de seguro de vida que elijas. Bien diseñado, se integra con tus ahorros, inversiones y pensión obligatoria o voluntaria.',
      },
      {
        title: 'Accesible y flexible',
        content:
          'Existen planes con diferentes sumas aseguradas y plazos, por lo que siempre se puede encontrar una alternativa acorde a tu presupuesto mensual en COP. Se pueden ir ajustando las coberturas y plazos cuando cambian tus ingresos o responsabilidades.',
      },
    ],
  },
  'como-reportar-siniestro': {
    title: 'Cómo Reportar un Siniestro',
    date: '5 Ene 2024',
    sections: [
      {
        title: '1. Mantén la calma y estar a salvo',
        content:
          'Lo primero es asegurarte de que tú y las personas involucradas estén fuera de peligro. Luego, conserva la evidencia necesaria: fotos, datos de las personas, placas, testigos y cualquier documento relevante.',
      },
      {
        title: '2. Ten tu póliza a la mano',
        content:
          'Localiza tu número de póliza, datos del tomador y teléfonos de contacto de la aseguradora o de tu bróker. Hoy en día la mayoría de pólizas en Colombia están en formato digital, así que puedes descargarlas desde tu correo o portal de cliente.',
      },
      {
        title: '3. Llama a la línea de siniestros',
        content:
          'Describe lo ocurrido con claridad, fecha, hora, lugar y personas involucradas. Te indicarán los siguientes pasos, documentos que debes aportar y si enviarán un ajustador o grúa al lugar del evento.',
      },
      {
        title: '4. Da seguimiento a tu caso',
        content:
          'Conserva los números de reporte, correos y documentos que te soliciten. Haz seguimiento a los tiempos de respuesta y mantente en contacto con tu asesor o bróker para que te acompañe hasta el cierre del siniestro.',
      },
    ],
  },
} as const

type BlogSlug = keyof typeof blogConfig

const BlogDetail = () => {
  const { slug } = useParams<{ slug: BlogSlug }>()

  if (!slug || !blogConfig[slug]) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <p className="text-center text-gray-600 mb-4">
          No encontramos este artículo.
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

  const post = blogConfig[slug]
  const blogEmoji: Record<BlogSlug, string> = {
    '5-tips-seguro-adecuado': '📝',
    'importancia-seguro-vida': '💡',
    'como-reportar-siniestro': '📋',
  }
  const emoji = blogEmoji[slug]

  return (
    <div className="bg-white min-h-[calc(100vh-5rem)]">
      <div className="bg-conecta-blue text-white py-10">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-sm text-gray-300 mb-1">
            Blog · {post.date.split(/(\d+)/).map((part, idx) => {
              if (/^\d+$/.test(part)) {
                return <span key={idx} className="font-number">{part}</span>
              }
              return <span key={idx}>{part}</span>
            })}
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            {post.title.split(/(\d+)/).map((part, idx) => {
              if (/^\d+$/.test(part)) {
                return <span key={idx} className="font-number">{part}</span>
              }
              return <span key={idx}>{part}</span>
            })}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="max-w-3xl">
            <article className="prose prose-sm md:prose-base max-w-none text-gray-800">
              {post.sections.map((section) => (
                <section key={section.title} className="mb-6">
                  <h2 className="text-2xl font-semibold text-conecta-blue mb-3">
                    {section.title.split(/(\d+\.)/).map((part, idx) => {
                      if (/^\d+\.$/.test(part)) {
                        return <span key={idx} className="font-number">{part}</span>
                      }
                      return part
                    })}
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed">
                    {section.content.split(/(COP|pesos colombianos|\d+)/).map((part, idx) => {
                      if (/^\d+$/.test(part) || part === 'COP' || part === 'pesos colombianos') {
                        return <span key={idx} className="font-number">{part}</span>
                      }
                      return <span key={idx}>{part}</span>
                    })}
                  </p>
                </section>
              ))}
            </article>

            <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-2xl">
              <h3 className="text-lg font-semibold text-conecta-blue mb-2">
                ¿Quieres asesoría sobre este tema?
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Nuestro equipo puede ayudarte a elegir el seguro más adecuado
                para ti. Déjanos tus datos en la sección de contacto y nos
                comunicaremos contigo.
              </p>
              <Link
                to="/#contacto"
                className="inline-block px-5 py-3 bg-conecta-orange text-white text-sm font-semibold rounded-lg hover:bg-conecta-orange-dark transition-colors"
              >
                Ir a Contacto
              </Link>
            </div>
          </div>

          {/* Side visual (emoticón grande) */}
          <aside className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
              <div className="text-[110px] leading-none mb-4">{emoji}</div>
              <h3 className="text-xl font-semibold text-conecta-blue mb-2">
                {post.title.split(/(\d+)/).map((part, idx) => {
                  if (/^\d+$/.test(part)) {
                    return <span key={idx} className="font-number">{part}</span>
                  }
                  return <span key={idx}>{part}</span>
                })}
              </h3>
              <p className="text-sm text-gray-600">
                Publicado: {post.date.split(/(\d+)/).map((part, idx) => {
                  if (/^\d+$/.test(part)) {
                    return <span key={idx} className="font-number">{part}</span>
                  }
                  return <span key={idx}>{part}</span>
                })}
              </p>
              <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-4 text-left">
                <p className="text-xs text-gray-500 mb-2">
                  En este artículo aprenderás:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  {post.sections.slice(0, 3).map((s) => (
                    <li key={s.title} className="flex items-start space-x-2">
                      <span className="mt-1 w-2 h-2 rounded-full bg-conecta-orange" />
                      <span>
                        {s.title.split(/(\d+\.)/).map((part, idx) => {
                          if (/^\d+\.$/.test(part)) {
                            return <span key={idx} className="font-number">{part}</span>
                          }
                          return <span key={idx}>{part}</span>
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <Link
                  to="/#contacto"
                  className="inline-block w-full text-center px-4 py-3 bg-conecta-blue text-white font-semibold rounded-lg hover:bg-conecta-blue-light transition-colors text-sm"
                >
                  Preguntar a un asesor
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail


