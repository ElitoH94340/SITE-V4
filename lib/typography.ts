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

/** Padding horizontal des rectangles : +20px à droite (< xl), +40px à partir de xl */
export const CHIP_PAD_CLASS = 'pl-[3px] pr-[23px] py-px xl:pr-[43px]'

/** Corps de texte des blocs (home, contact…) — 18px laptop, 24px bureau */
export const TYPO_BLOCK_BODY_CLASS =
  'text-[18px] xl:text-[24px] leading-[1.4] font-normal tracking-[0.01em]'

/** Sous-titres de blocs (matériel, cartes…) — ≥ corps de texte, 18px laptop, 26px bureau */
export const TYPO_BLOCK_SUBTITLE_CLASS =
  'text-[18px] xl:text-[26px] leading-[1.15] font-bold tracking-[0.01em]'

/** Même taille que TYPO_BLOCK_BODY_CLASS, en gras (labels de formulaire…) */
export const TYPO_BLOCK_BODY_BOLD_CLASS =
  'text-[18px] xl:text-[24px] leading-[1.4] font-bold tracking-[0.01em]'

/** Soustexte — infos administratives, listes denses — 14px laptop, 18px bureau */
export const TYPO_BLOCK_SUBTEXT_CLASS =
  'text-[14px] xl:text-[18px] leading-[1.35] font-normal tracking-[0.01em]'
