'use no memo'

import { useEffect, useRef } from 'react'
import './ImageCluster.css'

const IMAGES = {
  guest: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  main:  'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80',
}

export default function ImageCluster() {
  const wrapRef  = useRef<HTMLDivElement>(null) // outer — position reference
  const stackRef = useRef<HTMLDivElement>(null) // translateY target
  const spinRef  = useRef<HTMLDivElement>(null) // rotate target

  useEffect(() => {
    const wrap  = wrapRef.current
    const stack = stackRef.current
    const spin  = spinRef.current
    if (!wrap || !stack || !spin) return

    let raf = 0

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect()
        const vh   = window.innerHeight

        // progress 0 → 1 as the wrap scrolls from entering the viewport
        // bottom to exiting the viewport top.
        // total = wrap height + viewport height (full travel distance)
        const total    = rect.height + vh
        const traveled = vh - rect.top
        const progress = Math.min(1, Math.max(0, traveled / total))

        // y: 0 → 160px  (visually clear without leaving the section)
        // rotate: 0 → 360deg (one full turn — clearly visible)
        stack.style.transform = `translateY(${progress * 160}px)`
        spin.style.transform  = `translateX(-50%) rotate(${progress * 360}deg)`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    // wrapRef is on the outermost div — tall enough to give a real scroll range.
    // The section's sticky text column keeps the right column visible while
    // this left column scrolls its full height through the viewport.
    <div ref={wrapRef} className="image-cluster__wrap">
      <div ref={stackRef} className="image-cluster__stack">

        <div className="image-cluster__circle image-cluster__circle--accent" />

        <div className="image-cluster__circle image-cluster__circle--guest">
          <img src={IMAGES.guest} alt="Podcast guest" />
        </div>

        <div ref={spinRef} className="image-cluster__circle image-cluster__circle--main">
          <img src={IMAGES.main} alt="Podcast mic" />
        </div>

        <div className="image-cluster__badge">
          <span className="image-cluster__badge-number">4.9</span>
          <span className="image-cluster__badge-label">Rating</span>
        </div>

      </div>
    </div>
  )
}
