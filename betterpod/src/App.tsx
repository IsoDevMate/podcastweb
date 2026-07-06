import Hero from './components/layout/Hero'
import GalleryCollage from './components/sections/GalleryCollage'
import StackedFeatureCards from './components/sections/StackedFeatureCards'
import HandpickedSelections from './components/sections/HandpickedSelections'
import FooterSection from './components/layout/FooterSection'

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Hero />
      <GalleryCollage />
      <StackedFeatureCards />
      <HandpickedSelections />
      <FooterSection />
    </div>
  )
}

export default App
