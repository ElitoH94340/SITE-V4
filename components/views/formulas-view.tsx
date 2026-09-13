'use client'

import { Fragment, useEffect, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { ContactCtaSection } from '@/components/contact-cta-section'
import { VideoPlayButton } from '@/components/video-play-button'
import { FORMULAS, type Formula, type FormulaId } from '@/lib/formulas'
import { withBasePath } from '@/lib/paths'
import {
  TYPO_BLOCK_BODY_CLASS,
  TYPO_BLOCK_SUBTITLE_CLASS,
  TYPO_TITLE,
  TYPO_TITLE_CLASS,
} from '@/lib/typography'

function getFormulaMedia(index: number) {
  const videoSrc =
    index === 0
      ? '/T-B-Immersion.mp4'
      : index === 1
        ? '/T-B-Immersion-filmée.mp4'
        : '/T-B-Captation.mp4'

  const coverSrc =
    index === 0
      ? '/couverture-immersion.png'
      : index === 1
        ? '/couverture-immersion-filmee.png'
        : '/couverture-captation.png'

  return { videoSrc, coverSrc }
}

/** Photos au-dessus des vidéos — une par formule, distinctes du triptyque intro */
const FORMULA_SECTION_PHOTOS = [
  '/classe-5.png',
  '/doublage-7.png',
  '/technique-4.png',
] as const

const FORMULA_SECTION_THEMES = [
  {
    section: 'bg-black text-white border-b border-white/10',
    chip: 'bg-white text-black',
    body: 'text-white',
  },
  {
    section: 'bg-white text-black border-b border-neutral-300',
    chip: 'bg-black text-white',
    body: 'text-black',
  },
  {
    section: 'bg-black text-white border-b border-white/10',
    chip: 'bg-white text-black',
    body: 'text-white',
  },
] as const

const FORMULA_TITLE_LINES = [
  ["L'Immersion"],
  ["L'Immersion", 'filmée'],
  ['La', 'Captation'],
] as const

const FORMULA_DEVIS_CTA_CLASS = `${TYPO_TITLE_CLASS} block w-full max-w-full min-w-0 whitespace-nowrap uppercase leading-[1.1] pl-[3px] py-px pr-[clamp(12px,9cqi,23px)] text-[clamp(8px,4.8cqi,32px)] transition-colors duration-300 cursor-pointer hover:bg-[#f58220] hover:text-white xl:pr-[43px]`

function FormulaChipLines({
  lines,
  chipClass,
  style,
  className = '',
}: {
  lines: readonly string[]
  chipClass: string
  style?: CSSProperties
  className?: string
}) {
  return (
    <div className={`flex flex-col items-start gap-[5px] uppercase ${className}`}>
      {lines.map((line) => (
        <span
          key={line}
          className={`inline-block w-fit whitespace-nowrap pl-[3px] pr-[23px] py-px xl:pr-[43px] ${TYPO_BLOCK_SUBTITLE_CLASS} ${chipClass}`}
          style={style}
        >
          {line}
        </span>
      ))}
    </div>
  )
}

/** Emplacement triptyque — brancher les images ici quand elles sont prêtes */
const FORMULAS_INTRO_PHOTOS: [string | null, string | null, string | null] = [
  '/nocturne-2.png',
  '/barnum-2.png',
  '/carreau-1.png',
]

function PhotoTriptych({
  photos,
  alt,
  mainObjectPosition = 'center',
}: {
  photos: [string | null, string | null, string | null]
  alt: string
  mainObjectPosition?: string
}) {
  const [main, second, third] = photos

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 w-full items-stretch">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-black">
        {main ? (
          <img
            src={withBasePath(main)}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: mainObjectPosition }}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 min-h-0 md:h-full">
        {[second, third].map((photo, index) => (
          <div
            key={`triptych-slot-${index + 2}`}
            className="relative w-full aspect-[4/3] md:aspect-auto md:flex-1 md:min-h-0 overflow-hidden bg-black"
          >
            {photo ? (
              <img
                src={withBasePath(photo)}
                alt={`${alt} ${index + 2}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function FormulaSection({
  formula,
  index,
  isPlaying,
  onPlay,
  onPause,
  animationDelay = '0ms',
}: {
  formula: Formula
  index: number
  isPlaying: boolean
  onPlay: (formulaId: FormulaId) => void
  onPause: (formulaId: FormulaId) => void
  animationDelay?: string
}) {
  const theme = FORMULA_SECTION_THEMES[index]
  const { videoSrc, coverSrc } = getFormulaMedia(index)
  const photoSrc = FORMULA_SECTION_PHOTOS[index]
  const titleLines = FORMULA_TITLE_LINES[index]
  return (
    <section
      id={`formula-${formula.id}`}
      data-header-surface={index === 1 ? 'light' : 'dark'}
      className={`relative py-16 xl:py-24 px-4 sm:px-6 lg:px-0 scroll-mt-[120px] lg:scroll-mt-[90px] min-[1440px]:scroll-mt-[160px] overflow-visible ${theme.section}`}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px] overflow-visible">
        <div
          className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
          style={{ animationDelay }}
        >
          <div
            className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px] uppercase`}
            style={TYPO_TITLE}
          >
            {titleLines.map((line) => (
              <span
                key={`${formula.id}-title-${line}`}
                className={`inline-block w-fit whitespace-nowrap pl-[3px] pr-[23px] py-px xl:pr-[43px] ${theme.chip}`}
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        <div
          className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 min-w-0 overflow-visible animate-text-sweep flex flex-col gap-3 sm:gap-4 lg:gap-5"
          style={{ animationDelay }}
        >
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 items-start overflow-visible">
            <div className="order-1 flex w-full shrink-0 flex-col gap-3 sm:gap-4 lg:gap-5 lg:order-none">
              <div className="relative w-full aspect-video overflow-hidden bg-black cursor-pointer group">
                {!isPlaying ? (
                  <>
                    <img
                      src={withBasePath(coverSrc)}
                      alt={`Couverture de ${formula.title}`}
                      className="absolute inset-0 h-full w-full object-cover"
                      onClick={() => onPlay(formula.id)}
                    />
                    <div
                      className="absolute inset-0 z-10 flex items-center justify-center"
                      onClick={() => onPlay(formula.id)}
                    >
                      <VideoPlayButton
                        onClick={(e) => {
                          e.stopPropagation()
                          onPlay(formula.id)
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <video
                    id={`video-${formula.id}`}
                    src={withBasePath(videoSrc)}
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    autoPlay
                    playsInline
                    onPause={() => onPause(formula.id)}
                  />
                )}
              </div>

              <div className="relative w-full aspect-video overflow-hidden bg-black">
                <img
                  src={withBasePath(photoSrc)}
                  alt={formula.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="relative order-3 min-w-0 lg:order-none">
              <span
                className={`${TYPO_TITLE_CLASS} absolute left-0 top-1.5 z-10 inline-block w-fit -rotate-2 origin-top-left whitespace-nowrap uppercase leading-none pl-[3px] pr-[23px] py-px xl:pr-[43px] ${theme.chip}`}
                style={TYPO_TITLE}
              >
                Déroulé
              </span>

              <div className="grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-3 pt-14 sm:gap-x-4 sm:gap-y-4 sm:pt-[3.75rem] lg:gap-x-4 lg:gap-y-3 lg:pt-12 xl:gap-x-5 xl:gap-y-5 xl:pt-16">
                {formula.steps.map((step) => (
                  <Fragment key={`${formula.id}-${step.num}`}>
                    <span
                      className={`inline-block w-fit shrink-0 whitespace-nowrap tabular-nums pl-[3px] pr-[23px] py-px xl:pr-[43px] ${theme.chip} ${TYPO_BLOCK_SUBTITLE_CLASS}`}
                    >
                      {step.num}.
                    </span>
                    <p
                      className={`min-w-0 ${theme.body} ${TYPO_BLOCK_BODY_CLASS} max-xl:text-[14px] max-xl:leading-[1.35]`}
                    >
                      {step.highlight}
                      {step.highlight && step.text ? ' ' : null}
                      {step.text}
                    </p>
                  </Fragment>
                ))}

                <div className="col-start-2 min-w-0 w-full max-w-full @container">
                  <Link
                    href={`${withBasePath('/')}#contact`}
                    className={`${FORMULA_DEVIS_CTA_CLASS} ${theme.chip}`}
                  >
                    Devis disponible sur demande
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FormulasView() {
  const [playingId, setPlayingId] = useState<FormulaId | null>(null)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return

    const matchingFormula = FORMULAS.find((formula) => formula.id === hash)
    if (!matchingFormula) return

    requestAnimationFrame(() => {
      document
        .getElementById(`formula-${matchingFormula.id}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const playFormula = (formulaId: FormulaId) => {
    FORMULAS.forEach((formula) => {
      if (formula.id === formulaId) return
      const other = document.getElementById(
        `video-${formula.id}`,
      ) as HTMLVideoElement | null
      other?.pause()
    })
    setPlayingId(formulaId)
  }

  const pauseFormula = (formulaId: FormulaId) => {
    const el = document.getElementById(
      `video-${formulaId}`,
    ) as HTMLVideoElement | null
    if (el?.paused) {
      setPlayingId((current) => (current === formulaId ? null : current))
    }
  }

  return (
    <section data-header-surface="dark" className="relative w-full bg-black text-neutral-50 pt-[90px] lg:pt-[80px] min-[1440px]:pt-[150px] select-none">
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-text-sweep {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>

      {/* INTRO */}
      <section data-header-surface="light" className="relative bg-white text-neutral-950 py-16 xl:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300 overflow-visible">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px] overflow-visible">
          <div
            className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                Nos
              </span>
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                formules
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col overflow-visible">
            <div
              className="relative w-full animate-text-sweep overflow-visible"
              style={{ animationDelay: '200ms' }}
            >
              <PhotoTriptych
                photos={FORMULAS_INTRO_PHOTOS}
                alt="Nos formules"
              />

              <div className="absolute left-[-4%] sm:left-[-3%] top-[52%] sm:top-[55%] z-20 pointer-events-none w-[70%] sm:w-[58%] lg:w-[48%] -translate-y-1/2 -rotate-2">
                <div
                  className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px] uppercase`}
                  style={TYPO_TITLE}
                >
                  <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                    Immersion
                  </span>
                  <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                    Immersion filmée
                  </span>
                  <span className="inline-block w-fit bg-[#f58220] text-black pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                    Captation
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-14 xl:mt-16 flex flex-col gap-6 xl:gap-8">
              <p
                className={`text-pretty text-black animate-text-sweep ${TYPO_BLOCK_BODY_CLASS}`}
                style={{ animationDelay: '350ms' }}
              >
                De l&apos;expérience en direct à la captation filmée, le déroulé
                est identique{'\u00A0'}: choisissez un extrait, entraînez-vous,
                puis jouez la scène.
              </p>
              <div
                className="animate-text-sweep"
                style={{ animationDelay: '500ms' }}
              >
                <span className={`inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px] ${TYPO_BLOCK_SUBTITLE_CLASS}`}>
                  Trois façons de vivre le doublage{'\u00A0'}:
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {FORMULAS.map((formula, index) => (
        <FormulaSection
          key={formula.id}
          formula={formula}
          index={index}
          isPlaying={playingId === formula.id}
          onPlay={playFormula}
          onPause={pauseFormula}
          animationDelay={`${200 + index * 120}ms`}
        />
      ))}

      <ContactCtaSection tone="light" />
    </section>
  )
}
