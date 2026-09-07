'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react'
import { FormulaFrame } from '@/components/formula-frame'
import { withBasePath } from '@/lib/paths'

const dubbingRoles = [
  {
    id: 'spectateur',
    subtitle: 'POUR LE SPECTATEUR',
    summary: 'C’est croire naturellement que tous les personnages d’une série ou d’un film étranger parlent français.',
  },
  {
    id: 'comedien',
    subtitle: 'POUR LE COMÉDIEN',
    summary: 'C’est suivre au plus près le jeu de l’acteur à l’image, respecter le rythme, les émotions, les intentions et la synchronisation labiale.',
  },
  {
    id: 'adaptateur',
    subtitle: 'POUR L’ADAPTATEUR',
    summary: 'C’est être au plus près du dialogue en langue étrangère, être le plus synchrone possible en respectant le mouvement des lèvres des comédiens à l’image.',
  },
]

export function HomeView() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const handleScrollButtonClick = () => {
    if (!isAtTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById('contenu')
      if (el) {
        const headerOffset = 80
        const topPos = el.offsetTop - headerOffset
        window.scrollTo({ top: topPos, behavior: 'smooth' })
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
        
        // Dès qu'on quitte le haut de la page, on mémorise qu'on a déjà scrollé
        if (!currentIsAtTop) {
          setHasScrolled(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="relative w-full bg-black text-neutral-100 selection:bg-neutral-100 selection:text-black select-none">
      
      <style jsx>{`
        /* 1. La croix initiale */
        @keyframes cross-intro {
          0% { opacity: 0; transform: scale(0.1); }
          20% { opacity: 1; transform: scale(1); }
          70% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(4); }
        }
        .animate-cross {
          animation: cross-intro 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          opacity: 0;
        }

        /* 2. La mire éphémère */
        @keyframes mire-in-out {
          0% { opacity: 0; transform: scale(0.96); }
          15% { opacity: 1; transform: scale(1); }
          70% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.02); }
        }
        .animate-transient-mire {
          animation: mire-in-out 2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          animation-delay: 1s;
          opacity: 0;
        }

        /* 3. Les points cardinaux */
        @keyframes fade-in-scale {
          0% { opacity: 0; transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-cardinal {
          animation: fade-in-scale 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          animation-delay: 1s;
          opacity: 0;
        }

        /* 4. Révélation de la vidéo */
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

        /* Clignotement du point d'enregistrement */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1.5s infinite;
        }

        /* Apparition des boutons UI */
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-delay {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        /* Effet de balayage (Fade Up) identique à la page Formules */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-text-sweep {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        /* Bande Rythmo */
        @keyframes rythmo-text {
          0%, 15% { background-position: 100% 0; }
          50%, 100% { background-position: 0% 0; }
        }
        @keyframes rythmo-bar {
          0%, 10% { left: 0%; opacity: 0; }
          15% { left: 0%; opacity: 1; }
          50% { left: 100%; opacity: 1; }
          55%, 100% { left: 100%; opacity: 0; }
        }
        .animate-rythmo {
          position: relative;
          display: inline-block;
          color: transparent;
          background: linear-gradient(to right, #0a0a0a 50%, #e5e5e5 50%);
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
          background-color: #ef4444;
          pointer-events: none;
          animation: rythmo-bar 6s ease-in-out infinite;
          opacity: 0;
          transform: skewX(-15deg);
        }
      `}</style>

      <section className="relative h-screen w-full z-0 flex flex-col bg-black">
        
        <div className="relative z-40 flex justify-end pt-10 pr-10 min-h-[80px]" />

        {/* CONTENEUR PRINCIPAL */}
        <div className="relative z-20 flex-1 flex w-full items-center justify-center p-8 sm:p-16">
          
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

              {/* Point REC rouge positionné à l'intérieur en haut à droite */}
              <div className="absolute top-4 right-4 flex items-center">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-blink shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
              </div>

              {/* Sigle réseau/barres positionné à l'intérieur en bas à gauche */}
              <div className="absolute bottom-4 left-4 flex items-end gap-1 opacity-70">
                <div className="w-1.5 h-2 bg-neutral-400" />
                <div className="w-1.5 h-3 bg-neutral-400" />
                <div className="w-1.5 h-4 bg-neutral-400" />
              </div>

              {/* Sigle batterie positionné à l'intérieur en bas à droite */}
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
                <source src={withBasePath('/TB_VIDEO_PRESENTATION.mp4')} type="video/mp4" />
              </video>
            </div>
            
          </div>
        </div>

        {/* BOUTON SON */}
        <div className="absolute top-[100px] right-10 z-50">
          <button
            onClick={toggleMute}
            className="group flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-white bg-transparent text-white backdrop-blur-[2px] transition-all duration-300 hover:bg-white hover:text-black cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)] animate-fade-in-delay"
            aria-label={isMuted ? "Activer le son" : "Coupure son"}
            style={{ animationDelay: '2.5s' }}
          >
            {isMuted ? (
              <VolumeX className="size-5 transition-transform duration-300" />
            ) : (
              <Volume2 className="size-5 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* BOUTON SCROLL INITIAL (Chevron strict) */}
        {isAtTop && (
          <div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-fade-in-delay"
            style={{ animationDelay: hasScrolled ? '0s' : '3.3s' }}
          >
            <button
              onClick={handleScrollButtonClick}
              className="group flex items-center justify-center text-white cursor-pointer drop-shadow-md"
              aria-label="Descendre au contenu"
            >
              <ChevronDown 
                className="size-12 transition-all duration-300 group-hover:translate-y-2 group-active:translate-y-3 [stroke-width:1px] group-hover:[stroke-width:2px]" 
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </button>
          </div>
        )}

      </section>

      {/* BOUTON SCROLL FLOTTANT HAUT */}
      {!isAtTop && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-fade-in-delay">
          <button
            onClick={handleScrollButtonClick}
            className="group flex h-[42px] w-[42px] items-center justify-center rounded-full border border-neutral-700 bg-black/80 text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/20 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            aria-label="Remonter en haut"
          >
            <ChevronUp 
              className="size-5 transition-all duration-300 group-hover:-translate-y-0.5 [stroke-width:1px] group-hover:[stroke-width:2px]" 
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </button>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* BALAYAGE AU SCROLL : MANIFESTE & RÔLES (Z-30)      */}
      {/* ---------------------------------------------------- */}
      <div id="contenu" className="relative z-30 bg-black shadow-[0_-25px_50px_rgba(0,0,0,1)]">

        <section className="bg-[#f0f0eb] text-neutral-950 py-24 px-6 sm:px-12 lg:px-20 border-b border-neutral-300">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            
            <div className="animate-text-sweep w-full text-center">
              <h2 id="experience-title" className="text-[37px] sm:text-[59px] lg:text-[96px] font-serif italic tracking-tight text-neutral-950 leading-[1.05] mb-16 text-balance">
                Vivez une expérience <span className="animate-rythmo pr-2">inoubliable.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 pt-12 border-t border-neutral-300 text-neutral-800 text-[16px] leading-[1.618] font-light w-full">
              <p className="text-balance">
                Plongez dans l’univers passionnant du cinéma. Imaginez-vous dans la peau des comédiens à l’image, face à la projection d’extraits de films cultes avec les textes sur bande rythmo&nbsp;synchrone.
              </p>
              <p className="text-balance">
                Les dialogues défilent sous l’image. Vous choisissez un personnage. Vous le «&nbsp;doublez&nbsp;»&nbsp;! Seul prérequis&nbsp;: être lecteur. Toute l’équipe de Tournez Bobines est là pour vous accompagner à la barre de&nbsp;doublage.
              </p>
            </div>

          </div>
        </section>

        <section className="bg-black text-white py-24 px-6 sm:px-8 lg:px-12 border-b border-neutral-900">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            
            <div className="animate-text-sweep w-full text-center">
              <h2 className="text-[37px] sm:text-[59px] lg:text-[96px] font-serif italic tracking-tight text-white leading-[1.05] mb-16 text-balance">
                Qu’est-ce que le doublage&nbsp;?
              </h2>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3 lg:gap-10 pt-12 border-t border-neutral-900 w-full">
              {dubbingRoles.map((role) => (
                <div key={role.id} className="block h-full cursor-default no-underline">
                  <FormulaFrame>
                    <div className="flex h-full flex-col items-center text-center px-4 py-2">
                      <span className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
                        {role.subtitle}
                      </span>
                      <p className="flex-1 text-balance text-neutral-400 text-[16px] leading-[1.618] font-light">
                        {role.summary}
                      </p>
                    </div>
                  </FormulaFrame>
                </div>
              ))}
            </div>

          </div>
        </section>

      </div>
    </div>
  )
}