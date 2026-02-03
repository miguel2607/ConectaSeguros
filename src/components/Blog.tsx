import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
  content?: string
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('blog_posts')
    if (saved) {
      setPosts(JSON.parse(saved))
    } else {
      // Datos por defecto
      const defaultPosts: BlogPost[] = [
        {
          id: '1',
          title: '5 Tips para Elegir el Seguro Adecuado',
          excerpt: 'Consejos prácticos para seleccionar la cobertura que mejor se adapte a tus necesidades...',
          date: '15 Ene 2024',
          image: '📝',
          slug: '5-tips-seguro-adecuado',
        },
        {
          id: '2',
          title: 'Importancia del Seguro de Vida',
          excerpt: 'Descubre por qué es fundamental proteger el futuro de tus seres queridos...',
          date: '10 Ene 2024',
          image: '💡',
          slug: 'importancia-seguro-vida',
        },
        {
          id: '3',
          title: 'Cómo Reportar un Siniestro',
          excerpt: 'Guía paso a paso para realizar el reporte de manera rápida y eficiente...',
          date: '5 Ene 2024',
          image: '📋',
          slug: 'como-reportar-siniestro',
        },
      ]
      setPosts(defaultPosts)
      localStorage.setItem('blog_posts', JSON.stringify(defaultPosts))
    }
  }, [])

  return (
    <section
      id="blog"
      className="py-16 lg:py-24 bg-white section-fade-in"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-conecta-blue mb-3">
            BLOG
          </h2>
          <div className="w-24 h-1 bg-conecta-orange mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Mantente informado con nuestros artículos y consejos sobre seguros
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="h-48 bg-conecta-orange flex items-center justify-center text-6xl">
                {post.image}
              </div>
              <div className="p-6">
                <span className="text-sm text-gray-500 font-number">{post.date}</span>
                <h3 className="text-2xl text-conecta-blue mt-2 mb-3">
                  {post.title.includes('5') ? (
                    <>
                      <span className="font-number">5</span> Tips para Elegir el Seguro Adecuado
                    </>
                  ) : (
                    post.title
                  )}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-conecta-orange font-semibold hover:underline"
                >
                  Leer más →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog

