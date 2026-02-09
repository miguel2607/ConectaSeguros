/**
 * Redimensiona y comprime una imagen para reducir el tamaño del payload (base64)
 * y evitar ERR_CONNECTION_RESET con el backend.
 */
const MAX_WIDTH = 800
const MAX_HEIGHT = 800
const JPEG_QUALITY = 0.82
const MAX_SIZE_BEFORE_RESIZE = 300 * 1024 // 300 KB: si el archivo es más pequeño, no redimensionar

export function resizeImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('El archivo no es una imagen'))
      return
    }
    if (file.size <= MAX_SIZE_BEFORE_RESIZE) {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(new Error(reader.error?.message || 'Error reading file'))
      reader.readAsDataURL(file)
      return
    }

    const img = document.createElement('img')
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement('canvas')
      let { width, height } = img
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const r = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height)
        width = Math.round(width * r)
        height = Math.round(height * r)
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('No se pudo obtener contexto del canvas'))
        return
      }
      ctx.drawImage(img, 0, 0, width, height)
      const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
      const quality = mime === 'image/jpeg' ? JPEG_QUALITY : 0.92
      try {
        const dataUrl = canvas.toDataURL(mime, quality)
        resolve(dataUrl)
      } catch (e) {
        reject(e)
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Error al cargar la imagen'))
    }
    img.src = url
  })
}
