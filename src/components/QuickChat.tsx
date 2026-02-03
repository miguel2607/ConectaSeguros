import { useState } from 'react'

type MessageFrom = 'user' | 'bot'

interface Message {
  from: MessageFrom
  text: string
}

const quickQuestions = [
  '¿Qué seguro necesito para mi auto?',
  '¿Cuál es el mejor seguro de vida?',
  '¿Tienen seguros para empresas?',
  '¿Cómo reporto un siniestro?',
]

const getBotAnswer = (question: string): string => {
  const q = question.toLowerCase()

  if (q.includes('auto') || q.includes('veh')) {
    return 'Para tu auto podemos ofrecerte coberturas contra daños, robo, responsabilidad civil y asistencia vial. Déjanos tus datos en la sección de CONTACTO y un asesor te ayudará a elegir la mejor opción.'
  }

  if (q.includes('vida')) {
    return 'El seguro de vida te permite proteger económicamente a tu familia. Podemos ajustar la suma asegurada y beneficios a tus necesidades. Déjanos un mensaje en CONTACTO y te orientamos sin costo.'
  }

  if (q.includes('empresa') || q.includes('negocio')) {
    return 'Contamos con soluciones para negocios y empresas: daños, responsabilidad civil, flotillas y más. Escríbenos desde la sección de CONTACTO indicando el giro de tu empresa.'
  }

  if (q.includes('siniestro') || q.includes('accidente') || q.includes('reporte')) {
    return 'Para reportar un siniestro, ten a la mano tu número de póliza y datos del evento. Comunícate al teléfono indicado en la sección CONTACTO o escríbenos por el formulario.'
  }

  return 'Gracias por tu pregunta. Un asesor puede darte una respuesta específica si completas el formulario en la sección de CONTACTO.'
}

const QuickChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      text: 'Hola 👋 Soy tu asistente virtual de CONECTA Seguros. Elige una pregunta rápida o escribe tu duda.',
    },
  ])
  const [input, setInput] = useState('')

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = { from: 'user', text }
    const botMsg: Message = { from: 'bot', text: getBotAnswer(text) }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="fixed bottom-8 left-4 z-50">
      {isOpen && (
        <div className="mb-3 w-80 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden section-fade-in">
          <div className="bg-conecta-blue text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Chat rápido de seguros</p>
              <p className="text-[11px] text-gray-200">
                Respuestas generales, para asesoría formal usa CONTACTO.
              </p>
            </div>
            <button
              type="button"
              className="text-gray-200 hover:text-white"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
            >
              ✕
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto px-4 py-3 space-y-2 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-xl max-w-[80%] ${
                    msg.from === 'user'
                      ? 'bg-conecta-orange text-white rounded-br-none'
                      : 'bg-gray-100 text-conecta-blue rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 px-3 py-2 bg-gray-50">
            <div className="flex flex-wrap gap-2 mb-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="text-[11px] px-2 py-1 rounded-full bg-white border border-conecta-orange text-conecta-orange hover:bg-conecta-orange hover:text-white transition-colors"
                  onClick={() => sendMessage(q)}
                >
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu duda rápida..."
                className="flex-1 text-xs border border-gray-300 rounded-md px-2 py-1 outline-none focus:border-conecta-orange"
              />
              <button
                type="submit"
                className="text-xs font-semibold text-white bg-conecta-orange rounded-md px-3 py-1 hover:bg-conecta-orange-dark transition-colors"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center space-x-2 bg-white shadow-2xl border border-gray-200 rounded-full px-3 py-2 hover:shadow-3xl transition-all"
      >
        <span className="w-7 h-7 rounded-full bg-conecta-orange flex items-center justify-center text-white text-sm">
          ?
        </span>
        <span className="text-xs font-semibold text-conecta-blue">
          Chat rápido
        </span>
      </button>
    </div>
  )
}

export default QuickChat


