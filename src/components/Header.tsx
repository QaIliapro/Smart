'use client'

import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Главная' },
    { href: '/service', label: 'Сервис' },
    { href: '/trade-in', label: 'Trade-in' },
    { href: '/new', label: 'Новое' },
    { href: '/contact', label: 'Контакты' },
  ]

  return (
    <>
      <header style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-nav-bg)', opacity: 0.95 }}
        className="sticky top-0 z-50 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-primary)' }}>
            :smart
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = pathname === link.href
              return (
                <Link key={link.href} href={link.href}
                  className="text-sm font-medium transition-colors relative pb-0.5"
                  style={{
                    color: isActive ? 'var(--color-nav-active)' : 'var(--color-nav-text)',
                    borderBottom: isActive ? '2px solid var(--color-nav-active)' : '2px solid transparent',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'var(--color-bg-section)', color: 'var(--color-text-primary)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'var(--color-bg-section)', color: 'var(--color-text-primary)' }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center font-bold"
                  style={{ background: 'var(--color-primary)', fontSize: '10px' }}
                >
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden w-9 h-9 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: 'var(--color-text-primary)' }}
            >
              {menuOpen ? (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 top-16" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} />
          <div className="relative w-72 h-full ml-auto p-6 flex flex-col gap-4"
            style={{ background: 'var(--color-nav-bg)', borderLeft: '1px solid var(--color-border)' }}
            onClick={e => e.stopPropagation()}
          >
            {navLinks.map(link => {
              const isActive = pathname === link.href
              return (
                <Link key={link.href} href={link.href}
                  className="text-lg font-medium py-2 border-b"
                  style={{
                    color: isActive ? 'var(--color-nav-active)' : 'var(--color-nav-text)',
                    borderColor: 'var(--color-border)',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
