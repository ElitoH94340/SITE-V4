'use client'

import { useState, useEffect } from 'react'
import { FormulaFrame } from '@/components/formula-frame'
import { VideoPlayButton } from '@/components/video-play-button'
import { withBasePath } from '@/lib/paths'

export function AboutView() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const rawHash = window.location.hash
    const wantsContact =
      params.get('to') === 'contact' || rawHash.replace(/#/g, '') === 'contact'

    if (!wantsContact) return

    window.history.replaceState(null, '', `${withBasePath('/qui-sommes-nous')}/#contact`.replace(/\/+#/, '/#'))

    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    let cancelled = false
    const timeoutId = window.setTimeout(() => {
      if (cancelled) return
      const target = document.getElementById('contact')
      if (!target) return
      const top = target.getBoundingClientRect().top + window.scrollY - 20
      window.scrollTo({ top, behavior: 'smooth' })
    }, 250)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  const teamRoles = [
    {
      id: 'adaptateur',
      subtitle: 'ADAPTATION',
      summary: 'Un auteur-adaptateur de doublage, bilingue en anglais et expert.',
    },
    {
      id: 'direction',
      subtitle: 'DIRECTION & PÉDAGOGIE',
      summary: 'Une professeure des écoles, ancienne directrice de salles de cinémas.',
    },
    {
      id: 'technique',
      subtitle: 'TECHNIQUE & LANGUE',
      summary: 'Une ingénieure d’études, professeure de français langue étrangère à l’université.',
    },
  ]

  return (
    <section className="relative w-full bg-black text-neutral-50 overflow-hidden pt-20 select-none">
      
      {/* Animations CSS fluides et Fond Gris */}
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-text-sweep {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        {/* Trajectoires multiples, chaotiques et multidirectionnelles (ralenties) */}
        @keyframes thermalChaos1 {
          0% { transform: translate(-10%, -10%) rotate(0deg) scale(1); }
          25% { transform: translate(80vw, 30vh) rotate(90deg) scale(1.4); }
          50% { transform: translate(30vw, 85vh) rotate(180deg) scale(0.8); }
          75% { transform: translate(70vw, 60vh) rotate(270deg) scale(1.2); }
          100% { transform: translate(-10%, -10%) rotate(360deg) scale(1); }
        }

        @keyframes thermalChaos2 {
          0% { transform: translate(90vw, 80vh) rotate(0deg) scale(1.2); }
          25% { transform: translate(10vw, 20vh) rotate(-100deg) scale(0.7); }
          50% { transform: translate(75vw, 40vh) rotate(-180deg) scale(1.3); }
          75% { transform: translate(20vw, 70vh) rotate(-260deg) scale(0.9); }
          100% { transform: translate(90vw, 80vh) rotate(-360deg) scale(1.2); }
        }

        @keyframes thermalChaos3 {
          0% { transform: translate(40vw, 100vh) rotate(45deg) scale(0.8); }
          30% { transform: translate(10vw, 40vh) rotate(160deg) scale(1.5); }
          60% { transform: translate(85vw, 15vh) rotate(250deg) scale(0.9); }
          100% { transform: translate(40vw, 100vh) rotate(405deg) scale(0.8); }
        }

        @keyframes thermalChaos4 {
          0% { transform: translate(20vw, -20vh) rotate(-30deg) scale(1.1); }
          35% { transform: translate(70vw, 90vh) rotate(-150deg) scale(0.8); }
          70% { transform: translate(5vw, 50vh) rotate(-240deg) scale(1.4); }
          100% { transform: translate(20vw, -20vh) rotate(-390deg) scale(1.1); }
        }

        @keyframes thermalChaos5 {
          0% { transform: translate(70vw, 20vh) rotate(15deg) scale(0.9); }
          40% { transform: translate(30vw, 70vh) rotate(190deg) scale(1.3); }
          80% { transform: translate(90vw, 80vh) rotate(290deg) scale(0.7); }
          100% { transform: translate(70vw, 20vh) rotate(375deg) scale(0.9); }
        }

        .animate-thermal-1 { animation: thermalChaos1 44s infinite ease-in-out; }
        .animate-thermal-2 { animation: thermalChaos2 52s infinite ease-in-out; }
        .animate-thermal-3 { animation: thermalChaos3 38s infinite ease-in-out; }
        .animate-thermal-4 { animation: thermalChaos4 62s infinite ease-in-out; }
        .animate-thermal-5 { animation: thermalChaos5 48s infinite ease-in-out; }

        {/* Texture de papier mat / grain subtil (très clair et froid) */}
        .bg-textured-paper {
          background-color: #f3f4f6;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
          color: #171717;
        }
      `}</style>

      {/* CONTENEUR PRINCIPAL GLOBAL */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-12 sm:px-8 w-full">
        
        <header className="text-center animate-text-sweep">
          <p className="mb-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
            Qui sommes-nous ?
          </p>
          <h1 className="text-balance font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight drop-shadow-md mb-8">
            Une équipe passionnée par la voix
          </h1>
          
          <p className="text-pretty text-base leading-relaxed text-neutral-300 max-w-2xl mx-auto mb-16">
            A l&apos;origine trois ami.e.s passionné.e.s de cinéma, aux compétences complémentaires.
          </p>

          <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3 lg:gap-14 my-12 w-full text-left">
            {teamRoles.map((role) => (
              <div key={role.id} className="block h-full cursor-default no-underline">
                <FormulaFrame>
                  <div className="flex h-full flex-col items-center text-center px-6 py-6 sm:py-8">
                    <span className="mb-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-500 whitespace-nowrap">
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

          <p className="text-pretty text-base leading-relaxed text-neutral-300 max-w-2xl mx-auto mt-16">
            L&apos;équipe s&apos;est enrichie d&apos;assistants techniques et de coordinatrices.
          </p>
        </header>

        <div className="mx-auto max-w-4xl w-full">
          
          {/* BLOC VIDÉO */}
          <div className="mt-14 relative w-full animate-text-sweep" style={{ animationDelay: '200ms' }}>
            <div className="relative w-full border border-white/10 bg-neutral-900/40 p-2 sm:p-3 shadow-2xl backdrop-blur-md">
              <div 
                className="relative h-full w-full aspect-video overflow-hidden border border-white/10 bg-black flex items-center justify-center cursor-pointer group"
                onClick={() => setIsVideoPlaying(true)}
              >
                {!isVideoPlaying ? (
                  <>
                    <img 
                      src={withBasePath('/couverture-le-principe.jpg')} 
                      alt="Présentation Vidéo" 
                      className="absolute inset-0 h-full w-full object-cover opacity-80 md:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-transparent" />
                    <VideoPlayButton />
                  </>
                ) : (
                  <video
                    src={withBasePath('/le-principe.mp4')}
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    autoPlay
                  />
                )}
              </div>
            </div>
          </div>

          {/* SECTION LE PRINCIPE */}
          <div className="mt-14 relative w-full animate-text-sweep cursor-default" style={{ animationDelay: '400ms' }}>
            <FormulaFrame>
              <div className="relative z-10 text-center max-w-2xl mx-auto px-6 py-10 sm:py-14">
                <h2 className="text-balance font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight drop-shadow-md mb-6">
                  Le principe
                </h2>
                <p className="text-pretty text-base leading-relaxed text-neutral-300">
                  Un véritable auditorium de doublage se déplace pour vous proposer de vivre en direct une expérience cinématographique dans les meilleures conditions.
                  <br /><br />
                  A partir de nombreux extraits de films cultes, nous offrons au public la possibilité de se mettre, pendant un temps, dans la peau des comédiens à l&apos;image.
                  <br /><br />
                  Grâce à des moyens techniques professionnels, le public peut choisir parmi plus de 200 extraits de films. La projection et la mise en situation sont alors possibles grâce au texte qui défile sous l&apos;image sur une bande rythmo synchrone.
                </p>
              </div>
            </FormulaFrame>
          </div>

        </div>
      </div>

      {/* SECTION CONTACT AVEC FOND ANIMÉ */}
      <div id="contact" className="w-full bg-textured-paper py-24 mt-14 relative overflow-hidden animate-text-sweep" style={{ animationDelay: '600ms' }}>
        
        {/* Calques d'animation en arrière plan */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-65">
          <div className="absolute top-0 left-0 w-[280px] h-[280px] bg-gradient-to-tr from-neutral-400/50 via-neutral-300/40 to-neutral-500/50 rounded-[30%_70%_60%_40%/50%_50%_50%_50%] blur-[45px] animate-thermal-1" />
          <div className="absolute top-0 left-0 w-[260px] h-[260px] bg-gradient-to-bl from-neutral-500/50 via-neutral-400/45 to-neutral-300/50 rounded-[60%_40%_30%_70%/40%_60%_40%_60%] blur-[40px] animate-thermal-2" />
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-r from-neutral-600/45 via-neutral-400/40 to-neutral-300/40 rounded-[50%_50%_40%_60%/60%_40%_50%_50%] blur-[50px] animate-thermal-3" />
          <div className="absolute top-0 left-0 w-[270px] h-[270px] bg-gradient-to-tl from-neutral-300/45 via-neutral-500/40 to-neutral-600/35 rounded-[40%_60%_30%_70%/50%_50%_70%_30%] blur-[45px] animate-thermal-4" />
          <div className="absolute top-0 left-0 w-[290px] h-[290px] bg-gradient-to-br from-neutral-300/40 via-neutral-500/45 to-neutral-400/45 rounded-[70%_30%_50%_50%/30%_70%_50%_50%] blur-[45px] animate-thermal-5" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 w-full">
          <div className="border border-white bg-white p-6 sm:p-10 shadow-xl backdrop-blur-md">
            
            <h2 className="text-balance font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight drop-shadow-sm mb-12 text-center text-neutral-900">
              Contact
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              
              {/* Formulaire */}
              <form className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text" 
                    placeholder="Nom" 
                    className="w-full bg-white border border-neutral-300 px-4 py-3 text-base text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600 transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full bg-white border border-neutral-300 px-4 py-3 text-base text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Sujet" 
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-base text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600 transition-colors"
                />
                <textarea 
                  placeholder="Message" 
                  rows={4}
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-base text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600 transition-colors resize-none"
                ></textarea>
                
                <button 
                  type="button"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-neutral-900 bg-neutral-900 text-white hover:bg-red-600 hover:border-red-600 font-semibold text-[10px] sm:text-xs uppercase tracking-[0.3em] transition-all duration-300 cursor-pointer mt-2"
                >
                  Envoyer
                </button>
              </form>

              {/* Coordonnées */}
              <div className="flex flex-col h-full gap-6 text-base text-neutral-700 leading-relaxed border-t border-neutral-300 pt-8 md:border-t-0 md:pt-0 md:border-l md:pl-10">
                
                <div>
                  <span className="block mb-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neutral-600">
                    Devis & Renseignements
                  </span>
                  <ul className="space-y-4">
                    <li className="flex flex-col gap-1">
                      <span className="font-semibold text-neutral-900">Jean-Jacques PRON</span>
                      <a href="tel:+33682831034" className="text-base text-red-600 hover:text-neutral-900 transition-colors">
                        06 82 83 10 34
                      </a>
                    </li>
                    <li className="flex flex-col gap-1">
                      <span className="font-semibold text-neutral-900">Véronique ATTISSO</span>
                      <a href="tel:+33613647259" className="text-base text-red-600 hover:text-neutral-900 transition-colors">
                        06 13 64 72 59
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-neutral-300">
                  <span className="block mb-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neutral-600">
                    Email
                  </span>
                  <a href="mailto:contact@doublagetournezbobines.fr" className="text-base text-red-600 hover:text-red-700 transition-colors break-all">
                    contact@doublagetournezbobines.fr
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
}