'use client'

import { useEffect, useRef, useState } from 'react'
import { ContactSection } from '@/components/contact-section'
import { VideoPlayButton } from '@/components/video-play-button'
import { FORMULAS, type Formula, type FormulaId } from '@/lib/formulas'
import { withBasePath } from '@/lib/paths'
import {
  TYPO_BODY,
  TYPO_SUBTITLE,
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

const FORMULA_CARD_THEMES = [
  {
    shell: 'bg-white text-black',
    chip: 'bg-white text-black border-[3px] border-black',
    highlight: 'bg-white text-black border-[3px] border-black',
    body: 'text-black',
  },
  {
    shell: 'bg-[#f3f4f6] text-black',
    chip: 'bg-black text-white',
    highlight: 'bg-black text-white',
    body: 'text-black',
  },
  {
    shell: 'bg-black text-white',
    chip: 'bg-[#f58220] text-black',
    highlight: 'bg-[#f58220] text-black',
    body: 'text-white',
  },
] as const

const FORMULA_TITLE_LINES = [
  ["L'", 'Immersion'],
  ["L'", 'Immersion', 'filmée'],
  ['La', 'Captation'],
] as const

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

function SharpChevron({
  direction,
  className,
}: {
  direction: 'left' | 'right'
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 48 56"
      width="36"
      height="42"
      aria-hidden
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      <path
        d={
          direction === 'left'
            ? 'M36 4 L12 28 L36 52'
            : 'M12 4 L36 28 L12 52'
        }
        stroke="currentColor"
        strokeWidth="11.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

function FormulaCard({
  formula,
  index,
  width,
  isPlaying,
  onPlay,
  onPause,
}: {
  formula: Formula
  index: number
  width: number
  isPlaying: boolean
  onPlay: (formulaId: FormulaId) => void
  onPause: (formulaId: FormulaId) => void
}) {
  const theme = FORMULA_CARD_THEMES[index]
  const { videoSrc, coverSrc } = getFormulaMedia(index)
  const titleLines = FORMULA_TITLE_LINES[index]

  return (
    <article
      id={`formula-${formula.id}`}
      style={
        width > 0
          ? { width, minWidth: width, maxWidth: width }
          : undefined
      }
      className={[
        'shrink-0 flex flex-col scroll-mt-[120px] lg:scroll-mt-[160px]',
        width <= 0
          ? 'w-[calc(50%-1rem)] sm:w-[calc(50%-1.25rem)] lg:w-[calc(50%-1.5rem)]'
          : '',
        theme.shell,
      ].join(' ')}
    >
      <div
        className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
        onClick={() => onPlay(formula.id)}
      >
        {!isPlaying ? (
          <>
            <img
              src={withBasePath(coverSrc)}
              alt={`Couverture de ${formula.title}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <VideoPlayButton
              onClick={(e) => {
                e.stopPropagation()
                onPlay(formula.id)
              }}
            />
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

      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <div
          className="flex flex-col items-start gap-[5px] uppercase"
          style={TYPO_SUBTITLE}
        >
          {titleLines.map((line) => (
            <span
              key={`${formula.id}-${line}`}
              className={[
                'inline-block w-fit font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px',
                theme.chip,
              ].join(' ')}
            >
              {line}
            </span>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex-1">
          <div
            className="flex flex-col items-start gap-[5px] uppercase"
            style={TYPO_BODY}
          >
            <span
              className={[
                'inline-block w-fit font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px',
                theme.chip,
              ].join(' ')}
            >
              Déroulé
            </span>
          </div>

          <div className="mt-5 sm:mt-6 flex flex-col gap-4 sm:gap-5 w-full">
            {formula.steps.map((step) => (
              <div
                key={`${formula.id}-${step.num}`}
                className="flex items-start gap-3 sm:gap-4"
              >
                <span
                  className="shrink-0 font-bold tracking-[0.01em] pt-px"
                  style={TYPO_BODY}
                >
                  {step.num}.
                </span>

                <div className="min-w-0 flex flex-col gap-2">
                  {step.highlight && (
                    <p
                      className="font-bold tracking-[0.01em]"
                      style={TYPO_BODY}
                    >
                      <span
                        className={[
                          'inline px-[3px] py-px',
                          theme.highlight,
                        ].join(' ')}
                      >
                        {step.highlight}
                      </span>
                    </p>
                  )}
                  {step.text && (
                    <p
                      className={[
                        'font-bold tracking-[0.01em]',
                        theme.body,
                      ].join(' ')}
                      style={TYPO_BODY}
                    >
                      {step.text}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <span
            className={[
              'inline-block w-fit font-bold tracking-[0.01em] uppercase pl-[3px] pr-[43px] py-px',
              theme.chip,
            ].join(' ')}
            style={{
              fontSize: 'clamp(12px, 1vw, 16px)',
              lineHeight: 1.15,
            }}
          >
            Devis disponible sur demande
          </span>
        </div>
      </div>
    </article>
  )
}

function FormulasCarousel({
  playingId,
  onPlay,
  onPause,
  focusFormulaId,
}: {
  playingId: FormulaId | null
  onPlay: (formulaId: FormulaId) => void
  onPause: (formulaId: FormulaId) => void
  focusFormulaId: FormulaId | null
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)

  const measure = () => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const styles = getComputedStyle(track)
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '40') || 40
    const nextCardWidth = Math.max(0, (viewport.clientWidth - gap) / 2)
    const nextStep = nextCardWidth + gap
    const nextMax = Math.max(0, FORMULAS.length - 2)

    setCardWidth(nextCardWidth)
    setStep(nextStep)
    setMaxIndex(nextMax)
    setIndex((current) => Math.min(current, nextMax))
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const ro = new ResizeObserver(() => {
      measure()
    })
    ro.observe(viewport)
    measure()

    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!focusFormulaId) return
    const formulaIndex = FORMULAS.findIndex(
      (formula) => formula.id === focusFormulaId,
    )
    if (formulaIndex < 0) return
    setIndex(Math.min(formulaIndex, maxIndex))
  }, [focusFormulaId, maxIndex])

  const scrollByCard = (direction: -1 | 1) => {
    setIndex((current) => Math.min(maxIndex, Math.max(0, current + direction)))
  }

  const canScrollPrev = index > 0
  const canScrollNext = index < maxIndex
  const offset = step * index

  return (
    <div className="flex w-full min-w-0 items-center gap-3 sm:gap-4 lg:gap-5">
      <div className="shrink-0 w-12 sm:w-14 lg:w-16 flex items-center justify-center">
        {canScrollPrev ? (
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Formules précédentes"
            className="inline-flex items-center justify-center p-0 bg-transparent border-0 rounded-none shadow-none outline-none transition-opacity duration-300 cursor-pointer hover:opacity-70 text-white"
          >
            <SharpChevron direction="left" />
          </button>
        ) : null}
      </div>

      <div ref={viewportRef} className="flex-1 min-w-0 overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-start gap-8 sm:gap-10 lg:gap-12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          style={{ transform: `translate3d(-${offset}px, 0, 0)` }}
        >
          {FORMULAS.map((formula, formulaIndex) => (
            <FormulaCard
              key={formula.id}
              formula={formula}
              index={formulaIndex}
              width={cardWidth}
              isPlaying={playingId === formula.id}
              onPlay={onPlay}
              onPause={onPause}
            />
          ))}
        </div>
      </div>

      <div className="shrink-0 w-12 sm:w-14 lg:w-16 flex items-center justify-center">
        {canScrollNext ? (
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Formules suivantes"
            className="inline-flex items-center justify-center p-0 bg-transparent border-0 rounded-none shadow-none outline-none transition-opacity duration-300 cursor-pointer hover:opacity-70 text-white"
          >
            <SharpChevron direction="right" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export function FormulasView() {
  const [playingId, setPlayingId] = useState<FormulaId | null>(null)
  const [focusFormulaId, setFocusFormulaId] = useState<FormulaId | null>(null)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return

    const matchingFormula = FORMULAS.find((formula) => formula.id === hash)
    if (!matchingFormula) return

    setFocusFormulaId(matchingFormula.id)

    requestAnimationFrame(() => {
      document
        .getElementById('formules-carousel')
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
    <section className="relative w-full bg-black text-neutral-50 pt-[90px] lg:pt-[150px] select-none">
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

      {/* 1 — INTRO */}
      <section className="relative bg-[#f3f4f6] text-neutral-950 py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300 overflow-visible">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px] overflow-visible">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                Nos
              </span>
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
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
                  className="flex flex-col items-start gap-[5px] uppercase"
                  style={TYPO_TITLE}
                >
                  <span className="inline-block w-fit bg-white text-black font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    Immersion
                  </span>
                  <span className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    Immersion filmée
                  </span>
                  <span className="inline-block w-fit bg-[#f58220] text-black font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    Captation
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-14 lg:mt-16 flex flex-col gap-6 sm:gap-8">
              <p
                className="font-bold tracking-[0.01em] text-black animate-text-sweep"
                style={{
                  ...TYPO_SUBTITLE,
                  animationDelay: '350ms',
                }}
              >
                De l&apos;expérience en direct à la captation filmée, le déroulé
                est identique{'\u00A0'}: choisissez un extrait, entraînez-vous,
                puis jouez la scène.
              </p>
              <p
                className="font-bold tracking-[0.01em] text-black animate-text-sweep"
                style={{
                  ...TYPO_SUBTITLE,
                  animationDelay: '500ms',
                }}
              >
                Trois façons de vivre le doublage{'\u00A0'}:
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — FORMULES (carrousel) */}
      <section
        id="formules-carousel"
        className="relative bg-black text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0 scroll-mt-[120px] lg:scroll-mt-[160px]"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">
                Les
              </span>
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">
                3 formules
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 min-w-0 animate-text-sweep">
            <FormulasCarousel
              playingId={playingId}
              onPlay={playFormula}
              onPause={pauseFormula}
              focusFormulaId={focusFormulaId}
            />
          </div>
        </div>
      </section>

      <ContactSection idPrefix="formulas-contact" layout="stacked" />
    </section>
  )
}
