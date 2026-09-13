'use client'

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { VideoPlayButton } from '@/components/video-play-button'
import { FORMULAS } from '@/lib/formulas'
import { withBasePath } from '@/lib/paths'
import { ContactCtaSection } from '@/components/contact-cta-section'
import { RectangleLines } from '@/components/rectangle-lines'
import {
  CHIP_PAD_CLASS,
  TYPO_BLOCK_BODY_CLASS,
  TYPO_BLOCK_SUBTITLE_CLASS,
  TYPO_SUBTITLE,
  TYPO_TITLE,
  TYPO_TITLE_CLASS,
} from '@/lib/typography'

const HEADER_PHOTOS = [
  '/doublage-6.png',
  '/senior-1.png',
  '/enfants-3.png',
]

const MATERIAL_PHOTOS = [
  '/technique-2.png',
  '/barnum-1.png',
  '/experience-1.png',
]

const offerTexts = [
  <>
    Plongez dans l&apos;univers étonnant du doublage et vivez cette{' '}
    <span className="font-bold">expérience unique</span>
    {' '}dans les conditions d&apos;un véritable studio.
  </>,
  <>
    Mairies, institutions, entreprises publiques et privées, nous vous
    proposons différentes{' '}
    <span className="font-bold">animations tous publics</span>
    {', adaptées à vos événements, dans des lieux dédiés ou sous un barnum.'}
  </>,
]

const objectives = [
  {
    id: 'federer',
    num: '1',
    lines: ['Fédérer un', 'groupe de', 'collaborateurs.'],
  },
  {
    id: 'dimension',
    num: '2',
    lines: [
      'Donner une',
      'dimension festive',
      '&\u00A0cinématographique',
      'à un événement.',
    ],
  },
]

const howItWorksSteps = [
  {
    num: '1',
    linesLaptop: ['Prérequis : être lecteur.'],
    linesDesktop: ['Prérequis : être lecteur.'],
  },
  {
    num: '2',
    linesLaptop: [
      'Plus de 200 extraits de films cultes',
      'sont à votre disposition,',
      'avec différents degrés de difficulté.',
    ],
    linesDesktop: [
      'Plus de 200 extraits de films cultes sont à votre disposition,',
      'avec différents degrés de difficulté.',
    ],
  },
  {
    num: '3',
    linesLaptop: ['Choisissez le film,', 'l\u2019extrait et le personnage.'],
    linesDesktop: ['Choisissez le film, l\u2019extrait', 'et le personnage.'],
  },
  { num: '4', linesLaptop: ['Entraînez-vous.'], linesDesktop: ['Entraînez-vous.'] },
  {
    num: '5',
    linesLaptop: ['Une fois prêts, jouez la scène,', 'seul(e) ou à plusieurs.'],
    linesDesktop: ['Une fois prêts, jouez la scène,', 'seul(e) ou à plusieurs.'],
  },
]

const HOW_IT_WORKS_BODY_CLASS =
  'text-[18px] 2xl:text-[24px] leading-[1.4] font-normal tracking-[0.01em]'

function NumberedLinesBlock({
  num,
  lines,
  textStyle,
  textClassName,
  textTheme = 'plainWhite',
  compact = false,
  disableWrap = true,
}: {
  num: string
  lines: readonly string[]
  textStyle?: CSSProperties
  textClassName?: string
  textTheme?: 'plainWhite' | 'plainWhiteBody'
  compact?: boolean
  disableWrap?: boolean
}) {
  return (
    <div
      className={`flex w-full min-w-0 flex-col items-start ${compact ? 'gap-[3px]' : 'gap-[5px]'}`}
    >
      <span
        className={`inline-block w-fit bg-white text-black font-bold tracking-[0.01em] ${CHIP_PAD_CLASS}`}
        style={TYPO_TITLE}
      >
        {num}.
      </span>
      <RectangleLines
        lines={lines}
        theme={textTheme}
        className="w-full min-w-0"
        lineClassName={textClassName}
        style={textStyle}
        disableWrap={disableWrap}
      />
    </div>
  )
}

function HowItWorksStep({
  step,
  variant,
}: {
  step: (typeof howItWorksSteps)[number]
  variant: 'laptop' | 'desktop'
}) {
  const isDesktop = variant === 'desktop'
  return (
    <NumberedLinesBlock
      num={step.num}
      lines={isDesktop ? step.linesDesktop : step.linesLaptop}
      textTheme="plainWhiteBody"
      textClassName={HOW_IT_WORKS_BODY_CLASS}
      compact
      disableWrap={false}
    />
  )
}

const howItWorksLaptopPlacement = [
  { step: howItWorksSteps[0], className: 'col-start-1 row-start-1 pr-4 sm:pr-8 lg:pr-10' },
  { step: howItWorksSteps[1], className: 'col-start-1 row-start-2 pr-4 sm:pr-8 lg:pr-10' },
  { step: howItWorksSteps[2], className: 'col-start-1 row-start-3 pr-4 sm:pr-8 lg:pr-10' },
  { step: howItWorksSteps[3], className: 'col-start-2 row-start-1 pl-4 sm:pl-8 lg:pl-10' },
  { step: howItWorksSteps[4], className: 'col-start-2 row-start-2 pl-4 sm:pl-8 lg:pl-10' },
] as const

const howItWorksNote =
  "(Le déroulé est identique pour l'immersion, l'immersion filmée ou la captation)"

const materialCards = [
  {
    id: 'regie',
    titleLines: ['Régie &', 'Synchronisation'],
    lines: [
      <>Station haute performance et logiciel{' '}
          Mosaic (Noblurway)
      </>,
      <>pour une bande rythmo fluide et une sync image/son sans latence.</>,
    ],
  },
  {
    id: 'projection',
    titleLines: ['Retour &', 'Projection'],
    lines: [
      <>
        Vidéoprojection Full HD sur toile géante{' '}
          (200×200{'\u00A0'}cm)
      </>,
      <>et moniteurs jusqu’à 160{'\u00A0'}cm pour un retour immersif.</>,
    ],
  },
  {
    id: 'son',
    titleLines: ['Son &', 'Captation'],
    lines: [
      <>Micros canon de studio, barre de doublage pro</>,
      <>
        et captation multi-angles en{' '}
          4K.
      </>,
    ],
  },
]

function PhotoTriptych({
  photos,
  alt,
  mainObjectPosition = 'center',
  reversed = false,
}: {
  photos: string[]
  alt: string
  mainObjectPosition?: string
  reversed?: boolean
}) {
  const [main, second, third] = photos

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 w-full items-stretch">
      <div
        className={`relative w-full aspect-[3/4] overflow-hidden bg-black ${
          reversed ? 'order-1 md:order-2' : ''
        }`}
      >
        <img
          src={withBasePath(main)}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: mainObjectPosition }}
        />
      </div>
      <div
        className={`flex flex-col gap-3 sm:gap-4 lg:gap-5 min-h-0 md:h-full ${
          reversed ? 'order-2 md:order-1' : ''
        }`}
      >
        {[second, third].map((photo, index) => (
          <div
            key={photo}
            className="relative w-full aspect-[4/3] md:aspect-auto md:flex-1 md:min-h-0 overflow-hidden bg-black"
          >
            <img
              src={withBasePath(photo)}
              alt={`${alt} ${index + 2}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function DubbingView() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideo1Playing, setIsVideo1Playing] = useState(false)
  const [isHowItWorksVideoPlaying, setIsHowItWorksVideoPlaying] = useState(false)

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

      {/* 1 — UNE OFFRE LUDIQUE (gris) */}
      <section data-header-surface="light" className="relative bg-white text-neutral-950 py-16 xl:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                Une offre
              </span>
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                ludique
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <PhotoTriptych photos={HEADER_PHOTOS} alt="Une offre ludique" />
            </div>

            <div
              className="mt-10 sm:mt-14 xl:mt-16 relative w-full animate-text-sweep"
              style={{ animationDelay: '400ms' }}
            >
              <div className="grid grid-cols-1 min-w-0 gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-8 lg:gap-x-6 xl:gap-x-10 w-full items-start">
                {offerTexts.map((text, index) => (
                  <p
                    key={index}
                    lang="fr"
                    className={`min-w-0 text-pretty text-black [hyphens:auto] ${TYPO_BLOCK_BODY_CLASS}`}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — NOS OBJECTIFS (noir) */}
      <section data-header-surface="dark" className="relative bg-black text-white py-16 xl:py-24 px-4 sm:px-6 lg:px-0 border-b border-white/10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                Nos
              </span>
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                objectifs
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative grid w-full min-w-0 grid-cols-1 items-start gap-4 sm:gap-5 animate-text-sweep md:grid-cols-[minmax(0,1.4fr)_minmax(0,2.6fr)] md:items-stretch lg:gap-6"
              style={{ animationDelay: '200ms' }}
            >
              <div className="order-2 flex w-full min-w-0 flex-col gap-8 sm:gap-10 md:order-1 md:h-full md:justify-start md:gap-6 lg:gap-5 2xl:justify-between 2xl:gap-0">
                {objectives.map((objective) => (
                  <NumberedLinesBlock
                    key={objective.id}
                    num={objective.num}
                    lines={objective.lines}
                    textStyle={TYPO_TITLE}
                  />
                ))}
              </div>

              <div className="relative order-1 aspect-video w-full shrink-0 overflow-hidden bg-black md:order-2">
                <div
                  className="absolute inset-0 flex cursor-pointer items-center justify-center group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  {!isVideoPlaying ? (
                    <>
                      <img
                        src={withBasePath('/couverture-doublage-pour-tous.jpg')}
                        alt="Présentation Vidéo"
                        className="absolute inset-0 h-full w-full object-cover md:scale-105"
                      />
                      <VideoPlayButton />
                    </>
                  ) : (
                    <video
                      src={withBasePath('/Doublage-Pour-Tous.mp4')}
                      className="absolute inset-0 h-full w-full object-contain"
                      controls
                      autoPlay
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — S'AMUSER À DOUBLER (gris) */}
      <section data-header-surface="light" className="relative bg-white text-neutral-950 py-16 xl:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                S&apos;amuser
              </span>
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                à doubler
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <div
                className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
                onClick={() => setIsVideo1Playing(true)}
              >
                {!isVideo1Playing ? (
                  <>
                    <img
                      src={withBasePath('/couverture-s-amuser-a-doubler.webp')}
                      alt="S'amuser à doubler"
                      className="absolute inset-0 h-full w-full object-cover md:scale-105"
                    />
                    <VideoPlayButton />
                  </>
                ) : (
                  <video
                    src={withBasePath('/s-amuser-a-doubler.mp4')}
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    autoPlay
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — COMMENT ÇA MARCHE ? (noir) */}
      <section data-header-surface="dark" className="relative bg-black text-white py-16 xl:py-24 px-4 sm:px-6 lg:px-0 border-b border-white/10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                Comment
              </span>
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                ça marche{'\u00A0'}?
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              {/* Mobile — liste simple */}
              <div className="flex w-full min-w-0 flex-col gap-y-10 sm:hidden">
                {howItWorksSteps.map((step) => (
                  <div key={step.num} className="min-w-0 w-full">
                    <HowItWorksStep step={step} variant="laptop" />
                  </div>
                ))}
              </div>

              {/* Laptop — 2 colonnes, 5 aligné sur la même ligne que 2 */}
              <div className="hidden w-full min-w-0 grid-cols-2 grid-rows-[auto_auto_auto] items-start gap-x-6 gap-y-6 sm:grid lg:gap-x-6 lg:gap-y-6 2xl:hidden">
                {howItWorksLaptopPlacement.map(({ step, className }) => (
                  <div key={step.num} className={`min-w-0 w-full overflow-hidden ${className}`}>
                    <HowItWorksStep step={step} variant="laptop" />
                  </div>
                ))}
              </div>

              {/* Bureau — grille 3 × 2 */}
              <div className="hidden w-full min-w-0 grid-cols-3 grid-rows-2 items-start gap-x-14 gap-y-16 2xl:grid">
                {howItWorksSteps.map((step) => (
                  <div key={step.num} className="min-w-0 w-full overflow-hidden">
                    <HowItWorksStep step={step} variant="desktop" />
                  </div>
                ))}
                <div className="min-w-0" aria-hidden="true" />
              </div>
            </div>

            <div
              className="relative mt-3 w-full animate-text-sweep sm:mt-4 lg:mt-5"
              style={{ animationDelay: '400ms' }}
            >
              <div
                className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
                onClick={() => setIsHowItWorksVideoPlaying(true)}
              >
                {!isHowItWorksVideoPlaying ? (
                  <>
                    <img
                      src={withBasePath('/couverture-le-deroule.png')}
                      alt="Comment ça marche"
                      className="absolute inset-0 h-full w-full object-cover md:scale-105"
                    />
                    <VideoPlayButton />
                  </>
                ) : (
                  <video
                    src={withBasePath('/le-deroule.mp4')}
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    autoPlay
                  />
                )}
              </div>

              <p
                lang="fr"
                className={`mt-4 sm:mt-5 xl:mt-8 w-full text-pretty text-neutral-400 italic 2xl:whitespace-nowrap ${HOW_IT_WORKS_BODY_CLASS}`}
              >
                {howItWorksNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — NOTRE MATÉRIEL (gris) */}
      <section data-header-surface="light" className="relative bg-white text-neutral-950 py-16 xl:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                Notre
              </span>
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                matériel
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <PhotoTriptych
                photos={MATERIAL_PHOTOS}
                alt="Notre matériel"
                mainObjectPosition="70% center"
                reversed
              />
            </div>

            <div
              className="mt-10 sm:mt-14 xl:mt-16 relative w-full animate-text-sweep cursor-default pointer-events-none"
              style={{ animationDelay: '400ms' }}
            >
              <div className="grid grid-cols-3 items-start gap-4 sm:gap-6 lg:gap-5 xl:gap-10 w-full min-w-0">
                {materialCards.map((card) => (
                  <div
                    key={card.id}
                    className="relative flex min-w-0 flex-col text-left justify-start"
                  >
                    <div
                      className={`flex flex-col items-start gap-[5px] shrink-0 ${TYPO_BLOCK_SUBTITLE_CLASS}`}
                      style={{
                        minHeight: 'calc(2 * (1.15em + 2px) + 5px)',
                      }}
                    >
                      {card.titleLines.map((line) => (
                        <span
                          key={line}
                          className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]"
                        >
                          {line}
                        </span>
                      ))}
                    </div>

                    <p
                      lang="fr"
                      className={`mt-4 xl:mt-6 min-w-0 text-pretty text-black [hyphens:auto] ${TYPO_BLOCK_BODY_CLASS}`}
                    >
                      {card.lines.map((line, index) => (
                        <span key={index}>
                          {index > 0 ? ' ' : null}
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — NOS FORMULES (noir) */}
      <section
        data-header-surface="dark"
        className="relative bg-black text-white py-16 xl:py-24 px-4 sm:px-6 lg:px-0"
        id="formulas"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-[#f58220] text-black pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                Nos
              </span>
              <span className="inline-block w-fit bg-[#f58220] text-black pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                formules
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <p
              lang="fr"
              className={`mb-8 sm:mb-10 xl:mb-12 min-w-0 text-pretty text-white [hyphens:auto] animate-text-sweep ${TYPO_BLOCK_BODY_CLASS}`}
            >
              Trois expériences, un même déroulé. Cliquez pour découvrir le
              détail de chaque formule.
            </p>

            <div
              className="grid grid-cols-1 items-stretch gap-3 sm:gap-4 2xl:grid-cols-3 2xl:gap-8 w-full min-w-0 animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              {FORMULAS.map((formula) => (
                <Link
                  key={formula.id}
                  href={`/formules#${formula.id}`}
                  className="group block cursor-pointer no-underline 2xl:h-full"
                >
                  <div className="relative isolate flex flex-col items-start overflow-hidden border-[3px] border-white bg-black p-5 text-left transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-6 2xl:h-full 2xl:p-8 group-hover:border-[#f58220] group-hover:bg-[#f58220]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-[3px] z-0 bg-[#f58220] transition-[clip-path] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [clip-path:polygon(0_100%,0_100%,0_100%)] group-hover:[clip-path:polygon(0_100%,230%_100%,0_-130%)]"
                    />
                    <div className="relative z-10 flex w-full flex-col items-start 2xl:h-full">
                      <h3
                        className="font-bold tracking-[0.01em] text-white leading-[1.15] shrink-0 transition-colors duration-500 group-hover:text-black 2xl:min-h-[calc(2*1.15em)]"
                        style={TYPO_SUBTITLE}
                      >
                        {formula.title}
                      </h3>
                      <div className="flex items-start pt-4 sm:pt-5 2xl:flex-1 2xl:pt-10">
                        <p
                          lang="fr"
                          className={`text-pretty text-white transition-colors duration-500 group-hover:text-black ${TYPO_BLOCK_BODY_CLASS}`}
                        >
                          {formula.summary}
                        </p>
                      </div>
                      <p
                        className="mt-4 sm:mt-5 mb-0 inline-block w-fit shrink-0 bg-[#f58220] text-black font-bold tracking-[0.01em] pl-[3px] pr-[23px] py-px xl:pr-[43px] uppercase transition-colors duration-500 group-hover:bg-white group-hover:text-black 2xl:mt-8"
                        style={TYPO_SUBTITLE}
                      >
                        Découvrir
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCtaSection tone="light" />
    </section>
  )
}
