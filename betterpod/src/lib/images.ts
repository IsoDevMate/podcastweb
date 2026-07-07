// Photo placeholders — swap these paths when you add real podcast images.
// Do NOT use the reference screenshots in public/sections, public/sctiona, or
// public/secb — those are full-page design mocks, not individual card assets.

// Cinematic podcast studio — hero poster (shown while video loads)
export const heroImage =
  'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&q=80'

// Footer accent — moody low-key studio / sound-wave atmosphere
export const footerBgImage =
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80'

export const footerWatermarkImage =
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&q=80'

export const footerVideo =
  'https://assets.mixkit.co/videos/preview/mixkit-man-singing-into-a-microphone-in-a-recording-studio-42395-large.mp4'

export const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
    alt: 'Recording session in the studio',
  },
  {
    src: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
    alt: 'Hosts in conversation',
  },
  {
    src: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80',
    alt: 'Behind the mic',
  },
] as const

export const stackedCardImages = [
  {
    title: 'Elegant Setup',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&q=85',
  },
  {
    title: 'Deep Conversations',
    src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1800&q=85',
  },
  {
    title: 'Skilled Hosts',
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1800&q=85',
  },
  {
    title: 'New Episodes',
    src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1800&q=85',
  },
] as const

export const handpickedImages = [
  {
    title: 'Signature Episode',
    price: 'Ep. 01',
    src: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600&q=80',
    position: 'outer-left' as const,
  },
  {
    title: 'Fan Favourite',
    price: 'Ep. 02',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    position: 'inner-left' as const,
  },
  {
    title: 'Deep Dive',
    price: 'Ep. 03',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    position: 'inner-right' as const,
  },
  {
    title: 'Latest Drop',
    price: 'Ep. 04',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
    position: 'outer-right' as const,
  },
] as const
