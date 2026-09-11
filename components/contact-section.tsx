'use client'

import { TYPO_BODY, TYPO_SUBTITLE, TYPO_TITLE } from '@/lib/typography'
import { withBasePath } from '@/lib/paths'

const CONTACT_CARD_CLASS =
  'w-full min-w-0 bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] animate-text-sweep'

const CONTACT_CARD_DARK_CLASS =
  'w-full min-w-0 bg-black p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)] animate-text-sweep'

const CONTACT_LABEL_CLASS =
  'font-bold tracking-[0.01em] lowercase text-black'

const CONTACT_FIELD_BOX_CLASS = 'w-full bg-[#f0f0eb]'

const CONTACT_INPUT_CLASS =
  'w-full min-w-0 border-0 bg-transparent px-3 py-2 font-bold tracking-[0.01em] text-[#f58220] focus:outline-none placeholder:text-black/25 placeholder:font-normal'

const CONTACT_SUBMIT_BUTTON_CLASS =
  'mt-auto inline-block w-fit bg-black text-white font-bold tracking-[0.01em] uppercase pl-[3px] pr-[43px] py-px transition-colors duration-300 cursor-pointer hover:bg-[#f58220] hover:text-white'

const RECTANGLE_LIGHT_ON_DARK =
  'inline-block w-fit bg-black text-[#f0f0eb] font-bold tracking-[0.01em] pl-[3px] pr-[43px] py-px'

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

function DevisRenseignementsTitle({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-start gap-[5px] uppercase ${className}`}
      style={TYPO_TITLE}
    >
      <span className={RECTANGLE_LIGHT_ON_DARK}>Devis</span>
      <span className={RECTANGLE_LIGHT_ON_DARK}>&amp;&nbsp;Renseignements</span>
    </div>
  )
}

function ContactInfoLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className={`${RECTANGLE_LIGHT_ON_DARK} shrink-0`} style={TYPO_SUBTITLE}>
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
      <div className="flex flex-wrap items-center gap-x-2 gap-y-[5px]">
        {children}
      </div>
      <a
        href={href}
        className="font-bold tracking-[0.01em] text-[#f58220] hover:opacity-80 transition-opacity break-all"
        style={TYPO_BODY}
      >
        {value}
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
      <span className={CONTACT_LABEL_CLASS} style={TYPO_SUBTITLE}>
        {label}
      </span>
      <div
        className={`${CONTACT_FIELD_BOX_CLASS} ${grow ? 'flex min-h-0 flex-1 flex-col' : ''}`}
      >
        {multiline ? (
          <textarea
            id={id}
            name={id}
            rows={rows}
            className={`${CONTACT_INPUT_CLASS} resize-none ${grow ? 'min-h-[88px] flex-1' : ''} ${className}`}
            style={TYPO_BODY}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            className={`${CONTACT_INPUT_CLASS} ${className}`}
            style={TYPO_BODY}
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

function ContactInfoCard({ stacked = false }: { stacked?: boolean }) {
  return (
    <div
      className={`${CONTACT_CARD_CLASS} flex flex-col`}
      style={{ animationDelay: stacked ? '200ms' : '360ms' }}
    >
      {!stacked && <DevisRenseignementsTitle />}

      {stacked ? (
        <div className="flex flex-col gap-5 sm:gap-6 font-bold tracking-[0.01em] text-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-start">
            <div className="flex min-w-0 flex-col items-start gap-[5px]">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-[5px]">
                <ContactInfoLabel>Véronique ATTISSO</ContactInfoLabel>
                <span style={TYPO_SUBTITLE}>(contact pédagogique)</span>
              </div>
              <a
                href="tel:+33613647259"
                className="text-[#f58220] hover:opacity-80 transition-opacity"
                style={TYPO_BODY}
              >
                06 13 64 72 59
              </a>
            </div>
            <div className="flex min-w-0 flex-col items-start gap-[5px]">
              <ContactInfoLabel>Jean-Jacques PRON</ContactInfoLabel>
              <a
                href="tel:+33682831034"
                className="text-[#f58220] hover:opacity-80 transition-opacity"
                style={TYPO_BODY}
              >
                06 82 83 10 34
              </a>
            </div>
          </div>
          <ContactInfoEntry
            href="mailto:contact@doublagetournezbobines.fr"
            value="contact@doublagetournezbobines.fr"
          >
            <ContactInfoLabel>Email</ContactInfoLabel>
          </ContactInfoEntry>
        </div>
      ) : (
        <div className="mt-6 sm:mt-8 font-bold tracking-[0.01em] text-black space-y-6">
          <ContactInfoEntry href="tel:+33613647259" value="06 13 64 72 59">
            <ContactInfoLabel>Véronique ATTISSO</ContactInfoLabel>
            <span style={TYPO_SUBTITLE}>(contact pédagogique)</span>
          </ContactInfoEntry>

          <ContactInfoEntry href="tel:+33682831034" value="06 82 83 10 34">
            <ContactInfoLabel>Jean-Jacques PRON</ContactInfoLabel>
          </ContactInfoEntry>

          <ContactInfoEntry
            href="mailto:contact@doublagetournezbobines.fr"
            value="contact@doublagetournezbobines.fr"
          >
            <ContactInfoLabel>Email</ContactInfoLabel>
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
        className={`flex flex-col gap-5 sm:gap-6 ${
          stacked ? '' : 'lg:min-h-[420px] 2xl:min-h-0 2xl:h-full'
        }`}
        onSubmit={(e) => e.preventDefault()}
      >
        {stacked && (
          <DevisRenseignementsTitle className="mb-1 sm:mb-2" />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
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
        className="hidden 2xl:block 2xl:col-span-4 2xl:sticky z-30 animate-text-sweep 2xl:pl-[45px] pointer-events-none self-start"
        style={{ top: '180px' }}
      >
        <ContactTitle />
      </div>

      <div className="2xl:col-span-8 w-full min-w-0">
        <ContactTitle className="2xl:hidden mb-8 sm:mb-10 animate-text-sweep" />

        <div className="grid grid-cols-1 gap-6 lg:gap-8 2xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] 2xl:items-stretch">
          <ContactForm idPrefix={idPrefix} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 2xl:flex 2xl:flex-col 2xl:gap-8">
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
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:pr-[100px]">
      <div
        className="lg:col-span-4 lg:sticky z-30 animate-text-sweep lg:pl-[45px] pointer-events-none self-start"
        style={{ top: '180px' }}
      >
        <ContactTitle />
      </div>

      <div className="lg:col-span-8 w-full min-w-0 px-4 sm:px-6 lg:px-0 flex flex-col gap-6 sm:gap-8 lg:gap-10">
        <ContactInfoCard stacked />
        <ContactForm idPrefix={idPrefix} stacked />
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
      className={`relative bg-[#f0f0eb] text-neutral-950 py-16 lg:py-24 px-4 sm:px-6 ${
        layout === 'stacked' ? 'lg:px-0' : '2xl:px-0'
      }`}
    >
      {layout === 'stacked' ? (
        <ContactSectionStacked idPrefix={idPrefix} />
      ) : (
        <ContactSectionDefault idPrefix={idPrefix} />
      )}
    </section>
  )
}
