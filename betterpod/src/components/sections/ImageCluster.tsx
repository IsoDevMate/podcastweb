'use no memo'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ImageCluster.css'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = {
  guest: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  main:  'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80',
}

export default function ImageCluster() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const stackRef    = useRef<HTMLDivElement>(null)
  const spinRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    const stack    = stackRef.current
    const spin     = spinRef.current
    if (!sentinel || !stack || !spin) return

    gsap.set(spin, { xPercent: -50 })

    // Sentinel is 1400px tall (420px stack + 980px padding-bottom).
    // Scroll range = sentinel height + viewport height ≈ 2300px on a
    // 900px screen.  y:700 across 2300px = 0.30px/px — clearly visible.
    const slideAnim = gsap.fromTo(stack,
      { y: 0 },
      {
        y: 700,
        ease: 'none',
        scrollTrigger: {
          trigger: sentinel,
          start: 'top bottom',
          end:   'bottom top',
          scrub: 0.5,
        },
      }
    )

    const spinAnim = gsap.fromTo(spin,
      { rotation: 0 },
      {
        rotation: 1080,
        ease: 'none',
        scrollTrigger: {
          trigger: sentinel,
          start: 'top bottom',
          end:   'bottom top',
          scrub: 0.5,
        },
      }
    )

    const imgs = Array.from(sentinel.querySelectorAll('img'))
    let loaded = 0
    const onLoad = () => { if (++loaded === imgs.length) ScrollTrigger.refresh() }
    imgs.forEach(img => img.complete ? onLoad() : img.addEventListener('load', onLoad, { once: true }))
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
    const t = setTimeout(() => ScrollTrigger.refresh(), 600)

    return () => {
      clearTimeout(t)
      slideAnim.scrollTrigger?.kill()
      spinAnim.scrollTrigger?.kill()
    }
  }, [])

  return (
    <div ref={sentinelRef} className="image-cluster__sentinel">
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
