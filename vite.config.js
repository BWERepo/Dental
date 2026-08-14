import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Honour a PORT from the environment so more than one copy of the dev server
  // can run at once. Falls back to Vite's usual 5173.
  server: {
    port: Number(process.env.PORT) || 5173,
  },
})
