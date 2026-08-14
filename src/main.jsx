import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { business, gradients, theme } from './config/business.js'
import './styles/global.css'

/*
 * Push the palette from src/config/business.js onto the page as CSS variables
 * before the first paint, so colours are edited in that one config file.
 * e.g. theme.brand -> var(--c-brand), gradients.hero -> var(--g-hero)
 */
Object.entries(theme).forEach(([token, value]) => {
  document.documentElement.style.setProperty(`--c-${token}`, value)
})

Object.entries(gradients).forEach(([token, value]) => {
  document.documentElement.style.setProperty(`--g-${token}`, value)
})

document.title = `${business.name} — ${business.type} in ${business.city}`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
