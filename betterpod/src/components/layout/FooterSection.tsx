import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { footerVideo, footerWatermarkImage } from '../../lib/images'
import './FooterSection.css'

export default function FooterSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })

  // Panel rises up over the sticky video as you scroll in
  const panelY = useTransform(scrollYProgress, [0, 0.8], [140, 0])

  return (
    <div ref={containerRef} className="footer-section" style={{ height: '140vh' }}>
      {/* Video band — pinned while scrolling through this section */}
      <div className="footer-section__media">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&q=80"
        >
          <source src={footerVideo} type="video/mp4" />
        </video>
        <div className="footer-section__overlay" />
      </div>

      {/* Dark footer panel — slides up and covers the video */}
      <motion.div className="footer-section__panel" style={{ y: panelY }}>
        <div
          className="footer-section__panel-inner"
          style={
            { '--footer-watermark-image': `url(${footerWatermarkImage})` } as CSSProperties
          }
        >
        <div className="footer-section__bar">
          <nav className="footer-section__nav" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#episodes">Episodes</a>
            <a href="#guests">Guests</a>
            <a href="#blog">Blog</a>
            <a href="#terms">Terms &amp; Conditions</a>
            <a href="#privacy">Privacy Policy</a>
          </nav>

          <div className="footer-section__socials" aria-label="Social media links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 0 1-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.973-.519.781.781 0 0 1 .519-.972c3.632-1.102 8.147-.568 11.234 1.329a.78.78 0 0 1 .257 1.071zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 1 1-.543-1.794c3.532-1.072 9.404-.865 13.115 1.339a.936.936 0 0 1-1.954.612z" />
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-section__meta">
          <p>All rights reserved by @podsbyus</p>
          <p>The home of great podcast conversations</p>
        </div>

        <div className="footer-section__wordmark" aria-hidden="true">
          podsbyus
        </div>
        </div>
      </motion.div>
    </div>
  )
}
