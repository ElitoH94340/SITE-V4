'use client'

import {
  TYPO_BLOCK_BODY_BOLD_CLASS,
  TYPO_BLOCK_BODY_CLASS,
  TYPO_SUBTITLE,
  TYPO_TITLE,
} from '@/lib/typography'
import { withBasePath } from '@/lib/paths'

const CONTACT_CARD_CLASS =
  'w-full min-w-0 bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] animate-text-sweep'

const CONTACT_CARD_DARK_CLASS =
  'w-full min-w-0 bg-black p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)] animate-text-sweep'

const CONTACT_LABEL_CLASS =
  `lowercase text-black ${TYPO_BLOCK_BODY_BOLD_CLASS}`

const CONTACT_FIELD_BOX_CLASS = 'w-full bg-[#f0f0eb]'

const CONTACT_INPUT_CLASS =
  `w-full min-w-0 border-0 bg-transparent px-3 py-2 text-[#f58220] focus:outline-none placeholder:text-black/25 ${TYPO_BLOCK_BODY_CLASS}`

const CONTACT_SUBMIT_BUTTON_CLASS =
  'mt-auto inline-block w-fit bg-black text-white font-bold tracking-[0.01em] uppercase pl-[3px] pr-[23px] py-px xl:pr-[43px] transition-colors duration-300 cursor-pointer hover:bg-[#f58220] hover:text-white'

const RECTANGLE_LIGHT_ON_DARK =
  'inline-block w-fit bg-black text-[#f0f0eb] font-bold tracking-[0.01em] pl-[3px] pr-[23px] py-px xl:pr-[43px]'

const RECTANGLE_DARK_ON_LIGHT =
  'inline-block w-fit bg-white text-black font-bold tracking-[0.01em] pl-[3px] pr-[23px] py-px xl:pr-[43px]'

function chipClass(tone: 'light' | 'dark') {
  return tone === 'dark' ? RECTANGLE_DARK_ON_LIGHT : RECTANGLE_LIGHT_ON_DARK
}

function ContactTitle({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-start gap-[5px] uppercase ${className}`}
      style={TYPO_TITLE}
    >
      <span className={RECTANGLE_LIGHT_ON_DARK}>Contact</span>
    </div>
  )
}

function DevisRenseignementsTitle({
  className = '',
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'dark'
}) {
  const chip = chipClass(tone)

  return (
    <div
      className={`flex flex-col items-start gap-[5px] uppercase ${className}`}
      style={TYPO_TITLE}
    >
      <span className={chip}>Devis</span>
      <span className={chip}>et&nbsp;Renseignements</span>
    </div>
  )
}

function ContactInfoLabel({
  children,
  tone = 'light',
}: {
  children: React.ReactNode
  tone?: 'light' | 'dark'
}) {
  return (
    <span className={`${chipClass(tone)} shrink-0`} style={TYPO_SUBTITLE}>
      {children}
    </span>
  )
}

function ContactInfoEntry({
  href,
  value,
  children,
}: {
  href: string
  value: string
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-[5px]">
      {children}
      <a
        href={href}
        className={`text-[#f58220] hover:opacity-80 transition-opacity break-all ${TYPO_BLOCK_BODY_CLASS}`}
      >
        {value}
      </a>
    </div>
  )
}

function ContactPersonBlock({
  tone,
  name,
  role,
  phone,
  phoneHref,
}: {
  tone: 'light' | 'dark'
  name: string
  role: string
  phone: string
  phoneHref: string
}) {
  return (
    <div className="flex min-w-0 flex-col items-start gap-[5px]">
      <ContactInfoLabel tone={tone}>{name}</ContactInfoLabel>
      <span className={`block ${TYPO_BLOCK_BODY_CLASS}`}>{role}</span>
      <a
        href={phoneHref}
        className={`text-[#f58220] hover:opacity-80 transition-opacity ${TYPO_BLOCK_BODY_CLASS}`}
      >
        {phone}
      </a>
    </div>
  )
}

function ContactField({
  label,
  id,
  type = 'text',
  multiline = false,
  rows = 4,
  grow = false,
  className = '',
}: {
  label: string
  id: string
  type?: string
  multiline?: boolean
  rows?: number
  grow?: boolean
  className?: string
}) {
  return (
    <label
      htmlFor={id}
      className={`group/field flex w-full flex-col items-start gap-[5px] ${grow ? 'min-h-0 flex-1' : ''}`}
    >
      <span className={CONTACT_LABEL_CLASS}>{label}</span>
      <div
        className={`${CONTACT_FIELD_BOX_CLASS} ${grow ? 'flex min-h-0 flex-1 flex-col' : ''}`}
      >
        {multiline ? (
          <textarea
            id={id}
            name={id}
            rows={rows}
            className={`${CONTACT_INPUT_CLASS} resize-none ${grow ? 'min-h-[88px] flex-1' : ''} ${className}`}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            className={`${CONTACT_INPUT_CLASS} ${className}`}
          />
        )}
      </div>
    </label>
  )
}

function ContactLogoCard() {
  return (
    <div className={CONTACT_CARD_DARK_CLASS} style={{ animationDelay: '280ms' }}>
      <div className="flex items-stretch gap-3 sm:gap-4">
        <img
          src={withBasePath('/logo-fond-transparent-3.svg')}
          alt="Logo Tournez Bobines"
          className="h-[64px] w-auto sm:h-[80px] shrink-0 self-start"
        />
        <div className="flex flex-col justify-between h-[64px] sm:h-[80px] font-bold tracking-[0.01em] lowercase leading-none py-[2px] min-w-0">
          <span className="text-white block" style={TYPO_SUBTITLE}>
            tournez
          </span>
          <span className="text-white block" style={TYPO_SUBTITLE}>
            bobines
          </span>
          <span className="text-[#f58220] block" style={TYPO_SUBTITLE}>
            association
          </span>
        </div>
      </div>
    </div>
  )
}

function ContactInfoCard({
  stacked = false,
  tone = 'light',
}: {
  stacked?: boolean
  tone?: 'light' | 'dark'
}) {
  const isDark = tone === 'dark'
  const cardClass = isDark ? 'w-full min-w-0 animate-text-sweep' : CONTACT_CARD_CLASS
  const textClass = isDark ? 'text-white' : 'text-black'

  return (
    <div
      className={`${cardClass} flex flex-col`}
      style={{ animationDelay: stacked ? '200ms' : '360ms' }}
    >
      {!stacked && <DevisRenseignementsTitle tone={tone} />}

      {stacked ? (
        <div className={`flex flex-col gap-5 sm:gap-5 xl:gap-6 ${textClass}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-5 xl:gap-6 items-start">
            <ContactPersonBlock
              tone={tone}
              name="Véronique ATTISSO"
              role="(contact pédagogique)"
              phone="06 13 64 72 59"
              phoneHref="tel:+33613647259"
            />
            <ContactPersonBlock
              tone={tone}
              name="Jean-Jacques PRON"
              role="(contact technique)"
              phone="06 82 83 10 34"
              phoneHref="tel:+33682831034"
            />
          </div>
          <ContactInfoEntry
            href="mailto:contact@doublagetournezbobines.fr"
            value="contact@doublagetournezbobines.fr"
          >
            <ContactInfoLabel tone={tone}>Email</ContactInfoLabel>
          </ContactInfoEntry>
        </div>
      ) : (
        <div className={`mt-6 sm:mt-6 xl:mt-8 ${textClass} space-y-6`}>
          <ContactPersonBlock
            tone={tone}
            name="Véronique ATTISSO"
            role="(contact pédagogique)"
            phone="06 13 64 72 59"
            phoneHref="tel:+33613647259"
          />

          <ContactPersonBlock
            tone={tone}
            name="Jean-Jacques PRON"
            role="(contact technique)"
            phone="06 82 83 10 34"
            phoneHref="tel:+33682831034"
          />

          <ContactInfoEntry
            href="mailto:contact@doublagetournezbobines.fr"
            value="contact@doublagetournezbobines.fr"
          >
            <ContactInfoLabel tone={tone}>Email</ContactInfoLabel>
          </ContactInfoEntry>
        </div>
      )}
    </div>
  )
}

function ContactForm({
  idPrefix,
  stacked = false,
}: {
  idPrefix: string
  stacked?: boolean
}) {
  return (
    <div
      className={CONTACT_CARD_CLASS}
      style={{ animationDelay: stacked ? '280ms' : '200ms' }}
    >
      <form
        className={`flex flex-col gap-5 sm:gap-5 xl:gap-6 ${
          stacked ? '' : 'lg:min-h-[420px] 2xl:min-h-0 2xl:h-full'
        }`}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-5 xl:gap-6">
          <ContactField label="nom" id={`${idPrefix}-name`} />
          <ContactField
            label="email"
            id={`${idPrefix}-email`}
            type="email"
          />
        </div>
        <ContactField
          label="entreprise / établissement"
          id={`${idPrefix}-org`}
        />
        <ContactField label="sujet" id={`${idPrefix}-subject`} />
        <ContactField
          label="message"
          id={`${idPrefix}-message`}
          multiline
          rows={4}
          grow
        />

        <button
          type="submit"
          className={`${CONTACT_SUBMIT_BUTTON_CLASS} ${stacked ? 'self-end' : ''}`}
          style={TYPO_TITLE}
        >
          envoyer
        </button>
      </form>
    </div>
  )
}

function ContactSectionDefault({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="w-full grid grid-cols-1 2xl:grid-cols-12 gap-8 items-start 2xl:pr-[100px]">
      <div
        className="hidden 2xl:block 2xl:col-span-4 2xl:sticky site-sticky-offset z-30 animate-text-sweep 2xl:pl-[45px] pointer-events-none self-start"
      >
        <ContactTitle />
      </div>

      <div className="2xl:col-span-8 w-full min-w-0">
        <ContactTitle className="2xl:hidden mb-8 sm:mb-10 animate-text-sweep" />

        <div className="grid grid-cols-1 gap-6 lg:gap-6 xl:gap-8 2xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] 2xl:items-stretch">
          <ContactForm idPrefix={idPrefix} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-6 xl:gap-8 2xl:flex 2xl:flex-col 2xl:gap-8">
            <ContactLogoCard />
            <ContactInfoCard />
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactSectionStacked({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
      <div
        className="lg:col-span-4 lg:sticky site-sticky-offset z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
      >
        <ContactTitle />
      </div>

      <div className="lg:col-span-8 w-full min-w-0 px-4 sm:px-6 lg:px-0 flex flex-col gap-6 sm:gap-8 lg:gap-6 xl:gap-10">
        <ContactForm idPrefix={idPrefix} stacked />
      </div>
    </div>
  )
}

function ContactDevisBlock() {
  return (
    <div className="relative w-full bg-black text-white mt-10 sm:mt-14 xl:mt-20 py-16 xl:py-24">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start lg:pr-[100px]">
        <div className="lg:col-span-8 lg:col-start-5 w-full min-w-0 px-4 sm:px-6 lg:px-0">
          <ContactInfoCard stacked tone="dark" />
        </div>
      </div>
    </div>
  )
}

export function ContactSection({
  idPrefix = 'contact',
  layout = 'default',
}: {
  idPrefix?: string
  layout?: 'default' | 'stacked'
}) {
  return (
    <section
      id="contact"
      data-header-surface="light"
      className={`relative bg-[#f0f0eb] text-neutral-950 scroll-mt-[120px] lg:scroll-mt-[90px] min-[1440px]:scroll-mt-[160px] ${
        layout === 'stacked'
          ? 'pt-16 xl:pt-24 pb-0 lg:px-0'
          : 'py-16 xl:py-24 px-4 sm:px-6 2xl:px-0'
      }`}
    >
      {layout === 'stacked' ? (
        <>
          <ContactSectionStacked idPrefix={idPrefix} />
          <ContactDevisBlock />
        </>
      ) : (
        <ContactSectionDefault idPrefix={idPrefix} />
      )}
    </section>
  )
}
