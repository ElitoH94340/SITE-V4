'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react'
import { DrawingLogo } from '@/components/drawing-logo'
import { withBasePath } from '@/lib/paths'

const teamRoles = [
  {
    id: 'adaptateur',
    titleLines: ['Traduction', '& Adaptation'],
    summary:
      'Un auteur-adaptateur de doublage, bilingue en anglais et expert.',
  },
  {
    id: 'direction',
    titleLines: ['Direction', '& pédagogie'],
    summary:
      'Une professeure des écoles, ancienne directrice de salles de cinémas.',
  },
  {
    id: 'technique',
    titleLines: ['Technique', '& langage'],
    summary:
      'Une ingénieure d’études, professeure de français langue étrangère à l’université.',
  },
]

export function HomeView() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isMuted, setIsMuted] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isNearBottom, setIsNearBottom] = useState(false)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const handleScrollButtonClick = () => {
    if (!isAtTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      const el = document.getElementById('contenu')

      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
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

        if (!currentIsAtTop) {
          setHasScrolled(true)
        }
      }

      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const distanceFromBottom = documentHeight - scrollPosition

      setIsNearBottom(distanceFromBottom <= 180)
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    window.addEventListener('resize', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="relative w-full bg-black text-neutral-100 selection:bg-neutral-100 selection:text-black select-none">
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-delay {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

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

      {/* HERO */}
      <section className="relative w-full h-[100svh] z-0 flex flex-col bg-black pt-[90px] lg:pt-[150px] overflow-hidden">
        <div className="relative w-full flex-1 min-h-0 bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src={withBasePath('/TB_VIDEO_PRESENTATION.mp4')}
              type="video/mp4"
            />
          </video>
        </div>

        {/* BOUTON SON */}
        <div className="absolute top-[100px] right-6 z-50 lg:top-[155px] lg:right-10">
          <button
            onClick={toggleMute}
            className="flex items-center justify-center rounded-none border-0 bg-transparent p-0 text-[#f58220] transition-opacity duration-300 hover:opacity-80 cursor-pointer animate-fade-in-delay"
            aria-label={isMuted ? 'Activer le son' : 'Coupure son'}
            style={{ animationDelay: '0.4s' }}
          >
            {isMuted ? (
              <VolumeX className="size-10 sm:size-12" strokeWidth={2} />
            ) : (
              <Volume2 className="size-10 sm:size-12" strokeWidth={2} />
            )}
          </button>
        </div>

        {/* BOUTON SCROLL INITIAL */}
        {isAtTop && (
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-fade-in-delay"
            style={{
              animationDelay: hasScrolled ? '0s' : '0.8s',
            }}
          >
            <button
              onClick={handleScrollButtonClick}
              className="group flex items-center justify-center text-[#f58220] cursor-pointer"
              aria-label="Descendre au contenu"
            >
              <ChevronDown
                className="size-[60px] sm:size-[70px] transition-transform duration-300 group-hover:translate-y-2 group-active:translate-y-3"
                strokeWidth={3}
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </button>
          </div>
        )}
      </section>

      {/* BOUTON SCROLL FLOTTANT HAUT */}
      {!isAtTop && !isNearBottom && (
        <div className="fixed top-[100px] left-1/2 -translate-x-1/2 z-50 pointer-events-auto animate-fade-in-delay lg:top-[150px]">
          <button
            onClick={handleScrollButtonClick}
            className="group flex items-center justify-center bg-transparent text-[#f58220] cursor-pointer transition-all duration-300"
            aria-label="Remonter en haut"
          >
            <ChevronUp
              className="size-[60px] sm:size-[70px] transition-transform duration-300 group-hover:-translate-y-1"
              strokeWidth={3}
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </button>
        </div>
      )}

      {/* CONTENU */}
      <div
        id="contenu"
        className="relative z-30 scroll-mt-[80px] bg-black shadow-[0_-25px_50px_rgba(0,0,0,1)] lg:scroll-mt-[130px]"
      >
        {/* SECTION EXPÉRIENCE */}
        <section className="relative w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-0 bg-[#f0f0eb] border-b border-neutral-300">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
            <div
              className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
              style={{ top: '180px' }}
            >
              <h2
                id="experience-title"
                className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase"
              >
                <span className="inline-block w-fit bg-black text-[#f0f0eb] pl-[3px] pr-[43px] py-px">Vivez une</span>
                <span className="inline-block w-fit bg-black text-[#f0f0eb] pl-[3px] pr-[43px] py-px">expérience</span>
                <span className="inline-block w-fit bg-black text-[#f0f0eb] pl-[3px] pr-[43px] py-px">inoubliable.</span>
              </h2>
            </div>

            <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col">
              <div
                className="relative w-full animate-text-sweep"
                style={{ animationDelay: '200ms' }}
              >
                <div className="relative w-full aspect-video overflow-hidden bg-black">
                  <img
                    src={withBasePath('/doublage-1.png')}
                    alt="Vivez une expérience inoubliable"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              <div
                className="mt-10 sm:mt-12 relative w-full animate-text-sweep"
                style={{ animationDelay: '400ms' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 w-full items-start">
                  <p
                    className="text-black font-bold tracking-[0.01em] min-w-0"
                    style={{
                      fontSize: 'clamp(19.5px, 1.76vw, 28.5px)',
                      lineHeight: 1.3,
                    }}
                  >
                    <span className="block">Plongez dans l’univers passionnant</span>
                    <span className="block">du cinéma. Imaginez-vous dans la</span>
                    <span className="block">peau des comédiens à l’image, face</span>
                    <span className="block">à la projection d’extraits de films</span>
                    <span className="block">
                      cultes avec les textes sur bande rythmo{' '}
                      <span className="inline-block w-fit bg-[#f58220] text-[#f0f0eb] font-bold tracking-[0.01em] px-[3px] py-px">
                        synchrone.
                      </span>
                    </span>
                  </p>

                  <p
                    className="text-black font-bold tracking-[0.01em] min-w-0"
                    style={{
                      fontSize: 'clamp(19.5px, 1.76vw, 28.5px)',
                      lineHeight: 1.3,
                    }}
                  >
                    <span className="block">Les dialogues défilent sous l’image.</span>
                    <span className="block">Vous choisissez un personnage.</span>
                    <span className="block">
                      Vous le{' '}
                      <span className="inline-block w-fit bg-[#f58220] text-[#f0f0eb] font-bold tracking-[0.01em] px-[3px] py-px">
                        «{'\u00A0'}doublez{'\u00A0'}!{'\u00A0'}»
                      </span>
                    </span>
                    <span className="block">Seul prérequis{'\u00A0'}: être lecteur.</span>
                    <span className="block">Toute l’équipe de Tournez Bobines</span>
                    <span className="block">est là pour vous accompagner</span>
                    <span className="block">à la barre de doublage.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION ÉQUIPE */}
        <section className="relative bg-[#050505] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-0 border-b border-white/10 overflow-visible">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
            <div
              className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
              style={{ top: '180px' }}
            >
              <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
                <span className="inline-block w-fit bg-[#f58220] text-black pl-[3px] pr-[43px] py-px">Qui</span>
                <span className="inline-block w-fit bg-[#f58220] text-black pl-[3px] pr-[43px] py-px">sommes</span>
                <span className="inline-block w-fit bg-[#f58220] text-black pl-[3px] pr-[43px] py-px">nous{'\u00A0'}?</span>
              </div>
            </div>

            <div className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col overflow-visible">
              <div
                className="relative w-full animate-text-sweep overflow-visible py-8 sm:py-12 lg:py-16"
                style={{ animationDelay: '200ms' }}
              >
                <div className="relative w-full flex items-center justify-center min-h-[360px] sm:min-h-[440px] lg:min-h-[520px]">
                  {/* Photo centrée — un peu plus large pour passer sous le logo */}
                  <div className="relative z-10 w-[72%] sm:w-[68%] lg:w-[64%] aspect-[4/3] overflow-hidden bg-black rotate-[1.5deg]">
                    <img
                      src={withBasePath("/Mâcon 2019 L'équipe.JPG")}
                      alt="Qui sommes nous"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>

                  {/* Citation — gauche */}
                  <div className="absolute left-0 top-[4%] sm:top-[8%] z-20 pointer-events-none w-[34%] sm:w-[30%] lg:w-[28%] -rotate-2">
                    <div
                      className="font-bold tracking-tight text-[#f58220] flex flex-col items-start"
                      style={{
                        fontSize: 'clamp(18px, 2.4vw, 36px)',
                        lineHeight: 1.12,
                      }}
                    >
                      <span>À l&apos;origine</span>
                      <span>trois ami.e.s</span>
                      <span>passionné.e.s</span>
                      <span>de cinéma,</span>
                      <span>aux compétences</span>
                      <span>complémentaires.</span>
                    </div>
                  </div>

                  {/* Logo — droite, partiellement sur la photo (−30%) */}
                  <div className="absolute right-[2%] sm:right-[4%] bottom-[2%] sm:bottom-[6%] z-20 pointer-events-none w-[24%] sm:w-[21%] lg:w-[20%] max-w-[210px] rotate-[7deg]">
                    <DrawingLogo className="w-full h-auto" />
                  </div>
                </div>
              </div>

              <div
                className="mt-10 sm:mt-14 lg:mt-16 relative w-full max-w-[92%] mx-auto animate-text-sweep cursor-default pointer-events-none"
                style={{ animationDelay: '400ms' }}
              >
                <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3 md:gap-14 lg:gap-16 w-full">
                  {teamRoles.map((role) => (
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
                            className="inline-block w-fit bg-[#f58220] text-black font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px"
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
                        {role.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section className="relative bg-[#f0f0eb] text-neutral-950 py-16 lg:py-24 px-4 sm:px-6 lg:px-0">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
            <div
              className="lg:col-span-3 xl:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
              style={{ top: '180px' }}
            >
              <div className="text-[18px] sm:text-[24px] lg:text-[32px] font-bold tracking-[0.01em] leading-[1.1] flex flex-col items-start gap-[5px] uppercase">
                <span className="inline-block w-fit bg-black text-[#f0f0eb] pl-[3px] pr-[43px] py-px">Contact</span>
              </div>
            </div>

            <div className="lg:col-span-9 xl:col-span-8 w-full px-4 sm:px-6 lg:px-0">
              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto] gap-6 lg:gap-8 items-stretch">
                <div
                  className="w-full min-w-0 h-full bg-black p-6 sm:p-8 animate-text-sweep"
                  style={{ animationDelay: '200ms' }}
                >
                  <form className="flex flex-col gap-3 h-full" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Nom"
                        className="w-full min-w-0 border border-white/20 px-3 py-2.5 text-sm focus:outline-none focus:border-[#f58220] transition-colors placeholder:text-neutral-500 text-white bg-neutral-950"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full min-w-0 border border-white/20 px-3 py-2.5 text-sm focus:outline-none focus:border-[#f58220] transition-colors placeholder:text-neutral-500 text-white bg-neutral-950"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Entreprise / établissement"
                      className="w-full min-w-0 border border-white/20 px-3 py-2.5 text-sm focus:outline-none focus:border-[#f58220] transition-colors placeholder:text-neutral-500 text-white bg-neutral-950"
                    />
                    <input
                      type="text"
                      placeholder="Sujet"
                      className="w-full min-w-0 border border-white/20 px-3 py-2.5 text-sm focus:outline-none focus:border-[#f58220] transition-colors placeholder:text-neutral-500 text-white bg-neutral-950"
                    />
                    <textarea
                      placeholder="Message"
                      rows={4}
                      className="w-full min-w-0 border border-white/20 px-3 py-2.5 text-sm focus:outline-none focus:border-[#f58220] transition-colors placeholder:text-neutral-500 text-white bg-neutral-950 resize-none"
                    ></textarea>

                    <button
                      type="submit"
                      className="w-full bg-white text-black py-3 mt-auto text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#f58220] hover:text-black transition-colors duration-300 cursor-pointer"
                    >
                      Envoyer
                    </button>
                  </form>
                </div>

                <div
                  className="w-full xl:w-fit xl:max-w-md h-full bg-black p-6 sm:p-8 animate-text-sweep flex flex-col justify-between gap-8"
                  style={{ animationDelay: '200ms' }}
                >
                  <div>
                    <div className="mb-8 w-full flex items-stretch gap-3 sm:gap-4">
                      <img
                        src={withBasePath('/logo-fond-transparent-3.svg')}
                        alt="Logo Tournez Bobines"
                        className="h-[64px] w-auto sm:h-[80px] shrink-0 self-start"
                      />
                      <div className="flex flex-col justify-between h-[64px] sm:h-[80px] font-bold tracking-[0.01em] lowercase leading-none py-[2px] min-w-0">
                        <span
                          className="text-white block"
                          style={{ fontSize: 'clamp(18px, 1.5vw, 26px)' }}
                        >
                          tournez
                        </span>
                        <span
                          className="text-white block"
                          style={{ fontSize: 'clamp(18px, 1.5vw, 26px)' }}
                        >
                          bobines
                        </span>
                        <span
                          className="text-[#f58220] block"
                          style={{ fontSize: 'clamp(18px, 1.5vw, 26px)' }}
                        >
                          association
                        </span>
                      </div>
                    </div>

                    <h3
                      className="font-bold tracking-[0.01em] text-white leading-[1.15]"
                      style={{
                        fontSize: 'clamp(16px, 1.4vw, 26px)',
                      }}
                    >
                      Devis
                      <br />
                      &amp; Renseignements
                    </h3>
                  </div>

                  <div
                    className="font-bold tracking-[0.01em] text-white space-y-6"
                    style={{
                      fontSize: 'clamp(13px, 1.05vw, 17px)',
                      lineHeight: 1.25,
                    }}
                  >
                    <div>
                      <p>Jean-Jacques PRON</p>
                      <a
                        href="tel:+33682831034"
                        className="inline-block mt-1 text-[#f58220] hover:opacity-80 transition-opacity"
                      >
                        06 82 83 10 34
                      </a>
                    </div>

                    <div>
                      <p>Véronique ATTISSO</p>
                      <p className="mt-1 text-white/70">(Contact pédagogique)</p>
                      <a
                        href="tel:+33613647259"
                        className="inline-block mt-1 text-[#f58220] hover:opacity-80 transition-opacity"
                      >
                        06 13 64 72 59
                      </a>
                    </div>

                    <div>
                      <p>Email</p>
                      <a
                        href="mailto:contact@doublagetournezbobines.fr"
                        className="inline-block mt-1 text-[#f58220] hover:opacity-80 transition-opacity break-all"
                      >
                        contact@doublagetournezbobines.fr
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}