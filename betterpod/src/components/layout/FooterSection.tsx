import type { CSSProperties } from 'react'
import './FooterSection.css'

const NAV_LINKS = [
  { label: 'Home',               href: '#home'     },
  { label: 'About',              href: '#about'    },
  { label: 'Episodes',           href: '#episodes' },
  { label: 'Guests',             href: '#guests'   },
  { label: 'Blog',               href: '#blog'     },
  { label: 'Terms & Conditions', href: '#terms'    },
  { label: 'Privacy Policy',     href: '#privacy'  },
] as const

// Moody podcast-studio photo — replace with your own in public/images/
const BG =
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1800&q=80'

export default function FooterSection() {
  return (
    <footer className="footer" style={{ '--footer-bg': `url(${BG})` } as CSSProperties}>

      {/* full-bleed background photo + dark scrim */}
      <div className="footer__bg" />

      {/* content sits above the bg */}
      <div className="footer__inner">

        {/* ── Nav pill ── */}
        <div className="footer__pill">
          <nav className="footer__nav" aria-label="Footer navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href}>{label}</a>
            ))}
          </nav>

          <div className="footer__socials" aria-label="Social links">
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── Meta row ── */}
        <div className="footer__meta">
          <span>All rights reserved by @podsbyus</span>
          <span>The home of great podcast conversations</span>
        </div>

      </div>

      {/* ── Giant wordmark bleeding through the photo ── */}
      <div className="footer__wordmark" aria-hidden="true">podsbyus</div>

    </footer>
  )
}
