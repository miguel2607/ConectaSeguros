/**
 * Utilidades para mostrar el icono del servicio: imagen (data URL, URL o ruta) o emoji.
 * Las imágenes pueden guardarse en BD como data URL (base64) o ser rutas/URLs.
 */

export function isIconImage(icon: string | null | undefined): boolean {
  if (!icon || typeof icon !== 'string') return false
  const t = icon.trim()
  return (
    t.startsWith('data:image/') ||
    t.startsWith('http') ||
    t.startsWith('/') ||
    /\.(png|jpg|jpeg|gif|svg|webp)(\?|$)/i.test(t)
  )
}

export function resolveIconSrc(icon: string): string {
  const t = icon.trim()
  if (t.startsWith('data:') || t.startsWith('http') || t.startsWith('/')) return t
  if (/\.(png|jpg|jpeg|gif|svg|webp)(\?|$)/i.test(t)) return `/icons/${t}`
  return `/icons/${t}`
}
