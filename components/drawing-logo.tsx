'use client'

import { useEffect, useId, useRef } from 'react'
import { LOGO_ORANGE_PATH } from '@/components/logo-orange-path'

type DrawingLogoProps = {
  className?: string
}

const DRAW_MS = 3800
const LOOP_MS = 10000

export function DrawingLogo({ className }: DrawingLogoProps) {
  const reactId = useId().replace(/:/g, '')
  const maskId = `logo-draw-mask-${reactId}`
  const svgRef = useRef<SVGSVGElement>(null)
  const maskPathRef = useRef<SVGPathElement>(null)
  const timersRef = useRef<number[]>([])
  const loopRef = useRef<number | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const maskPath = maskPathRef.current
    const svg = svgRef.current
    if (!maskPath || !svg) return

    const length = maskPath.getTotalLength()

    const clearTimers = () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
      timersRef.current = []
      if (loopRef.current !== null) {
        window.clearTimeout(loopRef.current)
        loopRef.current = null
      }
    }

    const prepare = () => {
      maskPath.style.transition = 'none'
      maskPath.style.strokeDasharray = `${length}`
      maskPath.style.strokeDashoffset = `${length}`
      void maskPath.getBoundingClientRect()
    }

    const play = () => {
      prepare()
      requestAnimationFrame(() => {
        maskPath.style.transition = `stroke-dashoffset ${DRAW_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
        maskPath.style.strokeDashoffset = '0'
      })

      loopRef.current = window.setTimeout(() => {
        play()
      }, LOOP_MS)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || startedRef.current) return
        startedRef.current = true
        play()
        observer.disconnect()
      },
      { threshold: 0.35 }
    )

    prepare()
    observer.observe(svg)

    return () => {
      observer.disconnect()
      clearTimers()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 263.61 565.8"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect width="263.61" height="565.8" fill="black" />
          <path
            ref={maskPathRef}
            d={LOGO_ORANGE_PATH}
            fill="none"
            stroke="white"
            strokeWidth="64"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </mask>
      </defs>
      <path
        d={LOGO_ORANGE_PATH}
        fill="#f58220"
        mask={`url(#${maskId})`}
      />
    </svg>
  )
}
