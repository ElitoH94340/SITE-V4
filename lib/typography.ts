import type { CSSProperties } from 'react'

/** Titres de section (sticky sidebar, H1 de page, citations) */
export const TYPO_TITLE: CSSProperties = {
  fontSize: 'clamp(18px, 1.75vw, 32px)',
  lineHeight: 1.1,
}

/** Sous-titres en rectangles, titres de cartes, CTA */
export const TYPO_SUBTITLE: CSSProperties = {
  fontSize: 'clamp(17px, 1.35vw, 26px)',
  lineHeight: 1.15,
}

/** Corps de texte, paragraphes, listes */
export const TYPO_BODY: CSSProperties = {
  fontSize: 'clamp(17px, 1.45vw, 23px)',
  lineHeight: 1.4,
}

export const TYPO_TITLE_CLASS =
  'font-bold tracking-[0.01em] uppercase'

export const TYPO_SUBTITLE_CLASS =
  'font-bold tracking-[0.01em]'

export const TYPO_BODY_CLASS =
  'font-bold tracking-[0.01em]'
