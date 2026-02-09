import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../config/api'
import { isIconImage, resolveIconSrc } from '../utils/serviceIcon'

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
    loadBlogs()
  }, [])

  const loadBlogs = async () => {
    try {
      const data = await api.getBlogs()
      if (data && Array.isArray(data)) {
        // Convertir IDs numéricos a strings para compatibilidad
        const blogsWithStringIds = data.map(blog => ({
          ...blog,
          id: blog.id?.toString() || String(blog.id)
        }))
        setPosts(blogsWithStringIds)
      }
    } catch (error) {
      console.error('Error loading blogs:', error)
      // Si hay error, mantener array vacío o valores por defecto
    }
  }

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
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            Mantente informado con nuestros artículos y consejos sobre seguros
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="h-48 bg-gradient-to-br from-conecta-orange/20 to-conecta-orange-dark/20 flex items-center justify-center overflow-hidden">
                {isIconImage(post.image) ? (
                  <img
                    src={resolveIconSrc(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl">{post.image || '📝'}</span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-system">
                    {post.date || 'Sin fecha'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-conecta-blue mb-3 line-clamp-2">
                  {post.title.includes('5') ? (
                    <>
                      <span className="font-number">5</span> Tips para Elegir el Seguro Adecuado
                    </>
                  ) : (
                    post.title
                  )}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-base line-clamp-4 flex-grow font-medium">
                  {post.excerpt || 'Descripción del artículo disponible. Haz clic para leer más.'}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <span className="text-conecta-orange font-semibold text-sm hover:text-conecta-orange-dark transition-colors inline-flex items-center">
                    Leer artículo completo →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog

