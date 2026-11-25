const MAX_BYTES = 1.5 * 1024 * 1024
const MAX_EDGE = 1600
const JPEG_QUALITY = 0.82

/**
 * Resize/compress a cover image so the JSON payload stays under the API body limit.
 * Returns a JPEG (or PNG if transparency) data URL.
 */
export async function compressCoverImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file')
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error('Image is too large. Please use a file under 12 MB.')
  }

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    bitmap.close()
    throw new Error('Could not process image')
  }
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const preferPng = file.type === 'image/png' || file.type === 'image/webp'
  let dataUrl = canvas.toDataURL(preferPng ? 'image/png' : 'image/jpeg', JPEG_QUALITY)

  if (dataUrl.length > MAX_BYTES * 1.37) {
    dataUrl = canvas.toDataURL('image/jpeg', 0.7)
  }
  if (dataUrl.length > MAX_BYTES * 1.37) {
    dataUrl = canvas.toDataURL('image/jpeg', 0.55)
  }
  if (dataUrl.length > MAX_BYTES * 1.37) {
    throw new Error('Image is still too large after compression. Try a smaller image.')
  }

  return dataUrl
}
