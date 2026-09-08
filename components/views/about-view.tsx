'use client'

import { useState } from 'react'

import { VideoPlayButton } from '@/components/video-play-button'
import { withBasePath } from '@/lib/paths'

const dubbingRoles = [
  {
    id: 'spectateur',
    titleLines: ['Pour', 'le spectateur'],
    summary:
      'C’est croire naturellement que tous les personnages d’une série ou d’un film étranger parlent français.',
  },
  {
    id: 'comedien',
    titleLines: ['Pour', 'le comédien'],
    summary:
      'C’est suivre au plus près le jeu de l’acteur à l’image, respecter le rythme, les émotions, les intentions et la synchronisation labiale.',
  },
  {
    id: 'adaptateur',
    titleLines: ['Pour', 'l’adaptateur'],
    summary:
      'C’est être au plus près du dialogue en langue étrangère, être le plus synchrone possible en respectant le mouvement des lèvres des comédiens à l’image.',
  },
]

const principleCards = [
  {
    id: 'experience',
    titleLines: ['Expérience', 'sur mesure'],
    summary:
      'Un véritable auditorium de doublage se déplace pour vous proposer de vivre en direct une expérience cinématographique dans les meilleures conditions.',
  },
  {
    id: 'immersion',
    titleLines: ['Immersion', 'totale'],
    summary:
      'À partir de nombreux extraits de films cultes, nous offrons au public la possibilité de se mettre, pendant un temps, dans la peau des comédiens à l’image.',
  },
  {
    id: 'moyens',
    titleLines: ['Moyens', 'professionnels'],
    summary:
      'Grâce à des moyens techniques professionnels, le public peut choisir parmi plus de 200 extraits de films. La projection et la mise en situation sont alors possibles grâce au texte qui défile sous l’image sur une bande rythmo synchrone.',
  },
]

export function AboutView() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative w-full bg-[#050505] text-neutral-50 pt-[90px] lg:pt-[150px] border-t border-white/20 select-none">
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

      {/* =========================================================
          SECTION 1 : QU'EST-CE QUE LE DOUBLAGE ?
          ========================================================= */}

      <section className="relative bg-[#f3f4f6] text-neutral-950 py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                Qu’est-ce
              </span>
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                que le
              </span>
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                doublage{'\u00A0'}?
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <div className="relative w-full aspect-video overflow-hidden bg-black">
                <img
                  src={withBasePath('/doublage-5.png')}
                  alt="Qu’est-ce que le doublage"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div
              className="mt-10 sm:mt-14 lg:mt-16 relative w-full max-w-[92%] mx-auto animate-text-sweep cursor-default pointer-events-none"
              style={{ animationDelay: '400ms' }}
            >
              <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3 md:gap-14 lg:gap-16 w-full">
                {dubbingRoles.map((role) => (
                  <div
                    key={role.id}
                    className="relative flex flex-col text-left justify-start"
                  >
                    <div
                      className="flex flex-col items-start gap-[5px] shrink-0"
                      style={{
                        fontSize: 'clamp(19.5px, 1.76vw, 28.5px)',
                        lineHeight: 1.15,
                        minHeight: 'calc(2 * (1.15em + 2px) + 5px)',
                      }}
                    >
                      {role.titleLines.map((line) => (
                        <span
                          key={line}
                          className="inline-block w-fit bg-black text-[#f3f4f6] font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px"
                        >
                          {line}
                        </span>
                      ))}
                    </div>

                    <p
                      className="mt-6 font-bold tracking-[0.01em] text-black"
                      style={{
                        fontSize: 'clamp(19.5px, 1.76vw, 28.5px)',
                        lineHeight: 1.25,
                      }}
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

      {/* =========================================================
          SECTION LE PRINCIPE ET VIDÉO
          ========================================================= */}

      <section className="relative w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-0 bg-[#050505]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">
                Le
              </span>
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">
                principe
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <div
                className="relative h-full w-full aspect-video overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
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

            <div
              className="mt-10 sm:mt-14 lg:mt-16 relative w-full max-w-[92%] mx-auto animate-text-sweep cursor-default pointer-events-none"
              style={{ animationDelay: '400ms' }}
            >
              <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3 md:gap-14 lg:gap-16 w-full">
                {principleCards.map((card) => (
                  <div
                    key={card.id}
                    className="relative flex flex-col text-left justify-start"
                  >
                    <div
                      className="flex flex-col items-start gap-[5px] shrink-0"
                      style={{
                        fontSize: 'clamp(19.5px, 1.76vw, 28.5px)',
                        lineHeight: 1.15,
                        minHeight: 'calc(2 * (1.15em + 2px) + 5px)',
                      }}
                    >
                      {card.titleLines.map((line) => (
                        <span
                          key={line}
                          className="inline-block w-fit bg-white text-black font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px"
                        >
                          {line}
                        </span>
                      ))}
                    </div>

                    <p
                      className="mt-6 font-bold tracking-[0.01em] text-white"
                      style={{
                        fontSize: 'clamp(19.5px, 1.76vw, 28.5px)',
                        lineHeight: 1.25,
                      }}
                    >
                      {card.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
