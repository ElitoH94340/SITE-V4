import Image from 'next/image'
import { withBasePath } from '@/lib/paths'

const partners = [
  { name: 'Partenaire 1', src: '/logos-01.svg' },
  { name: 'Partenaire 2', src: '/logos-02.svg' },
  { name: 'Partenaire 3', src: '/logos-03.svg' },
  { name: 'Partenaire 4', src: '/logos-04.svg' },
  { name: 'Partenaire 5', src: '/logos-05.svg' },
  { name: 'Partenaire 6', src: '/logos-06.svg' },
]

export function SiteFooter() {
  return (
    <footer className="bg-black py-2 sm:py-2.5 min-[1440px]:py-3 px-4 sm:px-6 lg:px-8 min-[1440px]:px-12 border-t border-neutral-900">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-3 sm:gap-x-5 sm:gap-y-4 min-[1440px]:gap-x-8 items-center">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex h-[clamp(4rem,10vw,4.5rem)] min-[1440px]:h-[clamp(5rem,12vw,6rem)] w-full items-center justify-center"
          >
            <Image
              src={withBasePath(partner.src)}
              alt={partner.name}
              width={220}
              height={96}
              className="h-full w-full object-contain"
              quality={100}
              unoptimized={partner.src.endsWith('.svg')}
            />
          </div>
        ))}
      </div>
    </footer>
  )
}
