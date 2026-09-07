/** Préfixe les chemins public/ pour GitHub Pages (basePath). */
export function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  if (path.startsWith('http')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  const encoded = normalized
    .split('/')
    .map((segment) => (segment ? encodeURIComponent(segment) : ''))
    .join('/')
  return `${base}${encoded}`
}
