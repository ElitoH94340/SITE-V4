'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FormulaFrame } from '@/components/formula-frame'
import { VideoPlayButton } from '@/components/video-play-button'
import { FORMULAS } from '@/lib/formulas'
import { withBasePath } from '@/lib/paths'

const HEADER_PHOTOS = [
  '/adultes-souriants.png',
  '/Mardeuil 2018.png',
  '/sourires-enfants.jpg',
]

const MATERIAL_PHOTOS = [
  '/005.jpg',
  '/006.jpg',
  '/007.jpg',
]

const materialCards = [
  {
    id: 'regie',
    title: 'RÉGIE & SYNCHRONISATION',
    text: 'Station de calcul haute performance (i7, carte graphique dédiée) alimentée par le logiciel de référence Mosaic par Noblurway, garantissant un défilement ultra-fluide de la bande rythmo et une synchronisation image/son sans aucune latence.',
  },
  {
    id: 'projection',
    title: 'PROJECTION & RETOUR',
    text: "Dispositif d'affichage modulable combinant vidéoprojection Full HD sur toile géante (300×200 cm) et moniteurs très haute définition jusqu'à 160 cm, assurant une lisibilité parfaite de la bande rythmo et un retour vidéo immersif pour le public.",
  },
  {
    id: 'son',
    title: 'PRISE DE SON & CAPTATION',
    text: 'Microphones canon directifs de studio, barre de doublage professionnelle et captation vidéo multi-angles (caméra 4K et modules embarqués) pour enregistrer fidèlement les voix et immortaliser les performances en direct.',
  },
]

export function DubbingView() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideo1Playing, setIsVideo1Playing] = useState(false)
  const [isHowItWorksVideoPlaying, setIsHowItWorksVideoPlaying] = useState(false)

  return (
    <section className="relative w-full bg-[#050505] text-neutral-50 overflow-x-hidden pt-[90px] lg:pt-[150px] select-none">
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-text-sweep {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; box-shadow: 0 0 10px rgba(245, 130, 32, 0.4); }
          50% { opacity: 1; box-shadow: 0 0 20px rgba(245, 130, 32, 0.8); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
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

      {/* UNE OFFRE LUDIQUE */}
      <section className="relative bg-[#050505] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-white/10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">Une offre</span>
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">ludique</span>
            </div>
            <p className="mt-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#f58220]">
              Doublage pour tous
            </p>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <div className="relative w-full aspect-video overflow-hidden bg-black">
                <img
                  src={withBasePath(HEADER_PHOTOS[0])}
                  alt="Une offre ludique"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div
              className="mt-12 relative w-full animate-text-sweep"
              style={{ animationDelay: '400ms' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                <div className="relative p-8 sm:p-10 flex flex-col text-left overflow-visible min-h-[320px]">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-2xl animated-blob-1" />
                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-neutral-300/5 rounded-full blur-2xl animated-blob-2" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full justify-start">
                    <p className="leading-relaxed text-neutral-400 font-light" style={{ fontSize: '16px' }}>
                      Plongez dans l&apos;univers étonnant du doublage et vivez cette expérience unique dans les conditions d&apos;un véritable studio.
                    </p>
                  </div>
                </div>

                <div className="relative p-8 sm:p-10 flex flex-col text-left overflow-visible min-h-[320px]">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 -left-16 w-48 h-48 bg-white/5 rounded-full blur-2xl animated-blob-2" />
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-neutral-300/5 rounded-full blur-2xl animated-blob-1" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full justify-start">
                    <p className="leading-relaxed text-neutral-400 font-light" style={{ fontSize: '16px' }}>
                      Mairies, institutions, entreprises publiques et privées, nous vous proposons différentes animations tous publics, adaptées à vos événements, dans des lieux dédiés ou sous un barnum.
                    </p>
                  </div>
                </div>

                <div className="relative flex flex-col gap-4 min-h-[320px]">
                  {HEADER_PHOTOS.slice(1, 3).map((photo, index) => (
                    <div key={index} className="relative flex-1 min-h-[140px] overflow-hidden bg-black">
                      <img
                        src={withBasePath(photo)}
                        alt={`Animation ${index + 2}`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOS OBJECTIFS */}
      <section className="relative bg-[#f0f0eb] text-neutral-950 py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
              <span className="inline-block w-fit bg-black text-[#f0f0eb] pl-[3px] pr-[43px] py-px">Nos</span>
              <span className="inline-block w-fit bg-black text-[#f0f0eb] pl-[3px] pr-[43px] py-px">objectifs</span>
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
                      className="absolute inset-0 h-full w-full object-cover opacity-90 md:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-transparent" />
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
              className="mt-12 relative w-full animate-text-sweep"
              style={{ animationDelay: '400ms' }}
            >
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 list-none mb-0">
                <li className="relative p-8 sm:p-10 min-h-[280px] flex items-start">
                  <p className="text-black font-serif italic text-2xl sm:text-3xl tracking-normal text-balance leading-[1.2]">
                    <span className="text-black mr-3">—</span>
                    Fédérer un groupe de <span className="text-[#f58220] font-medium">collaborateurs</span>
                    <span className="text-black ml-3">—</span>
                  </p>
                </li>
                <li className="relative p-8 sm:p-10 min-h-[280px] flex items-start">
                  <p className="text-black font-serif italic text-2xl sm:text-3xl tracking-normal text-balance leading-[1.2]">
                    <span className="text-black mr-3">—</span>
                    Donner une dimension <span className="text-[#f58220] font-medium">festive et cinématographique</span> à un événement
                    <span className="text-black ml-3">—</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* S'AMUSER À DOUBLER */}
      <section className="relative bg-[#f3f4f6] text-neutral-950 py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">S&apos;amuser</span>
              <span className="inline-block w-fit bg-black text-[#f3f4f6] pl-[3px] pr-[43px] py-px">à doubler</span>
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
                      className="absolute inset-0 h-full w-full object-cover opacity-90 md:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-transparent" />
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

      {/* COMMENT ÇA MARCHE ? */}
      <section className="relative bg-[#050505] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-white/10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">Comment</span>
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">ça marche{'\u00A0'}?</span>
            </div>
            <p className="mt-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#f58220]">
              L&apos;immersion & la captation
            </p>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <div
                className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
                onClick={() => setIsHowItWorksVideoPlaying(true)}
              >
                {!isHowItWorksVideoPlaying ? (
                  <>
                    <img
                      src={withBasePath('/couverture-le-deroule.jpg')}
                      alt="Comment ça marche"
                      className="absolute inset-0 h-full w-full object-cover opacity-80 md:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-transparent" />
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

            <div
              className="mt-12 relative w-full animate-text-sweep"
              style={{ animationDelay: '400ms' }}
            >
              <div className="space-y-6">
                {[
                  { num: '1', text: 'Prérequis : être lecteur.' },
                  { num: '2', text: 'Plus de 200 extraits de films cultes sont à votre disposition, avec différents degrés de difficulté.' },
                  { num: '3', text: "Vous choisissez le film, l'extrait et le personnage." },
                  { num: '4', text: 'Vous vous entraînez.' },
                  { num: '5', text: 'Quand vous êtes prêts, vous jouez la scène, que vous soyez seul(e) ou à plusieurs.' },
                ].map((step) => (
                  <div key={step.num} className="flex items-center gap-4 sm:gap-6 group cursor-default">
                    <div className="relative flex items-center justify-end shrink-0 w-6 h-6">
                      <span className="absolute font-serif italic text-xl sm:text-2xl text-neutral-300 transition-all duration-300 group-hover:opacity-0 group-hover:scale-50">
                        {step.num}
                      </span>
                      <div className="absolute flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-50">
                        <div className="w-3 h-3 rounded-full bg-[#f58220] animate-pulse-glow" />
                      </div>
                    </div>

                    <div className="flex items-center shrink-0 w-12 sm:w-16">
                      <div className="w-full h-px bg-neutral-700 transition-colors duration-300 group-hover:bg-neutral-400" />
                    </div>

                    <p className="text-balance text-neutral-300 text-[16px] leading-[1.618] font-light transition-colors duration-300 group-hover:text-white">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOTRE MATÉRIEL */}
      <section className="relative bg-[#f0f0eb] text-neutral-950 py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-neutral-300">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
              <span className="inline-block w-fit bg-black text-[#f0f0eb] pl-[3px] pr-[43px] py-px">Notre</span>
              <span className="inline-block w-fit bg-black text-[#f0f0eb] pl-[3px] pr-[43px] py-px">matériel</span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <div
              className="relative w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              <div className="relative w-full aspect-video overflow-hidden bg-black">
                <img
                  src={withBasePath(MATERIAL_PHOTOS[0])}
                  alt="Notre matériel"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div
              className="mt-12 relative w-full animate-text-sweep cursor-default pointer-events-none"
              style={{ animationDelay: '400ms' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {materialCards.map((card) => (
                  <div
                    key={card.id}
                    className="relative p-8 sm:p-10 flex flex-col text-left overflow-visible min-h-[380px]"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute -top-12 -left-12 w-48 h-48 bg-black/5 rounded-full blur-2xl animated-blob-1" />
                      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-neutral-500/5 rounded-full blur-2xl animated-blob-2" />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-start">
                      <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#f58220] shrink-0">
                        {card.title}
                      </h3>
                      <div className="flex items-start pt-8 sm:pt-10">
                        <p className="leading-relaxed text-neutral-600 font-light" style={{ fontSize: '16px' }}>
                          {card.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-text-sweep"
              style={{ animationDelay: '500ms' }}
            >
              {MATERIAL_PHOTOS.slice(1, 3).map((photo, index) => (
                <div key={index} className="relative w-full aspect-video overflow-hidden bg-black">
                  <img
                    src={withBasePath(photo)}
                    alt={`Matériel ${index + 2}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOS FORMULES */}
      <section className="relative bg-[#050505] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0" id="formulas">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
          <div
            className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
            style={{ top: '180px' }}
          >
            <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">Nos</span>
              <span className="inline-block w-fit bg-white text-black pl-[3px] pr-[43px] py-px">formules</span>
            </div>
          </div>

          <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
            <p className="mb-10 sm:mb-12 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#f58220] animate-text-sweep">
              Trois expériences, un même déroulé. Cliquez pour découvrir le détail de chaque formule.
            </p>

            <div
              className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3 w-full animate-text-sweep"
              style={{ animationDelay: '200ms' }}
            >
              {FORMULAS.map((formula) => (
                <Link
                  key={formula.id}
                  href={`/formules#${formula.id}`}
                  className="block h-full cursor-pointer no-underline group"
                >
                  <FormulaFrame>
                    <div className="flex h-full flex-col items-start text-left px-6 py-6 sm:py-8">
                      <h3
                        className="font-semibold tracking-tight text-white leading-[1.1] shrink-0"
                        style={{ fontSize: '25.888px' }}
                      >
                        {formula.title}
                      </h3>
                      <div className="flex items-start pt-8 sm:pt-10 flex-1">
                        <p className="leading-relaxed text-neutral-400 font-light group-hover:text-neutral-200 transition-colors" style={{ fontSize: '16px' }}>
                          {formula.summary}
                        </p>
                      </div>
                      <p className="mt-8 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#f58220] mb-0">
                        Découvrir
                      </p>
                    </div>
                  </FormulaFrame>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
