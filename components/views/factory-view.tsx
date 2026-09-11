'use client'

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import Link from 'next/link'
import { ContactSection } from '@/components/contact-section'
import { VideoPlayButton } from '@/components/video-play-button'
import { withBasePath } from '@/lib/paths'
import {
  TYPO_BODY,
  TYPO_BODY_CLASS,
  TYPO_SUBTITLE,
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
        desc: "Plusieurs séances de travail en co-organisation avec l'enseignant.",
        subDesc:
          "Expérience déjà menée en Réseau d'Éducation Prioritaire (REP).",
        objectives: [
          'Découvrir une œuvre cinématographique, Histoire des Arts',
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
        desc: 'Plusieurs séances de travail en co-organisation avec les professeurs de Français.',
        objectives: [
          'Découvrir une œuvre cinématographique, Histoire des Arts',
          'S’entraîner à la lecture : rythme, intonation, fluence',
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
        subDesc:
          "Plusieurs séances de travail en co-organisation avec l'enseignant.",
        media: {
          photo: '/couverture-lycee-4.png',
        },
        objectives: [
          'Découvrir une œuvre cinématographique, Histoire des Arts',
          'S’entraîner à la lecture : rythme, intonation, fluence',
          'Faciliter l’expression orale',
          'Créer une œuvre commune',
        ],
      },
      {
        prefix: 'Module 2',
        title: 'Découverte Immersion / adaptation',
        desc: 'Plusieurs séances de travail en co-organisation avec les professeurs d’anglais et de français.',
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
        desc: 'Découvrir un métier de la post-production : adaptateur dialoguiste.',
        subDesc: "Création d'une œuvre commune.",
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

const FACTORY_MATERIAL_SUMMARY =
  'Station de travail pour la synchronisation, vidéoprojection Full HD sur grand écran (200×200\u00A0cm) et moniteurs immersifs, micros de studio, barre de doublage et captation 4K multi-angles.'

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
        className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
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
    <div className="relative w-full aspect-video overflow-hidden bg-black">
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

  const scrollBy = (direction: -1 | 1) => {
    setIndex((current) => Math.min(maxIndex, Math.max(0, current + direction)))
    onSlideChange()
  }

  const chevronClass =
    'inline-flex items-center justify-center p-0 bg-transparent border-0 rounded-none shadow-none outline-none transition-opacity duration-300 cursor-pointer hover:opacity-70 text-white'

  const offset = Math.round(slideWidth * index)

  return (
    <div className="relative w-full min-w-0 overflow-visible">
      {canScrollPrev ? (
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Vidéo précédente"
          className={`${chevronClass} absolute left-0 top-1/2 z-20 -translate-x-full -translate-y-1/2 pr-3 sm:pr-4`}
        >
          <SharpChevron direction="left" />
        </button>
      ) : null}

      <div ref={viewportRef} className="w-full min-w-0 overflow-hidden">
        <div
          className="flex items-start transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          style={{ transform: `translate3d(-${offset}px, 0, 0)` }}
        >
          {mediaList.map((media, mediaIndex) => (
            <div
              key={`${media.video ?? media.photo}-${mediaIndex}`}
              className="shrink-0"
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

      {canScrollNext ? (
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Vidéo suivante"
          className={`${chevronClass} absolute right-0 top-1/2 z-20 translate-x-full -translate-y-1/2 pl-3 sm:pl-4`}
        >
          <SharpChevron direction="right" />
        </button>
      ) : null}
    </div>
  )
}

const FACTORY_GRAY = '#f3f4f6'

const OBJECTIVE_NUMBER_WIDTH = '2.5rem'

function FactoryModuleLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className="mb-4 flex flex-col items-start gap-[5px] uppercase sm:mb-5"
      style={TYPO_SUBTITLE}
    >
      <span className="inline-block w-fit bg-[#f58220] pl-[3px] pr-[43px] py-px font-bold tracking-[0.01em] text-black">
        {children}
      </span>
    </div>
  )
}

function FactoryGrayCard({
  children,
  cardRef,
  height,
}: {
  children: ReactNode
  cardRef?: RefObject<HTMLDivElement | null>
  height?: number
}) {
  return (
    <div
      ref={cardRef}
      className="flex w-full flex-col p-5 text-black sm:p-6"
      style={{
        backgroundColor: FACTORY_GRAY,
        height: height ? `${height}px` : undefined,
      }}
    >
      {children}
    </div>
  )
}

function FactoryModuleInfoGrid({
  header,
  objectives,
  materialSummary,
}: {
  header: ReactNode
  objectives: string[]
  materialSummary: string
}) {
  const objectivesCardRef = useRef<HTMLDivElement>(null)
  const [objectivesCardHeight, setObjectivesCardHeight] = useState<number>()

  useEffect(() => {
    const element = objectivesCardRef.current
    if (!element) return

    const updateHeight = () => {
      setObjectivesCardHeight(element.getBoundingClientRect().height)
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(element)
    return () => observer.disconnect()
  }, [objectives])

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-x-12 xl:gap-x-14">
      {/* Gauche — titres en haut, matériel poussé en bas */}
      <div className="flex min-w-0 flex-col lg:h-full">
        {header}
        <div className="hidden min-h-0 flex-1 lg:block" aria-hidden />
        <div className="pt-10 sm:pt-12 lg:pt-0">
          <FactoryModuleLabel>
            Matériel fourni{'\u00A0'}:
          </FactoryModuleLabel>
          <FactoryGrayCard height={objectivesCardHeight}>
            <p
              className="font-bold tracking-[0.01em]"
              style={TYPO_BODY}
            >
              {materialSummary}
            </p>
          </FactoryGrayCard>
        </div>
      </div>

      {/* Droite — Objectifs + liste en haut, hauteur naturelle */}
      <div className="flex min-w-0 flex-col">
        <FactoryModuleLabel>Objectifs</FactoryModuleLabel>
        <FactoryGrayCard cardRef={objectivesCardRef}>
          <FactoryObjectivesList objectives={objectives} />
        </FactoryGrayCard>
      </div>
    </div>
  )
}

function FactoryObjectivesList({ objectives }: { objectives: string[] }) {
  return (
    <ol className="flex flex-col gap-3 sm:gap-4">
      {objectives.map((objective, index) => (
        <li
          key={`${index}-${objective}`}
          className="flex items-start gap-3 sm:gap-4"
        >
          <span
            className="shrink-0 tabular-nums text-right font-bold tracking-[0.01em]"
            style={{
              ...TYPO_BODY,
              width: OBJECTIVE_NUMBER_WIDTH,
            }}
          >
            {index + 1}.
          </span>
          <p
            className="min-w-0 font-bold tracking-[0.01em]"
            style={TYPO_BODY}
          >
            {objective}
          </p>
        </li>
      ))}
    </ol>
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

      {/* 1 — LA FABRIQUE À DOUBLAGE (gris) */}
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
                La
              </span>
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                fabrique
              </span>
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
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
                  <span className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    Le doublage{'\u00A0'}:
                  </span>
                  <span className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    un programme
                  </span>
                  <span className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    culturel
                    </span>
                    <span className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    & pédagogique
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-14 lg:mt-16 flex flex-col gap-6 sm:gap-8">
              <p
                className="font-bold tracking-[0.01em] text-black animate-text-sweep"
                style={{
                  ...TYPO_SUBTITLE,
                  animationDelay: '400ms',
                }}
              >
                Modules de découverte à l&apos;école élémentaire, au collège et
                au lycée.
              </p>
              <div
                className="flex flex-col items-start gap-[5px] animate-text-sweep"
                style={{
                  ...TYPO_SUBTITLE,
                  animationDelay: '500ms',
                }}
              >
                <span className="inline-block w-fit bg-[#f58220] text-[#f3f4f6] font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                  Développer des actions culturelles et pédagogiques.
                </span>
                <span className="inline-block w-fit bg-[#f58220] text-[#f3f4f6] font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                  Promouvoir la culture cinématographique.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — ONGLETS + CONTENU (noir) */}
      <section className="relative bg-black text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0 overflow-visible">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px] overflow-visible">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] self-start"
            style={{ top: '180px' }}
          >
            <div className="flex flex-col items-start gap-5 sm:gap-6">
              <div
                className={`inline-flex w-max flex-col items-stretch gap-5 sm:gap-6 ${TYPO_TITLE_CLASS}`}
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
                        `w-full text-left ${TYPO_TITLE_CLASS} pl-[3px] pr-[43px] py-px transition-colors duration-300 cursor-pointer`,
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
                          `w-full text-left ${TYPO_BODY_CLASS} uppercase pl-[3px] pr-[43px] py-px transition-colors duration-300 cursor-pointer`,
                          isActiveModule
                            ? 'bg-white text-black'
                            : 'bg-transparent text-neutral-500 hover:bg-transparent hover:text-white',
                        ].join(' ')}
                        style={TYPO_BODY}
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
              className="w-full animate-text-sweep overflow-visible flex flex-col gap-10 sm:gap-14 lg:gap-16"
            >
              <div className="flex flex-col gap-10 sm:gap-12 lg:gap-14">
                <FactoryModuleInfoGrid
                  objectives={currentModule.objectives}
                  materialSummary={
                    currentModule.materialExtra
                      ? `${FACTORY_MATERIAL_SUMMARY} ${currentModule.materialExtra}`
                      : FACTORY_MATERIAL_SUMMARY
                  }
                  header={
                    <>
                      <div className="flex flex-col items-start gap-[5px] uppercase">
                        <span
                          className="inline-block w-fit bg-[#f58220] pl-[3px] pr-[43px] py-px font-bold tracking-[0.01em] text-black"
                          style={TYPO_SUBTITLE}
                        >
                          {currentModule.title}
                        </span>
                        <span
                          className="inline-block w-fit bg-white pl-[3px] pr-[43px] py-px font-bold tracking-[0.01em] text-black"
                          style={TYPO_BODY}
                        >
                          {current.publicLabel}
                        </span>
                      </div>

                      {(currentModule.desc || currentModule.subDesc) && (
                        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
                          {currentModule.desc && (
                            <p
                              className="font-bold tracking-[0.01em] text-white"
                              style={TYPO_BODY}
                            >
                              {currentModule.desc}
                            </p>
                          )}

                          {currentModule.subDesc && (
                            <p
                              className="font-normal italic tracking-[0.01em] text-white/75"
                              style={TYPO_BODY}
                            >
                              {currentModule.subDesc}
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  }
                />

                <div>
                  <Link
                    href="/formules"
                    className="group relative isolate inline-flex cursor-pointer overflow-hidden border-[3px] border-white bg-black px-6 py-4 no-underline transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#f58220] hover:bg-[#f58220]"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-[3px] z-0 bg-[#f58220] transition-[clip-path] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [clip-path:polygon(0_100%,0_100%,0_100%)] group-hover:[clip-path:polygon(0_100%,230%_100%,0_-130%)]"
                    />
                    <span
                      className="relative z-10 font-bold uppercase tracking-[0.01em] text-white transition-colors duration-500 group-hover:text-black"
                      style={TYPO_BODY}
                    >
                      {current.ctaButton}
                    </span>
                  </Link>
                </div>
              </div>

              {/* Vidéo pleine largeur */}
              <div className="w-full overflow-visible">
                {useMediaCarousel ? (
                  <FactoryMediaCarousel
                    mediaList={current.mediaList}
                    title={currentModule.title}
                    playingIndex={playingMediaIndex}
                    onPlay={setPlayingMediaIndex}
                    onSlideChange={() => setPlayingMediaIndex(null)}
                  />
                ) : activeMedia.video ? (
                  <div
                    className="relative w-full aspect-video overflow-hidden bg-neutral-950 flex items-center justify-center cursor-pointer group"
                    onClick={() => setIsVideoPlaying(true)}
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
                ) : (
                  <div className="relative w-full aspect-video overflow-hidden bg-neutral-950">
                    <img
                      src={withBasePath(activeMedia.photo)}
                      alt={currentModule.title}
                      className="absolute inset-0 h-full w-full object-cover md:scale-105"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection idPrefix="factory-contact" layout="stacked" />
    </section>
  )
}
