import { useEffect, useState } from 'react'

export function useViewportHeight(): number {
  const [height, setHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 900,
  )

  useEffect(() => {
    const update = () => setHeight(window.innerHeight)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return height
}
