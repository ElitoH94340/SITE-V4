'use client'

import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/views'
import { withBasePath } from '@/lib/paths'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function getHeaderSurface(): 'light' | 'dark' {
  const header = document.querySelector('.site-header')
  const height = header?.getBoundingClientRect().height ?? 90
  const x = Math.round(window.innerWidth / 2)
  const y = Math.round(Math.min(height - 2, window.innerHeight - 1))

  const stack = document.elementsFromPoint(x, y)
  const surfaceEl = stack
    .map((el) => el.closest('[data-header-surface]'))
    .find((el) => el && !el.closest('.site-header'))

  const surface = surfaceEl?.getAttribute('data-header-surface')
  return surface === 'light' ? 'light' : 'dark'
}

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [onDarkSurface, setOnDarkSurface] = useState(false)

  const updateHeaderSurface = useCallback(() => {
    setOnDarkSurface(getHeaderSurface() === 'dark')
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    updateHeaderSurface()

    window.addEventListener('scroll', updateHeaderSurface, { passive: true })
    window.addEventListener('resize', updateHeaderSurface)

    const observer = new MutationObserver(updateHeaderSurface)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-header-surface', 'class'],
    })

    return () => {
      window.removeEventListener('scroll', updateHeaderSurface)
      window.removeEventListener('resize', updateHeaderSurface)
      observer.disconnect()
    }
  }, [pathname, updateHeaderSurface])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header
      className={cn('site-header', onDarkSurface && 'is-on-dark')}
    >
      <div className="site-header-bar">
        <div className="site-header-desktop-group">
          <Link
            href="/"
            aria-label="Retour à l'accueil"
            className="site-header-brand"
            onClick={() => setMenuOpen(false)}
          >
            <span className="site-header-logo">
              <img
                src={withBasePath('/logo-fond-transparent-7.svg')}
                alt="Logo Tournez Bobines"
              />
            </span>

            <span className="site-header-title" aria-hidden="true">
              <span>tournez</span>
              <span>bobines</span>
              <span className="site-header-title-association">association</span>
            </span>
          </Link>

          <nav
            aria-label="Navigation principale"
            className="site-nav-desktop"
          >
            <ul>
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname === `${item.href}/`

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'site-nav-link',
                        isActive && 'is-active'
                      )}
                    >
                      <span className="site-nav-link-label">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <button
          type="button"
          className="site-nav-burger"
          aria-label={
            menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={cn(
              'site-nav-burger-icon',
              menuOpen && 'is-open'
            )}
          >
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Navigation mobile"
        className={cn(
          'site-nav-mobile',
          menuOpen && 'is-open'
        )}
        aria-hidden={!menuOpen}
        inert={!menuOpen || undefined}
      >
        <ul>
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname === `${item.href}/`

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'site-nav-link',
                    isActive && 'is-active'
                  )}
                >
                  <span className="site-nav-link-label">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
