import { useMemo, useState, type FormEvent } from 'react'

const Contact = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'ready'>('idle')

  const whatsappNumber = '573226467073' // Colombia 

  const whatsappText = useMemo(() => {
    const parts = [
      'Hola CONECTA Seguros, quiero más información.',
      '',
      `Nombre: ${fullName || '-'}`,
      `Email: ${email || '-'}`,
      `Teléfono: ${phone || '-'}`,
      '',
      `Mensaje: ${message || '-'}`,
    ]
    return parts.join('\n')
  }, [email, fullName, message, phone])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Feedback visual (sin popups)
    setStatus('ready')

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="contacto"
      className="py-16 lg:py-24 bg-gray-50 section-fade-in"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-conecta-blue mb-3">
              CONTACTO
            </h2>
            <div className="w-24 h-1 bg-conecta-orange mx-auto mb-4"></div>
              <p className="text-gray-600 text-base md:text-lg">
              Estamos aquí para ayudarte. Contáctanos y te responderemos a la brevedad.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl text-conecta-blue mb-6">
                Envíanos un Mensaje
              </h3>

              {status === 'ready' && (
                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                  Listo: abrimos WhatsApp con tu mensaje para enviarlo.
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="contact_fullName" className="block text-gray-700 font-medium mb-2">
                    Nombre Completo
                  </label>
                  <input
                    id="contact_fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-conecta-orange focus:border-transparent outline-none transition-all"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact_email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="contact_email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-conecta-orange focus:border-transparent outline-none transition-all"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact_phone" className="block text-gray-700 font-medium mb-2">
                    Teléfono
                  </label>
                  <input
                    id="contact_phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-conecta-orange focus:border-transparent outline-none transition-all"
                    placeholder="+57 322 646 7073"
                    inputMode="tel"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact_message" className="block text-gray-700 font-medium mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="contact_message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-conecta-orange focus:border-transparent outline-none transition-all resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-conecta-orange text-white font-bold rounded-lg hover:bg-conecta-orange-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Enviar por WhatsApp
                </button>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Al enviar, se abrirá WhatsApp con el mensaje prellenado para que lo envíes al número de CONECTA Seguros.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-conecta-blue mb-6">
                  Información de Contacto
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-conecta-orange rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-conecta-blue mb-1">Teléfono</h4>
                      <p className="text-gray-600 font-number">+57 322 646 7073</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-conecta-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-conecta-blue mb-1">Email</h4>
                      <p className="text-gray-600 font-number">info@conectaseguros.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-conecta-orange rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-conecta-blue mb-1">Dirección</h4>
                      <p className="text-gray-600 font-number">
                        Av Centenario <span className="font-number"># 19N-60</span> <br />
                        Container Market Local <span className="font-number">7-1</span> <br />
                        Armenia, Quindío
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d472.5551592854434!2d-75.65256402218891!3d4.552349582042458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38f4ee458a9cab%3A0x5d87cf72bb555174!2sContainer%20City%20Armenia!5e1!3m2!1ses!2sco!4v1770065482906!5m2!1ses!2sco"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Ubicación CONECTA Seguros - Av Centenario # 19N-60 Container Market Local 7-1, Armenia, Quindío"
                ></iframe>
              </div>

              <div className="bg-conecta-orange rounded-2xl p-8 text-white">
                <h3 className="text-xl mb-4">Horario de Atención</h3>
                <div className="space-y-2">
                  <p className="font-number">Lunes - Viernes: 7:00 AM - 6:00 PM</p>
                  <p className="font-number">Sábados: 9:00 AM - 2:00 PM</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

