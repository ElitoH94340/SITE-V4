'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ContactSection } from '@/components/contact-section'
import { VideoPlayButton } from '@/components/video-play-button'
import { FORMULAS } from '@/lib/formulas'
import { withBasePath } from '@/lib/paths'
import {
  TYPO_BODY,
  TYPO_SUBTITLE,
  TYPO_TITLE,
  TYPO_TITLE_CLASS,
} from '@/lib/typography'

const HEADER_PHOTOS = [
  '/doublage-6.png',
  '/senior-1.png',
  '/enfants-3.png',
]

const MATERIAL_PHOTOS = [
  '/technique-2.png',
  '/barnum-1.png',
  '/doublage-3.png',
]

const offerTexts = [
  "Plongez dans l'univers étonnant du doublage et vivez cette expérience unique dans les conditions d'un véritable studio.",
  'Mairies, institutions, entreprises publiques et privées, nous vous proposons différentes animations tous publics, adaptées à vos événements, dans des lieux dédiés ou sous un barnum.',
]

const objectives = [
  {
    id: 'federer',
    lines: ['Fédérer un groupe de', 'collaborateurs'],
  },
  {
    id: 'dimension',
    lines: [
      'Donner une dimension festive',
      'et cinématographique',
      'à un événement',
    ],
  },
]

const howItWorksSteps = [
  { num: '1', lines: ['Prérequis : être lecteur.'] },
  {
    num: '2',
    lines: [
      'Plus de 200 extraits de films cultes sont à votre disposition,',
      'avec différents degrés de difficulté.',
    ],
  },
  { num: '3', lines: ["Choisissez le film, l'extrait et le personnage."] },
  { num: '4', lines: ['Entraînez-vous.'] },
  {
    num: '5',
    lines: [
      'Une fois prêts, jouez la scène,',
      'seul(e) ou à plusieurs.',
    ],
  },
]

const howItWorksNote =
  "(Le déroulé est identique pour l'immersion, l'immersion filmée ou la captation)"

const materialCards = [
  {
    id: 'regie',
    titleLines: ['Régie &', 'Synchronisation'],
    lines: [
      <>Station haute performance et logiciel{' '}
          Mosaic (Noblurway)
      </>,
      <>pour une bande rythmo fluide et une sync image/son sans latence.</>,
    ],
  },
  {
    id: 'projection',
    titleLines: ['Retour &', 'Projection'],
    lines: [
      <>
        Vidéoprojection Full HD sur toile géante{' '}
          (200×200{'\u00A0'}cm)
      </>,
      <>et moniteurs jusqu’à 160{'\u00A0'}cm pour un retour immersif.</>,
    ],
  },
  {
    id: 'son',
    titleLines: ['Son &', 'Captation'],
    lines: [
      <>Micros canon de studio, barre de doublage pro</>,
      <>
        et captation multi-angles en{' '}
          4K.
      </>,
    ],
  },
]

function PhotoTriptych({
  photos,
  alt,
  mainObjectPosition = 'center',
  reversed = false,
}: {
  photos: string[]
  alt: string
  mainObjectPosition?: string
  reversed?: boolean
}) {
  const [main, second, third] = photos

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 w-full items-stretch">
      <div
        className={`relative w-full aspect-[3/4] overflow-hidden bg-black ${
          reversed ? 'order-1 md:order-2' : ''
        }`}
      >
        <img
          src={withBasePath(main)}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: mainObjectPosition }}
        />
      </div>
      <div
        className={`flex flex-col gap-3 sm:gap-4 lg:gap-5 min-h-0 md:h-full ${
          reversed ? 'order-2 md:order-1' : ''
        }`}
      >
        {[second, third].map((photo, index) => (
          <div
            key={photo}
            className="relative w-full aspect-[4/3] md:aspect-auto md:flex-1 md:min-h-0 overflow-hidden bg-black"
          >
            <img
              src={withBasePath(photo)}
              alt={`${alt} ${index + 2}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function DubbingView() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideo1Playing, setIsVideo1Playing] = useState(false)
  const [isHowItWorksVideoPlaying, setIsHowItWorksVideoPlaying] = useState(false)

  return (
    <section className="relative w-full bg-[#050505] text-neutral-50 pt-[90px] lg:pt-[150px] select-none">
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

      {/* 1 — UNE OFFRE LUDIQUE (gris) */}
      <section className="relative bg-[#f3f4f6] text-neutral-950 py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                Une offre
              </span>
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                ludique
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <PhotoTriptych photos={HEADER_PHOTOS} alt="Une offre ludique" />
            </div>

            <div
              className="mt-10 sm:mt-14 lg:mt-16 relative w-full animate-text-sweep"
              style={{ animationDelay: '400ms' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 w-full items-start">
                {offerTexts.map((text) => (
                  <p
                    key={text}
                    className="text-black font-bold tracking-[0.01em] min-w-0"
                    style={TYPO_SUBTITLE}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — NOS OBJECTIFS (noir) */}
      <section className="relative bg-[#050505] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-white/10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">
                Nos
              </span>
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">
                objectifs
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <div
                className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
                onClick={() => setIsVideoPlaying(true)}
              >
                {!isVideoPlaying ? (
                  <>
                    <img
                      src={withBasePath('/couverture-doublage-pour-tous.jpg')}
                      alt="Présentation Vidéo"
                      className="absolute inset-0 h-full w-full object-cover md:scale-105"
                    />
                    <VideoPlayButton />
                  </>
                ) : (
                  <video
                    src={withBasePath('/Doublage-Pour-Tous.mp4')}
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    autoPlay
                  />
                )}
              </div>
            </div>

            <div
              className="mt-10 sm:mt-14 lg:mt-16 relative w-full animate-text-sweep cursor-default pointer-events-none"
              style={{ animationDelay: '400ms' }}
            >
              <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-12 lg:gap-14 w-full">
                {objectives.map((objective) => (
                  <div
                    key={objective.id}
                    className="relative flex flex-col items-start gap-[5px] text-left justify-start"
                    style={TYPO_SUBTITLE}
                  >
                    {objective.lines.map((line) => (
                      <span
                        key={line}
                        className="inline-block w-fit bg-white text-black font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px"
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — S'AMUSER À DOUBLER (gris) */}
      <section className="relative bg-[#f3f4f6] text-neutral-950 py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                S&apos;amuser
              </span>
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                à doubler
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <div
                className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
                onClick={() => setIsVideo1Playing(true)}
              >
                {!isVideo1Playing ? (
                  <>
                    <img
                      src={withBasePath('/couverture-s-amuser-a-doubler.webp')}
                      alt="S'amuser à doubler"
                      className="absolute inset-0 h-full w-full object-cover md:scale-105"
                    />
                    <VideoPlayButton />
                  </>
                ) : (
                  <video
                    src={withBasePath('/s-amuser-a-doubler.mp4')}
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    autoPlay
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — COMMENT ÇA MARCHE ? (noir) */}
      <section className="relative bg-[#050505] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-white/10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">
                Comment
              </span>
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">
                ça marche{'\u00A0'}?
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <div className="flex w-full flex-col gap-6 sm:gap-8 overflow-visible">
                {howItWorksSteps.map((step) => (
                  <div
                    key={step.num}
                    className="relative w-full flex flex-col items-start gap-[5px]"
                  >
                    {step.lines.map((line, lineIndex) => (
                      <div
                        key={`${step.num}-${lineIndex}`}
                        className="relative w-full"
                      >
                        {lineIndex === 0 ? (
                          <span
                            className="absolute top-0 right-full mr-3 sm:mr-4 text-right text-white font-bold tracking-[0.01em] tabular-nums pt-px whitespace-nowrap"
                            style={TYPO_SUBTITLE}
                          >
                            {step.num}.
                          </span>
                        ) : null}
                        <span
                          className="inline-block w-fit max-w-full bg-white text-black font-bold tracking-[0.01em] pl-[3px] pr-[40px] py-px"
                          style={TYPO_SUBTITLE}
                        >
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <p
                className="mt-8 sm:mt-10 w-full text-neutral-400 italic font-normal tracking-[0.01em] whitespace-nowrap"
                style={TYPO_BODY}
              >
                {howItWorksNote}
              </p>
            </div>

            <div
              className="mt-10 sm:mt-14 lg:mt-16 relative w-full animate-text-sweep"
              style={{ animationDelay: '400ms' }}
            >
              <div
                className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
                onClick={() => setIsHowItWorksVideoPlaying(true)}
              >
                {!isHowItWorksVideoPlaying ? (
                  <>
                    <img
                      src={withBasePath('/couverture-le-deroule.png')}
                      alt="Comment ça marche"
                      className="absolute inset-0 h-full w-full object-cover md:scale-105"
                    />
                    <VideoPlayButton />
                  </>
                ) : (
                  <video
                    src={withBasePath('/le-deroule.mp4')}
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    autoPlay
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — NOTRE MATÉRIEL (gris) */}
      <section className="relative bg-[#f3f4f6] text-neutral-950 py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                Notre
              </span>
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                matériel
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <PhotoTriptych
                photos={MATERIAL_PHOTOS}
                alt="Notre matériel"
                mainObjectPosition="70% center"
                reversed
              />
            </div>

            <div
              className="mt-10 sm:mt-14 lg:mt-16 relative w-full animate-text-sweep cursor-default pointer-events-none"
              style={{ animationDelay: '400ms' }}
            >
              <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3 md:gap-12 lg:gap-14 w-full">
                {materialCards.map((card) => (
                  <div
                    key={card.id}
                    className="relative flex flex-col text-left justify-start"
                  >
                    <div
                      className="flex flex-col items-start gap-[5px] shrink-0"
                      style={{
                        ...TYPO_SUBTITLE,
                        minHeight: 'calc(2 * (1.15em + 2px) + 5px)',
                      }}
                    >
                      {card.titleLines.map((line) => (
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
                      style={TYPO_SUBTITLE}
                    >
                      {card.lines.map((line, index) => (
                        <span key={index} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — NOS FORMULES (noir) */}
      <section
        className="relative bg-[#050505] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0"
        id="formulas"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px]`}
              style={TYPO_TITLE}
            >
              <span className="inline-block w-fit bg-[#f58220] text-black pl-[3px] pr-[43px] py-px">
                Nos
              </span>
              <span className="inline-block w-fit bg-[#f58220] text-black pl-[3px] pr-[43px] py-px">
                formules
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <p
              className="mb-10 sm:mb-12 text-white font-bold tracking-[0.01em] animate-text-sweep"
              style={TYPO_SUBTITLE}
            >
              <span className="block">Trois expériences, un même déroulé.</span>
              <span className="block">
                Cliquez pour découvrir le détail de chaque formule.
              </span>
            </p>

            <div
              className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3 w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              {FORMULAS.map((formula) => (
                <Link
                  key={formula.id}
                  href={`/formules#${formula.id}`}
                  className="group block h-full cursor-pointer no-underline"
                >
                  <div className="relative isolate flex h-full flex-col items-start overflow-hidden border-[3px] border-white bg-black p-6 text-left transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8 group-hover:border-[#f58220] group-hover:bg-[#f58220]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-[3px] z-0 bg-[#f58220] transition-[clip-path] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [clip-path:polygon(0_100%,0_100%,0_100%)] group-hover:[clip-path:polygon(0_100%,230%_100%,0_-130%)]"
                    />
                    <div className="relative z-10 flex h-full w-full flex-col items-start">
                      <h3
                        className="font-bold tracking-[0.01em] text-white leading-[1.15] shrink-0 transition-colors duration-500 group-hover:text-black"
                        style={TYPO_SUBTITLE}
                      >
                        {formula.title}
                      </h3>
                      <div className="flex items-start pt-8 sm:pt-10 flex-1">
                        <p
                          className="leading-[1.3] text-white font-bold transition-colors duration-500 group-hover:text-black"
                          style={TYPO_BODY}
                        >
                          {formula.summary}
                        </p>
                      </div>
                      <p
                        className="mt-8 mb-0 inline-block w-fit bg-[#f58220] text-black font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px uppercase transition-colors duration-500 group-hover:bg-white group-hover:text-black"
                        style={TYPO_BODY}
                      >
                        Découvrir
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection idPrefix="dubbing-contact" layout="stacked" />
    </section>
  )
}
