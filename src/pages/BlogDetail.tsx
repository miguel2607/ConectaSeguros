import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { api } from '../config/api'
import { isIconImage, resolveIconSrc } from '../utils/serviceIcon'

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [blog, setBlog] = useState<any>(null)
  const [otherBlogs, setOtherBlogs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      loadBlog(slug)
    }
  }, [slug])

  useEffect(() => {
    if (!blog) return
    const loadOthers = async () => {
      try {
        const list = await api.getBlogs()
        if (list && Array.isArray(list)) {
          const others = list
            .filter((b: any) => b.slug && b.slug !== blog.slug)
            .slice(0, 2)
          setOtherBlogs(others)
        }
      } catch {
        setOtherBlogs([])
      }
    }
    loadOthers()
  }, [blog])

  const loadBlog = async (blogSlug: string) => {
    try {
      setIsLoading(true)
      const data = await api.getBlogBySlug(blogSlug)
      setBlog(data)
    } catch (error) {
      console.error('Error loading blog:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
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

  // Procesar el contenido del blog
  const processContent = (content: string) => {
    if (!content) return []
    
    // Intentar dividir el contenido en secciones
    // Si tiene saltos de línea dobles, dividir por párrafos
    if (content.includes('\n\n')) {
      return content.split('\n\n')
        .map(para => para.trim())
        .filter(para => para.length > 0)
        .map((para, index) => ({
          title: index === 0 ? blog.title : `Sección ${index + 1}`,
          content: para
        }))
    }
    // Si tiene saltos de línea simples, dividir por líneas
    else if (content.includes('\n')) {
      const lines = content.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
      
      // Agrupar líneas en párrafos
      const paragraphs: string[] = []
      let currentPara = ''
      
      lines.forEach(line => {
        if (line.match(/^[A-ZÁÉÍÓÚÑ][^.!?]*[.!?]$/) || line.length > 100) {
          // Es una oración completa o párrafo largo
          if (currentPara) {
            paragraphs.push(currentPara)
            currentPara = line
          } else {
            currentPara = line
          }
        } else {
          currentPara += (currentPara ? ' ' : '') + line
        }
      })
      
      if (currentPara) {
        paragraphs.push(currentPara)
      }
      
      return paragraphs.map((para, index) => ({
        title: index === 0 ? blog.title : `Párrafo ${index + 1}`,
        content: para
      }))
    }
    // Si no tiene saltos de línea, usar el contenido completo
    else {
      return [{
        title: blog.title,
        content: content
      }]
    }
  }

  const post = {
    title: blog.title,
    date: blog.date,
    excerpt: blog.excerpt,
    sections: blog.content ? processContent(blog.content) : [
      {
        title: blog.title,
        content: blog.excerpt || 'Contenido no disponible'
      }
    ]
  }
  
  // Obtener visual principal del blog: imagen (si la hay) o emoji por defecto
  const emoji = blog.image || '📝'
  const hasImage = isIconImage(blog.image)

  return (
    <div className="bg-white min-h-[calc(100vh-5rem)]">
      <div className="bg-gradient-to-r from-conecta-blue to-conecta-blue-light text-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Link 
                to="/#blog" 
                className="text-sm text-white/80 hover:text-white transition-colors font-system"
              >
                ← Volver al blog
              </Link>
              <span className="text-white/50 font-system">·</span>
              <span className="text-sm text-white/80 font-system">
                {post.date || 'Sin fecha'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              {post.title.split(/(\d+)/).map((part, idx) => {
                if (/^\d+$/.test(part)) {
                  return <span key={idx} className="font-number">{part}</span>
                }
                return <span key={idx}>{part}</span>
              })}
            </h1>
            {post.excerpt && (
              <p className="text-lg text-white/90 leading-relaxed max-w-3xl font-system font-medium line-clamp-3">
                {post.excerpt.length > 200 ? `${post.excerpt.slice(0, 200).trim()}…` : post.excerpt}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
          {/* Contenido principal */}
          <article className="max-w-4xl">
            {/* Bloque imagen/emoji + inicio del artículo */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-12 p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                {hasImage ? (
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-white border-2 border-conecta-orange/20 flex items-center justify-center overflow-hidden shadow-inner">
                    <img
                      src={resolveIconSrc(blog.image)}
                      alt={blog.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border-2 border-conecta-orange/20 flex items-center justify-center text-5xl sm:text-6xl shadow-inner">
                    {emoji}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-conecta-orange uppercase tracking-wide mb-2 font-system">Artículo</p>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-system font-medium max-w-2xl">
                  {post.excerpt && post.excerpt.length > 0 ? (post.excerpt.length > 220 ? `${post.excerpt.slice(0, 220).trim()}…` : post.excerpt) : 'Resumen del artículo.'}
                </p>
              </div>
            </div>

            <div className="space-y-12">
              {post.sections.map((section, index) => (
                <section key={index} id={`section-${index}`} className="relative scroll-mt-24">
                  {/* Separador visual entre secciones (excepto la primera) */}
                  {index > 0 && (
                    <div className="mb-10 pt-10 border-t border-gray-200">
                      {section.title !== `Párrafo ${index + 1}` && section.title !== `Sección ${index + 1}` && section.title !== blog.title && (
                        <h2 className="text-2xl sm:text-3xl font-bold text-conecta-blue mb-6 pb-3 border-b-2 border-conecta-orange inline-block">
                          {section.title.split(/(\d+)/).map((part, idx) => {
                            if (/^\d+$/.test(part)) {
                              return <span key={idx} className="font-number">{part}</span>
                            }
                            return <span key={idx}>{part}</span>
                          })}
                        </h2>
                      )}
                    </div>
                  )}

                  {/* Contenido de la sección */}
                  <div className={`${index === 0 ? 'bg-white' : 'bg-gray-50/80 rounded-2xl p-6 sm:p-8 border border-gray-100'} transition-all hover:shadow-md`}>
                    <div className="space-y-6 max-w-3xl">
                      {section.content.split(/\n/).map((paragraph, pIdx) => {
                        if (!paragraph.trim()) return null
                        
                        const isHeading = paragraph.length < 80 && (
                          paragraph === paragraph.toUpperCase() || 
                          paragraph.match(/^[A-ZÁÉÍÓÚÑ][^.!?]*:$/)
                        )
                        
                        if (isHeading && pIdx === 0 && index > 0) {
                          return (
                            <h3 key={pIdx} className="text-xl font-bold text-conecta-blue mb-4 mt-2">
                              {paragraph}
                            </h3>
                          )
                        }
                        
                        return (
                          <p key={pIdx} className={`${index === 0 ? 'text-lg sm:text-xl' : 'text-base'} leading-[1.75] text-gray-700 font-system font-medium`}>
                            {paragraph.split(/(\d+[.,]?\d*)/).map((part, idx) => {
                              if (/^\d+[.,]?\d*$/.test(part)) {
                                return <span key={idx} className="font-number font-semibold text-conecta-orange">{part}</span>
                              }
                              return <span key={idx}>{part}</span>
                            })}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* CTA de contacto */}
            <div className="mt-16 pt-10 border-t-2 border-gray-200">
              <div className="p-8 bg-gradient-to-r from-conecta-blue to-conecta-blue-light rounded-2xl text-white shadow-xl">
                <div className="flex items-start space-x-4">
                  <div className="text-5xl flex-shrink-0">💬</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">
                      ¿Quieres asesoría sobre este tema?
                    </h3>
                    <p className="text-white/90 mb-6 leading-relaxed text-lg">
                      Nuestro equipo de expertos puede ayudarte a entender mejor este tema y encontrar las mejores soluciones para ti. Déjanos tus datos en la sección de contacto y nos comunicaremos contigo.
                    </p>
                    <Link
                      to="/#contacto"
                      className="inline-block px-8 py-4 bg-conecta-orange text-white font-semibold rounded-lg hover:bg-conecta-orange-dark transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Contactar con un asesor →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar con información del artículo */}
          <aside className="lg:sticky lg:top-28 space-y-6">
            {/* Card principal del artículo */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
              <div className="text-center mb-6 pb-6 border-b-2 border-gray-200">
                <div className="mb-4 flex justify-center">
                  {hasImage ? (
                    <div className="w-40 h-40 rounded-2xl bg-gray-50 border border-conecta-orange/20 flex items-center justify-center overflow-hidden">
                      <img
                        src={resolveIconSrc(blog.image)}
                        alt={blog.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-[100px] leading-none">
                      {emoji}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-conecta-blue mb-3 line-clamp-3">
                  {post.title.split(/(\d+)/).map((part, idx) => {
                    if (/^\d+$/.test(part)) {
                      return <span key={idx} className="font-number">{part}</span>
                    }
                    return <span key={idx}>{part}</span>
                  })}
                </h3>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 bg-gray-50 rounded-full px-4 py-2 inline-block">
                  <span className="font-system">📅</span>
                  <span className="font-system">
                    {post.date || 'Sin fecha'}
                  </span>
                </div>
              </div>
              
              {/* Índice del artículo */}
              {post.sections.length > 1 && (
                <div className="mb-6 pb-6 border-b-2 border-gray-200">
                  <p className="text-xs text-gray-500 mb-4 font-semibold uppercase tracking-wide">
                    📑 Índice del artículo
                  </p>
                  <ul className="space-y-3">
                    {post.sections.map((s, idx) => {
                      if (s.title === `Párrafo ${idx + 1}` || s.title === `Sección ${idx + 1}` || s.title === blog.title) {
                        return null
                      }
                      return (
                        <li key={idx} className="flex items-start space-x-2 group">
                          <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-conecta-orange group-hover:bg-conecta-orange-dark transition-colors" />
                          <a 
                            href={`#section-${idx}`}
                            className="text-sm text-gray-700 leading-relaxed hover:text-conecta-orange transition-colors cursor-pointer"
                          >
                            {s.title.split(/(\d+)/).map((part, pIdx) => {
                              if (/^\d+$/.test(part)) {
                                return <span key={pIdx} className="font-number">{part}</span>
                              }
                              return <span key={pIdx}>{part}</span>
                            })}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Te puede interesar - otros artículos */}
              {otherBlogs.length > 0 && (
                <div className="mb-6 pb-6 border-b-2 border-gray-200">
                  <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wide">
                    📰 Te puede interesar
                  </p>
                  <ul className="space-y-4">
                    {otherBlogs.map((other: any) => {
                      const shortExcerpt = other.excerpt && other.excerpt.length > 0
                        ? (other.excerpt.length > 120 ? `${other.excerpt.slice(0, 120).trim()}…` : other.excerpt)
                        : 'Ver artículo.'
                      return (
                        <li key={other.id ?? other.slug}>
                          <Link
                            to={`/blog/${other.slug}`}
                            className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
                          >
                            <p className="text-sm font-semibold text-conecta-blue line-clamp-2 mb-1">
                              {other.title}
                            </p>
                            <p className="text-xs text-gray-600 leading-relaxed font-system line-clamp-2">
                              {shortExcerpt}
                            </p>
                            <span className="text-xs text-conecta-orange font-semibold mt-2 inline-block">
                              Leer más →
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              
              {/* CTA Sidebar */}
              <div>
                <Link
                  to="/#contacto"
                  className="inline-block w-full text-center px-6 py-4 bg-gradient-to-r from-conecta-orange to-conecta-orange-dark text-white font-semibold rounded-lg hover:from-conecta-orange-dark hover:to-conecta-orange transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  💬 Preguntar a un asesor
                </Link>
              </div>
            </div>

            {/* Card de navegación */}
            <div className="bg-gradient-to-br from-conecta-blue/5 to-conecta-orange/5 rounded-2xl p-6 border-2 border-conecta-orange/20">
              <p className="text-sm font-semibold text-conecta-blue mb-3">
                ¿Te gustó este artículo?
              </p>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Explora más contenido en nuestro blog o contáctanos para obtener asesoría personalizada.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  to="/#blog"
                  className="text-center px-4 py-2 bg-white text-conecta-blue font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm border-2 border-conecta-blue"
                >
                  Ver más artículos →
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


