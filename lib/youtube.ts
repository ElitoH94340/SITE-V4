import type { SyntheticEvent } from 'react'

export function youtubeCoverSrc(
  videoId: string,
  quality: 'maxres' | 'sd' | 'hq' = 'maxres',
) {
  const file =
    quality === 'maxres'
      ? 'maxresdefault.jpg'
      : quality === 'sd'
        ? 'sddefault.jpg'
        : 'hqdefault.jpg'
  return `https://i.ytimg.com/vi/${videoId}/${file}`
}

export function handleYoutubeCoverError(
  event: SyntheticEvent<HTMLImageElement>,
  videoId: string,
) {
  const img = event.currentTarget
  if (img.src.includes('maxresdefault')) {
    img.src = youtubeCoverSrc(videoId, 'sd')
    return
  }
  if (img.src.includes('sddefault')) {
    img.src = youtubeCoverSrc(videoId, 'hq')
  }
}
