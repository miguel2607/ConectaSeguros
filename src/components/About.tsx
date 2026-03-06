const About = () => {
  return (
    <section
      id="nosotros"
      className="relative py-16 lg:py-24 section-fade-in overflow-hidden"
      style={{
        backgroundImage: 'url(/fonts/nosotros_img.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay suave: la imagen se ve natural; la legibilidad la da el bloque de texto */}
      <div className="absolute inset-0 bg-white/45 z-0" aria-hidden="true" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-conecta-blue mb-3">
              NOSOTROS
            </h2>
            <div className="w-24 h-1 bg-conecta-orange mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Columna izquierda: fondo muy suave solo detrás del texto para leer bien, sin tapar a las personas */}
            <div className="relative rounded-2xl bg-white/40 backdrop-blur-[2px] p-6 md:p-8 space-y-4">
              <h3 className="text-2xl md:text-3xl text-conecta-blue font-bold [text-shadow:0_1px_2px_rgba(255,255,255,0.9)]">
                Tu aliado en protección
              </h3>
              <p className="text-gray-900 leading-relaxed text-lg font-semibold [text-shadow:0_1px_2px_rgba(255,255,255,0.9),0_0_1px_rgba(0,0,0,0.15)]">
                En CONECTA Seguros, nos especializamos en brindar soluciones
                de seguros integrales que generan tranquilidad y confianza.
                Con años de experiencia en el mercado, hemos construido
                conexiones sólidas con nuestros clientes.
              </p>
              <p className="text-gray-900 leading-relaxed text-lg font-semibold [text-shadow:0_1px_2px_rgba(255,255,255,0.9),0_0_1px_rgba(0,0,0,0.15)]">
                Nuestra misión es proteger lo que más valoras, ofreciendo
                coberturas personalizadas y un servicio de excelencia que
                te acompañe en cada momento importante de tu vida.
              </p>
            </div>

            {/* Columna derecha: cifras con estilo integrado al fondo */}
            <div className="flex flex-col items-center md:items-end">
              <div className="w-full max-w-sm bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-conecta-orange/30 shadow-xl p-6 md:p-8 space-y-5 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-conecta-orange rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-7 h-7 text-white"
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
                  <div className="w-14 h-14 bg-conecta-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-7 h-7 text-white"
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
<h4 className="font-bold text-conecta-blue text-xl font-number">+10.000</h4>
                      <p className="text-gray-600">clientes satisfechos</p>
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

