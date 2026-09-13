'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'

export const RECTANGLE_THEMES = {
  lightOnDark:
    'inline-block w-fit whitespace-nowrap bg-black text-white font-bold tracking-[0.01em] pl-[3px] pr-[23px] py-px xl:pr-[43px]',
  white:
    'inline-block w-fit whitespace-nowrap bg-white text-black font-bold tracking-[0.01em] pl-[3px] pr-[23px] py-px xl:pr-[43px]',
  orange:
    'inline-block w-fit whitespace-nowrap bg-[#f58220] text-black font-bold tracking-[0.01em] pl-[3px] pr-[23px] py-px xl:pr-[43px]',
  plainWhite:
    'inline-block w-fit whitespace-nowrap text-white font-bold tracking-[0.01em]',
  plainWhiteBody:
    'inline-block w-fit whitespace-nowrap text-white font-normal tracking-[0.01em]',
  plainWhiteWrap:
    'block w-full max-w-full whitespace-normal break-words text-white font-bold tracking-[0.01em]',
  plainBlack:
    'inline-block w-fit whitespace-nowrap text-black font-bold tracking-[0.01em]',
  plainBlackWrap:
    'block w-full max-w-full whitespace-normal break-words text-black font-bold tracking-[0.01em]',
  plainOrange:
    'inline-block w-fit whitespace-nowrap text-[#f58220] font-bold tracking-[0.01em]',
} as const

export const ORIGIN_RECTANGLE_STYLE: CSSProperties = {
  fontSize: 'clamp(22px, 3.25vw, 50px)',
  lineHeight: 1.08,
}

function wrapRectangleLine(
  text: string,
  maxWidth: number,
  measure: (value: string) => number,
): string[] {
  if (maxWidth <= 0) return [text]

  const words = text.split(/ +/).filter(Boolean)
  if (words.length === 0) return ['']

  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (measure(candidate) <= maxWidth) {
      current = candidate
    } else {
      if (current) lines.push(current)
      current = word
    }
  }

  if (current) lines.push(current)
  return lines.length > 0 ? lines : [text]
}

export function RectangleLines({
  lines,
  theme,
  className = '',
  lineClassName = '',
  lineGapClass = 'gap-[5px]',
  style,
  disableWrap = false,
}: {
  lines: readonly string[]
  theme: keyof typeof RECTANGLE_THEMES
  className?: string
  lineClassName?: string
  lineGapClass?: string
  style?: CSSProperties
  disableWrap?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measurerRef = useRef<HTMLSpanElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const updateWidth = () => {
      setContainerWidth(element.getBoundingClientRect().width)
    }

    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const measureRectangle = useCallback((value: string) => {
    const measurer = measurerRef.current
    if (!measurer) return value.length * 10
    measurer.textContent = value
    return measurer.getBoundingClientRect().width
  }, [])

  const wrappedLines = useMemo(
    () =>
      disableWrap
        ? [...lines]
        : lines.flatMap((line) =>
            wrapRectangleLine(line, containerWidth, measureRectangle),
          ),
    [lines, containerWidth, measureRectangle, disableWrap],
  )

  return (
    <div ref={containerRef} className={className}>
      <span
        ref={measurerRef}
        aria-hidden
        className={`pointer-events-none fixed -left-[9999px] top-0 ${RECTANGLE_THEMES[theme]} ${lineClassName}`}
        style={style}
      />
      <div className={`flex flex-col items-start ${lineGapClass}`}>
        {wrappedLines.map((line, index) => (
          <span
            key={`${line}-${index}`}
            className={`${RECTANGLE_THEMES[theme]} ${lineClassName}`}
            style={style}
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  )
}
