import { useState } from 'react'
import { Calendar, Menu, X } from 'lucide-react'
import { heroImage } from '../../lib/images'
import './Hero.css'

// Self-hosted video from public/hero/
const HERO_VIDEO = '/hero/7586495-hd_1080_1920_24fps.mp4'

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Episodes', href: '#episodes' },
  { label: 'Guests',   href: '#guests' },
  { label: 'Blog',     href: '#blog' },
] as const

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="hero-section" id="home">
      {/* ── Background video ── autoPlay + muted + playsInline required for
           browsers to start immediately without user interaction.
           preload="auto" tells the browser to fetch the video eagerly.    ── */}
      <video
        className="hero-section__video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={heroImage}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* ── Dark gradient overlay (top→bottom, 40–60% opacity) ── */}
      <div className="hero-section__overlay" />

      {/* ── Camera viewfinder grid ─────────────────────────────────────────
           SVG with 2 vertical + 2 horizontal lines at the rule-of-thirds
           positions (33.33% and 66.66%). preserveAspectRatio="none" makes
           the SVG stretch to fill the hero at any viewport size.
           pointer-events:none — purely decorative, never blocks interaction.
      ──────────────────────────────────────────────────────────────────── */}
      <svg
        className="hero-section__grid"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Vertical lines at 1/3 and 2/3 */}
        <line x1="33.333%" y1="0%" x2="33.333%" y2="100%" />
        <line x1="66.666%" y1="0%" x2="66.666%" y2="100%" />
        {/* Horizontal lines at 1/3 and 2/3 */}
        <line x1="0%" y1="33.333%" x2="100%" y2="33.333%" />
        <line x1="0%" y1="66.666%" x2="100%" y2="66.666%" />
      </svg>

      {/* ── Navbar ─────────────────────────────────────── */}
      <header className="hero-section__header">
        <div className="navbar">
          {/* Logo pill */}
          <a href="#home" className="navbar__logo">
            podsbyus
          </a>

          {/* Desktop nav */}
          <nav className="navbar__links" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="navbar__link">
                {label}
              </a>
            ))}
          </nav>

          {/* Right side: CTA + mobile toggle */}
          <div className="navbar__right">
            <a href="#subscribe" className="navbar__cta">
              <Calendar size={15} aria-hidden="true" />
              Subscribe
            </a>

            <button
              className="navbar__hamburger"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <nav className="navbar__mobile-drawer" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="navbar__mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="#subscribe"
              className="navbar__mobile-cta"
              onClick={() => setMenuOpen(false)}
            >
              Subscribe
            </a>
          </nav>
        )}
      </header>

      {/* ── Hero copy ──────────────────────────────────── */}
      <div className="hero-section__content">
        <p className="hero-section__sub">New episode every Thursday</p>
        <h1 className="hero-section__headline">
          Stories worth
          <br />
          listening to
        </h1>
        <div className="hero-section__actions">
          <a href="#episodes" className="hero-btn hero-btn--primary">
            Latest Episodes
          </a>
          <a href="#about" className="hero-btn hero-btn--ghost">
            Our Story
          </a>
        </div>
      </div>
    </section>
  )
}
