import { defineConfig, devices } from '@playwright/test'

// Tests dérivés de la spec — ADR-0002 commun
// BASE_URL=https://ounokoya.github.io/rest-countries-api/ npm test : vérifie le site en ligne
const LOCAL = 'http://localhost:4183/rest-countries-api/'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL || LOCAL,
    ...devices['Desktop Chrome'],
  },
  webServer: process.env.BASE_URL ? undefined : {
    command: 'npm run build && npm run preview -- --port 4183 --strictPort',
    url: LOCAL,
    reuseExistingServer: !process.env.CI,
  },
})
