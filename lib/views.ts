export type ViewId =
  | 'home'
  | 'dubbingInfo'
  | 'dubbing'
  | 'formulas'
  | 'factory'
  | 'events'

export const NAV_ITEMS: {
  id: ViewId
  label: string
  href: string
}[] = [
  {
    id: 'dubbingInfo',
    label: "QU'EST-CE QUE LE DOUBLAGE ?",
    href: '/quest-ce-que-le-doublage',
  },
  {
    id: 'dubbing',
    label: 'DOUBLAGE POUR TOUS',
    href: '/doublage',
  },
  {
    id: 'factory',
    label: 'FABRIQUE À DOUBLAGE',
    href: '/fabrique',
  },
  {
    id: 'formulas',
    label: 'NOS OFFRES',
    href: '/formules',
  },
  {
    id: 'events',
    label: 'ÉVÉNEMENTS',
    href: '/evenements',
  },
]