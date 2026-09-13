'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react'
import { ContactSection } from '@/components/contact-section'
import { DrawingLogo } from '@/components/drawing-logo'
import {
  ORIGIN_RECTANGLE_STYLE,
  RectangleLines,
} from '@/components/rectangle-lines'
import { withBasePath } from '@/lib/paths'
import {
  TYPO_BLOCK_BODY_CLASS,
  TYPO_BLOCK_SUBTITLE_CLASS,
  TYPO_TITLE,
} from '@/lib/typography'

const TEAM_ORIGIN_LINES = [
  "À l'origine",
  'trois ami.e.s',
  'passionné.e.s',
  'de cinéma,',
  'aux\u00A0compétences',
  'complémentaires.',
] as const

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
      'Une ingénieure d\u2019études, professeure de français langue étrangère à l\u2019université.',
  },
] as const

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
      <section data-header-surface="dark" className="relative w-full h-[100svh] z-0 flex flex-col bg-black pt-[90px] lg:pt-[80px] min-[1440px]:pt-[150px] overflow-hidden">
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
        className="relative z-30 scroll-mt-[80px] bg-black shadow-[0_-25px_50px_rgba(0,0,0,1)] lg:scroll-mt-[90px] min-[1440px]:scroll-mt-[130px]"
      >
        {/* SECTION EXPÉRIENCE */}
        <section data-header-surface="light" className="relative w-full py-16 xl:py-24 px-4 sm:px-6 lg:px-0 bg-white border-b border-neutral-300">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
            <div
              className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            >
              <h2 id="experience-title">
                <RectangleLines
                  lines={['Vivez une', 'expérience', 'inoubliable']}
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
                <div className="grid grid-cols-1 min-w-0 gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-8 lg:gap-x-6 xl:gap-x-10 w-full items-start">
                  <p
                    lang="fr"
                    className={`min-w-0 text-pretty text-black [hyphens:auto] ${TYPO_BLOCK_BODY_CLASS}`}
                  >
                    Plongez dans l&apos;univers passionnant du cinéma.
                    Imaginez-vous dans la peau des comédiens à l&apos;image,
                    face à la projection d&apos;extraits de films cultes avec
                    les textes sur{' '}
                    <span className="font-bold">bande rythmo synchrone.</span>
                  </p>

                  <p
                    lang="fr"
                    className={`min-w-0 text-pretty text-black [hyphens:auto] ${TYPO_BLOCK_BODY_CLASS}`}
                  >
                    Les dialogues défilent sous l&apos;image. Vous choisissez un
                    personnage.
                    <br />
                    <span className="font-bold">
                      Vous le «{'\u00A0'}doublez{'\u00A0'}».
                    </span>{' '}
                    Seul prérequis{'\u00A0'}: être lecteur. Toute l&apos;équipe
                    de Tournez Bobines est là pour vous accompagner à la barre
                    de doublage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION ÉQUIPE */}
        <section data-header-surface="dark" className="relative bg-black text-white py-16 xl:py-24 px-4 sm:px-6 lg:px-0 border-b border-white/10 overflow-visible">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
            <div
              className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            >
              <RectangleLines
                lines={['Qui', 'sommes', 'nous\u00A0?']}
                theme="orange"
                className="uppercase"
                style={TYPO_TITLE}
              />
            </div>

            <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col overflow-visible">
              <div
                className="relative w-full animate-text-sweep overflow-visible"
                style={{ animationDelay: '200ms' }}
              >
                <div className="relative flex w-full items-start justify-start gap-8 sm:gap-10 xl:gap-12">
                  <div className="min-w-0 max-w-[58%] -rotate-2 sm:max-w-[52%] lg:max-w-[48%]">
                    <RectangleLines
                      lines={TEAM_ORIGIN_LINES}
                      theme="white"
                      style={ORIGIN_RECTANGLE_STYLE}
                    />
                  </div>

                  <div className="ml-12 w-[24%] shrink-0 rotate-[7deg] sm:ml-20 sm:w-[21%] lg:ml-28 lg:w-[20%] max-w-[210px]">
                    <DrawingLogo className="w-full h-auto" />
                  </div>
                </div>
              </div>

              <div
                className="mt-10 sm:mt-14 xl:mt-16 relative w-full animate-text-sweep cursor-default pointer-events-none"
                style={{ animationDelay: '400ms' }}
              >
                <div className="grid grid-cols-3 items-start gap-4 sm:gap-6 lg:gap-5 xl:gap-10 w-full min-w-0">
                  {teamRoles.map((role) => (
                    <div
                      key={role.id}
                      className="relative flex min-w-0 flex-col text-left justify-start"
                    >
                      <RectangleLines
                        lines={role.titleLines}
                        theme="orange"
                        className={`shrink-0 min-h-[calc(2*(1.15em+2px)+5px)] ${TYPO_BLOCK_SUBTITLE_CLASS}`}
                        lineClassName={TYPO_BLOCK_SUBTITLE_CLASS}
                      />

                      <p
                        lang="fr"
                        className={`mt-4 xl:mt-6 min-w-0 text-pretty text-white [hyphens:auto] ${TYPO_BLOCK_BODY_CLASS}`}
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