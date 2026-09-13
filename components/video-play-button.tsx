import type { MouseEventHandler } from 'react'
import { cn } from '@/lib/utils'

type VideoPlayButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  label?: string
}

export function VideoPlayButton({
  onClick,
  className,
  label = 'Lancer la vidéo',
}: VideoPlayButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative z-20 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-none border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-none transition-colors duration-300 hover:border-[#f58220] hover:bg-[#f58220]',
        className,
      )}
      aria-label={label}
    >
      <svg className="h-8 w-8 sm:h-10 sm:w-10 fill-current" viewBox="0 0 24 24">
        <path d="M9 5v14l9-7z" />
      </svg>
    </button>
  )
}
