import { test, expect } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { open, loaded, countries, title } from './helpers.js'

// S31 (validateur W3C Nu) et fitness functions des ADR-0003, ADR-0004 et ADR-0009

const root = (path) => new URL(`../${path}`, import.meta.url)
const vnu = root('node_modules/vnu-jar/build/dist/vnu.jar').pathname
const COLOR = /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(/i

test('S31 — le HTML servi passe le validateur W3C Nu sans erreur', async ({ request }) => {
  const html = await (await request.get('./')).text()
  let output = ''
  try {
    execFileSync('java', ['-jar', vnu, '--errors-only', '--format', 'text', '-'], { input: html, encoding: 'utf8', stdio: 'pipe' })
  } catch (error) {
    output = `${error.stdout}${error.stderr}`
  }
  expect(output).toBe('')
})

test('ADR-0003 — aucune couleur écrite en dur hors des tokens (@theme et rôles de couleur)', () => {
  const sources = {
    'index.html': readFileSync(root('index.html'), 'utf8'),
    // les tokens sont des propriétés personnalisées (--…) : seules leurs valeurs portent des couleurs
    'src/style.css (hors tokens)': readFileSync(root('src/style.css'), 'utf8').replace(/--[\w-]+\s*:[^;]+;/g, ''),
  }
  for (const file of readdirSync(root('src')).filter((f) => f.endsWith('.js'))) sources[`src/${file}`] = readFileSync(root(`src/${file}`), 'utf8')

  expect(Object.entries(sources).filter(([, text]) => COLOR.test(text)).map(([file]) => file)).toEqual([])
})

test('ADR-0004 — rien n\'est chargé hors du domaine sauf les drapeaux ; Nunito Sans 300, 600 et 800 se chargent', async ({ page, baseURL }) => {
  const outside = []
  page.on('request', (r) => {
    const origin = new URL(r.url()).origin
    if (origin !== new URL(baseURL).origin && origin !== 'https://flagcdn.com') outside.push(r.url())
  })
  await open(page, 1440)
  await loaded(page)
  // load() télécharge la graisse même si aucun texte ne l'utilise encore ; [] si elle n'est pas déclarée
  const weights = await page.evaluate(async () => {
    const found = []
    for (const w of ['300', '600', '800']) if ((await document.fonts.load(`${w} 16px "Nunito Sans"`)).length) found.push(w)
    return found
  })
  expect(weights).toEqual(['300', '600', '800'])
  expect(outside).toEqual([])
})

test('ADR-0009 — les drapeaux affichés sont ceux de flags.svg (cartes et fiche)', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)
  const svg = /^https:\/\/flagcdn\.com\/[a-z-]+\.svg$/
  for (const i of [0, 1, 100]) expect(await countries(page).nth(i).locator('img').getAttribute('src')).toMatch(svg)
  await page.goto('./#/country/BEL')
  await expect(title(page, 'Belgium')).toBeVisible()
  expect(await page.getByRole('img', { name: 'Flag of Belgium' }).getAttribute('src')).toMatch(svg)
})
