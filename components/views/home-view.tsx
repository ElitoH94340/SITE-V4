'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react'
import { FormulaFrame } from '@/components/formula-frame'
import { withBasePath } from '@/lib/paths'

const teamRoles = [
  {
    id: 'adaptateur',
    subtitle: 'ADAPTATION',
    summary:
      'Un auteur-adaptateur de doublage, bilingue en anglais et expert.',
  },
  {
    id: 'direction',
    subtitle: 'DIRECTION & PÉDAGOGIE',
    summary:
      'Une professeure des écoles, ancienne directrice de salles de cinémas.',
  },
  {
    id: 'technique',
    subtitle: 'TECHNIQUE & LANGUE',
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
        @keyframes cross-intro {
          0% {
            opacity: 0;
            transform: scale(0.1);
          }
          20% {
            opacity: 1;
            transform: scale(1);
          }
          70% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(4);
          }
        }

        .animate-cross {
          animation: cross-intro 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          opacity: 0;
        }

        @keyframes mire-in-out {
          0% {
            opacity: 0;
            transform: scale(0.96);
          }
          15% {
            opacity: 1;
            transform: scale(1);
          }
          70% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.02);
          }
        }

        .animate-transient-mire {
          animation: mire-in-out 2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          animation-delay: 1s;
          opacity: 0;
        }

        @keyframes fade-in-scale {
          0% {
            opacity: 0;
            transform: scale(0.96);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-cardinal {
          animation: fade-in-scale 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          animation-delay: 1s;
          opacity: 0;
        }

        @keyframes video-reveal {
          0% {
            opacity: 0;
            transform: scale(0.95);
            filter: blur(12px) brightness(0.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px) brightness(1);
          }
        }

        .animate-video {
          animation: video-reveal 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: 1.8s;
          opacity: 0;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1.5s infinite;
        }

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

        @keyframes rythmo-text {
          0%,
          15% {
            background-position: 100% 0;
          }
          50%,
          100% {
            background-position: 0% 0;
          }
        }

        @keyframes rythmo-bar {
          0%,
          10% {
            left: 0%;
            opacity: 0;
          }
          15% {
            left: 0%;
            opacity: 1;
          }
          50% {
            left: 100%;
            opacity: 1;
          }
          55%,
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        .animate-rythmo {
          position: relative;
          display: inline-block;
          color: transparent;
          background: linear-gradient(
            to right,
            #0a0a0a 50%,
            #e5e5e5 50%
          );
          background-size: 200% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          background-clip: text;
          animation: rythmo-text 6s ease-in-out infinite;
        }

        .animate-rythmo::after {
          content: '';
          position: absolute;
          top: 8%;
          bottom: 8%;
          width: 3px;
          background-color: #f58220;
          pointer-events: none;
          animation: rythmo-bar 6s ease-in-out infinite;
          opacity: 0;
          transform: skewX(-15deg);
        }
      `}</style>

      {/* HERO */}
      <section className="relative min-h-[100svh] w-full z-0 flex flex-col bg-black pt-[80px] lg:pt-[130px]">
        <div className="relative z-40 flex justify-end pr-6 min-h-[24px] lg:pr-10" />

        {/* CONTENEUR PRINCIPAL */}
        <div className="relative z-20 flex-1 flex w-full items-center justify-center p-6 sm:p-10">
          <div className="relative w-full max-w-5xl aspect-video">
            {/* ETAPE 1 : LA CROIX INITIALE */}
            <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none animate-cross">
              <div className="absolute w-16 h-px bg-neutral-400/80" />
              <div className="absolute h-16 w-px bg-neutral-400/80" />
            </div>

            {/* ETAPE 2 : LES 4 POINTS CARDINAUX */}
            <div className="absolute -inset-[40px] z-30 pointer-events-none animate-cardinal">
              <div className="absolute top-0 left-1/2 w-px h-6 bg-neutral-400/80 -translate-x-1/2" />
              <div className="absolute bottom-0 left-1/2 w-px h-6 bg-neutral-400/80 -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 w-6 h-px bg-neutral-400/80 -translate-y-1/2" />
              <div className="absolute top-1/2 right-0 w-6 h-px bg-neutral-400/80 -translate-y-1/2" />
            </div>

            {/* ETAPE 3 : LA MIRE COMPLÈTE */}
            <div className="absolute -inset-[15px] z-30 pointer-events-none animate-transient-mire">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-neutral-400/80" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-neutral-400/80" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-neutral-400/80" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-neutral-400/80" />

              <div className="absolute top-1/3 left-0 right-0 h-px bg-neutral-500/20" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-neutral-500/20" />
              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-neutral-500/20" />
              <div className="absolute left-2/3 top-0 bottom-0 w-px bg-neutral-500/20" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-20 border border-neutral-500/40 flex items-center justify-center">
                <div className="w-3 h-px bg-neutral-400/60" />
                <div className="absolute h-3 w-px bg-neutral-400/60" />
              </div>

              {/* Point REC orange */}
              <div className="absolute top-4 right-4 flex items-center">
                <div className="w-3 h-3 bg-[#f58220] rounded-full animate-blink shadow-[0_0_8px_rgba(245,130,32,0.8)]" />
              </div>

              {/* Sigle réseau/barres */}
              <div className="absolute bottom-4 left-4 flex items-end gap-1 opacity-70">
                <div className="w-1.5 h-2 bg-neutral-400" />
                <div className="w-1.5 h-3 bg-neutral-400" />
                <div className="w-1.5 h-4 bg-neutral-400" />
              </div>

              {/* Sigle batterie */}
              <div className="absolute bottom-4 right-4 flex items-center gap-0.5 opacity-70">
                <div className="w-8 h-4 border border-neutral-400 flex p-0.5 gap-0.5">
                  <div className="h-full w-2 bg-neutral-400" />
                  <div className="h-full w-2 bg-neutral-400" />
                  <div className="h-full w-2 bg-neutral-400" />
                </div>
              </div>
            </div>

            {/* ETAPE 4 : LA VIDÉO SEULE */}
            <div className="absolute inset-0 z-20 animate-video bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              >
                <source
                  src={withBasePath('/TB_VIDEO_PRESENTATION.mp4')}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

        {/* BOUTON SON */}
        <div className="absolute top-[100px] right-6 z-50 lg:top-[155px] lg:right-10">
          <button
            onClick={toggleMute}
            className="group flex h-[48px] w-[48px] sm:h-[52px] sm:w-[52px] items-center justify-center rounded-full border-2 border-white bg-transparent text-white backdrop-blur-[2px] transition-all duration-300 hover:bg-white hover:text-black cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)] animate-fade-in-delay"
            aria-label={isMuted ? 'Activer le son' : 'Coupure son'}
            style={{ animationDelay: '2.5s' }}
          >
            {isMuted ? (
              <VolumeX className="size-5 transition-transform duration-300" />
            ) : (
              <Volume2 className="size-5 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* BOUTON SCROLL INITIAL */}
        {isAtTop && (
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-fade-in-delay"
            style={{
              animationDelay: hasScrolled ? '0s' : '3.3s',
            }}
          >
            <button
              onClick={handleScrollButtonClick}
              className="group flex items-center justify-center text-[#f58220] cursor-pointer"
              aria-label="Descendre au contenu"
            >
              <ChevronDown
                className="size-12 sm:size-14 transition-transform duration-300 group-hover:translate-y-2 group-active:translate-y-3"
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
              className="size-12 sm:size-14 transition-transform duration-300 group-hover:-translate-y-1"
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
        <section className="bg-[#f0f0eb] text-neutral-950 py-16 sm:py-20 px-6 sm:px-12 lg:px-16 border-b border-neutral-300">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="animate-text-sweep w-full text-center">
              <h2
                id="experience-title"
                className="text-[37px] sm:text-[59px] lg:text-[88px] font-serif italic tracking-tight text-neutral-950 leading-[1.05] mb-8 text-balance"
              >
                Vivez une expérience{' '}
                <span className="animate-rythmo pr-2">
                  inoubliable.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 text-neutral-800 text-[16px] leading-[1.618] font-light w-full text-center max-w-3xl">
              <p className="text-balance">
                Plongez dans l’univers passionnant du cinéma. Imaginez-vous
                dans la peau des comédiens à l’image, face à la projection
                d’extraits de films cultes avec les textes sur bande rythmo
                synchrone.
                Les dialogues défilent sous l’image. Vous choisissez un
                personnage. Vous le « doublez » !
                <br />
                <br />
                Seul prérequis : être lecteur. Toute l’équipe de Tournez Bobines est là pour vous
                accompagner à la barre de doublage.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION ÉQUIPE */}
        <section className="relative bg-black text-white py-16 sm:py-20 px-6 sm:px-12 lg:px-16 border-b border-neutral-900 overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <header className="w-full text-center animate-text-sweep">
              <h2 className="text-[37px] sm:text-[59px] lg:text-[88px] font-serif italic tracking-tight text-white leading-[1.05] mb-6 text-balance">
                Qui sommes nous ?
              </h2>

              <p className="text-pretty text-base leading-relaxed text-neutral-300 max-w-2xl mx-auto">
                À l&apos;origine trois ami.e.s passionné.e.s de cinéma, aux
                compétences complémentaires.
              </p>
            </header>

            <div
              className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 lg:gap-8 mt-10 sm:mt-12 w-full"
              style={{ animationDelay: '200ms' }}
            >
              {teamRoles.map((role) => (
                <div
                  key={role.id}
                  className="block h-full cursor-default no-underline animate-text-sweep"
                >
                  <FormulaFrame hover={false}>
                    <div className="flex h-full flex-col items-center text-center px-6 py-6 sm:py-8">
                      <span className="mb-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#f58220] whitespace-nowrap">
                        {role.subtitle}
                      </span>

                      <p className="flex-1 text-balance text-white text-[16px] leading-[1.618] font-light">
                        {role.summary}
                      </p>
                    </div>
                  </FormulaFrame>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section className="bg-[#f0f0eb] py-16 sm:py-20 px-6 sm:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            
            {/* EN-TÊTE SORTI DU BLOC BLANC */}
            <header className="w-full text-center animate-text-sweep mb-10 sm:mb-12">
              <h2 className="text-[37px] sm:text-[59px] lg:text-[88px] font-serif italic tracking-tight text-neutral-950 leading-[1.05] text-balance">
                Contact
              </h2>
            </header>

            {/* BLOC BLANC (FORMULAIRE + INFOS) */}
            <div 
              className="w-full max-w-5xl bg-white shadow-[0_15px_50px_rgba(0,0,0,0.06)] p-8 sm:p-12 lg:p-16 animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16">
                
                {/* GAUCHE : FORMULAIRE */}
                <div>
                  <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Nom" 
                        className="w-full border border-neutral-200 p-4 text-sm focus:outline-none focus:border-[#f58220] transition-colors placeholder:text-neutral-400 text-neutral-900 bg-white"
                      />
                      <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full border border-neutral-200 p-4 text-sm focus:outline-none focus:border-[#f58220] transition-colors placeholder:text-neutral-400 text-neutral-900 bg-white"
                      />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Entreprise / établissement" 
                      className="w-full border border-neutral-200 p-4 text-sm focus:outline-none focus:border-[#f58220] transition-colors placeholder:text-neutral-400 text-neutral-900 bg-white"
                    />
                    <input 
                      type="text" 
                      placeholder="Sujet" 
                      className="w-full border border-neutral-200 p-4 text-sm focus:outline-none focus:border-[#f58220] transition-colors placeholder:text-neutral-400 text-neutral-900 bg-white"
                    />
                    <textarea 
                      placeholder="Message" 
                      rows={6}
                      className="w-full border border-neutral-200 p-4 text-sm focus:outline-none focus:border-[#f58220] transition-colors placeholder:text-neutral-400 text-neutral-900 bg-white resize-none"
                    ></textarea>
                    
                    <button 
                      type="submit"
                      className="w-full bg-black text-white py-4 mt-2 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#f58220] transition-colors duration-300 cursor-pointer"
                    >
                      Envoyer
                    </button>
                  </form>
                </div>

                {/* DROITE : INFORMATIONS */}
                <div className="flex flex-col lg:border-l lg:border-neutral-200 lg:pl-12 pt-4 lg:pt-0">
                  <h3 className=" mb-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-black whitespace-nowrap">
                    Devis & Renseignements
                  </h3>
                  
                  <div className="space-y-6 text-[15px]">
                    <div>
                      <p className="flex-1 text-balance text-black text-[16px] leading-[1.618] font-light">Jean-Jacques PRON</p>
                      <a href="tel:+33682831034" className="text-[#f58220] hover:text-neutral-900 transition-colors">
                        06 82 83 10 34
                      </a>
                    </div>

                    <div>
                      <p className="flex-1 text-balance text-black text-[16px] leading-[1.618] font-light">
                        Véronique ATTISSO <br />
                        <span className="font-normal italic text-sm text-neutral-500">(Contact pédagogique)</span>
                      </p>
                      <a href="tel:+33613647259" className="text-[#f58220] hover:text-neutral-900 transition-colors">
                        06 13 64 72 59
                      </a>
                    </div>
                  </div>

                  <hr className="border-neutral-200 my-8 w-full" />

                  <h3 className="mb-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-black whitespace-nowrap">
                    Email
                  </h3>
                  <a 
                    href="mailto:contact@doublagetournezbobines.fr" 
                    className="text-[#f58220] text-[15px] hover:text-neutral-900 transition-colors break-all"
                  >
                    contact@doublagetournezbobines.fr
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}