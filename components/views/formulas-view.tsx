'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FORMULAS } from '@/lib/formulas'
import { withBasePath } from '@/lib/paths'

export function FormulasView() {
  const [activeFormulaId, setActiveFormulaId] = useState<string>(FORMULAS[0]?.id || '')
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return

    const matchingFormula = FORMULAS.find((f) => f.id === hash)
    if (matchingFormula) {
      setActiveFormulaId(matchingFormula.id)
    }
  }, [])

  const togglePlay = (e: React.MouseEvent, formulaId: string) => {
    e.stopPropagation()
    
    if (activeFormulaId !== formulaId) {
      setActiveFormulaId(formulaId)
    }

    const videoEl = document.getElementById(`video-${formulaId}`) as HTMLVideoElement | null
    if (videoEl) {
      if (videoEl.paused) {
        FORMULAS.forEach((f) => {
          if (f.id !== formulaId) {
            const otherVideo = document.getElementById(`video-${f.id}`) as HTMLVideoElement | null
            if (otherVideo && !otherVideo.paused) {
              otherVideo.pause()
            }
          }
        })
        videoEl.play().catch(err => console.error("Erreur de lecture :", err))
      } else {
        videoEl.pause()
      }
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-x-hidden bg-black pt-20 flex flex-col text-neutral-50 select-none">
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-text-sweep {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .bg-textured-paper {
          background-color: #f3f4f6;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
          color: #171717;
        }
      `}</style>

      {/* HEADER PAGE */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pt-12 pb-8 sm:px-8">
        <header className="animate-text-sweep text-center">
          <p className="mb-2.5 text-[10px] font-semibold tracking-[0.3em] text-red-500 uppercase sm:text-xs">
            Nos formules
          </p>
          <h1 className="text-balance font-serif text-3xl leading-tight tracking-tight italic drop-shadow-md sm:text-4xl lg:text-5xl">
            Immersion, immersion filmée, captation
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-neutral-300">
            Trois façons de vivre le doublage, de l&apos;expérience en direct à la captation filmée.
            Le déroulé est identique : vous choisissez un extrait, vous vous entraînez, puis vous jouez la scène.
          </p>
        </header>
      </div>

      {/* ZONE 3 COLONNES FULL BLEED (SPLIT SCREEN) AVEC VIDEOS INTEGREES */}
      <div id="comparateur-formules" className="w-full flex flex-col lg:flex-row items-stretch mt-8 lg:mt-12 border-t border-white/10 flex-1">
        {FORMULAS.map((formula, index) => {
          const isActive = activeFormulaId === formula.id
          const isVideoPlaying = isPlaying[formula.id] || false

          const videoSrc = withBasePath(
            index === 0
              ? '/T-B-Immersion.mp4'
              : index === 1
                ? '/T-B-Immersion-filmée.mp4'
                : '/T-B-Captation.mp4',
          )

          const coverSrc = withBasePath(
            index === 0
              ? '/couverture-immersion.png'
              : index === 1
                ? '/couverture-immersion-filmée.png'
                : '/couverture-captation.png',
          )

          let colTheme = {
            bg: 'bg-black text-white',
            title: 'text-neutral-100',
            num: 'text-neutral-700',
            line: 'bg-neutral-800',
            highlight: 'text-white',
            text: 'text-neutral-400',
            border: 'border-white/10',
          }

          if (index === 0) {
            colTheme = {
              bg: 'bg-white text-neutral-900',
              title: 'text-neutral-900',
              num: 'text-neutral-300',
              line: 'bg-neutral-300',
              highlight: 'text-neutral-900',
              text: 'text-neutral-600',
              border: 'border-neutral-200',
            }
          } else if (index === 1) {
            colTheme = {
              bg: 'bg-textured-paper text-neutral-900',
              title: 'text-neutral-900',
              num: 'text-neutral-400',
              line: 'bg-neutral-400',
              highlight: 'text-neutral-900',
              text: 'text-neutral-700',
              border: 'border-neutral-300',
            }
          }

          return (
            <div
              key={formula.id}
              id={`formula-${formula.id}`}
              onClick={() => {
                if (!isActive) setActiveFormulaId(formula.id)
              }}
              className={`relative flex-1 flex flex-col pb-16 lg:pb-20 transition-all duration-500 cursor-default overflow-hidden ${colTheme.bg}`}
            >
              {/* Formes d'arrière-plan (Index 1) */}
              {index === 1 && (
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-65">
                  <div className="absolute top-[10%] left-[5%] w-[320px] h-[320px] bg-gradient-to-tr from-neutral-400/50 via-neutral-300/40 to-neutral-500/50 rounded-[30%_70%_60%_40%/50%_50%_50%_50%] blur-[45px] transform rotate-12 scale-110" />
                  <div className="absolute top-[50%] left-[60%] w-[360px] h-[360px] bg-gradient-to-bl from-neutral-500/50 via-neutral-400/45 to-neutral-300/50 rounded-[60%_40%_30%_70%/40%_60%_40%_60%] blur-[40px] transform -rotate-45 scale-90" />
                  <div className="absolute top-[20%] left-[70%] w-[300px] h-[300px] bg-gradient-to-r from-neutral-600/45 via-neutral-400/40 to-neutral-300/40 rounded-[50%_50%_40%_60%/60%_40%_50%_50%] blur-[50px] transform rotate-45 scale-125" />
                  <div className="absolute top-[60%] left-[15%] w-[290px] h-[290px] bg-gradient-to-tl from-neutral-300/45 via-neutral-500/40 to-neutral-600/35 rounded-[40%_60%_30%_70%/50%_50%_70%_30%] blur-[45px] transform -rotate-12 scale-105" />
                  <div className="absolute top-[35%] left-[35%] w-[340px] h-[340px] bg-gradient-to-br from-neutral-300/40 via-neutral-500/45 to-neutral-400/45 rounded-[70%_30%_50%_50%/30%_70%_50%_50%] blur-[45px] transform rotate-90 scale-95" />
                </div>
              )}

              {/* LECTEUR VIDÉO */}
              <div className="relative z-10 w-full mb-10 shadow-2xl flex flex-col">
                <div 
                  className={`relative w-full aspect-video overflow-hidden flex items-center justify-center bg-black ${!isVideoPlaying ? 'cursor-pointer' : ''}`}
                  onClick={(e) => {
                    if (!isVideoPlaying) togglePlay(e, formula.id)
                  }}
                >
                  <video
                    id={`video-${formula.id}`}
                    className={`absolute inset-0 h-full w-full outline-none transition-all duration-700 ${isActive ? 'object-contain' : 'object-cover'}`}
                    src={videoSrc}
                    preload="metadata"
                    playsInline
                    controls={isActive}
                    onPlay={() => setIsPlaying(prev => ({ ...prev, [formula.id]: true }))}
                    onPause={() => setIsPlaying(prev => ({ ...prev, [formula.id]: false }))}
                  />

                  <div 
                    className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ${
                      isVideoPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={coverSrc} 
                      alt={`Couverture de ${formula.title}`} 
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/10 transition-colors duration-300" />
                    
                    <button
                      type="button"
                      onClick={(e) => togglePlay(e, formula.id)}
                      className="pointer-events-auto relative z-20 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-xl transition-all duration-300 hover:border-red-500 hover:bg-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                      aria-label={`Lancer la vidéo ${formula.title}`}
                    >
                      <svg className="h-8 w-8 sm:h-10 sm:w-10 fill-current ml-1" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* CONTENU TEXTUEL */}
              <div className="relative z-10 flex flex-col flex-1 px-6 sm:px-12 lg:px-10 xl:px-16 w-full">
                
                {/* TITRE DE LA COLONNE */}
                <div className="mb-10 text-center flex items-center justify-center">
                  <h2 className={`text-balance font-serif text-3xl leading-tight tracking-tight italic drop-shadow-md sm:text-4xl lg:text-5xl transition-transform duration-500 ${colTheme.title}`}>
                    {formula.title}
                  </h2>
                </div>

                {/* Déroulé / Étapes */}
                <div className="flex-1 space-y-5 max-w-sm mx-auto w-full group">
                  {formula.steps.map((step) => (
                    <div key={step.num} className="flex items-start gap-3.5 text-left">
                      <div className="flex shrink-0 items-center justify-end w-4">
                        <span className={`font-serif text-lg italic transition-colors duration-300 group-hover:${colTheme.highlight.split(' ')[0]} ${colTheme.num}`}>
                          {step.num}
                        </span>
                      </div>
                      <div className="mt-3 flex w-4 shrink-0 items-center">
                        <div className={`h-px w-full transition-colors duration-300 group-hover:bg-red-500/50 ${colTheme.line}`} />
                      </div>
                      <div className="pt-0.5 text-pretty text-base leading-relaxed">
                        {step.highlight && (
                          <span className={`mb-1 block font-medium ${colTheme.highlight}`}>
                            {step.highlight}
                          </span>
                        )}
                        {step.text && (
                          <span className={`block ${colTheme.text}`}>
                            {step.text}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mention devis modifiée avec la classe rouge demandée */}
                <div className={`mt-12 pt-5 border-t text-center transition-colors duration-300 ${colTheme.border}`}>
                  <p className="mb-2.5 text-[10px] font-semibold tracking-[0.3em] text-red-500 uppercase sm:text-xs">
                    Devis disponible sur demande
                  </p>
                </div>

              </div>
            </div>
          )
        })}
      </div>

      {/* CTA FINAL */}
      <div className="w-full bg-black py-16 text-center border-t border-white/10">
        <Link
          href="/qui-sommes-nous?to=contact"
          scroll={false}
          className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium tracking-wide text-neutral-200 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
        >
          Contactez-nous pour votre projet
        </Link>
      </div>
    </section>
  )
}