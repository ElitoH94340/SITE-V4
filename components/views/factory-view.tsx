'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import { VideoPlayButton } from '@/components/video-play-button'
import { withBasePath } from '@/lib/paths'
import { ContactCtaSection } from '@/components/contact-cta-section'
import {
  TYPO_BLOCK_BODY_BOLD_CLASS,
  TYPO_BLOCK_BODY_CLASS,
  TYPO_BLOCK_SUBTEXT_CLASS,
  TYPO_BLOCK_SUBTITLE_CLASS,
  TYPO_TITLE,
  TYPO_TITLE_CLASS,
} from '@/lib/typography'

type Media = {
  video?: string
  photo: string
}

type Module = {
  prefix?: string
  title: string
  titleLines: readonly string[]
  desc?: string
  subDesc?: string
  media?: Media
  objectives: string[]
  materialExtra?: string
}

type Tab = {
  id: string
  label: string
  publicLabel: string
  ctaButton: string
  modules: Module[]
  mediaList: Media[]
}

const TABS: Tab[] = [
  {
    id: 'Primaire',
    label: 'Primaire',
    publicLabel: 'Élèves en classe de CM1 et CM2',
    ctaButton: 'découvrez nos offres',
    modules: [
      {
        title: 'Découverte Immersion',
        titleLines: ['Découverte', 'Immersion'],
        desc: "Expérience déjà menée en Réseau d'Éducation\u00A0Prioritaire\u00A0(REP).",
        subDesc:
          "Plusieurs séances de travail en co-organisation avec l'enseignant.",
        objectives: [
          'Découvrir une\u00A0œuvre cinématographique,\nHistoire des Arts',
          "Étudier le sens d'un texte",
          "Faciliter l'expression orale",
          'S’entraîner à la lecture à voix haute',
          'Travailler le rythme et la fluence',
          'Participer à une lecture dialoguée',
          'Développer la confiance en soi',
          'Travailler en groupe : Enseignement moral et civique EMC',
          'Créer une œuvre commune',
        ],
      },
    ],
    mediaList: [
      {
        video: '/maitresse-explique.mp4',
        photo: '/couverture-primaire.png',
      },
      {
        video: '/T-B-Primaire.mp4',
        photo: '/classe-2.png',
      },
    ],
  },
  {
    id: 'Collège',
    label: 'Collège',
    publicLabel: 'Collégiens',
    ctaButton: 'découvrez nos offres',
    modules: [
      {
        title: 'Module découverte',
        titleLines: ['Module', 'découverte'],
        subDesc: 'Plusieurs séances de travail en co-organisation avec les professeurs de Français.',
        objectives: [
          'Découvrir une\u00A0œuvre cinématographique,\nHistoire des Arts',
          'S’entraîner à la lecture\u00A0: rythme, intonation, fluence',
          'Faciliter l’expression orale',
          'Développer la confiance en soi',
          'Créer une œuvre commune',
        ],
      },
    ],
    mediaList: [
      { video: '/college.mp4', photo: '/couverture-college.png' },
    ],
  },
  {
    id: 'Lycée',
    label: 'Lycée',
    publicLabel: 'Lycéens',
    ctaButton: 'découvrez nos offres',
    modules: [
      {
        prefix: 'Module 1',
        title: 'Découverte Immersion',
        titleLines: ['Découverte', 'Immersion'],
        subDesc: "Plusieurs séances de travail en co-organisation avec l'enseignant.",
        media: {
          video: '/lycée-module-4.mp4',
          photo: '/couverture-10.png',
        },
        objectives: [
          'Découvrir une\u00A0œuvre cinématographique,\nHistoire des Arts',
          'S’entraîner à la lecture\u00A0: rythme, intonation, fluence',
          'Faciliter l’expression orale',
          'Créer une œuvre commune',
        ],
      },
      {
        prefix: 'Module 2',
        title: 'Découverte Immersion / adaptation',
        titleLines: ['Découverte', 'immersion / adaptation'],
        subDesc: 'Plusieurs séances de travail en co-organisation avec les professeurs d’anglais et de français.',
        media: {
          video: '/lycée-module-1.mp4',
          photo: '/couverture-lycee-2.png',
        },
        objectives: [
          'Travailler à la traduction de dialogues et à leur adaptation',
          'Découvrir un métier',
          'Créer une œuvre commune',
        ],
        materialExtra:
          "Utilisation d'un « dongle » de doublage dans le cadre du module d'adaptation.",
      },
      {
        prefix: 'Module 3',
        title: 'Entraînement au grand oral du bac',
        titleLines: ['Entraînement', 'au grand oral', 'du bac'],
        media: {
          video: '/lycée-module-2.mp4',
          photo: '/couverture-lycee-3.png',
        },
        objectives: [
          'Travailler la posture',
          'Gagner en aisance à l’oral',
          'Améliorer la diction et la fluence',
          'Placer sa voix pour parler et se faire entendre',
        ],
      },
      {
        prefix: 'Module 4',
        title: 'Classes avec option cinéma',
        titleLines: ['Classes avec', 'option cinéma'],
        desc: "Création d'une œuvre commune.",
        subDesc:
          'Découvrir un métier de la post-production : adaptateur dialoguiste.',
        media: {
          video: '/lycée-module-1.mp4',
          photo: '/couverture-lycee-1.png',
        },
        objectives: [
          "Explorer le jeu d'acteur et l'interprétation face au micro",
          "S'entraîner à la lecture rigoureuse de textes et de scripts",
          'Maîtriser la synchronisation labiale et rythmique (rythmo)',
          "Développer l'expressivité vocale et l'intonation juste",
          'Comprendre les exigences du doublage en conditions professionnelles',
          'Créer et interpréter une œuvre commune',
        ],
      },
    ],
    mediaList: [
      { video: '/video-lycee-main.mp4', photo: '/photo-lycee-main.jpg' },
    ],
  },
]

const EDUCATION_PHOTOS = [
  '/classe-1.png',
  '/classe-4.png',
  '/ado-2.png',
]

const FACTORY_MATERIAL_ITEMS = [
  'Station de travail pour\u00A0la\u00A0synchronisation',
  'Vidéoprojection Full HD sur\u00A0grand\u00A0écran (200×200\u00A0cm)',
  'Moniteurs immersifs',
  'Micros de studio',
  'Barre de doublage',
  'Captation 4K multi-angles',
]

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
      width="28"
      height="32"
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

function FactoryMediaSlide({
  media,
  title,
  isPlaying,
  onPlay,
}: {
  media: Media
  title: string
  isPlaying: boolean
  onPlay: () => void
}) {
  if (media.video) {
    return (
      <div
        className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden bg-black group"
        onClick={onPlay}
      >
        {!isPlaying ? (
          <>
            <img
              src={withBasePath(media.photo)}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover md:scale-105"
            />
            <VideoPlayButton />
          </>
        ) : (
          <video
            src={withBasePath(media.video)}
            className="absolute inset-0 h-full w-full object-cover"
            controls
            autoPlay
          />
        )}
      </div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <img
        src={withBasePath(media.photo)}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover md:scale-105"
      />
    </div>
  )
}

function FactoryMediaCarousel({
  mediaList,
  title,
  playingIndex,
  onPlay,
  onSlideChange,
}: {
  mediaList: Media[]
  title: string
  playingIndex: number | null
  onPlay: (index: number) => void
  onSlideChange: () => void
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)
  const maxIndex = mediaList.length - 1
  const canScrollPrev = index > 0
  const canScrollNext = index < maxIndex

  const measure = () => {
    const viewport = viewportRef.current
    if (!viewport) return

    const nextSlideWidth = viewport.clientWidth
    setSlideWidth(nextSlideWidth)
    setIndex((current) => Math.min(current, maxIndex))
  }

  useEffect(() => {
    setIndex(0)
  }, [mediaList])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const ro = new ResizeObserver(() => {
      measure()
    })
    ro.observe(viewport)
    measure()

    return () => ro.disconnect()
  }, [mediaList, maxIndex])

  const goTo = (nextIndex: number) => {
    setIndex(nextIndex)
    onSlideChange()
  }

  const offset = Math.round(slideWidth * index)

  const edgeNavClass =
    'absolute top-1/2 z-20 flex -translate-y-1/2 items-center justify-center border-0 bg-transparent p-0 text-white opacity-90 shadow-none outline-none drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)] transition-opacity duration-300 cursor-pointer hover:opacity-100 disabled:pointer-events-none disabled:opacity-0'

  return (
    <div className="absolute inset-0 min-w-0 overflow-hidden">
      <div ref={viewportRef} className="h-full w-full min-w-0 overflow-hidden">
        <div
          className="flex h-full items-stretch transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          style={{ transform: `translate3d(-${offset}px, 0, 0)` }}
        >
          {mediaList.map((media, mediaIndex) => (
            <div
              key={`${media.video ?? media.photo}-${mediaIndex}`}
              className="h-full shrink-0"
              style={
                slideWidth > 0
                  ? {
                      width: Math.round(slideWidth),
                      minWidth: Math.round(slideWidth),
                      maxWidth: Math.round(slideWidth),
                    }
                  : { width: '100%' }
              }
            >
              <FactoryMediaSlide
                media={media}
                title={title}
                isPlaying={playingIndex === mediaIndex}
                onPlay={() => onPlay(mediaIndex)}
              />
            </div>
          ))}
        </div>
      </div>

      {mediaList.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={!canScrollPrev}
            aria-label="Vidéo précédente"
            className={`${edgeNavClass} left-2 sm:left-3`}
          >
            <SharpChevron direction="left" />
          </button>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={!canScrollNext}
            aria-label="Vidéo suivante"
            className={`${edgeNavClass} right-2 sm:right-3`}
          >
            <SharpChevron direction="right" />
          </button>

          <div className="pointer-events-none absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {mediaList.map((media, mediaIndex) => {
              const isActive = mediaIndex === index
              return (
                <button
                  key={`${media.video ?? media.photo}-${mediaIndex}-dot`}
                  type="button"
                  aria-label={`Vidéo ${mediaIndex + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => goTo(mediaIndex)}
                  className={[
                    'pointer-events-auto h-1.5 w-1.5 shrink-0 rounded-full border-0 p-0 shadow-none outline-none transition-colors duration-300 cursor-pointer',
                    isActive ? 'bg-white' : 'bg-white/35 hover:bg-white/60',
                  ].join(' ')}
                />
              )
            })}
          </div>
        </>
      ) : null}
    </div>
  )
}

const FACTORY_ORANGE_TITLE_CHIP_CLASS =
  'inline-block w-fit whitespace-nowrap bg-[#f58220] pl-[3px] py-px text-black font-bold uppercase tracking-[0.01em] max-2xl:pr-[clamp(12px,9cqi,23px)] max-2xl:text-[clamp(16px,max(6.5cqi,18cqh),34px)] max-2xl:leading-[1.05] 2xl:pr-[43px] 2xl:text-[clamp(22px,3.25vw,50px)] 2xl:leading-[1.08]'

const FACTORY_ORANGE_PUBLIC_CLASS =
  'inline-block w-fit whitespace-nowrap bg-transparent text-white normal-case font-bold tracking-[0.01em] max-2xl:text-[clamp(8px,max(2.8cqi,7.5cqh),15px)] max-2xl:leading-[1.15] 2xl:text-[26px] 2xl:leading-[1.15]'

const FACTORY_INVERTED_LABEL_CHIP_CLASS = `inline-block w-fit whitespace-nowrap bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px] ${TYPO_BLOCK_SUBTITLE_CLASS}`

const FACTORY_INTRO_ORANGE_CHIP_CLASS = `inline-block w-fit whitespace-nowrap bg-[#f58220] text-white pl-[3px] pr-[23px] py-px xl:pr-[43px] ${TYPO_BLOCK_SUBTITLE_CLASS}`

/** Même hauteur qu’avant (deux cellules 16:9 côte à côte) pour une bande pleine largeur */
const FACTORY_ASPECT_CELL_CLASS = 'aspect-video w-full min-w-0'

function wrapOrangeChipLine(
  text: string,
  maxWidth: number,
  measure: (value: string) => number,
): string[] {
  if (maxWidth <= 0) return [text]

  const words = text.split(/ +/).filter(Boolean)
  if (words.length === 0) return ['']

  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (measure(candidate) <= maxWidth) {
      current = candidate
    } else {
      if (current) lines.push(current)
      current = word
    }
  }

  if (current) lines.push(current)
  return lines.length > 0 ? lines : [text]
}

function FactoryChipLines({
  lines,
  text,
  chipClassName,
  className = '',
  gapClassName = 'gap-0 max-xl:gap-[clamp(2px,0.8cqi,3px)] xl:gap-[5px]',
  lineClassName = '',
}: {
  lines?: readonly string[]
  text?: string
  chipClassName: string
  className?: string
  gapClassName?: string
  lineClassName?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measurerRef = useRef<HTMLSpanElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const updateWidth = () => {
      setContainerWidth(element.getBoundingClientRect().width)
    }

    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const measureRectangle = useCallback((value: string) => {
    const measurer = measurerRef.current
    if (!measurer) return value.length * 8
    measurer.textContent = value
    return measurer.getBoundingClientRect().width
  }, [])

  const sourceLines = useMemo(() => {
    if (lines?.length) return [...lines]
    if (text) return text.split('\n').filter(Boolean)
    return []
  }, [lines, text])

  const wrappedLines = useMemo(
    () =>
      sourceLines.flatMap((paragraph) =>
        wrapOrangeChipLine(paragraph, containerWidth, measureRectangle),
      ),
    [sourceLines, containerWidth, measureRectangle],
  )

  return (
    <div
      ref={containerRef}
      className={`flex w-full min-w-0 flex-col items-start ${gapClassName} ${className}`}
    >
      <span
        ref={measurerRef}
        aria-hidden
        className={`pointer-events-none fixed -left-[9999px] top-0 ${chipClassName} ${lineClassName}`}
      />
      {wrappedLines.map((line, index) => (
        <span key={`${line}-${index}`} className={`${chipClassName} ${lineClassName}`}>
          {line}
        </span>
      ))}
    </div>
  )
}

function FactoryModuleBlock({
  children,
  className = '',
  tone,
  minHeight,
}: {
  children: ReactNode
  className?: string
  tone: 'white' | 'orange' | 'dark' | 'hero'
  minHeight?: number
}) {
  const tones = {
    white: 'bg-white text-black overflow-y-auto max-2xl:p-4 p-5 sm:p-6',
    orange:
      'bg-[#f58220] text-black overflow-hidden max-2xl:p-[clamp(0.5rem,2.8cqi,1.25rem)] 2xl:p-6',
    dark: 'bg-black text-white overflow-y-auto p-5 sm:p-6',
    hero: 'bg-black text-white overflow-visible p-0',
  } as const

  return (
    <div
      className={`flex min-h-0 min-w-0 flex-col ${tones[tone]} ${className}`}
      style={minHeight ? { minHeight: `${minHeight}px` } : undefined}
    >
      {children}
    </div>
  )
}

function FactoryModuleLabel({
  label,
  inverted = false,
}: {
  label: string
  inverted?: boolean
}) {
  return (
    <div className="mb-3 w-full min-w-0 uppercase sm:mb-3 xl:mb-4">
      <FactoryChipLines
        text={label}
        chipClassName={
          inverted ? FACTORY_INVERTED_LABEL_CHIP_CLASS : FACTORY_INTRO_ORANGE_CHIP_CLASS
        }
      />
    </div>
  )
}

function formatListItemText(text: string) {
  if (!text.includes('\n')) return text

  const lines = text.split('\n')
  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ))
}

function FactoryDashList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((item, index) => (
        <li key={`${index}-${item}`} className="flex items-start">
          <span
            aria-hidden="true"
            className={`mr-1 shrink-0 leading-[1.25] text-black ${TYPO_BLOCK_SUBTEXT_CLASS}`}
          >
            -
          </span>
          <p
            lang="fr"
            className={`m-0 min-w-0 flex-1 text-pretty leading-[1.3] text-black max-2xl:hyphens-none max-2xl:[overflow-wrap:normal] max-2xl:[word-break:normal] 2xl:leading-[1.25] 2xl:hyphens-auto ${TYPO_BLOCK_SUBTEXT_CLASS}`}
          >
            {formatListItemText(item)}
          </p>
        </li>
      ))}
    </ul>
  )
}

function FactoryModuleMedia({
  useMediaCarousel,
  current,
  currentModule,
  activeMedia,
  isVideoPlaying,
  playingMediaIndex,
  onCarouselPlay,
  onCarouselSlideChange,
  onVideoPlay,
}: {
  useMediaCarousel: boolean
  current: Tab
  currentModule: Module
  activeMedia: Media
  isVideoPlaying: boolean
  playingMediaIndex: number | null
  onCarouselPlay: (index: number) => void
  onCarouselSlideChange: () => void
  onVideoPlay: () => void
}) {
  let content: ReactNode

  if (useMediaCarousel) {
    content = (
      <FactoryMediaCarousel
        mediaList={current.mediaList}
        title={currentModule.title}
        playingIndex={playingMediaIndex}
        onPlay={onCarouselPlay}
        onSlideChange={onCarouselSlideChange}
      />
    )
  } else if (activeMedia.video) {
    content = (
      <div
        className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden group"
        onClick={onVideoPlay}
      >
        {!isVideoPlaying ? (
          <>
            <img
              src={withBasePath(activeMedia.photo)}
              alt={currentModule.title}
              className="absolute inset-0 h-full w-full object-cover md:scale-105"
            />
            <VideoPlayButton />
          </>
        ) : (
          <video
            src={withBasePath(activeMedia.video)}
            className="absolute inset-0 h-full w-full object-cover"
            controls
            autoPlay
          />
        )}
      </div>
    )
  } else {
    content = (
      <div className="relative h-full w-full overflow-hidden">
        <img
          src={withBasePath(activeMedia.photo)}
          alt={currentModule.title}
          className="absolute inset-0 h-full w-full object-cover md:scale-105"
        />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">{content}</div>
  )
}

function FactoryModulePanel({
  current,
  currentModule,
  activeMedia,
  useMediaCarousel,
  isVideoPlaying,
  playingMediaIndex,
  onCarouselPlay,
  onCarouselSlideChange,
  onVideoPlay,
}: {
  current: Tab
  currentModule: Module
  activeMedia: Media
  useMediaCarousel: boolean
  isVideoPlaying: boolean
  playingMediaIndex: number | null
  onCarouselPlay: (index: number) => void
  onCarouselSlideChange: () => void
  onVideoPlay: () => void
}) {
  const aspectCellRef = useRef<HTMLDivElement>(null)
  const [aspectCellHeight, setAspectCellHeight] = useState<number>()

  const materialItems = currentModule.materialExtra
    ? [...FACTORY_MATERIAL_ITEMS, currentModule.materialExtra]
    : FACTORY_MATERIAL_ITEMS

  useEffect(() => {
    const element = aspectCellRef.current
    if (!element) return

    const updateHeight = () => {
      setAspectCellHeight(Math.round(element.getBoundingClientRect().height))
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(element)
    return () => observer.disconnect()
  }, [activeMedia, current.id, currentModule.title, useMediaCarousel])

  return (
    <div className="flex w-full flex-col gap-3 sm:gap-4">
      <div className="grid w-full grid-cols-2 gap-4 sm:gap-5 xl:gap-6">
        {/* 1 — titre (colonne gauche, alignée sur Objectifs) */}
        <div
          ref={aspectCellRef}
          className={`${FACTORY_ASPECT_CELL_CLASS} @container relative z-10 overflow-visible bg-black`}
          style={{ containerType: 'size' }}
        >
          <FactoryModuleBlock tone="hero" className="h-full min-h-full justify-between overflow-visible">
            <div className="flex w-full min-w-0 flex-col items-start justify-start gap-[clamp(0.4rem,2.5cqi,0.85rem)] 2xl:gap-5">
              <div className="relative z-20 w-full min-w-0 origin-top-left -rotate-2 overflow-visible uppercase">
                <FactoryChipLines
                  lines={currentModule.titleLines}
                  chipClassName={FACTORY_ORANGE_TITLE_CHIP_CLASS}
                  gapClassName="gap-[clamp(1px,0.5cqi,4px)] 2xl:gap-[5px]"
                />
              </div>
              <FactoryChipLines
                text={current.publicLabel}
                chipClassName={FACTORY_ORANGE_PUBLIC_CLASS}
              />
            </div>
            {currentModule.desc ? (
              <p
                lang="fr"
                className={`mt-auto w-full min-w-0 text-pretty leading-[1.25] text-white italic max-2xl:hyphens-none max-2xl:[overflow-wrap:normal] max-2xl:[word-break:normal] 2xl:hyphens-auto ${TYPO_BLOCK_SUBTEXT_CLASS}`}
              >
                {currentModule.desc}
              </p>
            ) : null}
          </FactoryModuleBlock>
        </div>

        {/* 2 — vidéo (colonne droite, alignée sur Matériel) */}
        <div className={`${FACTORY_ASPECT_CELL_CLASS} relative z-0 overflow-hidden bg-black`}>
          <FactoryModuleMedia
            useMediaCarousel={useMediaCarousel}
            current={current}
            currentModule={currentModule}
            activeMedia={activeMedia}
            isVideoPlaying={isVideoPlaying}
            playingMediaIndex={playingMediaIndex}
            onCarouselPlay={onCarouselPlay}
            onCarouselSlideChange={onCarouselSlideChange}
            onVideoPlay={onVideoPlay}
          />
        </div>

        {/* 3 — objectifs */}
        <FactoryModuleBlock
          tone="white"
          minHeight={aspectCellHeight}
          className="min-h-0"
        >
          <FactoryModuleLabel inverted label={`Objectifs${'\u00A0'}:`} />
          <FactoryDashList items={currentModule.objectives} />
        </FactoryModuleBlock>

        {/* 4 — matériel */}
        <FactoryModuleBlock
          tone="white"
          minHeight={aspectCellHeight}
          className="min-h-0"
        >
          <FactoryModuleLabel inverted label={`Matériel fourni${'\u00A0'}:`} />
          <FactoryDashList items={materialItems} />
        </FactoryModuleBlock>

        {/* 5 — subDesc */}
        {currentModule.subDesc ? (
          <div className="col-span-2 flex w-full min-w-0 flex-col bg-black py-3 text-white sm:py-4">
            <p
              lang="fr"
              className={`text-pretty leading-[1.25] text-white [hyphens:auto] ${TYPO_BLOCK_SUBTITLE_CLASS}`}
            >
              {currentModule.subDesc}
            </p>
          </div>
        ) : null}
      </div>

      <Link
        href={withBasePath('/formules')}
        className={`${TYPO_TITLE_CLASS} inline-block w-fit shrink-0 self-start whitespace-nowrap uppercase leading-none bg-white pl-[3px] pr-[23px] py-px xl:pr-[43px] text-black no-underline transition-colors duration-300 cursor-pointer hover:bg-[#f58220] hover:text-white`}
        style={TYPO_TITLE}
      >
        {current.ctaButton}
      </Link>
    </div>
  )
}

function PhotoTriptych({
  photos,
  alt,
  mainObjectPosition = 'center',
}: {
  photos: string[]
  alt: string
  mainObjectPosition?: string
}) {
  const [main, second, third] = photos

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 w-full items-stretch">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-black">
        <img
          src={withBasePath(main)}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: mainObjectPosition }}
        />
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 min-h-0 md:h-full">
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

export function FactoryView() {
  const [active, setActive] = useState(TABS[0].id)
  const [moduleIndex, setModuleIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [playingMediaIndex, setPlayingMediaIndex] = useState<number | null>(null)

  const current = TABS.find((tab) => tab.id === active) ?? TABS[0]
  const currentModule = current.modules[moduleIndex] ?? current.modules[0]
  const hasMultipleModules = current.modules.length > 1
  const activeMedia = currentModule.media ?? current.mediaList[0]
  const useMediaCarousel =
    current.id === 'Primaire' &&
    !currentModule.media &&
    current.mediaList.length > 1

  useEffect(() => {
    setModuleIndex(0)
    setIsVideoPlaying(false)
    setPlayingMediaIndex(null)
  }, [active])

  useEffect(() => {
    setIsVideoPlaying(false)
    setPlayingMediaIndex(null)
  }, [moduleIndex])

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

      {/* 1 — LA FABRIQUE À DOUBLAGE (blanc) */}
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
                La
              </span>
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                fabrique
              </span>
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                à doublage
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col overflow-visible">
            <div
              className="relative w-full animate-text-sweep overflow-visible"
              style={{ animationDelay: '200ms' }}
            >
              <PhotoTriptych
                photos={EDUCATION_PHOTOS}
                alt="La fabrique à doublage"
              />

              <div className="absolute left-[-4%] sm:left-[-3%] top-[52%] sm:top-[55%] z-20 pointer-events-none w-[58%] sm:w-[48%] lg:w-[42%] -translate-y-1/2 -rotate-2">
                <div
                  className="flex flex-col items-start gap-[5px] uppercase"
                  style={TYPO_TITLE}
                >
                  <span className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                    Le doublage{'\u00A0'}:
                  </span>
                  <span className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                    un programme
                  </span>
                  <span className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                    culturel
                    </span>
                    <span className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                    & pédagogique
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-14 xl:mt-16 flex flex-col gap-6 xl:gap-8">
              <p
                lang="fr"
                className={`text-pretty text-black animate-text-sweep ${TYPO_BLOCK_BODY_CLASS}`}
                style={{ animationDelay: '400ms' }}
              >
                Modules de découverte à l&apos;école élémentaire, au collège et
                au lycée.
              </p>
              <div
                className="w-full min-w-0 animate-text-sweep"
                style={{ animationDelay: '500ms' }}
              >
                <FactoryChipLines
                  lines={[
                    'Développer des actions culturelles et pédagogiques.',
                    'Promouvoir la culture cinématographique.',
                  ]}
                  chipClassName={FACTORY_INTRO_ORANGE_CHIP_CLASS}
                  gapClassName="gap-[5px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — ONGLETS + CONTENU (noir) */}
      <section data-header-surface="dark" className="relative bg-black text-white py-16 xl:py-24 px-4 sm:px-6 lg:px-0 overflow-visible">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px] overflow-visible">
          <div
            className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] self-start"
          >
            <div className="flex flex-col items-start gap-4 sm:gap-5 xl:gap-6">
              <div
                className={`flex w-max flex-col items-start gap-4 sm:gap-5 xl:gap-6 ${TYPO_TITLE_CLASS}`}
                style={TYPO_TITLE}
              >
                {TABS.map((tab) => {
                  const isActive = tab.id === active
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => setActive(tab.id)}
                      className={[
                        `inline-block w-fit text-left ${TYPO_TITLE_CLASS} pl-[3px] pr-[23px] py-px xl:pr-[43px] transition-colors duration-300 cursor-pointer`,
                        isActive
                          ? 'bg-[#f58220] text-black'
                          : 'bg-black text-white hover:bg-white hover:text-black',
                      ].join(' ')}
                      style={TYPO_TITLE}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              {hasMultipleModules && (
                <div className="inline-flex w-max flex-col items-stretch gap-2.5 sm:gap-3">
                  {current.modules.map((module, index) => {
                    const isActiveModule = index === moduleIndex
                    return (
                      <button
                        key={module.prefix ?? index}
                        type="button"
                        aria-current={isActiveModule ? 'true' : undefined}
                        onClick={() => setModuleIndex(index)}
                        className={[
                          `w-full text-left uppercase pl-[3px] pr-[23px] py-px xl:pr-[43px] transition-colors duration-300 cursor-pointer ${TYPO_BLOCK_BODY_BOLD_CLASS}`,
                          isActiveModule
                            ? 'bg-white text-black'
                            : 'bg-transparent text-neutral-500 hover:bg-transparent hover:text-white',
                        ].join(' ')}
                      >
                        {module.prefix ?? `Module ${index + 1}`}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col overflow-visible">
            <div
              key={`${active}-${moduleIndex}`}
              className="w-full animate-text-sweep overflow-visible"
            >
              <FactoryModulePanel
                current={current}
                currentModule={currentModule}
                activeMedia={activeMedia}
                useMediaCarousel={useMediaCarousel}
                isVideoPlaying={isVideoPlaying}
                playingMediaIndex={playingMediaIndex}
                onCarouselPlay={setPlayingMediaIndex}
                onCarouselSlideChange={() => setPlayingMediaIndex(null)}
                onVideoPlay={() => setIsVideoPlaying(true)}
              />
            </div>
          </div>
        </div>
      </section>

      <ContactCtaSection tone="light" />
    </section>
  )
}
