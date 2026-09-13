import Link from 'next/link'

import {
  TYPO_BLOCK_BODY_CLASS,
  TYPO_TITLE,
  TYPO_TITLE_CLASS,
} from '@/lib/typography'

const TONES = {
  light: {
    section: 'bg-white text-neutral-950 border-b border-neutral-300',
    titleChip: 'bg-black text-white',
    body: 'text-black',
    button: 'bg-black text-white hover:bg-[#f58220] hover:text-white',
  },
  dark: {
    section: 'bg-black text-white border-b border-white/10',
    titleChip: 'bg-white text-black',
    body: 'text-white',
    button: 'bg-white text-black hover:bg-[#f58220] hover:text-white',
  },
} as const

export function ContactCtaSection({
  tone = 'light',
  layout = 'default',
}: {
  tone?: keyof typeof TONES
  layout?: 'default' | 'singleLine'
}) {
  const theme = TONES[tone]
  const contactLabel = (
    <span
      className={`inline-block w-fit shrink-0 font-bold tracking-[0.01em] pl-[3px] pr-[23px] py-px xl:pr-[43px] ${theme.titleChip}`}
    >
      Contact
    </span>
  )
  const contactText = (
    <p
      lang="fr"
      className={`max-w-xl text-pretty [hyphens:auto] lg:max-w-none lg:whitespace-nowrap ${theme.body} ${TYPO_BLOCK_BODY_CLASS}`}
    >
      Pour obtenir plus d&apos;informations, écrivez-nous ou téléphonez-nous.
    </p>
  )
  const contactButton = (
    <Link
      href="/#contact"
      className={`${TYPO_TITLE_CLASS} inline-block w-fit shrink-0 pl-[3px] pr-[23px] py-px xl:pr-[43px] no-underline transition-colors duration-300 cursor-pointer uppercase ${theme.button}`}
      style={TYPO_TITLE}
    >
      Devis &amp;&nbsp;renseignements
    </Link>
  )

  if (layout === 'singleLine') {
    return (
      <section
        data-header-surface={tone === 'light' ? 'light' : 'dark'}
        className={`relative py-16 xl:py-24 px-4 sm:px-6 lg:px-0 ${theme.section}`}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
          <div className="lg:col-span-4 animate-text-sweep lg:pl-[45px] pointer-events-none self-start">
            <div
              className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px] uppercase`}
              style={TYPO_TITLE}
            >
              {contactLabel}
            </div>
          </div>

          <div
            className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col items-start text-left gap-3 sm:gap-4 animate-text-sweep"
            style={{ animationDelay: '200ms' }}
          >
            {contactText}
            {contactButton}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      data-header-surface={tone === 'light' ? 'light' : 'dark'}
      className={`relative py-16 xl:py-24 px-4 sm:px-6 lg:px-0 ${theme.section}`}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
        <div
          className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
        >
          <div
            className={`${TYPO_TITLE_CLASS} flex flex-col items-start gap-[5px] uppercase`}
            style={TYPO_TITLE}
          >
            {contactLabel}
          </div>
        </div>

        <div
          className="lg:col-span-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col items-start text-left gap-3 sm:gap-4 animate-text-sweep"
          style={{ animationDelay: '200ms' }}
        >
          {contactText}

          {contactButton}
        </div>
      </div>
    </section>
  )
}
