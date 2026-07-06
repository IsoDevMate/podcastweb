import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Mic2 } from 'lucide-react'
import { handpickedImages } from '../../lib/images'
import { backOut } from '../../lib/easing'

type CardConfig = (typeof handpickedImages)[number] & {
  finalX: string
  startRotate: number
  isInner: boolean
  zIndex: number
  animStart: number
  animEnd: number
}

const CARDS: CardConfig[] = [
  {
    ...handpickedImages[0],
    finalX: '-30vw',
    startRotate: -11,
    isInner: false,
    zIndex: 1,
    animStart: 0.08,
    animEnd: 0.62,
  },
  {
    ...handpickedImages[1],
    finalX: '-10.5vw',
    startRotate: -4,
    isInner: true,
    zIndex: 3,
    animStart: 0.04,
    animEnd: 0.48,
  },
  {
    ...handpickedImages[2],
    finalX: '10.5vw',
    startRotate: 4,
    isInner: true,
    zIndex: 4,
    animStart: 0.06,
    animEnd: 0.52,
  },
  {
    ...handpickedImages[3],
    finalX: '30vw',
    startRotate: 11,
    isInner: false,
    zIndex: 2,
    animStart: 0.12,
    animEnd: 0.66,
  },
]

// Animation plays over first 55% of scroll; last 45% holds final state on screen
const SCROLL_VH = 320
const ANIM_END = 0.55

function FanCard({
  card,
  progress,
}: {
  card: CardConfig
  progress: MotionValue<number>
}) {
  const { animStart, animEnd, finalX, startRotate, isInner, zIndex, title, price, src } =
    card

  const opacity = useTransform(progress, (p) => {
    if (p <= animStart) return 0
    if (p >= animEnd) return 1
    const t = (p - animStart) / (animEnd - animStart)
    return Math.min(1, 0.15 + t * 0.85)
  })

  const scale = useTransform(progress, (p) => {
    if (p <= animStart) return 0.22
    if (p >= animEnd) return isInner ? 1 : 0.9
    const t = backOut((p - animStart) / (animEnd - animStart))
    const target = isInner ? 1 : 0.9
    return 0.22 + (target - 0.22) * t
  })

  const rotate = useTransform(progress, (p) => {
    if (p <= animStart) return startRotate
    if (p >= animEnd) return 0
    const t = backOut((p - animStart) / (animEnd - animStart))
    return startRotate + (0 - startRotate) * t
  })

  const x = useTransform(progress, (p) => {
    if (p <= animStart) return '0vw'
    if (p >= animEnd) return finalX
    const t = backOut((p - animStart) / (animEnd - animStart))
    const startNum = 0
    const endNum = parseFloat(finalX)
    return `${startNum + (endNum - startNum) * t}vw`
  })

  const y = useTransform(progress, (p) => {
    if (p <= animStart) return 60
    if (p >= animEnd) return 0
    const t = backOut((p - animStart) / (animEnd - animStart))
    return 60 + (0 - 60) * t
  })

  return (
    <motion.div
      style={{ opacity, scale, rotate, x, y, zIndex }}
      className={[
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'overflow-hidden rounded-2xl border border-[#c4b49a]/70 shadow-md',
        isInner
          ? 'h-[280px] w-[220px] md:h-[320px] md:w-[260px]'
          : 'h-[220px] w-[160px] md:h-[260px] md:w-[190px]',
      ].join(' ')}
    >
      <img src={src} alt={title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute right-0 bottom-4 left-0 text-center text-white">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs opacity-75">{price}</p>
      </div>
    </motion.div>
  )
}

export default function HandpickedSelections() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll so animation finishes early, then holds final layout
  const animProgress = useTransform(scrollYProgress, [0, ANIM_END, 1], [0, 1, 1])

  const buttonOpacity = useTransform(animProgress, [0.82, 0.95], [0, 1])
  const buttonY = useTransform(animProgress, [0.82, 0.95], [24, 0])

  return (
    <div
      ref={containerRef}
      className="relative bg-cream"
      style={{ height: `${SCROLL_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4">
        <div className="mb-5 flex w-full max-w-4xl items-center gap-4">
          <span className="h-px flex-1 bg-frame" />
          <span className="text-sm font-medium tracking-widest whitespace-nowrap text-warm-muted uppercase">
            Featured Episodes
          </span>
          <span className="h-px flex-1 bg-frame" />
        </div>

        <h2 className="mb-10 text-center text-4xl leading-tight font-bold text-forest md:mb-14 md:text-5xl">
          Handpicked Episodes
          <br />
          Loved By Our Listeners
        </h2>

        <div className="relative mx-auto h-[min(360px,50vh)] w-full max-w-5xl">
          {CARDS.map((card) => (
            <FanCard key={card.title} card={card} progress={animProgress} />
          ))}
        </div>

        <motion.div
          style={{ opacity: buttonOpacity, y: buttonY }}
          className="mt-10 flex justify-center"
        >
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#333]"
          >
            <Mic2 size={15} />
            Explore All Episodes
          </button>
        </motion.div>
      </div>
    </div>
  )
}
