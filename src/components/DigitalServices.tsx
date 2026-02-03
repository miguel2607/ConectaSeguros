const DigitalServices = () => {
  const features = [
    {
      title: 'Plataforma Digital',
      description: 'Gestiona tus pólizas desde cualquier lugar, en cualquier momento.',
      icon: '💻'
    },
    {
      title: 'App Móvil',
      description: 'Accede a tus seguros desde tu smartphone con nuestra aplicación.',
      icon: '📱'
    },
    {
      title: 'Chat en Vivo',
      description: 'Atención inmediata con nuestro equipo de soporte especializado.',
      icon: '💬'
    },
    {
      title: 'Reportes en Línea',
      description: 'Realiza reportes de siniestros de forma rápida y sencilla.',
      icon: '📊'
    }
  ]

  return (
    <section
      id="servicios-digitales"
      className="py-16 lg:py-24 bg-conecta-blue text-white section-fade-in"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-3">
            SERVICIOS DIGITALES
          </h2>
          <div className="w-24 h-1 bg-conecta-orange mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tecnología al servicio de tu tranquilidad. Gestiona tus seguros
            de manera fácil y eficiente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contacto"
            className="inline-block px-8 py-4 bg-conecta-orange text-white font-bold rounded-lg hover:bg-conecta-orange-dark transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Conoce Más
          </a>
        </div>
      </div>
    </section>
  )
}

export default DigitalServices

