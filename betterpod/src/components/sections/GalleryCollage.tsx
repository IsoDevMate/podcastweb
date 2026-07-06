import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { galleryImages } from '../../lib/images'

const FRAME =
  'rounded-xl overflow-hidden border border-[#c4b49a]/60 shadow-md bg-[#e8d9c0]'

export default function GalleryCollage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Fan stack at bottom → straight 3-column grid
  const leftRotate = useTransform(scrollYProgress, [0.05, 0.55], [-10, 0])
  const leftX = useTransform(scrollYProgress, [0.05, 0.55], ['-18%', '-100%'])
  const leftY = useTransform(scrollYProgress, [0.05, 0.55], ['28%', '0%'])

  const centerRotate = useTransform(scrollYProgress, [0.05, 0.55], [0, 0])
  const centerX = useTransform(scrollYProgress, [0.05, 0.55], ['0%', '0%'])
  const centerY = useTransform(scrollYProgress, [0.05, 0.55], ['28%', '0%'])

  const rightRotate = useTransform(scrollYProgress, [0.05, 0.55], [10, 0])
  const rightX = useTransform(scrollYProgress, [0.05, 0.55], ['18%', '100%'])
  const rightY = useTransform(scrollYProgress, [0.05, 0.55], ['28%', '0%'])

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden bg-cream pt-12">
        <div className="mb-10 w-full max-w-5xl px-6 text-center">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-px flex-1 bg-frame" />
            <span className="text-sm font-medium tracking-widest text-warm-muted uppercase">
              Refined Ambience
            </span>
            <span className="h-px flex-1 bg-frame" />
          </div>
          <h2 className="text-4xl leading-tight font-bold text-forest md:text-5xl">
            Moments Captured In
            <br />
            Our Beautiful Podcast
          </h2>
        </div>

        <div className="relative mx-auto h-[min(420px,52vh)] w-full max-w-5xl flex-1 px-6">
          <div className="relative mx-auto h-full w-full max-w-4xl">
            <motion.div
              style={{
                rotate: leftRotate,
                x: leftX,
                y: leftY,
                zIndex: 1,
              }}
              className={`absolute top-1/2 left-1/2 h-[min(380px,48vh)] w-[min(280px,30vw)] -translate-x-1/2 -translate-y-1/2 ${FRAME}`}
            >
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              style={{
                rotate: centerRotate,
                x: centerX,
                y: centerY,
                zIndex: 3,
              }}
              className={`absolute top-1/2 left-1/2 h-[min(380px,48vh)] w-[min(280px,30vw)] -translate-x-1/2 -translate-y-1/2 ${FRAME}`}
            >
              <img
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              style={{
                rotate: rightRotate,
                x: rightX,
                y: rightY,
                zIndex: 2,
              }}
              className={`absolute top-1/2 left-1/2 h-[min(380px,48vh)] w-[min(280px,30vw)] -translate-x-1/2 -translate-y-1/2 ${FRAME}`}
            >
              <img
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
