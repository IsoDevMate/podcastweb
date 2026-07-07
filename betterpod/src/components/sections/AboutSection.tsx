import { Mic2, Headphones, PlayCircle } from 'lucide-react'
import ImageCluster from './ImageCluster'
import './AboutSection.css'

const LINKS = [
  { icon: Mic2,        label: 'Listen on Spotify',  href: '#spotify'  },
  { icon: Headphones,  label: 'Apple Podcasts',      href: '#apple'    },
  { icon: PlayCircle,  label: 'Watch on YouTube',    href: '#youtube'  },
] as const

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-section__inner">

        {/* ── Left: image cluster (GSAP parallax + bottom-circle rotation) ── */}
        <div className="about-section__media">
          <ImageCluster />
        </div>

        {/* ── Right: text column — completely static, no scroll animation ── */}
        <div className="about-section__text">
          <div className="about-section__eyebrow">
            <span>About</span>
          </div>

          <h2 className="about-section__heading">
            Stories that move,<br />
            conversations that<br />
            inspire.
          </h2>

          <p className="about-section__body">
            Podsbyus is built for people who crave real talk — unfiltered
            conversations with thinkers, creators, and change-makers. We bring
            you long-form discussions that go beyond the headlines and into the
            heart of what matters.
          </p>

          <a href="#about-us" className="about-section__cta">
            About Us
          </a>

          {/* Platform links */}
          <div className="about-section__links">
            {LINKS.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="about-section__link-item">
                <span className="about-section__link-icon">
                  <Icon size={16} />
                </span>
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
