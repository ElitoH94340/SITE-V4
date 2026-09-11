'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react'
import { ContactSection } from '@/components/contact-section'
import { DrawingLogo } from '@/components/drawing-logo'
import { withBasePath } from '@/lib/paths'
import { TYPO_SUBTITLE, TYPO_TITLE } from '@/lib/typography'

const RECTANGLE_THEMES = {
  lightOnDark:
    'inline-block w-fit whitespace-nowrap bg-black text-[#f0f0eb] font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px',
  white:
    'inline-block w-fit whitespace-nowrap bg-white text-black font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px',
  orange:
    'inline-block w-fit whitespace-nowrap bg-[#f58220] text-black font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px',
} as const

const TEAM_ORIGIN_LINES = [
  "À l'origine",
  'trois ami.e.s',
  'passionné.e.s',
  'de cinéma,',
  'aux\u00A0compétences',
  'complémentaires.',
] as const

function wrapRectangleLine(
  text: string,
  maxWidth: number,
  measure: (value: string) => number,
): string[] {
  if (maxWidth <= 0) return [text]

  // Ne pas couper sur les espaces insécables (ex. « aux compétences »)
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

function HomeRectangleLines({
  lines,
  theme,
  className = '',
  style,
}: {
  lines: readonly string[]
  theme: keyof typeof RECTANGLE_THEMES
  className?: string
  style?: CSSProperties
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

  const measureRectangle = useCallback(
    (value: string) => {
      const measurer = measurerRef.current
      if (!measurer) return value.length * 10
      measurer.textContent = value
      return measurer.getBoundingClientRect().width
    },
    [],
  )

  const maxRectangleWidth = containerWidth

  const wrappedLines = useMemo(
    () =>
      lines.flatMap((line) =>
        wrapRectangleLine(line, maxRectangleWidth, measureRectangle),
      ),
    [lines, maxRectangleWidth, measureRectangle],
  )

  return (
    <div ref={containerRef} className={className}>
      <span
        ref={measurerRef}
        aria-hidden
        className={`pointer-events-none fixed -left-[9999px] top-0 ${RECTANGLE_THEMES[theme]}`}
        style={style}
      />
      <div className="flex flex-col items-start gap-[5px]">
        {wrappedLines.map((line, index) => (
          <span
            key={`${line}-${index}`}
            className={RECTANGLE_THEMES[theme]}
            style={style}
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  )
}

const teamRoles = [
  {
    id: 'adaptateur',
    titleLines: ['Traduction &', 'Adaptation'],
    summary:
      'Un auteur-adaptateur de doublage, bilingue en anglais et expert.',
  },
  {
    id: 'direction',
    titleLines: ['Direction &', 'Pédagogie'],
    summary:
      'Une professeure des écoles, ancienne directrice de salles de cinémas.',
  },
  {
    id: 'technique',
    titleLines: ['Langage &', 'Technique'],
    summary:
      'Une ingénieure d’études, professeure de français langue étrangère à l’université.',
  },
]

export function HomeView() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isMuted, setIsMuted] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isNearBottom, setIsNearBottom] = useState(false)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const handleScrollButtonClick = () => {
    if (!isAtTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      const el = document.getElementById('contenu')

      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const contenuElement = document.getElementById('contenu')

      if (contenuElement) {
        const rect = contenuElement.getBoundingClientRect()
        const currentIsAtTop = rect.top > 100

        setIsAtTop(currentIsAtTop)

        if (!currentIsAtTop) {
          setHasScrolled(true)
        }
      }

      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const distanceFromBottom = documentHeight - scrollPosition

      setIsNearBottom(distanceFromBottom <= 180)
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    window.addEventListener('resize', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="relative w-full bg-black text-neutral-100 selection:bg-neutral-100 selection:text-black select-none">
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-delay {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

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

        @keyframes slowMove1 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.2); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes slowMove2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-30px, 20px) scale(1.1); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animated-blob-1 {
          animation: slowMove1 12s ease-in-out infinite;
        }

        .animated-blob-2 {
          animation: slowMove2 15s ease-in-out infinite;
        }
      `}</style>

      {/* HERO */}
      <section className="relative w-full h-[100svh] z-0 flex flex-col bg-black pt-[90px] lg:pt-[150px] overflow-hidden">
        <div className="relative w-full flex-1 min-h-0 bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src={withBasePath('/TB_VIDEO_PRESENTATION.mp4')}
              type="video/mp4"
            />
          </video>
        </div>

        {/* BOUTON SON */}
        <div className="absolute top-[100px] right-6 z-50 lg:top-[155px] lg:right-10">
          <button
            onClick={toggleMute}
            className="flex items-center justify-center rounded-none border-0 bg-transparent p-0 text-[#f58220] transition-opacity duration-300 hover:opacity-80 cursor-pointer animate-fade-in-delay"
            aria-label={isMuted ? 'Activer le son' : 'Coupure son'}
            style={{ animationDelay: '0.4s' }}
          >
            {isMuted ? (
              <VolumeX className="size-10 sm:size-12" strokeWidth={2} />
            ) : (
              <Volume2 className="size-10 sm:size-12" strokeWidth={2} />
            )}
          </button>
        </div>

        {/* BOUTON SCROLL INITIAL */}
        {isAtTop && (
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-fade-in-delay"
            style={{
              animationDelay: hasScrolled ? '0s' : '0.8s',
            }}
          >
            <button
              onClick={handleScrollButtonClick}
              className="group flex items-center justify-center text-[#f58220] cursor-pointer"
              aria-label="Descendre au contenu"
            >
              <ChevronDown
                className="size-[60px] sm:size-[70px] transition-transform duration-300 group-hover:translate-y-2 group-active:translate-y-3"
                strokeWidth={3}
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </button>
          </div>
        )}
      </section>

      {/* BOUTON SCROLL FLOTTANT HAUT */}
      {!isAtTop && !isNearBottom && (
        <div className="fixed top-[100px] left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-fade-in-delay lg:top-[150px]">
          <button
            onClick={handleScrollButtonClick}
            className="group flex items-center justify-center bg-transparent text-[#f58220] cursor-pointer transition-all duration-300"
            aria-label="Remonter en haut"
          >
            <ChevronUp
              className="size-[60px] sm:size-[70px] transition-transform duration-300 group-hover:-translate-y-1"
              strokeWidth={3}
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </button>
        </div>
      )}

      {/* CONTENU */}
      <div
        id="contenu"
        className="relative z-30 scroll-mt-[80px] bg-black shadow-[0_-25px_50px_rgba(0,0,0,1)] lg:scroll-mt-[130px]"
      >
        {/* SECTION EXPÉRIENCE */}
        <section className="relative w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-0 bg-[#f0f0eb] border-b border-neutral-300">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
            <div
              className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
              style={{ top: '180px' }}
            >
              <h2 id="experience-title">
                <HomeRectangleLines
                  lines={['Vivez une', 'expérience', 'inoubliable.']}
                  theme="lightOnDark"
                  className="uppercase"
                  style={TYPO_TITLE}
                />
              </h2>
            </div>

            <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
              <div
                className="relative w-full animate-text-sweep"
                style={{ animationDelay: '200ms' }}
              >
                <div className="relative w-full aspect-video overflow-hidden bg-black">
                  <img
                    src={withBasePath('/doublage-1.png')}
                    alt="Vivez une expérience inoubliable"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              <div
                className="mt-10 sm:mt-12 relative w-full animate-text-sweep"
                style={{ animationDelay: '400ms' }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 w-full items-start">
                  <p
                    className="text-black font-bold tracking-[0.01em]"
                    style={TYPO_SUBTITLE}
                  >
                    Plongez dans l&apos;univers passionnant du cinéma.
                    Imaginez-vous dans la peau des comédiens à l&apos;image,
                    face à la projection d&apos;extraits de films cultes avec
                    les textes sur{' '}
                    <span className="inline-block w-fit whitespace-nowrap bg-black text-[#f0f0eb] font-bold tracking-[0.01em] px-[3px] py-px">
                      bande rythmo synchrone.
                    </span>
                  </p>

                  <p
                    className="text-black font-bold tracking-[0.01em]"
                    style={TYPO_SUBTITLE}
                  >
                    Les dialogues défilent sous l&apos;image. Vous choisissez un
                    personnage.{' '}
                    <span className="inline-block w-fit whitespace-nowrap bg-black text-[#f0f0eb] font-bold tracking-[0.01em] px-[3px] py-px">
                      Vous le «{'\u00A0'}doublez{'\u00A0'}».
                    </span>
                    <br />
                    Seul prérequis{'\u00A0'}: être lecteur. Toute l&apos;équipe
                    de Tournez Bobines est là pour vous accompagner à la barre de
                    doublage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION ÉQUIPE */}
        <section className="relative bg-[#050505] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-white/10 overflow-visible">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
            <div
              className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
              style={{ top: '180px' }}
            >
              <HomeRectangleLines
                lines={['Qui', 'sommes', 'nous\u00A0?']}
                theme="orange"
                className="uppercase"
                style={TYPO_TITLE}
              />
            </div>

            <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col overflow-visible">
              <div
                className="relative w-full animate-text-sweep overflow-visible py-8 sm:py-12 lg:py-16"
                style={{ animationDelay: '200ms' }}
              >
                <div className="relative w-full flex items-center justify-center min-h-[360px] sm:min-h-[440px] lg:min-h-[520px]">
                  {/* Photo centrée — un peu plus large pour passer sous le logo */}
                  <div className="relative z-10 w-[72%] sm:w-[68%] lg:w-[64%] aspect-[4/3] overflow-hidden bg-black rotate-[1.5deg] translate-x-[40px]">
                    <img
                      src={withBasePath("/Mâcon 2019 L'équipe.JPG")}
                      alt="Qui sommes nous"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>

                  {/* Citation — gauche */}
                  <div className="absolute left-0 top-[4%] sm:top-[8%] z-20 pointer-events-none w-[42%] sm:w-[36%] md:w-[32%] lg:w-[30%] -rotate-2">
                    <HomeRectangleLines
                      lines={TEAM_ORIGIN_LINES}
                      theme="white"
                      style={TYPO_TITLE}
                    />
                  </div>

                  {/* Logo — droite, partiellement sur la photo (−30%) */}
                  <div className="absolute right-[2%] sm:right-[4%] bottom-[2%] sm:bottom-[6%] z-20 pointer-events-none w-[24%] sm:w-[21%] lg:w-[20%] max-w-[210px] rotate-[7deg]">
                    <DrawingLogo className="w-full h-auto" />
                  </div>
                </div>
              </div>

              <div
                className="mt-10 sm:mt-14 lg:mt-16 relative w-full animate-text-sweep cursor-default pointer-events-none"
                style={{ animationDelay: '400ms' }}
              >
                <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3 md:gap-14 lg:gap-16 w-full">
                  {teamRoles.map((role) => (
                    <div
                      key={role.id}
                      className="relative flex flex-col text-left justify-start"
                    >
                      <HomeRectangleLines
                        lines={role.titleLines}
                        theme="orange"
                        className="shrink-0 min-h-[calc(2*(1.15em+2px)+5px)]"
                        style={TYPO_SUBTITLE}
                      />

                      <p
                        className="mt-6 font-bold tracking-[0.01em] text-white"
                        style={TYPO_SUBTITLE}
                      >
                        {role.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection layout="stacked" />
      </div>
    </div>
  )
}