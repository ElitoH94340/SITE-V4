import type { Metadata } from 'next'
import { FactoryView } from '@/components/views/factory-view'

export const metadata: Metadata = {
  title: 'Fabrique à doublage',
  description:
    'Fabrique à doublage : modules pédagogiques et immersion dans le doublage avec Tournez Bobines.',
}

export default function FabriquePage() {
  return <FactoryView />
}
