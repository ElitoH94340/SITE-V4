'use client'

import { useState } from 'react'

import { VideoPlayButton } from '@/components/video-play-button'
import { withBasePath } from '@/lib/paths'

const dubbingRoles = [
  {
    id: 'spectateur',
    subtitle: (
      <>
        Pour<br />le <span className="border-b-2 border-orange-500 pb-0.5">spectateur</span>
      </>
    ),
    summary:
      'C’est croire naturellement que tous les personnages d’une série ou d’un film étranger parlent français.',
  },
  {
    id: 'comedien',
    subtitle: (
      <>
        Pour<br />le <span className="border-b-2 border-orange-500 pb-0.5">comédien</span>
      </>
    ),
    summary:
      'C’est suivre au plus près le jeu de l’acteur à l’image, respecter le rythme, les émotions, les intentions et la synchronisation labiale.',
  },
  {
    id: 'adaptateur',
    subtitle: (
      <>
        Pour<br />l’<span className="border-b-2 border-orange-500 pb-0.5">adaptateur</span>
      </>
    ),
    summary:
      'C’est être au plus près du dialogue en langue étrangère, être le plus synchrone possible en respectant le mouvement des lèvres des comédiens à l’image.',
  },
]

export function AboutView() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative w-full bg-[#050505] text-neutral-50 pt-20 border-t border-white/20 select-none">
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

      {/* =========================================================
          SECTION 1 : QU'EST-CE QUE LE DOUBLAGE ?
          ========================================================= */}

      <section className="relative bg-[#050505] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0 flex flex-col justify-center border-b border-white/10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          
          {/* Titre à gauche (4 colonnes) - En majuscules (uppercase) */}
          <div 
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-semibold tracking-tight text-white leading-[1.1] flex flex-col items-start space-y-1 uppercase">
              <span className="inline-block border-b-2 border-white pb-1.5">Qu’est-ce</span>
              <span className="inline-block border-b-2 border-white pb-1.5">que le</span>
              <span className="inline-block border-b-2 border-white pb-1.5">doublage ?</span>
            </div>
          </div>

          {/* Contenu principal (8 colonnes) */}
          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0">
            <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3 w-full">
              {dubbingRoles.map((role) => (
                <div
                  key={role.id}
                  className="relative p-8 sm:p-10 flex flex-col text-left overflow-visible min-h-[380px]"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-2xl animated-blob-1" />
                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-neutral-300/5 rounded-full blur-2xl animated-blob-2" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <h3 
                      className="font-semibold tracking-tight text-white leading-[1.1] shrink-0"
                      style={{ fontSize: '25.888px' }}
                    >
                      {role.subtitle}
                    </h3>

                    <div className="flex-grow flex items-start pt-8 sm:pt-10">
                      <p 
                        className="leading-relaxed text-neutral-400 font-light"
                        style={{ fontSize: '16px' }}
                      >
                        {role.summary}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION LE PRINCIPE ET VIDÉO
          ========================================================= */}

      <section className="relative w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-0 bg-[#050505]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          
          {/* Titre à gauche (4 colonnes) - En majuscules (uppercase) */}
          <div 
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-semibold tracking-tight text-white leading-[1.1] flex flex-col items-start space-y-1 uppercase">
              <span className="inline-block border-b-2 border-white pb-1.5">Le</span>
              <span className="inline-block border-b-2 border-white pb-1.5">principe</span>
            </div>
          </div>

          {/* Contenu principal : Vidéo + Cartes (8 colonnes) */}
          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            
            {/* Bloc Vidéo */}
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <div className="relative w-full shadow-2xl rounded-none">
                <div
                  className="relative h-full w-full aspect-video overflow-hidden bg-black flex items-center justify-center cursor-pointer group rounded-none"
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

            {/* 3 Cartes */}
            <div
              className="mt-12 relative w-full animate-text-sweep cursor-default pointer-events-none"
              style={{ animationDelay: '400ms' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                
                {/* Carte 1 */}
                <div className="relative p-8 sm:p-10 flex flex-col text-left overflow-visible min-h-[380px]">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-2xl animated-blob-1" />
                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-neutral-300/5 rounded-full blur-2xl animated-blob-2" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 
                      className="font-semibold tracking-tight text-white leading-[1.1] shrink-0"
                      style={{ fontSize: '25.888px' }}
                    >
                      Expérience<br />sur mesure
                    </h3>
                    <div className="flex-grow flex items-start pt-8 sm:pt-10">
                      <p 
                        className="leading-relaxed text-neutral-400 font-light"
                        style={{ fontSize: '16px' }}
                      >
                        Un véritable auditorium de doublage se déplace pour vous proposer de vivre en direct une expérience cinématographique dans les meilleures conditions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Carte 2 */}
                <div className="relative p-8 sm:p-10 flex flex-col text-left overflow-visible min-h-[380px]">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 -left-16 w-48 h-48 bg-white/5 rounded-full blur-2xl animated-blob-2" />
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-neutral-300/5 rounded-full blur-2xl animated-blob-1" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <h3 
                      className="font-semibold tracking-tight text-white leading-[1.1] shrink-0"
                      style={{ fontSize: '25.888px' }}
                    >
                      Immersion<br />totale
                    </h3>
                    <div className="flex-grow flex items-start pt-8 sm:pt-10">
                      <p 
                        className="leading-relaxed text-neutral-400 font-light"
                        style={{ fontSize: '16px' }}
                      >
                        À partir de nombreux extraits de films cultes, nous offrons au public la possibilité de se mettre, pendant un temps, dans la peau des comédiens à l'image.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Carte 3 */}
                <div className="relative p-8 sm:p-10 flex flex-col text-left overflow-visible min-h-[380px]">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full blur-2xl animated-blob-1" />
                    <div className="absolute top-0 right-0 w-48 h-48 bg-neutral-300/5 rounded-full blur-2xl animated-blob-2" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <h3 
                      className="font-semibold tracking-tight text-white leading-[1.1] shrink-0"
                      style={{ fontSize: '25.888px' }}
                    >
                      Moyens<br />professionnels
                    </h3>
                    <div className="flex-grow flex items-start pt-8 sm:pt-10">
                      <p 
                        className="leading-relaxed text-neutral-400 font-light"
                        style={{ fontSize: '16px' }}
                      >
                        Grâce à des moyens techniques professionnels, le public peut choisir parmi plus de 200 extraits de films. La projection et la mise en situation sont alors possibles grâce au texte qui défile sous l'image sur une bande rythmo synchrone.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>
    </section>
  )
}