import Navbar from './components/Navbar'
import Hero from './components/Hero'
import NewPatients from './components/NewPatients'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import Doctor from './components/Doctor'
import EmergencyBanner from './components/EmergencyBanner'
import Reviews from './components/Reviews'
import SmileGallery from './components/SmileGallery'
import OfficeTour from './components/OfficeTour'
import Insurance from './components/Insurance'
import Financing from './components/Financing'
import About from './components/About'
import Faq from './components/Faq'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Bwe from './components/Bwe'
import Footer from './components/Footer'
import ContactDock from './components/ContactDock'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <NewPatients />
        <Services />
        <WhyChooseUs />
        <Doctor />
        <EmergencyBanner />
        <Reviews />
        <SmileGallery />
        <OfficeTour />
        <Insurance />
        <Financing />
        <About />
        <Faq />
        <Booking />
        <Contact />
        <Bwe />
      </main>
      <Footer />
      <ContactDock />
    </>
  )
}
