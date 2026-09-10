'use client'

import { useEffect, useRef, useState } from 'react'
import { Maximize, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { VideoPlayButton } from '@/components/video-play-button'
import { withBasePath } from '@/lib/paths'
import { handleYoutubeCoverError, youtubeCoverSrc } from '@/lib/youtube'

interface EventItem {
  id: string
  title: string
  date: string
  desc: string
  longText: string
  image?: string
  videoId?: string
}

const LUDIC_EVENTS: EventItem[] = [
  {
    id: 'l1',
    title: 'Festival Les Infatigables',
    date: '28/03/2026 - 29/03/2026',
    desc: 'Fontenay-sous-Bois',
    longText:
      'Festival Les Infatigables à Fontenay-sous-Bois.\nLes 28 et 29 mars 2026.',
    videoId: 'ew3o4ZZpU-c',
  },
  {
    id: 'l2',
    title: 'Festival Les Infatigables',
    date: '12/10/2024 - 13/10/2024',
    desc: 'Fontenay-sous-Bois',
    longText:
      'Festival Les Infatigables à Fontenay-sous-Bois.\nLes 12 et 13 octobre 2024.',
    videoId: '7zKsjDqizJQ',
  },
  {
    id: 'l3',
    title: 'Festival de doublage de Savonnières',
    date: '05/10/2024',
    desc: 'Savonnières',
    longText: 'Festival de doublage de Savonnières.\nLe 5 octobre 2024.',
    videoId: 'aWFopHNTChA',
  },
  {
    id: 'l4',
    title: 'Hors les murs — Quartier des Ardrets',
    date: '11/07/2023',
    desc: 'Brétigny-sur-Orge',
    longText:
      'Animation hors les murs dans le Quartier des Ardrets à Brétigny-sur-Orge.\nLe 11 juillet 2023.',
    image: '/Hors-les-Murs.jpg',
  },
  {
    id: 'l5',
    title: 'Festival Les Infatigables',
    date: '02/04/2023',
    desc: 'Fontenay-sous-Bois',
    longText:
      'Festival Les Infatigables à Fontenay-sous-Bois.\nLe 2 avril 2023.',
    videoId: 'y8U69CJB6zc',
  },
  {
    id: 'l6',
    title: 'Espace Nelson Mandela',
    date: '02/03/2022',
    desc: 'Brétigny-sur-Orge',
    longText:
      'Animation à l’Espace Nelson Mandela, Brétigny-sur-Orge.\nLe 2 mars 2022.',
    videoId: '1Yv4Ka62yb8',
  },
  {
    id: 'l7',
    title: 'Festival de doublage Apt face au virus',
    date: '14/08/2020',
    desc: 'Apt',
    longText: 'Festival de doublage Apt face au virus.\nLe 14 août 2020.',
    videoId: 'GdG4JR9Ht5k',
  },
  {
    id: 'l8',
    title: 'Mâcon Festival Effervescence',
    date: 'Octobre 2018',
    desc: 'Mâcon',
    longText: 'Festival Effervescence à Mâcon.\nOctobre 2018.',
    videoId: '0FRf2DVrxT4',
  },
  {
    id: 'l9',
    title: 'Centre Paris Anim',
    date: '17/02/2018',
    desc: 'Paris 19ème',
    longText:
      'Animation au Centre Paris Anim, Paris 19ème.\nLe 17 février 2018.',
    videoId: 'iomLA6-5LDk',
  },
  {
    id: 'l10',
    title: 'Fête scolaire de fin d’année',
    date: '07/07/2017',
    desc: 'Mardeuil',
    longText: 'Fête scolaire de fin d’année à Mardeuil.\nLe 7 juillet 2017.',
    videoId: 'aui1hA8_GS4',
  },
  {
    id: 'l11',
    title: 'Fête du Court Métrage',
    date: '17/12/2016 - 18/12/2016',
    desc: 'Carreau du Temple — Paris 11ème',
    longText:
      'Fête du Court Métrage au Carreau du Temple, Paris 11ème.\nLes 17 et 18 décembre 2016.',
    videoId: 'u56qoOOZksA',
  },
  {
    id: 'l12',
    title: 'Festival l’été frappé',
    date: '30/08/2016 - 31/08/2016',
    desc: 'Mâcon',
    longText: 'Festival l’été frappé à Mâcon.\nLes 30 et 31 août 2016.',
    videoId: 'yq44n0JngmQ',
  },
  {
    id: 'l13',
    title: 'Festival de l’humour de résistance',
    date: '17/04/2016',
    desc: 'Chalon-sur-Saône',
    longText:
      'Festival de l’humour de résistance à Chalon-sur-Saône.\nLe 17 avril 2016.',
    videoId: 'SLIQDuVI12s',
  },
  {
    id: 'l14',
    title: 'Apt Captation',
    date: '08/08/2015',
    desc: 'Première animation doublage de l’association',
    longText:
      'Apt Captation — première animation doublage de l’association.\nLe 8 août 2015.',
    videoId: 'cFaV3rzLHnw',
  },
]

const FACTORY_EVENTS: EventItem[] = [
  {
    id: 'f1',
    title: 'École Philippe de Girard',
    date: 'Année 2023',
    desc: 'Classe de CM1/CM2 — Paris 18ème',
    longText:
      'La Fabrique à doublage à l’école Philippe de Girard, Paris 18ème.\nClasse de CM1/CM2 — année 2023.',
    videoId: '8QNw-f1ia1A',
  },
  {
    id: 'f2',
    title: 'Conférence ESRA Paris',
    date: '17/07/2022',
    desc: 'Présentation du métier d’adaptateur de doublage',
    longText:
      'Conférence ESRA Paris.\nPrésentation du métier d’adaptateur de doublage.\nLe 17 juillet 2022.',
    image: '/conference-esra-ecole-de-cinema-2021-22.jpg',
  },
  {
    id: 'f3',
    title: 'École Philippe de Girard',
    date: 'Année 2022',
    desc: 'Classe de CM1/CM2 — Paris 18ème',
    longText:
      'La Fabrique à doublage à l’école Philippe de Girard, Paris 18ème.\nClasse de CM1/CM2 — année 2022.',
    videoId: 'oT2paY-TNIM',
  },
  {
    id: 'f4',
    title: 'Atelier du Quetzal',
    date: 'Novembre 2022',
    desc: 'Centre Jean Vilar — Champigny-sur-Marne',
    longText:
      'Atelier du Quetzal au Centre Jean Vilar, Champigny-sur-Marne.\nAdaptation, écriture et doublage.\nNovembre 2022.',
    videoId: 'FnSRfW1HKck',
  },
  {
    id: 'f5',
    title: 'École Philippe de Girard',
    date: 'Année 2021',
    desc: 'Classe de CM1/CM2 — Paris 18ème',
    longText:
      'La Fabrique à doublage à l’école Philippe de Girard, Paris 18ème.\nClasse de CM1/CM2 — année 2021.',
    videoId: 'Z86N4znIQwQ',
  },
  {
    id: 'f6',
    title: 'Le grand Bazar des Savoirs',
    date: '05/09/2020',
    desc: 'Maif Social Club — Paris',
    longText:
      'Le grand Bazar des Savoirs au Maif Social Club, Paris.\nLe 5 septembre 2020.',
    image: '/le-grand-bazar-des-savoirs.jpg',
  },
  {
    id: 'f7',
    title: 'École Philippe de Girard',
    date: 'Année 2019',
    desc: 'Classe de CM1/CM2 — Paris 18ème',
    longText:
      'La Fabrique à doublage à l’école Philippe de Girard, Paris 18ème.\nClasse de CM1/CM2 — année 2019.',
    videoId: 'PserkUDl1n8',
  },
  {
    id: 'f8',
    title: 'Conférence Université de Rennes',
    date: 'Mars 2019',
    desc: 'Master 2 d’anglais — Présentation du métier d’adaptateur de doublage',
    longText:
      'Conférence à l’Université de Rennes, Master 2 d’anglais.\nPrésentation du métier d’adaptateur de doublage.\nMars 2019.',
    image: '/Conférence-Fac-de-Rennes-01-2020.jpg',
  },
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

const EVENTS_INTRO_PHOTOS = [
  '/affiche-1.png',
  '/doublage-2.png',
  '/enfants-2.png',
]

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
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 min-h-0 md:h-full order-2 md:order-1">
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
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-black order-1 md:order-2">
        <img
          src={withBasePath(main)}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: mainObjectPosition }}
        />
      </div>
    </div>
  )
}

function splitIntoChipLines(text: string, maxLen = 20): string[] {
  const words = text.trim().split(/\s+/)
  if (words.length <= 1) return [text]

  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (current && next.length > maxLen) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }

  if (current) lines.push(current)
  return lines.length > 0 ? lines : [text]
}

function EventCardMedia({ event }: { event: EventItem }) {
  if (event.videoId) {
    return (
      <img
        src={youtubeCoverSrc(event.videoId)}
        alt={event.title}
        decoding="async"
        onError={(e) => handleYoutubeCoverError(e, event.videoId!)}
        className="absolute inset-0 h-full w-full object-cover"
      />
    )
  }

  if (event.image) {
    return (
      <img
        src={withBasePath(event.image)}
        alt={event.title}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
      />
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <span className="bg-white text-black font-bold tracking-[0.01em] uppercase px-[3px] py-px text-[11px]">
        À venir
      </span>
    </div>
  )
}

function EventCard({
  event,
  onOpen,
  tone,
  width,
}: {
  event: EventItem
  onOpen: (event: EventItem, tone: 'dark' | 'light') => void
  tone: 'dark' | 'light'
  width: number
}) {
  const titleLines = splitIntoChipLines(event.title, 18).slice(0, 3)
  const dateLines = splitIntoChipLines(event.date, 16).slice(0, 2)
  const isDark = tone === 'dark'

  return (
    <button
      type="button"
      data-event-card
      onClick={() => onOpen(event, tone)}
      style={
        width > 0
          ? { width, minWidth: width, maxWidth: width }
          : undefined
      }
      className={[
        'group/card shrink-0 flex flex-col text-left cursor-pointer transition-colors duration-300',
        width <= 0
          ? 'w-[calc(50%-1rem)] sm:w-[calc(50%-1.25rem)] lg:w-[calc(50%-1.5rem)]'
          : '',
        isDark
          ? 'bg-white text-black hover:bg-[#f58220]'
          : 'bg-black text-white hover:bg-[#f58220]',
      ].join(' ')}
    >
      <div className="relative w-full aspect-[16/10] shrink-0 overflow-hidden bg-black">
        <EventCardMedia event={event} />
      </div>

      <div className="flex flex-col p-5 sm:p-6 lg:p-7">
        <div
          className="flex flex-col items-start justify-start gap-[5px] uppercase h-[5.85em] overflow-hidden"
          style={{
            fontSize: 'clamp(18px, 1.5vw, 26px)',
            lineHeight: 1.15,
          }}
        >
          {titleLines.map((line, index) => (
            <span
              key={`${event.id}-title-${index}`}
              className={[
                'inline-block w-fit max-w-full font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px transition-colors duration-300',
                isDark
                  ? 'bg-black text-white group-hover/card:bg-white group-hover/card:text-[#f58220]'
                  : 'bg-white text-black group-hover/card:bg-white group-hover/card:text-[#f58220]',
              ].join(' ')}
            >
              {line}
            </span>
          ))}
        </div>

        <div
          className="mt-5 sm:mt-6 flex flex-col items-start justify-start gap-[5px] h-[2.85em] overflow-hidden"
          style={{
            fontSize: 'clamp(16px, 1.3vw, 22px)',
            lineHeight: 1.15,
          }}
        >
          {dateLines.map((line, index) => (
            <span
              key={`${event.id}-date-${index}`}
              className={[
                'inline-block w-fit max-w-full font-bold tracking-[0.01em] px-[3px] py-px transition-colors duration-300',
                isDark
                  ? 'bg-black text-white group-hover/card:bg-white group-hover/card:text-[#f58220]'
                  : 'bg-white text-black group-hover/card:bg-white group-hover/card:text-[#f58220]',
              ].join(' ')}
            >
              {line}
            </span>
          ))}
        </div>

        <p
          className={[
            'mt-4 sm:mt-5 font-bold tracking-[0.01em] h-[2.6em] overflow-hidden transition-colors duration-300',
            isDark
              ? 'text-black group-hover/card:text-white'
              : 'text-white group-hover/card:text-white',
          ].join(' ')}
          style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            lineHeight: 1.3,
          }}
        >
          {event.desc}
        </p>
      </div>
    </button>
  )
}

function EventsCarousel({
  events,
  tone,
  onOpen,
}: {
  events: EventItem[]
  tone: 'dark' | 'light'
  onOpen: (event: EventItem, tone: 'dark' | 'light') => void
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
    const nextMax = Math.max(0, events.length - 2)

    setCardWidth(nextCardWidth)
    setStep(nextStep)
    setMaxIndex(nextMax)
    setIndex((current) => Math.min(current, nextMax))
  }

  useEffect(() => {
    setIndex(0)
  }, [events])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const ro = new ResizeObserver(() => {
      measure()
    })
    ro.observe(viewport)
    measure()

    return () => ro.disconnect()
  }, [events])

  const scrollByCard = (direction: -1 | 1) => {
    setIndex((current) => Math.min(maxIndex, Math.max(0, current + direction)))
  }

  const canScrollPrev = index > 0
  const canScrollNext = index < maxIndex
  const offset = step * index

  const chevronClass = [
    'inline-flex items-center justify-center p-0 bg-transparent border-0 rounded-none shadow-none outline-none transition-opacity duration-300 cursor-pointer hover:opacity-70',
    tone === 'dark' ? 'text-white' : 'text-black',
  ].join(' ')

  return (
    <div className="relative w-full min-w-0 overflow-visible">
      {canScrollPrev ? (
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Événements précédents"
          className={`${chevronClass} absolute left-0 top-1/2 z-20 -translate-x-full -translate-y-1/2 pr-3 sm:pr-4`}
        >
          <SharpChevron direction="left" />
        </button>
      ) : null}

      <div ref={viewportRef} className="w-full min-w-0 overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-start gap-8 sm:gap-10 lg:gap-12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          style={{ transform: `translate3d(-${offset}px, 0, 0)` }}
        >
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              tone={tone}
              width={cardWidth}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>

      {canScrollNext ? (
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Événements suivants"
          className={`${chevronClass} absolute right-0 top-1/2 z-20 translate-x-full -translate-y-1/2 pl-3 sm:pl-4`}
        >
          <SharpChevron direction="right" />
        </button>
      ) : null}
    </div>
  )
}

export function EventsView() {
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null)
  const [activeTone, setActiveTone] = useState<'dark' | 'light'>('dark')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  const handleOpenModal = (ev: EventItem, tone: 'dark' | 'light') => {
    setActiveEvent(ev)
    setActiveTone(tone)
    setIsVideoPlaying(false)
    setIsPlaying(true)
    setIsMuted(false)
  }

  const handleCloseModal = () => {
    setActiveEvent(null)
    setIsVideoPlaying(false)
    setIsPlaying(true)
    setIsMuted(false)
  }

  const postYTCommand = (func: string, args: unknown = '') => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*',
      )
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      postYTCommand('pauseVideo')
      setIsPlaying(false)
    } else {
      postYTCommand('playVideo')
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      postYTCommand('unMute')
      setIsMuted(false)
    } else {
      postYTCommand('mute')
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    } else {
      videoContainerRef.current.requestFullscreen().catch(() => {})
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal()
    }
    if (activeEvent) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeEvent])

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
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
              <span className="inline-block w-fit bg-[#f58220] text-white pl-[3px] pr-[43px] py-px">
                Nos
              </span>
              <span className="inline-block w-fit bg-[#f58220] text-white pl-[3px] pr-[43px] py-px">
                prestations
              </span>
              <span className="inline-block w-fit bg-[#f58220] text-white pl-[3px] pr-[43px] py-px">
                passées
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col overflow-visible">
            <div
              className="relative w-full animate-text-sweep overflow-visible"
              style={{ animationDelay: '200ms' }}
            >
              <PhotoTriptych
                photos={EVENTS_INTRO_PHOTOS}
                alt="Nos prestations passées"
              />

              <div className="absolute left-[-4%] sm:left-[-3%] top-[52%] sm:top-[55%] z-20 pointer-events-none w-[70%] sm:w-[58%] lg:w-[52%] -translate-y-1/2 rotate-2">
                <div
                  className="flex flex-col items-start gap-[5px] uppercase"
                  style={{
                    fontSize: 'clamp(16px, 1.9vw, 28px)',
                    lineHeight: 1.15,
                  }}
                >
                  <span className="inline-block w-fit bg-[#f58220] text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    Retrouvez
                  </span>
                  <span className="inline-block w-fit bg-[#f58220] text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    l&apos;association
                  </span>
                  <span className="inline-block w-fit bg-[#f58220] text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    Tournez Bobines
                  </span>
                  <span className="inline-block w-fit bg-[#f58220] text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    tout au long
                  </span>
                  <span className="inline-block w-fit bg-[#f58220] text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    de l&apos;année
                  </span>
                </div>
              </div>
            </div>

            <div
              className="mt-10 sm:mt-14 lg:mt-16 animate-text-sweep"
              style={{ animationDelay: '350ms' }}
            >
              <a
                href="https://www.youtube.com/@TournezBobines"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] uppercase pl-[3px] pr-[43px] py-px no-underline transition-colors duration-300 cursor-pointer hover:bg-[#f58220] hover:text-white"
                style={{
                  fontSize: 'clamp(16px, 1.9vw, 28px)',
                  lineHeight: 1.15,
                }}
              >
                Découvrez notre chaîne YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — DOUBLAGE POUR TOUS (noir) */}
      <section className="relative bg-black text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0 overflow-visible">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px] overflow-visible">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">
                Doublage
              </span>
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">
                pour tous
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 min-w-0 overflow-visible animate-text-sweep">
            <EventsCarousel
              events={LUDIC_EVENTS}
              tone="dark"
              onOpen={handleOpenModal}
            />
          </div>
        </div>
      </section>

      {/* 3 — FABRIQUE À DOUBLAGE (gris) */}
      <section className="relative bg-[#f3f4f6] text-neutral-950 py-16 lg:py-24 px-4 sm:px-6 lg:px-0 overflow-visible">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px] overflow-visible">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
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

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 min-w-0 overflow-visible animate-text-sweep">
            <EventsCarousel
              events={FACTORY_EVENTS}
              tone="light"
              onOpen={handleOpenModal}
            />
          </div>
        </div>
      </section>

      {/* MODALE */}
      {activeEvent ? (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/90"
          onClick={handleCloseModal}
        >
          <div
            className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 lg:p-10 ${
              activeTone === 'dark'
                ? 'bg-black text-white border border-white'
                : 'bg-[#f3f4f6] text-black'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseModal}
              className={`absolute top-4 right-4 sm:top-5 sm:right-5 inline-flex items-center justify-center p-2 transition-colors cursor-pointer ${
                activeTone === 'dark'
                  ? 'bg-white text-black hover:bg-[#f58220]'
                  : 'bg-black text-white hover:bg-[#f58220] hover:text-black'
              }`}
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <div className="pr-12 sm:pr-14 flex flex-col gap-4">
              <div
                className="flex flex-col items-start gap-[5px]"
                style={{
                  fontSize: 'clamp(16px, 1.3vw, 22px)',
                  lineHeight: 1.15,
                }}
              >
                {splitIntoChipLines(activeEvent.date, 16).map((line) => (
                  <span
                    key={line}
                    className="inline-block w-fit bg-[#f58220] text-white font-bold tracking-[0.01em] px-[3px] py-px"
                  >
                    {line}
                  </span>
                ))}
              </div>

              <div
                className="flex flex-col items-start gap-[5px] uppercase"
                style={{
                  fontSize: 'clamp(22px, 2.2vw, 36px)',
                  lineHeight: 1.15,
                }}
              >
                {splitIntoChipLines(activeEvent.title, 18).map((line) => (
                  <span
                    key={line}
                    className={`inline-block w-fit font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px ${
                      activeTone === 'dark'
                        ? 'bg-white text-black'
                        : 'bg-black text-[#f3f4f6]'
                    }`}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 sm:mt-10 w-full max-w-xl mx-auto flex flex-col gap-3 sm:gap-4">
              {activeEvent.image ? (
                  <div
                    className={`relative w-full aspect-[4/3] overflow-hidden ${
                      activeTone === 'dark' ? 'bg-neutral-950' : 'bg-black'
                    }`}
                  >
                    <img
                      src={withBasePath(activeEvent.image)}
                      alt={activeEvent.title}
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  </div>
                ) : null}

                {activeEvent.videoId ? (
                  <div
                    ref={videoContainerRef}
                    className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center group/player"
                  >
                    {!isVideoPlaying ? (
                      <div
                        className="relative h-full w-full overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
                        onClick={() => {
                          setIsVideoPlaying(true)
                          setIsPlaying(true)
                        }}
                      >
                        <img
                          src={youtubeCoverSrc(activeEvent.videoId)}
                          alt={activeEvent.title}
                          decoding="async"
                          onError={(e) =>
                            handleYoutubeCoverError(e, activeEvent.videoId!)
                          }
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <VideoPlayButton className="pointer-events-none" />
                      </div>
                    ) : (
                      <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                        <iframe
                          ref={iframeRef}
                          className="w-full h-full pointer-events-none select-none"
                          src={`https://www.youtube-nocookie.com/embed/${activeEvent.videoId}?enablejsapi=1&autoplay=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&vq=hd1080`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          title={activeEvent.title}
                        />

                        <div
                          className="absolute inset-0 z-10 cursor-pointer"
                          onClick={togglePlay}
                        />

                        {!isPlaying ? (
                          <VideoPlayButton
                            onClick={togglePlay}
                            className="absolute z-20 pointer-events-auto cursor-pointer"
                          />
                        ) : null}

                        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300 pointer-events-auto">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={togglePlay}
                              className="text-white hover:text-[#f58220] transition-colors p-1 cursor-pointer"
                              aria-label={isPlaying ? 'Pause' : 'Lecture'}
                            >
                              {isPlaying ? (
                                <Pause size={20} />
                              ) : (
                                <Play size={20} />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={toggleMute}
                              className="text-white hover:text-[#f58220] transition-colors p-1 cursor-pointer"
                              aria-label={
                                isMuted ? 'Activer le son' : 'Coupure du son'
                              }
                            >
                              {isMuted ? (
                                <VolumeX size={20} />
                              ) : (
                                <Volume2 size={20} />
                              )}
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={toggleFullscreen}
                            className="text-white hover:text-[#f58220] transition-colors p-1 cursor-pointer"
                            aria-label="Plein écran"
                          >
                            <Maximize size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

              <div className="flex flex-col gap-0.5">
                {activeEvent.longText.split('\n').map((line, index) => (
                  <p
                    key={`${activeEvent.id}-line-${index}`}
                    className={`font-bold tracking-[0.01em] ${
                      activeTone === 'dark' ? 'text-white' : 'text-black'
                    }`}
                    style={{
                      fontSize: 'clamp(11px, 0.85vw, 13px)',
                      lineHeight: 1.4,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
