import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { expect } from '@playwright/test'
import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'

// Les tests ne s'appuient que sur la spec : noms accessibles (§6) et comportement (§5),
// jamais sur des classes ou une structure HTML précise.

const here = (path) => new URL(path, import.meta.url)
const dataFile = ['../public/data.json', '../data.json'].map(here).find((u) => existsSync(u))
export const DATA = JSON.parse(readFileSync(dataFile, 'utf8'))
const byCode = Object.fromEntries(DATA.map((c) => [c.alpha3Code, c]))

// Drapeaux servis en local (aucune requête vers flagcdn.com) : découpes des images FM, sinon un gris neutre
// presque carré (300 × 260), car les drapeaux réels n'ont pas tous les proportions des cartes
const FLAGS = new Set(['de', 'us', 'br', 'is', 'af', 'ax', 'al', 'dz', 'be'])
async function serveFlags(page) {
  await page.route(/^https:\/\/flagcdn\.com\//, (route) => {
    const code = route.request().url().match(/\/([a-z-]+)\.(?:svg|png)$/)?.[1]
    const file = FLAGS.has(code) ? code : 'autre'
    return route.fulfill({ path: fileURLToPath(here(`fixtures/drapeaux/${file}.png`)), contentType: 'image/png' })
  })
}

// Jeu de données de test (G3) : le contenu des images FM, pour les comparaisons visuelles
const FM_HOME = [['DEU', 81770900], ['USA', 323947000], ['BRA', 206135893], ['ISL', 334300], ['AFG', 27657145], ['ALA', 28875], ['ALB', 2886026], ['DZA', 40400000]]
export const FIXTURES = {
  accueil: FM_HOME.map(([code, population]) => ({ ...byCode[code], population })),
  fiche: [{ ...byCode.BEL, population: 11319511, borders: ['FRA', 'DEU', 'NLD'] }, byCode.FRA, byCode.DEU, byCode.NLD],
}

export async function open(page, width, height = 1024, { theme = 'light', fixture, path = './' } = {}) {
  await page.emulateMedia({ colorScheme: theme === 'dark' ? 'dark' : 'light' })
  await serveFlags(page)
  if (fixture) await page.route('**/data.json', (route) => route.fulfill({ json: FIXTURES[fixture] }))
  await page.setViewportSize({ width, height })
  await page.goto(path)
  await page.evaluate(() => document.fonts.ready)
}

export const search = (page) => page.getByRole('searchbox', { name: 'Search for a country' })
export const filter = (page) => page.getByRole('combobox', { name: 'Filter by Region' })
export const countries = (page) => page.getByRole('list', { name: 'Countries' }).getByRole('listitem')
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
export const card = (page, name) => page.getByRole('link', { name: new RegExp(`^${escape(name)}(\\s|$)`) })
export const announced = (page, text) => page.getByRole('status').filter({ hasText: text })
export const back = (page) => page.getByRole('link', { name: 'Back', exact: true })
export const themeButton = (page) => page.getByRole('button', { name: 'Dark Mode' })
export const title = (page, name) => page.getByRole('heading', { level: 1, name })
export const borders = (page) => page.getByRole('list', { name: 'Border Countries' }).getByRole('link')

// Attendre la liste complète (250 cartes)
export async function loaded(page, count = DATA.length) {
  await expect(countries(page)).toHaveCount(count)
}

// Le filtre peut être une liste native ou une liste sur mesure (choix de l'ADR) : on vise son rôle
const isNative = (page) => filter(page).evaluate((el) => el.tagName === 'SELECT')
export async function chooseRegion(page, name) {
  if (await isNative(page)) await filter(page).selectOption({ label: name })
  else {
    await filter(page).click()
    await page.getByRole('option', { name, exact: true }).click()
  }
}
export async function openRegions(page) {
  if (await isNative(page)) return false // une liste native ouverte n'apparaît pas dans les captures
  await filter(page).click()
  await expect(page.getByRole('option', { name: 'Oceania', exact: true })).toBeVisible()
  return true
}
export const currentRegion = (page) => filter(page).evaluate((el) => (el.tagName === 'SELECT' ? el.selectedOptions[0].text : el.textContent).trim())

// Couleur de fond de la page (body, sinon html)
export const pageBackground = (page) => page.evaluate(() => {
  for (const el of [document.body, document.documentElement]) {
    const c = getComputedStyle(el).backgroundColor
    if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c
  }
  return null
})

export const box = async (locator) => {
  const b = await locator.boundingBox()
  return { x: Math.round(b.x), y: Math.round(b.y), width: Math.round(b.width), height: Math.round(b.height) }
}
// Position à 1 px près
export function near(actual, expected, label) {
  for (const [k, v] of Object.entries(expected)) expect.soft(Math.abs(actual[k] - v), `${label} ${k} : ${actual[k]} au lieu de ${v}`).toBeLessThanOrEqual(1)
}

export const REFERENCE = here('../specs/reference/')

// Part des pixels dont un canal diffère de plus de 40 (mesure du calibrage de la Phase 3)
export function diffRatio(screenshot, referenceFile) {
  const actual = PNG.sync.read(screenshot)
  const expected = jpeg.decode(readFileSync(new URL(referenceFile, REFERENCE)), { useTArray: true, maxMemoryUsageInMB: 1024 })
  if (actual.width !== expected.width || actual.height !== expected.height) {
    throw new Error(`capture ${actual.width}×${actual.height} ≠ référence ${expected.width}×${expected.height}`)
  }
  let different = 0
  for (let i = 0; i < actual.data.length; i += 4) {
    const delta = Math.max(
      Math.abs(actual.data[i] - expected.data[i]),
      Math.abs(actual.data[i + 1] - expected.data[i + 1]),
      Math.abs(actual.data[i + 2] - expected.data[i + 2]),
    )
    if (delta > 40) different++
  }
  return different / (actual.width * actual.height)
}
