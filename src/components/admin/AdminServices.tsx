import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Service {
  id: string
  title: string
  description: string
  slug: string
  icon: string
  priceFrom?: string
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Service>({
    id: '',
    title: '',
    description: '',
    slug: '',
    icon: '🛡️',
    priceFrom: '',
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('services_list')
    if (saved) {
      setServices(JSON.parse(saved))
    } else {
      const defaultServices: Service[] = [
        {
          id: '1',
          title: 'Seguros de Hogar',
          description: 'Protección completa para tu vivienda y bienes personales.',
          slug: 'seguro-hogar',
          icon: '🏠',
        },
        {
          id: '2',
          title: 'Seguros de Vida',
          description: 'Tranquilidad para ti y tu familia con coberturas flexibles.',
          slug: 'seguro-vida',
          icon: '🛡️',
        },
        {
          id: '3',
          title: 'Seguros Vehiculares',
          description: 'Cobertura integral para tu automóvil, moto o flota.',
          slug: 'seguro-vehicular',
          icon: '🚗',
        },
        {
          id: '4',
          title: 'Seguros Empresariales',
          description: 'Protección completa para tu negocio y empleados.',
          slug: 'seguro-empresarial',
          icon: '🏢',
        },
        {
          id: '5',
          title: 'Seguros de Salud',
          description: 'Atención médica de calidad cuando más la necesitas.',
          slug: 'seguro-salud',
          icon: '💊',
        },
        {
          id: '6',
          title: 'Asesoría Personalizada',
          description: 'Expertos que te ayudan a elegir la mejor opción.',
          slug: 'asesoria-personalizada',
          icon: '🤝',
        },
      ]
      setServices(defaultServices)
      localStorage.setItem('services_list', JSON.stringify(defaultServices))
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
    if (!formData.title || !formData.description) {
      return
    }

    const slug = formData.slug || generateSlug(formData.title)
    const newService: Service = { ...formData, slug }

    if (editingId) {
      const updated = services.map((s) => (s.id === editingId ? newService : s))
      setServices(updated)
      localStorage.setItem('services_list', JSON.stringify(updated))
    } else {
      const newId = Date.now().toString()
      const updated = [...services, { ...newService, id: newId }]
      setServices(updated)
      localStorage.setItem('services_list', JSON.stringify(updated))
    }

    setFormData({
      id: '',
      title: '',
      description: '',
      slug: '',
      icon: '🛡️',
      priceFrom: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (service: Service) => {
    setFormData(service)
    setEditingId(service.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      const updated = services.filter((s) => s.id !== id)
      setServices(updated)
      localStorage.setItem('services_list', JSON.stringify(updated))
    }
  }

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      slug: '',
      icon: '🛡️',
      priceFrom: '',
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
        className="bg-gradient-to-r from-green-500 to-green-700 rounded-3xl shadow-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl mb-2 flex items-center space-x-3">
              <span className="text-4xl">🛡️</span>
              <span>Gestión de Servicios</span>
            </h2>
            <p className="text-white/80">Administra los servicios de seguros</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              resetForm()
              setShowForm(!showForm)
            }}
            className="px-6 py-3 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center space-x-2"
          >
            <span>{showForm ? '✕' : '+'}</span>
            <span>{showForm ? 'Cerrar' : 'Nuevo Servicio'}</span>
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
              {editingId ? 'Editar Servicio' : 'Nuevo Servicio'}
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Título *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 text-lg"
                  placeholder="Nombre del servicio"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Descripción *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 resize-none"
                  rows={4}
                  placeholder="Descripción del servicio"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Emoji/Icono</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 text-2xl text-center"
                    placeholder="🛡️"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Precio Desde (opcional)</label>
                  <input
                    type="text"
                    value={formData.priceFrom || ''}
                    onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 font-number text-lg"
                    placeholder="$50.000 COP"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300"
                  placeholder="se-genera-automaticamente-si-vacio"
                />
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={!formData.title || !formData.description}
                  className={`px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 ${
                    formData.title && formData.description
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  }`}
                >
                  {editingId ? 'Actualizar' : 'Crear'} Servicio
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
          <span>📋</span>
          <span>Servicios Existentes ({services.length})</span>
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="border-2 border-gray-200 rounded-2xl p-6 hover:border-green-300 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl bg-green-50 rounded-xl p-3">{service.icon}</div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(service)}
                        className="px-3 py-1.5 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-md"
                      >
                        ✏️
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(service.id)}
                        className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-md"
                      >
                        🗑️
                      </motion.button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-conecta-blue text-lg mb-2">{service.title}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{service.description}</p>
                    {service.priceFrom && (
                      <p className="text-xs text-gray-500 font-number mb-2">Desde: {service.priceFrom}</p>
                    )}
                    <p className="text-xs text-green-600 font-mono">{service.slug}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {services.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">No hay servicios aún. ¡Crea uno nuevo!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminServices
