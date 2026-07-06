import { Calendar } from 'lucide-react'
import { heroImage } from '../../lib/images'

const NAV_LINKS = ['About', 'Episodes', 'Guests', 'Blog'] as const

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />

      <header className="relative z-10 px-4 pt-6 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <a
            href="#home"
            className="rounded-full border border-white/25 bg-white/15 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm"
          >
            podsbyus
          </a>

          <nav className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {link}
              </a>
            ))}
          </nav>

          <a
            href="#subscribe"
            className="inline-flex items-center gap-2 rounded-full bg-[#1a0f0a] px-5 py-2.5 text-sm font-medium text-white"
          >
            <Calendar size={15} />
            Subscribe
          </a>
        </div>
      </header>

      <div className="relative z-10 flex h-full items-end px-4 pb-16 md:px-8 md:pb-24">
        <h1 className="mx-auto max-w-6xl text-5xl leading-[0.95] font-bold tracking-tight text-white md:text-8xl">
          Stories worth
          <br />
          listening to
        </h1>
      </div>
    </section>
  )
}
