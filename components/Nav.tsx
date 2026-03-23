'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'אודות', href: '#about' },
  { label: 'טיפולים', href: '#services' },
  { label: 'עדויות', href: '#testimonials' },
  { label: 'שאלות', href: '#faq' },
  { label: 'צרי קשר', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      // Nav logo fades in as hero logo finishes its journey (~45% of viewport)
      setLogoVisible(window.scrollY > window.innerHeight * 0.43)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
      role="navigation"
      aria-label="ניווט ראשי"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo — hidden while hero logo is visible, fades in after hero logo travels here */}
        <a
          href="#"
          className="flex flex-col items-end group transition-opacity duration-500"
          style={{ opacity: logoVisible ? 1 : 0, pointerEvents: logoVisible ? 'auto' : 'none' }}
          aria-label="נטלי — המרחב לריפוי, חזרה לדף הבית"
        >
          <span
            className="font-frank text-xl font-bold tracking-wide"
            style={{ color: 'var(--sage)' }}
          >
            נטלי
          </span>
          <span
            className="text-xs font-light tracking-widest"
            style={{ color: 'var(--rose)', fontSize: '0.65rem' }}
          >
            גוף · נפש · תודעה
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-70 relative group"
              style={{ color: 'var(--charcoal)' }}
            >
              {link.label}
              <span
                className="absolute bottom-0 right-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ background: 'var(--gold)' }}
              />
            </a>
          ))}
          <a
            href="#booking"
            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, var(--sage), #6a9165)',
              color: 'white',
            }}
          >
            קבעי פגישה ✦
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? 'סגור תפריט' : 'פתח תפריט'}
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="w-6 h-px block"
            style={{ background: 'var(--charcoal)' }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="w-6 h-px block"
            style={{ background: 'var(--charcoal)' }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="w-6 h-px block"
            style={{ background: 'var(--charcoal)' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden glass border-t"
            style={{ borderColor: 'rgba(143,175,138,0.2)' }}
          >
            <div className="flex flex-col items-end gap-4 px-6 py-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-base font-medium"
                  style={{ color: 'var(--charcoal)' }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="px-6 py-3 rounded-full text-sm font-semibold w-full text-center"
                style={{ background: 'linear-gradient(135deg, var(--sage), #6a9165)', color: 'white' }}
              >
                קבעי פגישה ✦
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
