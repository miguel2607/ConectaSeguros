import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
  content?: string
}

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<BlogPost>({
    id: '',
    title: '',
    excerpt: '',
    date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
    image: '📝',
    slug: '',
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('blog_posts')
    if (saved) {
      setBlogs(JSON.parse(saved))
    } else {
      const defaultBlogs: BlogPost[] = [
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
      setBlogs(defaultBlogs)
      localStorage.setItem('blog_posts', JSON.stringify(defaultBlogs))
    }
  }, [])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleSave = () => {
    if (!formData.title || !formData.excerpt) {
      return
    }

    const slug = formData.slug || generateSlug(formData.title)
    const newBlog: BlogPost = { ...formData, slug }

    if (editingId) {
      const updated = blogs.map((b) => (b.id === editingId ? newBlog : b))
      setBlogs(updated)
      localStorage.setItem('blog_posts', JSON.stringify(updated))
    } else {
      const newId = Date.now().toString()
      const updated = [...blogs, { ...newBlog, id: newId }]
      setBlogs(updated)
      localStorage.setItem('blog_posts', JSON.stringify(updated))
    }

    setFormData({
      id: '',
      title: '',
      excerpt: '',
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      image: '📝',
      slug: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (blog: BlogPost) => {
    setFormData(blog)
    setEditingId(blog.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este blog?')) {
      const updated = blogs.filter((b) => b.id !== id)
      setBlogs(updated)
      localStorage.setItem('blog_posts', JSON.stringify(updated))
    }
  }

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      excerpt: '',
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      image: '📝',
      slug: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl shadow-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl mb-2 flex items-center space-x-3">
              <span className="text-4xl">📝</span>
              <span>Gestión de Blogs</span>
            </h2>
            <p className="text-white/80">Administra los artículos del blog</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              resetForm()
              setShowForm(!showForm)
            }}
            className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center space-x-2"
          >
            <span>{showForm ? '✕' : '+'}</span>
            <span>{showForm ? 'Cerrar' : 'Nuevo Blog'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 overflow-hidden"
          >
            <h3 className="text-2xl text-conecta-blue mb-6">
              {editingId ? 'Editar Blog' : 'Nuevo Blog'}
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Título *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-lg"
                  placeholder="Título del blog"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Resumen *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 resize-none"
                  rows={4}
                  placeholder="Resumen del blog"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Fecha</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 font-number text-lg"
                    placeholder="15 Ene 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Emoji/Icono</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-2xl text-center"
                    placeholder="📝"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                  placeholder="se-genera-automaticamente-si-vacio"
                />
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={!formData.title || !formData.excerpt}
                  className={`px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 ${
                    formData.title && formData.excerpt
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  }`}
                >
                  {editingId ? 'Actualizar' : 'Crear'} Blog
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetForm}
                  className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all duration-300 shadow-lg"
                >
                  Cancelar
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl text-conecta-blue mb-6 flex items-center space-x-2">
          <span>📚</span>
          <span>Blogs Existentes ({blogs.length})</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-5xl bg-blue-50 rounded-xl p-3">{blog.image}</div>
                    <div className="flex-1">
                      <h4 className="text-conecta-blue text-lg mb-2 line-clamp-2">{blog.title}</h4>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{blog.excerpt}</p>
                      <p className="text-xs text-gray-500 font-number">{blog.date}</p>
                      <p className="text-xs text-blue-600 mt-2 font-mono">{blog.slug}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(blog)}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md"
                    >
                      ✏️ Editar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(blog.id)}
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-md"
                    >
                      🗑️ Eliminar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {blogs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">No hay blogs aún. ¡Crea uno nuevo!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminBlogs
