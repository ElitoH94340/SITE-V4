export type FormulaId = 'immersion' | 'immersion-filmee' | 'captation'

export type FormulaStep = {
  num: string
  text?: string
  highlight?: string
}

export type Formula = {
  id: FormulaId
  title: string
  videoId: string
  summary: string
  steps: FormulaStep[]
}

export const FORMULAS: Formula[] = [
  {
    id: 'immersion',
    title: "L'Immersion",
    videoId: 'spMb_CFn0hQ',
    summary:
      'Devenez la voix d’un personnage en conditions réelles, guidé par une équipe professionnelle.',
    steps: [
      {
        num: '1',
        text: "Devenez la voix d'un comédien de doublage pendant l'extrait choisi. À partir d'une vidéo-projection avec bande rythmo synchrone, réalisez votre prestation.",
      },
      {
        num: '2',
        text: "Cette même image est diffusée simultanément sur un écran plasma d'entraînement. Accompagnement par une équipe expérimentée : un directeur artistique qui guide chaque prestation, un assistant technique et deux coordinatrices.",
      },
    ],
  },
  {
    id: 'immersion-filmee',
    title: "L'Immersion filmée",
    videoId: 'Kqx12yrOUPs',
    summary:
      'La même expérience d’immersion, enregistrée sur vidéo. Une clé USB est ensuite remise à l’organisateur.',
    steps: [
      {
        num: '1',
        text: "Devenez la voix d'un comédien de doublage pendant l'extrait choisi. À partir d'une vidéo-projection avec bande rythmo synchrone, réalisez votre prestation.",
      },
      {
        num: '2',
        text: "Cette même image est diffusée simultanément sur un écran plasma d'entraînement. Accompagnement par une équipe expérimentée : un directeur artistique qui guide chaque prestation, un assistant technique et deux coordinatrices.",
      },
      {
        num: '3',
        highlight: 'Votre prestation est enregistrée sur une vidéo.',
        text: "Une clé USB de toutes les prestations sera remise ultérieurement à l'organisateur de la manifestation.",
      },
    ],
  },
  {
    id: 'captation',
    title: 'La Captation',
    videoId: 'eB0vnr_s5cw',
    summary:
      'Deux caméras filment votre prestation. Repartez avec une clé USB personnelle, en médaillon à l’écran.',
    steps: [
      {
        num: '1',
        text: "Devenez la voix d'un comédien de doublage pendant l'extrait choisi. À partir d'une vidéo-projection avec bande rythmo synchrone, réalisez votre prestation.",
      },
      {
        num: '2',
        text: "Cette même image est diffusée simultanément sur un écran plasma d'entraînement. Accompagnement par une équipe expérimentée : un directeur artistique qui guide chaque prestation, un assistant technique et deux coordinatrices.",
      },
      {
        num: '3',
        highlight:
          'Votre prestation est captée et enregistrée sur une vidéo : deux caméras enregistrent image et son.',
      },
      {
        num: '4',
        text: "En fin de session, repartez avec une clé USB personnelle de votre prestation de doublage, en médaillon interprétant la scène à l'écran.",
      },
    ],
  },
]
