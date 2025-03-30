import Navbar from "../components/Landing/Navbar"
import Hero from "../components/Landing/Hero"
import Services from "../components/Landing/Services"
import { StarDecoration, CurveDecoration, DotDecoration } from "../components/Landing/Decorations"
import Contact from '../components/Landing/Contact'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#50A8FF] dark:bg-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      {/* <div className="absolute top-20 right-20">
        <StarDecoration />
      </div>
      <div className="absolute top-40 right-40">
        <DotDecoration />
      </div>
      <div className="absolute bottom-40 left-20">
        <CurveDecoration />
      </div> */}

      <Navbar />
      <Hero />
      <Services />
      <Contact />
    </div>
  )
}
