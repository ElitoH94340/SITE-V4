'use client'

import { useState } from 'react'

import { VideoPlayButton } from '@/components/video-play-button'
import { withBasePath } from '@/lib/paths'
import { ContactCtaSection } from '@/components/contact-cta-section'
import {
  TYPO_BLOCK_BODY_CLASS,
  TYPO_BLOCK_SUBTITLE_CLASS,
  TYPO_TITLE,
  TYPO_TITLE_CLASS,
} from '@/lib/typography'

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
    titleLines: ['Un', 'espace'],
    summary:
      'Un véritable auditorium de doublage se déplace pour vous proposer de vivre en direct une expérience cinématographique dans les meilleures conditions.',
  },
  {
    id: 'immersion',
    titleLines: ['Une', 'expérience'],
    summary:
      'À partir de nombreux extraits de films cultes, nous offrons au public la possibilité de se mettre, pendant un temps, dans la peau des comédiens à l’image.',
  },
  {
    id: 'moyens',
    titleLines: ['Un', 'savoir-faire'],
    summary:
      'Grâce à des moyens techniques professionnels, le public peut choisir parmi plus de 200 extraits de films. La projection et la mise en situation sont alors possibles grâce au texte qui défile sous l’image sur une bande rythmo synchrone.',
  },
]

export function AboutView() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section data-header-surface="dark" className="relative w-full bg-black text-neutral-50 pt-[90px] lg:pt-[80px] min-[1440px]:pt-[150px] border-t border-white/20 select-none">
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

      <section data-header-surface="light" className="relative bg-white text-neutral-950 py-16 xl:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                Qu’est-ce
              </span>
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                que le
              </span>
              <span className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]">
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
              className="mt-10 sm:mt-14 xl:mt-16 relative w-full animate-text-sweep cursor-default pointer-events-none"
              style={{ animationDelay: '400ms' }}
            >
              <div className="grid grid-cols-3 items-start gap-4 sm:gap-6 lg:gap-5 xl:gap-10 w-full min-w-0">
                {dubbingRoles.map((role) => (
                  <div
                    key={role.id}
                    className="relative flex min-w-0 flex-col text-left justify-start"
                  >
                    <div
                      className={`flex flex-col items-start gap-[5px] shrink-0 ${TYPO_BLOCK_SUBTITLE_CLASS}`}
                      style={{
                        minHeight: 'calc(2 * (1.15em + 2px) + 5px)',
                      }}
                    >
                      {role.titleLines.map((line) => (
                        <span
                          key={line}
                          className="inline-block w-fit bg-black text-white pl-[3px] pr-[23px] py-px xl:pr-[43px]"
                        >
                          {line}
                        </span>
                      ))}
                    </div>

                    <p
                      lang="fr"
                      className={`mt-4 xl:mt-6 min-w-0 text-pretty text-black [hyphens:auto] ${TYPO_BLOCK_BODY_CLASS}`}
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

      <section data-header-surface="dark" className="relative w-full py-16 xl:py-24 px-4 sm:px-6 lg:px-0 bg-black">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[23px] py-px xl:pr-[43px]">
                Le
              </span>
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[23px] py-px xl:pr-[43px]">
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
                      src={withBasePath('/couverture-le-principe.png')}
                      alt="Présentation Vidéo"
                      className="absolute inset-0 h-full w-full object-cover md:scale-105"
                    />
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
              className="mt-10 sm:mt-14 xl:mt-16 relative w-full animate-text-sweep cursor-default pointer-events-none"
              style={{ animationDelay: '400ms' }}
            >
              <div className="grid grid-cols-3 items-start gap-4 sm:gap-6 lg:gap-5 xl:gap-10 w-full min-w-0">
                {principleCards.map((card) => (
                  <div
                    key={card.id}
                    className="relative flex min-w-0 flex-col text-left justify-start"
                  >
                    <div
                      className={`flex flex-col items-start gap-[5px] shrink-0 ${TYPO_BLOCK_SUBTITLE_CLASS}`}
                      style={{
                        minHeight: 'calc(2 * (1.15em + 2px) + 5px)',
                      }}
                    >
                      {card.titleLines.map((line) => (
                        <span
                          key={line}
                          className="inline-block w-fit bg-white text-black pl-[3px] pr-[23px] py-px xl:pr-[43px]"
                        >
                          {line}
                        </span>
                      ))}
                    </div>

                    <p
                      lang="fr"
                      className={`mt-4 xl:mt-6 min-w-0 text-pretty text-white [hyphens:auto] ${TYPO_BLOCK_BODY_CLASS}`}
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

      <ContactCtaSection tone="light" layout="singleLine" />
    </section>
  )
}
