'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { VideoPlayButton } from '@/components/video-play-button'
import { withBasePath } from '@/lib/paths'

type Media = {
  video?: string
  photo: string
}

type Module = {
  prefix?: string
  title: string
  desc?: string
  subDesc?: string
  media?: Media
  objectives: string[]
}

type Tab = {
  id: string
  label: string
  publicLabel: string
  ctaButton: string
  modules: Module[]
  mediaList: Media[]
}

const TABS: Tab[] = [
  {
    id: 'Primaire',
    label: 'Primaire',
    publicLabel: 'Élèves en classe de CM1 et CM2',
    ctaButton: 'Découvrir nos offres',
    modules: [
      {
        title: 'Découverte Immersion',
        desc: "Plusieurs séances de travail en co-organisation avec l'enseignant.",
        subDesc:
          "Expérience déjà menée en Réseau d'Éducation Prioritaire (REP).",
        objectives: [
          'Découvrir une œuvre cinématographique, Histoire des Arts',
          "Étudier le sens d'un texte",
          "Faciliter l'expression orale",
          'Travailler la lecture à voix haute',
          'Travailler le rythme et la fluence',
          'Participer à une lecture dialoguée',
          'Développer la confiance en soi',
          'Travailler en groupe : Enseignement moral et civique EMC',
          'Créer une œuvre commune',
        ],
      },
    ],
    mediaList: [
      {
        video: '/maitresse-explique.mp4',
        photo: '/couverture-primaire.png',
      },
    ],
  },
  {
    id: 'Collège',
    label: 'Collège',
    publicLabel: 'Collégiens',
    ctaButton: 'Découvrir nos offres',
    modules: [
      {
        title: 'Découverte & Adaptation',
        desc: 'Plusieurs séances de travail en co-organisation avec les professeurs de Français.',
        objectives: [
          'Découvrir une œuvre cinématographique, Histoire des Arts',
          'S’entraîner à la lecture : rythme, intonation, fluence',
          'S’entraîner à la lecture dialoguée',
          'Faciliter l’expression orale',
          'Développer la confiance en soi',
          'Participer à une lecture dialoguée',
          'Créer une œuvre commune',
          'Travailler à la traduction de dialogues',
        ],
      },
    ],
    mediaList: [
      { video: '/college.mp4', photo: '/couverture-college.png' },
    ],
  },
  {
    id: 'Lycée',
    label: 'Lycéens',
    publicLabel: 'Lycéens',
    ctaButton: 'Découvrir nos offres',
    modules: [
      {
        prefix: 'Module 1',
        title: 'Découverte Immersion / adaptation',
        desc: 'Une préparation ludique pour les lycéens.',
        subDesc:
          "Plusieurs séances de travail en co-organisation avec l'enseignant.",
        media: {
          video: '/lycée-module-1.mp4',
          photo: '/couverture-lycee-1.png',
        },
        objectives: [
          'Découvrir une œuvre cinématographique, Histoire des Arts',
          'S’entraîner à la lecture : rythme, intonation, fluence',
          'Faciliter l’expression orale',
          'Créer une œuvre commune',
        ],
      },
      {
        prefix: 'Module 2',
        title: 'Découverte Immersion / adaptation',
        desc: 'Plusieurs séances de travail en co-organisation avec les professeurs d’anglais et de français.',
        media: {
          video: '/lycée-module-1.mp4',
          photo: '/couverture-lycee-2.png',
        },
        objectives: [
          'Travailler à la traduction de dialogues et à leur adaptation',
          'Découvrir un métier',
          'Créer une œuvre commune',
        ],
      },
      {
        prefix: 'Module 3',
        title: 'Préparation au grand oral du bac',
        desc: 'Une préparation ludique réservée aux classes de Terminale.',
        media: {
          video: '/lycée-module-2.mp4',
          photo: '/couverture-lycee-3.png',
        },
        objectives: [
          'Travailler la posture',
          'Gagner en aisance à l’oral',
          'Améliorer la diction et la fluence',
          'Placer sa voix pour parler et se faire entendre',
        ],
      },
      {
        prefix: 'Module 4',
        title: 'Classes avec option cinéma',
        desc: 'Découvrir un métier de la post-production : adaptateur dialoguiste.',
        subDesc: "Création d'une œuvre commune finale.",
        media: {
          photo: '/couverture-lycee-4.png',
        },
        objectives: [
          "Explorer le jeu d'acteur et l'interprétation face au micro",
          "S'entraîner à la lecture rigoureuse de textes et de scripts",
          'Maîtriser la synchronisation labiale et rythmique (rythmo)',
          "Développer l'expressivité vocale et l'intonation juste",
          'Comprendre les exigences du doublage en conditions professionnelles',
          'Créer et interpréter une œuvre commune finale',
        ],
      },
    ],
    mediaList: [
      { video: '/video-lycee-main.mp4', photo: '/photo-lycee-main.jpg' },
    ],
  },
]

const EDUCATION_PHOTOS = [
  '/classe-1.png',
  '/classe-2.png',
  '/ado-2.png',
]

function PhotoTriptych({
  photos,
  alt,
  mainObjectPosition = 'center',
}: {
  photos: string[]
  alt: string
  mainObjectPosition?: string
}) {
  const [main, second, third] = photos

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 w-full items-stretch">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-black">
        <img
          src={withBasePath(main)}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: mainObjectPosition }}
        />
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 min-h-0 md:h-full">
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

export function FactoryView() {
  const [active, setActive] = useState(TABS[0].id)
  const [moduleIndex, setModuleIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const current = TABS.find((tab) => tab.id === active) ?? TABS[0]
  const currentModule = current.modules[moduleIndex] ?? current.modules[0]
  const hasMultipleModules = current.modules.length > 1
  const activeMedia = currentModule.media ?? current.mediaList[0]

  useEffect(() => {
    setModuleIndex(0)
    setIsVideoPlaying(false)
  }, [active])

  useEffect(() => {
    setIsVideoPlaying(false)
  }, [moduleIndex])

  return (
    <section className="relative w-full bg-black text-neutral-50 pt-[90px] lg:pt-[150px] select-none">
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

      {/* 1 — LA FABRIQUE À DOUBLAGE (gris) */}
      <section className="relative bg-[#f3f4f6] text-neutral-950 py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300 overflow-visible">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px] overflow-visible">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                La
              </span>
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                fabrique
              </span>
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">
                à doublage
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col overflow-visible">
            <div
              className="relative w-full animate-text-sweep overflow-visible"
              style={{ animationDelay: '200ms' }}
            >
              <PhotoTriptych
                photos={EDUCATION_PHOTOS}
                alt="La fabrique à doublage"
              />

              <div className="absolute left-[-4%] sm:left-[-3%] top-[52%] sm:top-[55%] z-20 pointer-events-none w-[58%] sm:w-[48%] lg:w-[42%] -translate-y-1/2 -rotate-2">
                <div
                  className="flex flex-col items-start gap-[5px] uppercase"
                  style={{
                    fontSize: 'clamp(18px, 2.2vw, 32px)',
                    lineHeight: 1.15,
                  }}
                >
                  <span className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    Le doublage{'\u00A0'}:
                  </span>
                  <span className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    un outil
                  </span>
                  <span className="inline-block w-fit bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    d&apos;enseignement
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — ONGLETS + CONTENU (noir) */}
      <section className="relative bg-black text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] self-start"
            style={{ top: '180px' }}
          >
            <div className="flex flex-col items-start gap-5 sm:gap-6">
              <div className="inline-flex w-max flex-col items-stretch gap-5 sm:gap-6 text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] uppercase">
                {TABS.map((tab) => {
                  const isActive = tab.id === active
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => setActive(tab.id)}
                      className={[
                        'w-full text-left text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] uppercase pl-[3px] pr-[43px] py-px transition-colors duration-300 cursor-pointer',
                        isActive
                          ? 'bg-[#f58220] text-black'
                          : 'bg-black text-white hover:bg-white hover:text-black',
                      ].join(' ')}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              {hasMultipleModules && (
                <div className="inline-flex w-max flex-col items-stretch gap-2.5 sm:gap-3">
                  {current.modules.map((module, index) => {
                    const isActiveModule = index === moduleIndex
                    return (
                      <button
                        key={module.prefix ?? index}
                        type="button"
                        aria-current={isActiveModule ? 'true' : undefined}
                        onClick={() => setModuleIndex(index)}
                        className={[
                          'w-full text-left text-[14px] sm:text-[18px] lg:text-[22px] font-bold tracking-[0.01em] leading-[1.1] uppercase pl-[3px] pr-[43px] py-px transition-colors duration-300 cursor-pointer',
                          isActiveModule
                            ? 'bg-white text-black'
                            : 'bg-transparent text-neutral-500 hover:bg-transparent hover:text-white',
                        ].join(' ')}
                      >
                        {module.prefix ?? `Module ${index + 1}`}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              key={`${active}-${moduleIndex}`}
              className="w-full animate-text-sweep"
            >
              {/* Média : vidéo, ou photo seule s’il n’y a pas de vidéo */}
              {activeMedia.video ? (
                <div
                  className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  {!isVideoPlaying ? (
                    <>
                      <img
                        src={withBasePath(activeMedia.photo)}
                        alt={currentModule.title}
                        className="absolute inset-0 h-full w-full object-cover md:scale-105"
                      />
                      <VideoPlayButton />
                    </>
                  ) : (
                    <video
                      src={withBasePath(activeMedia.video)}
                      className="absolute inset-0 h-full w-full object-cover"
                      controls
                      autoPlay
                    />
                  )}
                </div>
              ) : (
                <div className="relative w-full aspect-video overflow-hidden bg-black">
                  <img
                    src={withBasePath(activeMedia.photo)}
                    alt={currentModule.title}
                    className="absolute inset-0 h-full w-full object-cover md:scale-105"
                  />
                </div>
              )}

              {/* Titre + public + descriptions */}
              <div className="mt-10 sm:mt-14 lg:mt-16 flex flex-col items-start">
                <div className="flex flex-col items-start gap-[5px] uppercase">
                  <span
                    className="inline-block w-fit bg-[#f58220] text-black font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px"
                    style={{
                      fontSize: 'clamp(19.5px, 1.76vw, 28.5px)',
                      lineHeight: 1.15,
                    }}
                  >
                    {currentModule.title}
                  </span>
                  <span
                    className="inline-block w-fit bg-white text-black font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px"
                    style={{
                      fontSize: 'clamp(15px, 1.35vw, 22px)',
                      lineHeight: 1.15,
                    }}
                  >
                    {current.publicLabel}
                  </span>
                </div>

                {(currentModule.desc || currentModule.subDesc) && (
                  <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4">
                    {currentModule.desc && (
                      <p
                        className="font-bold tracking-[0.01em] text-white"
                        style={{
                          fontSize: 'clamp(15px, 1.35vw, 22px)',
                          lineHeight: 1.3,
                        }}
                      >
                        {currentModule.desc}
                      </p>
                    )}

                    {currentModule.subDesc && (
                      <p
                        className="italic font-normal tracking-[0.01em] text-white/75"
                        style={{
                          fontSize: 'clamp(15px, 1.2vw, 19px)',
                          lineHeight: 1.4,
                        }}
                      >
                        {currentModule.subDesc}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Objectifs */}
              <div className="mt-10 sm:mt-12">
                <div
                  className="flex flex-col items-start gap-[5px] uppercase"
                  style={{
                    fontSize: 'clamp(19.5px, 1.76vw, 28.5px)',
                    lineHeight: 1.15,
                  }}
                >
                  <span className="inline-block w-fit bg-[#f58220] text-black font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px">
                    Objectifs
                  </span>
                </div>

                <div className="mt-6 sm:mt-8 flex w-full flex-col gap-3 sm:gap-4 overflow-visible">
                  {currentModule.objectives.map((objective, index) => (
                    <div
                      key={`${current.id}-${moduleIndex}-${objective}`}
                      className="relative w-full"
                    >
                      <span
                        className="absolute top-0 right-full mr-3 sm:mr-4 text-right text-white font-bold tracking-[0.01em] tabular-nums pt-px whitespace-nowrap"
                        style={{
                          fontSize: 'clamp(15px, 1.35vw, 22px)',
                          lineHeight: 1.15,
                        }}
                      >
                        {index + 1}.
                      </span>
                      <p
                        className="inline-block w-fit max-w-full min-w-0 bg-white text-black font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px"
                        style={{
                          fontSize: 'clamp(15px, 1.35vw, 22px)',
                          lineHeight: 1.15,
                        }}
                      >
                        {objective}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 sm:mt-12">
                <Link
                  href="/formules"
                  className="group relative isolate inline-flex overflow-hidden border-[3px] border-white bg-black px-6 py-4 no-underline transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#f58220] hover:bg-[#f58220] cursor-pointer"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-[3px] z-0 bg-[#f58220] transition-[clip-path] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [clip-path:polygon(0_100%,0_100%,0_100%)] group-hover:[clip-path:polygon(0_100%,230%_100%,0_-130%)]"
                  />
                  <span
                    className="relative z-10 font-bold tracking-[0.01em] text-white uppercase transition-colors duration-500 group-hover:text-black"
                    style={{
                      fontSize: 'clamp(14px, 1.1vw, 18px)',
                      lineHeight: 1.15,
                    }}
                  >
                    {current.ctaButton}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
