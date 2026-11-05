import { test, expect } from '@playwright/test'
import { open, loaded, search, filter, regionRadio, countries, card, announced, chooseRegion, currentRegion, DATA } from './helpers.js'

// Spec §5 — S7 à S17 (données réelles de data.json)

const names = (page) => page.getByRole('list', { name: 'Countries' }).getByRole('heading', { level: 2 }).allTextContents()

test('S7 — pendant la lecture des données : « Loading countries… », puis 250 cartes et « 250 countries »', async ({ page }) => {
  await page.route('**/data.json', async (route) => { await new Promise((r) => setTimeout(r, 1500)); await route.continue() })
  await open(page, 1440)

  await expect(announced(page, 'Loading countries…')).toHaveCount(1)
  await loaded(page)
  await expect(announced(page, '250 countries')).toHaveCount(1)
})

test('S8 — data.json en erreur : alerte « Could not load countries », aucune carte', async ({ page }) => {
  await page.route('**/data.json', (route) => route.fulfill({ status: 500, body: 'erreur' }))
  await open(page, 1440)

  await expect(page.getByRole('alert')).toContainText('Could not load countries')
  await expect(countries(page)).toHaveCount(0)
})

test('S9 — cartes dans l\'ordre des données ; contenu de la carte Germany', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)

  expect((await names(page)).slice(0, 4)).toEqual(['Afghanistan', 'Åland Islands', 'Albania', 'Algeria'])
  const germany = card(page, 'Germany')
  await expect(germany).toContainText(/Population:\s*83,516,593/)
  await expect(germany).toContainText(/Region:\s*Europe/)
  await expect(germany).toContainText(/Capital:\s*Berlin/)
})

test('S10 — valeurs vides : Antarctica « Capital: None », Bouvet Island « Population: 0 »', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)

  await expect(card(page, 'Antarctica')).toContainText(/Capital:\s*None/)
  await expect(card(page, 'Bouvet Island')).toContainText(/Population:\s*0(?![\d,])/)
})

test('S11 — « bel » : Belarus, Belgium, Belize ; « 3 countries » ; search=bel dans l\'adresse', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)
  await search(page).fill('bel')

  await expect(countries(page)).toHaveCount(3)
  expect(await names(page)).toEqual(['Belarus', 'Belgium', 'Belize'])
  await expect(announced(page, '3 countries')).toHaveCount(1)
  await expect(page).toHaveURL(/search=bel/)
})

test('S12 — sans tenir compte de la casse, des accents ni des espaces autour', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)

  await search(page).fill('ALAND')
  await expect(countries(page)).toHaveCount(2)
  expect(await names(page)).toEqual(['Åland Islands', 'New Zealand'])
  await search(page).fill('germany  ')
  await expect(countries(page)).toHaveCount(1)
  expect(await names(page)).toEqual(['Germany'])
})

test('S13 — filtre : Europe 53 cartes, Americas 57, All regions 250 ; region= dans l\'adresse', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)

  await chooseRegion(page, 'Europe')
  await expect(countries(page)).toHaveCount(53)
  for (const text of await countries(page).allTextContents()) expect(text).toMatch(/Region:\s*Europe/)
  await expect(page).toHaveURL(/region=Europe/)
  expect(await currentRegion(page)).toContain('Europe')

  await chooseRegion(page, 'Americas')
  await expect(countries(page)).toHaveCount(57)
  await chooseRegion(page, 'All regions')
  await loaded(page)
})

test('S14 — « ger » et Europe : Germany seul, « 1 country »', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)
  await search(page).fill('ger')
  await expect(countries(page)).toHaveCount(4)
  await chooseRegion(page, 'Europe')

  await expect(countries(page)).toHaveCount(1)
  expect(await names(page)).toEqual(['Germany'])
  await expect(announced(page, '1 country')).toHaveCount(1)
})

test('S15 — « zzz » : « No countries found » visible, « 0 countries » annoncé, aucune carte', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)
  await search(page).fill('zzz')

  await expect(page.getByRole('heading', { name: 'No countries found' })).toBeVisible()
  await expect(announced(page, '0 countries')).toHaveCount(1)
  await expect(countries(page)).toHaveCount(0)
})

test('S16 — adresse #/?search=bel&region=Europe ouverte directement : choix retrouvés', async ({ page }) => {
  await open(page, 1440, 1024, { path: './#/?search=bel&region=Europe' })

  await expect(countries(page)).toHaveCount(2)
  await expect(search(page)).toHaveValue('bel')
  expect(await currentRegion(page)).toContain('Europe')
  expect(await names(page)).toEqual(['Belarus', 'Belgium'])
})

test('S17 — filtre au clavier : Entrée ouvre, Tab puis flèche bas choisit Africa, Entrée ferme', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)
  const button = filter(page)
  await button.focus()
  await page.keyboard.press('Enter')
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Tab')
  await expect(regionRadio(page, 'All regions')).toBeFocused()
  await page.keyboard.press('ArrowDown')

  await expect(countries(page)).toHaveCount(60)
  await expect(page).toHaveURL(/region=Africa/)
  await page.keyboard.press('Enter')
  await expect(button).toHaveAttribute('aria-expanded', 'false')
  await expect(button).toBeFocused()
  await expect(button).toHaveText('Africa')
})

test('ADR-0010 — Échap ferme la liste sans rien changer et rend le focus au bouton ; flèche haut depuis All regions choisit Oceania', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)
  const button = filter(page)
  await button.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Escape')
  await expect(button).toHaveAttribute('aria-expanded', 'false')
  await expect(button).toBeFocused()
  await expect(countries(page)).toHaveCount(DATA.length)
  await expect(button).toHaveText('Filter by Region')

  await page.keyboard.press('Enter')
  await page.keyboard.press('Tab')
  await page.keyboard.press('ArrowUp')
  await expect(countries(page)).toHaveCount(27)
  await page.keyboard.press('Escape')
  await expect(button).toHaveText('Oceania')
  await expect(button).toBeFocused()
})

test('ADR-0010 — un clic sans souris (lecteur d\'écran) ouvre la liste et choisit une région ; un clic dehors la ferme', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)
  const button = filter(page)
  await button.evaluate((el) => el.click())
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await regionRadio(page, 'Asia').evaluate((el) => el.click())
  await expect(countries(page)).toHaveCount(50)
  await expect(regionRadio(page, 'Asia')).toBeChecked()

  await page.mouse.click(700, 700)
  await expect(button).toHaveAttribute('aria-expanded', 'false')
})
