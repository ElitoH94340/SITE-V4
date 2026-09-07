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

export function DubbingView() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideo1Playing, setIsVideo1Playing] = useState(false)
  const [isHowItWorksVideoPlaying, setIsHowItWorksVideoPlaying] = useState(false)

  return (
    <>
      <section className="relative w-full bg-black text-neutral-50 overflow-x-hidden pt-20 pb-12 select-none">
        
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
            0%, 100% { opacity: 0.4; box-shadow: 0 0 10px rgba(220, 38, 38, 0.4); }
            50% { opacity: 1; box-shadow: 0 0 20px rgba(220, 38, 38, 0.8); }
          }
          .animate-pulse-glow {
            animation: pulseGlow 2s ease-in-out infinite;
          }

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

          .bg-textured-paper {
            background-color: #f3f4f6;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
            color: #171717;
          }
        `}</style>

        {/* CONTENEUR PRINCIPAL */}
        <div className="relative z-10 mx-auto max-w-7xl px-5 pt-8 sm:px-8 w-full">
          
          <header className="text-center animate-text-sweep mb-8">
            <p className="mb-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
              Doublage pour tous
            </p>
            <h1 className="text-balance font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight drop-shadow-md mb-0">
              Une offre ludique
            </h1>
          </header>

          <div className="mx-auto max-w-4xl w-full">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full animate-text-sweep" style={{ animationDelay: '200ms' }}>
              <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-full border border-white/10 bg-neutral-900/40 p-2 sm:p-3 shadow-2xl backdrop-blur-md">
                <div className="relative h-full w-full overflow-hidden border border-white/10 bg-black">
                  <img 
                    src={withBasePath(HEADER_PHOTOS[0])} 
                    alt="Animation 1" 
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {HEADER_PHOTOS.slice(1, 3).map((photo, index) => (
                  <div key={index} className="relative w-full aspect-video border border-white/10 bg-neutral-900/40 p-2 sm:p-3 shadow-2xl backdrop-blur-md">
                    <div className="relative h-full w-full overflow-hidden border border-white/10 bg-black">
                      <img 
                        src={withBasePath(photo)} 
                        alt={`Animation ${index + 2}`} 
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-0 text-pretty text-base leading-relaxed text-neutral-300 w-full animate-text-sweep" style={{ animationDelay: '400ms' }}>
              <p>
                Plongez dans l&apos;univers étonnant du doublage et vivez cette expérience unique dans les conditions d&apos;un véritable studio.
              </p>
              <p>
                Mairies, institutions, entreprises publiques et privées, nous vous proposons différentes animations tous publics, adaptées à vos événements, dans des lieux dédiés ou sous un barnum.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION NOS OBJECTIFS */}
        <div className="w-full mt-12 bg-white py-14 px-5 sm:px-8 border-t border-neutral-200 relative">
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
            
            <div className="w-full text-center mb-8">
              <h2 className="text-balance font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight drop-shadow-sm text-neutral-900 mb-4">
                Nos objectifs
              </h2>
              
              <ul className="flex flex-col items-center gap-5 text-black font-serif italic text-2xl sm:text-3xl tracking-normal text-balance list-none mb-0">
                <li>
                  <span className="text-black mr-3">—</span> 
                  Fédérer un groupe de <span className="text-red-500 font-medium">collaborateurs</span> 
                  <span className="text-black ml-3">—</span>
                </li>
                <li>
                  <span className="text-black mr-3">—</span> 
                  Donner une dimension <span className="text-red-500 font-medium">festive et cinématographique</span> à un événement 
                  <span className="text-black ml-3">—</span>
                </li>
              </ul>
            </div>

            <div className="w-full">
              <div className="relative w-full border border-neutral-300 bg-neutral-900/10 p-2 sm:p-3 shadow-xl backdrop-blur-md">
                <div 
                  className="relative h-full w-full aspect-video overflow-hidden border border-neutral-300 bg-black flex items-center justify-center cursor-pointer group"
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
            </div>
            
          </div>
        </div>

        {/* SECTION S'AMUSER À DOUBLER */}
        <div className="w-full bg-textured-paper py-14 px-5 sm:px-8 border-b border-neutral-300 overflow-hidden relative">
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-65">
            <div className="absolute top-0 left-0 w-[280px] h-[280px] bg-gradient-to-tr from-neutral-400/50 via-neutral-300/40 to-neutral-500/50 rounded-[30%_70%_60%_40%/50%_50%_50%_50%] blur-[45px] animate-thermal-1" />
            <div className="absolute top-0 left-0 w-[260px] h-[260px] bg-gradient-to-bl from-neutral-500/50 via-neutral-400/45 to-neutral-300/50 rounded-[60%_40%_30%_70%/40%_60%_40%_60%] blur-[40px] animate-thermal-2" />
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-r from-neutral-600/45 via-neutral-400/40 to-neutral-300/40 rounded-[50%_50%_40%_60%/60%_40%_50%_50%] blur-[50px] animate-thermal-3" />
            <div className="absolute top-0 left-0 w-[270px] h-[270px] bg-gradient-to-tl from-neutral-300/45 via-neutral-500/40 to-neutral-600/35 rounded-[40%_60%_30%_70%/50%_50%_70%_30%] blur-[45px] animate-thermal-4" />
            <div className="absolute top-0 left-0 w-[290px] h-[290px] bg-gradient-to-br from-neutral-300/40 via-neutral-500/45 to-neutral-400/45 rounded-[70%_30%_50%_50%/30%_70%_50%_50%] blur-[45px] animate-thermal-5" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl w-full">
            <h2 className="text-center text-balance font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-neutral-900 drop-shadow-sm mb-8">
              S&apos;amuser à doubler
            </h2>

            <div className="relative w-full border border-neutral-300 bg-neutral-200/50 p-2 sm:p-3 shadow-xl backdrop-blur-md">
              <div 
                className="relative h-full w-full aspect-video overflow-hidden border border-neutral-300 bg-black flex items-center justify-center cursor-pointer group"
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

        {/* COMMENT ÇA MARCHE ? */}
        <div className="w-full py-14 px-5 sm:px-8">
          <div className="relative z-15 max-w-4xl mx-auto">
            
            <div className="relative w-full p-6 sm:p-10 overflow-hidden backdrop-blur-[2px] mb-8">
              <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-neutral-400/70 pointer-events-none" />
              <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-neutral-400/70 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-neutral-400/70 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-neutral-400/70 pointer-events-none" />

              <div className="absolute top-1/2 left-0 w-3 h-px bg-neutral-500/50 -translate-y-1/2 pointer-events-none" />
              <div className="absolute top-1/2 right-0 w-3 h-px bg-neutral-500/50 -translate-y-1/2 pointer-events-none" />
              <div className="absolute top-0 left-1/2 w-px h-3 bg-neutral-500/50 -translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-1/2 w-px h-3 bg-neutral-500/50 -translate-x-1/2 pointer-events-none" />

              <div className="relative z-10 max-w-xl mx-auto pt-6 pb-2 text-center">
                <h2 className="text-balance font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white mb-3">
                  Comment ça marche ?
                </h2>
                <p className="mb-8 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
                  L&apos;immersion & la captation
                </p>

                <div className="space-y-6 text-left">
                  {[
                    { num: '1', text: 'Prérequis : être lecteur.' },
                    { num: '2', text: 'Plus de 200 extraits de films cultes sont à votre disposition, avec différents degrés de difficulté.' },
                    { num: '3', text: 'Vous choisissez le film, l\'extrait et le personnage.' },
                    { num: '4', text: 'Vous vous entraînez.' },
                    { num: '5', text: 'Quand vous êtes prêts, vous jouez la scène, que vous soyez seul(e) ou à plusieurs.' }
                  ].map((step) => (
                    <div key={step.num} className="flex items-center gap-4 sm:gap-6 group cursor-default">
                      <div className="relative flex items-center justify-end shrink-0 w-6 h-6">
                        <span className="absolute font-serif italic text-xl sm:text-2xl text-neutral-300 transition-all duration-300 group-hover:opacity-0 group-hover:scale-50">
                          {step.num}
                        </span>
                        <div className="absolute flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-50">
                          <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse-glow" />
                        </div>
                      </div>
                      
                      <div className="flex items-center shrink-0 w-12 sm:w-16">
                        <div className="w-full h-px bg-neutral-700 transition-colors duration-300 group-hover:bg-neutral-400"></div>
                      </div>

                      <p className="text-balance text-neutral-300 text-[16px] leading-[1.618] font-light transition-colors duration-300 group-hover:text-white">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto w-full">
              <div className="relative w-full border border-white/10 bg-neutral-900/40 p-2 sm:p-3 shadow-2xl backdrop-blur-md">
                <div 
                  className="relative h-full w-full aspect-video overflow-hidden border border-white/10 bg-black flex items-center justify-center cursor-pointer group"
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
            </div>

          </div>
        </div>

        {/* SECTION NOTRE MATÉRIEL */}
        <div className="w-full bg-white py-14 border-y border-neutral-200 relative">
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-balance font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight drop-shadow-sm text-neutral-900 mb-0">
                Notre matériel
              </h2>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3 lg:gap-14 text-left">
              <div className="flex h-full flex-col px-2 py-4">
                <div className="mb-4 flex items-center justify-center border-b border-neutral-300 pb-4 w-full">
                  <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
                    RÉGIE & SYNCHRONISATION
                  </h3>
                </div>
                <p className="flex-1 text-balance text-neutral-600 text-[16px] leading-[1.618] font-light text-center mb-0">
                  Station de calcul haute performance (i7, carte graphique dédiée) alimentée par le logiciel de référence Mosaic par Noblurway, garantissant un défilement ultra-fluide de la bande rythmo et une synchronisation image/son sans aucune latence.
                </p>
              </div>

              <div className="flex h-full flex-col px-2 py-4">
                <div className="mb-4 flex items-center justify-center border-b border-neutral-300 pb-4 w-full">
                  <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
                    PROJECTION & RETOUR
                  </h3>
                </div>
                <p className="flex-1 text-balance text-neutral-600 text-[16px] leading-[1.618] font-light text-center mb-0">
                  Dispositif d&apos;affichage modulable combinant vidéoprojection Full HD sur toile géante (300×200 cm) et moniteurs très haute définition jusqu&apos;à 160 cm, assurant une lisibilité parfaite de la bande rythmo et un retour vidéo immersif pour le public.
                </p>
              </div>

              <div className="flex h-full flex-col px-2 py-4">
                <div className="mb-4 flex items-center justify-center border-b border-neutral-300 pb-4 w-full">
                  <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
                    PRISE DE SON & CAPTATION
                  </h3>
                </div>
                <p className="flex-1 text-balance text-neutral-600 text-[16px] leading-[1.618] font-light text-center mb-0">
                  Microphones canon directifs de studio, barre de doublage professionnelle et captation vidéo multi-angles (caméra 4K et modules embarqués) pour enregistrer fidèlement les voix et immortaliser les performances en direct.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION TRIPTYQUE MATÉRIEL */}
        <div className="w-full bg-textured-paper py-14 relative z-10 border-t-0 overflow-hidden">
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-65">
            <div className="absolute top-0 left-0 w-[290px] h-[290px] bg-gradient-to-br from-neutral-500/50 via-neutral-600/45 to-neutral-400/50 rounded-[40%_60%_70%_30%/50%_40%_60%_50%] blur-[45px] animate-thermal-3" />
            <div className="absolute top-0 left-0 w-[260px] h-[260px] bg-gradient-to-tr from-neutral-300/50 via-neutral-500/45 to-neutral-600/45 rounded-[70%_30%_40%_60%/40%_60%_50%_50%] blur-[40px] animate-thermal-4" />
            <div className="absolute top-0 left-0 w-[280px] h-[280px] bg-gradient-to-bl from-neutral-400/40 via-neutral-600/45 to-neutral-500/50 rounded-[50%_50%_30%_70%/60%_50%_40%_50%] blur-[50px] animate-thermal-1" />
            <div className="absolute top-0 left-0 w-[270px] h-[270px] bg-gradient-to-r from-neutral-600/45 via-neutral-500/40 to-neutral-400/45 rounded-[30%_70%_50%_50%/70%_30%_40%_60%] blur-[45px] animate-thermal-2" />
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-tl from-neutral-500/35 via-neutral-400/40 to-neutral-600/45 rounded-[60%_40%_60%_40%/40%_60%_40%_60%] blur-[50px] animate-thermal-5" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-4xl w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-full border border-neutral-300 bg-neutral-200/40 p-2 sm:p-3 shadow-xl backdrop-blur-md">
                  <div className="relative h-full w-full overflow-hidden border border-neutral-300 bg-black">
                    <img 
                      src={withBasePath(MATERIAL_PHOTOS[0])} 
                      alt="Matériel 1" 
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {MATERIAL_PHOTOS.slice(1, 3).map((photo, index) => (
                    <div key={index} className="relative w-full aspect-video border border-neutral-300 bg-neutral-200/40 p-2 sm:p-3 shadow-xl backdrop-blur-md">
                      <div className="relative h-full w-full overflow-hidden border border-neutral-300 bg-black">
                        <img 
                          src={withBasePath(photo)} 
                          alt={`Matériel ${index + 2}`} 
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION NOS FORMULES */}
        <div className="w-full bg-black py-14 relative z-10" id="formulas">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            
            <div className="mb-8 text-center">
              <h2 className="text-balance font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white drop-shadow-md mb-4">
                Nos formules
              </h2>
              <p className="text-pretty text-base leading-relaxed text-neutral-400 max-w-2xl mx-auto mb-0">
                Trois expériences, un même déroulé. Cliquez pour découvrir le détail de chaque formule.
              </p>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3 lg:gap-14 text-left">
              {FORMULAS.map((formula) => (
                <Link
                  key={formula.id}
                  href={`/formules#${formula.id}`}
                  className="block h-full cursor-pointer no-underline group"
                >
                  <FormulaFrame>
                    <div className="flex h-full flex-col items-center text-center px-6 py-6 sm:py-8">
                      <div className="mb-4 flex items-center justify-center border-b border-white/10 pb-4 w-full transition-colors duration-300 group-hover:border-transparent">
                        <h3 className="font-serif italic text-2xl sm:text-3xl tracking-tight text-neutral-100 drop-shadow-sm">
                          {formula.title}
                        </h3>
                      </div>
                      <p className="flex-1 text-balance text-neutral-300 text-[16px] leading-[1.618] font-light group-hover:text-white transition-colors duration-300">
                        {formula.summary}
                      </p>
                      <p className="mt-8 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-red-500 mb-0">
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
    </>
  )
}