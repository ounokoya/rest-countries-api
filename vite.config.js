import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// base : le site est servi par GitHub Pages sous /rest-countries-api/
export default defineConfig({ base: '/rest-countries-api/', plugins: [tailwindcss()] })
