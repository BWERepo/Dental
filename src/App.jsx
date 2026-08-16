import { useMemo } from 'react'
import { business } from './config/business'
import { HOME, SERVICE } from './lib/router'
import { useRouter } from './lib/router-context'
import Router from './components/Router'
import UiProvider from './components/UiProvider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactDock from './components/ContactDock'
import TextUsWidget from './components/TextUsWidget'
import HomePage from './pages/HomePage'
import ServicePage from './pages/ServicePage'
import NotFoundPage from './pages/NotFoundPage'

/** Chooses the page. Each page sets its own title, description and canonical. */
function CurrentPage() {
  const { route } = useRouter()

  if (route.name === HOME) return <HomePage />
  if (route.name === SERVICE) return <ServicePage slug={route.slug} />
  return <NotFoundPage />
}

export default function App() {
  const slugs = useMemo(() => business.services.map((service) => service.slug), [])

  return (
    <Router knownSlugs={slugs}>
      <UiProvider>
        <Navbar />
        <main>
          <CurrentPage />
        </main>
        <Footer />
        <ContactDock />
        <TextUsWidget />
      </UiProvider>
    </Router>
  )
}
