import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { stackedCardImages } from '../../lib/images'
import { backOut } from '../../lib/easing'
import { useViewportHeight } from '../../hooks/useViewportHeight'

const PEEK_PX = 32
const SCALE_STEP = 0.028

type CardTransform = {
  y: number
  scale: number
  zIndex: number
}

function getCardTransform(
  index: number,
  progress: number,
  total: number,
  viewportH: number,
): CardTransform {
  const segmentStart = index / total

  if (progress < segmentStart) {
    return { y: viewportH, scale: 0.94, zIndex: index }
  }

  const enteringIndex = Math.min(total - 1, Math.floor(progress * total))
  const enteringSegStart = enteringIndex / total
  const enteringSegEnd = (enteringIndex + 1) / total
  const enteringT =
    progress < enteringSegEnd
      ? (progress - enteringSegStart) / (enteringSegEnd - enteringSegStart)
      : 1
  const eased = backOut(Math.min(1, Math.max(0, enteringT)))

  // Another card is sliding in on top — older cards recede behind it
  if (index < enteringIndex && progress < enteringSegEnd) {
    const fromDepth = enteringIndex - 1 - index
    const toDepth = enteringIndex - index
    const fromY = -fromDepth * PEEK_PX
    const toY = -toDepth * PEEK_PX
    const fromScale = 1 - fromDepth * SCALE_STEP
    const toScale = 1 - toDepth * SCALE_STEP
    return {
      y: fromY + (toY - fromY) * eased,
      scale: fromScale + (toScale - fromScale) * eased,
      zIndex: index + 1,
    }
  }

  // This card is sliding up to become the new front
  if (index === enteringIndex && progress < enteringSegEnd) {
    return {
      y: viewportH + (0 - viewportH) * eased,
      scale: 1,
      zIndex: total + 1,
    }
  }

  // Resting in the stack
  const front = progress >= 1 ? total - 1 : Math.min(total - 1, Math.floor(progress * total))
  const depth = front - index
  return {
    y: -depth * PEEK_PX,
    scale: 1 - depth * SCALE_STEP,
    zIndex: index + 1,
  }
}

function StackCard({
  title,
  src,
  index,
  total,
  scrollYProgress,
  viewportH,
}: {
  title: string
  src: string
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  viewportH: number
}) {
  const y = useTransform(scrollYProgress, (progress) => {
    const { y: yVal } = getCardTransform(index, progress, total, viewportH)
    return `${yVal}px`
  })

  const scale = useTransform(scrollYProgress, (progress) => {
    return getCardTransform(index, progress, total, viewportH).scale
  })

  const zIndex = useTransform(scrollYProgress, (progress) => {
    return getCardTransform(index, progress, total, viewportH).zIndex
  })

  return (
    <motion.div
      style={{
        y,
        scale,
        zIndex,
        transformOrigin: 'top center',
      }}
      className="absolute inset-0 overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
    >
      <img src={src} alt={title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/15" />
      <p className="absolute top-8 left-1/2 -translate-x-1/2 text-xl font-light tracking-[0.2em] text-white/90 md:text-2xl">
        {title}
      </p>
    </motion.div>
  )
}

// 600vh scroll = slower, more deliberate card transitions
const SCROLL_HEIGHT_VH = 600

export default function StackedFeatureCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewportH = useViewportHeight()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={containerRef}
      className="relative bg-cream"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4">
        <div className="relative h-[min(640px,75vh)] w-[min(1040px,94vw)]">
          {stackedCardImages.map((card, i) => (
            <StackCard
              key={card.title}
              title={card.title}
              src={card.src}
              index={i}
              total={stackedCardImages.length}
              scrollYProgress={scrollYProgress}
              viewportH={viewportH}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
