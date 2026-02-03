const About = () => {
  return (
    <section
      id="nosotros"
      className="py-16 lg:py-24 bg-white section-fade-in"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-conecta-blue mb-3">
              NOSOTROS
            </h2>
            <div className="w-24 h-1 bg-conecta-orange mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl text-conecta-blue">
                Tu aliado en protección
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                En CONECTA Seguros, nos especializamos en brindar soluciones
                de seguros integrales que generan tranquilidad y confianza.
                Con años de experiencia en el mercado, hemos construido
                conexiones sólidas con nuestros clientes.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Nuestra misión es proteger lo que más valoras, ofreciendo
                coberturas personalizadas y un servicio de excelencia que
                te acompañe en cada momento importante de tu vida.
              </p>
            </div>

            <div className="relative">
              <div className="bg-conecta-orange rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-xl p-8 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-conecta-orange rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-conecta-blue text-xl font-number">+10 Años</h4>
                      <p className="text-gray-600">de experiencia</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-conecta-blue rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-conecta-blue text-xl font-number">+50,000</h4>
                      <p className="text-gray-600">clientes satisfechos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

