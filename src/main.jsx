import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { business, theme } from './config/business.js'
import './styles/global.css'

/*
 * Push the palette from src/config/business.js onto the page as CSS variables
 * before the first paint, so colours are edited in that one config file.
 * e.g. theme.brand -> var(--c-brand)
 */
Object.entries(theme).forEach(([token, value]) => {
  document.documentElement.style.setProperty(`--c-${token}`, value)
})

document.title = `${business.name} — ${business.type} in ${business.city}`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
