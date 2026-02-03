import { motion, AnimatePresence } from 'framer-motion'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose: () => void
}

const Toast = ({ message, type, isVisible, onClose }: ToastProps) => {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className={`fixed top-4 right-4 ${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center space-x-3 min-w-[300px]`}
        >
          <span className="text-2xl font-bold">{icons[type]}</span>
          <span className="flex-1 font-semibold">{message}</span>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors text-xl font-bold"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast

