import type { Metadata } from 'next'
import { AboutView } from '@/components/views/about-view'

export const metadata: Metadata = {
  title: 'Qui sommes-nous',
  description: 'Découvrez Tournez Bobines, notre équipe et notre approche du doublage.',
}

export default function QuiSommesNousPage() {
  return <AboutView />
}
