'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'
import { VideoPlayButton } from '@/components/video-play-button'
import { FormulaFrame } from '@/components/formula-frame'
import { withBasePath } from '@/lib/paths'

interface EventItem {
  id: string
  title: string
  date: string
  desc: string
  longText: string
  image?: string
  videoId?: string
}

interface EventsViewProps {
  onOpenContact?: () => void
}

const LUDIC_EVENTS: EventItem[] = [
  {
    id: 'l1',
    title: 'Festival Les Infatigables',
    date: '28/03/2026 - 29/03/2026',
    desc: 'Fontenay-sous-Bois',
    longText: 'Festival Les Infatigables à Fontenay-sous-Bois.\nLes 28 et 29 mars 2026.',
    image: '/Les-Infatiguables-2026.jpg',
    videoId: 'ew3o4ZZpU-c',
  },
  {
    id: 'l2',
    title: 'Festival Les Infatigables',
    date: '12/10/2024 - 13/10/2024',
    desc: 'Fontenay-sous-Bois',
    longText: 'Festival Les Infatigables à Fontenay-sous-Bois.\nLes 12 et 13 octobre 2024.',
    image: '/Les-Infatiguables-2024.jpg',
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
    longText: 'Animation hors les murs dans le Quartier des Ardrets à Brétigny-sur-Orge.\nLe 11 juillet 2023.',
    image: '/Hors-les-Murs.jpg',
  },
  {
    id: 'l5',
    title: 'Festival Les Infatigables',
    date: '02/04/2023',
    desc: 'Fontenay-sous-Bois',
    longText: 'Festival Les Infatigables à Fontenay-sous-Bois.\nLe 2 avril 2023.',
    image: '/Les-Infatiguables-2023.jpg',
    videoId: 'y8U69CJB6zc',
  },
  {
    id: 'l6',
    title: 'Espace Nelson Mandela',
    date: '02/03/2022',
    desc: 'Brétigny-sur-Orge',
    longText: 'Animation à l’Espace Nelson Mandela, Brétigny-sur-Orge.\nLe 2 mars 2022.',
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
    longText: 'Animation au Centre Paris Anim, Paris 19ème.\nLe 17 février 2018.',
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
    longText: 'Fête du Court Métrage au Carreau du Temple, Paris 11ème.\nLes 17 et 18 décembre 2016.',
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
    longText: 'Festival de l’humour de résistance à Chalon-sur-Saône.\nLe 17 avril 2016.',
    videoId: 'SLIQDuVI12s',
  },
  {
    id: 'l14',
    title: 'Apt Captation',
    date: '08/08/2015',
    desc: 'Première animation doublage de l’association',
    longText: 'Apt Captation — première animation doublage de l’association.\nLe 8 août 2015.',
    videoId: 'cFaV3rzLHnw',
  },
]

const FACTORY_EVENTS: EventItem[] = [
  {
    id: 'f1',
    title: 'École Philippe de Girard',
    date: 'Année 2023',
    desc: 'Classe de CM1/CM2 — Paris 18ème',
    longText: 'La Fabrique à doublage à l’école Philippe de Girard, Paris 18ème.\nClasse de CM1/CM2 — année 2023.',
    videoId: '8QNw-f1ia1A',
  },
  {
    id: 'f2',
    title: 'Conférence ESRA Paris',
    date: '17/07/2022',
    desc: 'Présentation du métier d’adaptateur de doublage',
    longText: 'Conférence ESRA Paris.\nPrésentation du métier d’adaptateur de doublage.\nLe 17 juillet 2022.',
    image: '/conference-esra-ecole-de-cinema-2021-22.jpg',
  },
  {
    id: 'f3',
    title: 'École Philippe de Girard',
    date: 'Année 2022',
    desc: 'Classe de CM1/CM2 — Paris 18ème',
    longText: 'La Fabrique à doublage à l’école Philippe de Girard, Paris 18ème.\nClasse de CM1/CM2 — année 2022.',
    videoId: 'oT2paY-TNIM',
  },
  {
    id: 'f4',
    title: 'Atelier du Quetzal',
    date: 'Novembre 2022',
    desc: 'Centre Jean Vilar — Champigny-sur-Marne',
    longText: 'Atelier du Quetzal au Centre Jean Vilar, Champigny-sur-Marne.\nAdaptation, écriture et doublage.\nNovembre 2022.',
    videoId: 'FnSRfW1HKck',
  },
  {
    id: 'f5',
    title: 'École Philippe de Girard',
    date: 'Année 2021',
    desc: 'Classe de CM1/CM2 — Paris 18ème',
    longText: 'La Fabrique à doublage à l’école Philippe de Girard, Paris 18ème.\nClasse de CM1/CM2 — année 2021.',
    videoId: 'Z86N4znIQwQ',
  },
  {
    id: 'f6',
    title: 'Le grand Bazar des Savoirs',
    date: '05/09/2020',
    desc: 'Maif Social Club — Paris',
    longText: 'Le grand Bazar des Savoirs au Maif Social Club, Paris.\nLe 5 septembre 2020.',
    image: '/le-grand-bazar-des-savoirs.jpg',
  },
  {
    id: 'f7',
    title: 'École Philippe de Girard',
    date: 'Année 2019',
    desc: 'Classe de CM1/CM2 — Paris 18ème',
    longText: 'La Fabrique à doublage à l’école Philippe de Girard, Paris 18ème.\nClasse de CM1/CM2 — année 2019.',
    videoId: 'PserkUDl1n8',
  },
  {
    id: 'f8',
    title: 'Conférence Université de Rennes',
    date: 'Mars 2019',
    desc: 'Master 2 d’anglais — Présentation du métier d’adaptateur de doublage',
    longText: 'Conférence à l’Université de Rennes, Master 2 d’anglais.\nPrésentation du métier d’adaptateur de doublage.\nMars 2019.',
    image: '/Conférence-Fac-de-Rennes-01-2020.jpg',
  },
]

export function EventsView({ onOpenContact }: EventsViewProps) {
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  const handleOpenModal = (ev: EventItem) => {
    setActiveEvent(ev)
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
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
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
    if (videoContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {})
      } else {
        videoContainerRef.current.requestFullscreen().catch(() => {})
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal()
      }
    }
    if (activeEvent) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeEvent])

  const renderThumbnail = (ev: EventItem) => {
    if (ev.videoId) {
      return (
        <Image
          src={`https://i.ytimg.com/vi/${ev.videoId}/hqdefault.jpg`}
          alt={ev.title}
          fill
          className="object-cover scale-[1.40] opacity-85 group-hover/item:opacity-100 transition-opacity duration-300"
        />
      )
    }

    if (ev.image) {
      return (
        <Image
          src={withBasePath(ev.image)}
          alt={ev.title}
          fill
          className="object-cover scale-110 origin-center transition-opacity duration-300"
        />
      )
    }

    return (
      <div className="w-full h-full bg-white/95 flex flex-col items-center justify-center p-2 text-center transition-colors group-hover/item:bg-white">
        <span className="text-[10px] font-semibold text-neutral-800 uppercase tracking-wider">
          À venir
        </span>
      </div>
    )
  }

  const renderEventList = (events: EventItem[]) => (
    <div className="flex flex-col gap-4 flex-1">
      {events.map((ev) => (
        <div
          key={ev.id}
          role="button"
          tabIndex={0}
          onClick={() => handleOpenModal(ev)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleOpenModal(ev)
            }
          }}
          className="group/item flex flex-col sm:flex-row items-center gap-4 p-4 rounded-none bg-black border border-white/10 hover:border-red-500/60 hover:bg-black transition-all duration-300 cursor-pointer shadow-md focus:outline-none focus:ring-1 focus:ring-red-500"
        >
          <div className="relative w-full sm:w-[140px] h-[100px] shrink-0 rounded-none overflow-hidden border border-white/10 bg-black flex items-center justify-center">
            {renderThumbnail(ev)}
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="flex flex-col gap-1 mb-1">
              <h3 className="font-serif italic text-base text-neutral-100 group-hover/item:text-red-400 transition-colors text-balance">
                {ev.title}
              </h3>
              <span className="text-[11px] sm:text-xs font-medium tracking-wide text-red-500/90">
                {ev.date}
              </span>
            </div>
            <p className="text-base text-neutral-400 leading-relaxed line-clamp-2">
              {ev.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="relative min-h-screen w-full bg-black text-neutral-50 overflow-hidden pt-20 pb-24 select-none">
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-text-sweep {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .diagonal-stripes {
          background-image: repeating-linear-gradient(
            135deg,
            rgba(220, 38, 38, 0.25),
            rgba(220, 38, 38, 0.25) 1px,
            transparent 1px,
            transparent 12px
          );
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-12 sm:px-8 w-full">
        <header className="text-center animate-text-sweep max-w-4xl mx-auto">
          <p className="mb-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
            Événements
          </p>
          <h1 className="text-balance font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight drop-shadow-md">
            Nos prestations passées
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-neutral-300">
            Retrouvez l&apos;association Tournez Bobines tout au long de l&apos;année. Cliquez sur un événement pour découvrir ses détails, photos et vidéos.
          </p>
        </header>

        <div className="mt-8 flex justify-center animate-text-sweep" style={{ animationDelay: '100ms' }}>
<a
          href="https://www.youtube.com/@TournezBobines"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium tracking-wide text-neutral-200 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
        >
          Découvrez notre chaîne YouTube
        </a>
      </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <div className="animate-text-sweep h-full" style={{ animationDelay: '150ms' }}>
            <FormulaFrame hover={false}>
              <div className="flex h-full flex-col">
                <div className="text-center mb-8">
                  <p className="mb-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Animations</p>
                  <h2 className="font-serif italic text-2xl sm:text-3xl tracking-tight text-white drop-shadow-sm">
                    Doublage pour tous
                  </h2>
                </div>
                {renderEventList(LUDIC_EVENTS)}
              </div>
            </FormulaFrame>
          </div>

          <div className="animate-text-sweep h-full" style={{ animationDelay: '250ms' }}>
            <FormulaFrame hover={false}>
              <div className="flex h-full flex-col">
                <div className="text-center mb-8">
                  <p className="mb-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Pédagogie</p>
                  <h2 className="font-serif italic text-2xl sm:text-3xl tracking-tight text-white drop-shadow-sm">
                    La Fabrique à Doublage
                  </h2>
                </div>
                {renderEventList(FACTORY_EVENTS)}
              </div>
            </FormulaFrame>
          </div>
        </div>

        {activeEvent && (
          <div 
            className="fixed inset-0 z-[99999] flex items-center justify-center p-0 bg-black/85 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            <div 
              className="relative w-full max-w-4xl mx-6 my-6 sm:mx-10 sm:my-8 p-5 sm:p-8 bg-neutral-950 rounded-none shadow-2xl flex flex-col justify-between overflow-visible border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-red-600 rounded-full transition-colors z-40 cursor-pointer shadow-lg"
                aria-label="Fermer la fenêtre modale"
              >
                <X size={18} />
              </button>

              <div className="text-center shrink-0 mb-5">
                <p className="mb-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
                  {activeEvent.date}
                </p>
                <h2 className="font-serif italic text-xl sm:text-2xl text-white mt-1">{activeEvent.title}</h2>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-3xl mx-auto">
                  {activeEvent.image && (
                    <div className="relative h-[220px] sm:h-[280px] w-[200px] sm:w-[240px] shrink-0 flex items-center justify-center">
                      <Image
                        src={withBasePath(activeEvent.image)}
                        alt={activeEvent.title}
                        fill
                        className="object-contain shadow-lg"
                      />
                    </div>
                  )}

                  {activeEvent.videoId && (
                    <div
                      ref={videoContainerRef}
                      className="relative h-[220px] sm:h-[280px] aspect-video rounded-none overflow-hidden bg-neutral-950 flex items-center justify-center shadow-md border border-white/10 shrink-0 group/player"
                    >
                      {!isVideoPlaying ? (
                        <div
                          className="relative h-full w-full overflow-hidden rounded-none bg-neutral-950 flex items-center justify-center cursor-pointer group/vid"
                          onClick={() => {
                            setIsVideoPlaying(true)
                            setIsPlaying(true)
                          }}
                        >
                          <Image
                            src={`https://i.ytimg.com/vi/${activeEvent.videoId}/hqdefault.jpg`}
                            alt={activeEvent.title}
                            fill
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 bg-black/20" />
                          <VideoPlayButton className="pointer-events-none" />
                        </div>
                      ) : (
                        <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                          <iframe
                            ref={iframeRef}
                            className="w-full h-full pointer-events-none select-none"
                            src={`https://www.youtube-nocookie.com/embed/${activeEvent.videoId}?enablejsapi=1&autoplay=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title={activeEvent.title}
                          />

                          <div
                            className="absolute inset-0 z-10 cursor-pointer"
                            onClick={togglePlay}
                          />

                          {!isPlaying && (
                            <VideoPlayButton
                              onClick={togglePlay}
                              className="absolute z-20 pointer-events-auto cursor-pointer"
                            />
                          )}

                          <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300 pointer-events-auto">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={togglePlay}
                                className="text-white hover:text-red-500 transition-colors p-1 cursor-pointer"
                                aria-label={isPlaying ? 'Pause' : 'Lecture'}
                              >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                              </button>
                              <button
                                onClick={toggleMute}
                                className="text-white hover:text-red-500 transition-colors p-1 cursor-pointer"
                                aria-label={isMuted ? 'Activer le son' : 'Coupure du son'}
                              >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                              </button>
                            </div>

                            <button
                              onClick={toggleFullscreen}
                              className="text-white hover:text-red-500 transition-colors p-1 cursor-pointer"
                              aria-label="Plein écran"
                            >
                              <Maximize size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="w-full bg-transparent p-0 max-w-2xl mx-auto">
                  <div className="space-y-1.5 text-xs text-neutral-300 leading-relaxed font-sans text-center">
                    {activeEvent.longText.split('\n').map((line, index) => (
                      <p key={index}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  )
}