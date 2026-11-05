import { test, expect } from '@playwright/test'
import { open, loaded, search, countries, card, back, title, borders, chooseRegion, currentRegion } from './helpers.js'

// Spec §5 — S18 à S25 (données réelles de data.json)

const main = (page) => page.getByRole('main')

test('S18 — clic sur Belgium : adresse, focus sur le titre, titre du document, drapeau, infos et voisins', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)
  await card(page, 'Belgium').click()

  await expect(page).toHaveURL(/#\/country\/BEL$/)
  await expect(title(page, 'Belgium')).toBeFocused()
  await expect(page).toHaveTitle('Belgium · Where in the world?')
  await expect(page.getByRole('img', { name: 'Flag of Belgium' })).toBeVisible()
  for (const line of [
    /Native Name:\s*België/, /Population:\s*11,858,610/, /Region:\s*Europe/, /Sub Region:\s*Western Europe/, /Capital:\s*Brussels/,
    /Top Level Domain:\s*\.be/, /Currencies:\s*Euro/, /Languages:\s*Dutch, French, German/,
  ]) await expect(main(page)).toContainText(line)
  expect(await borders(page).allTextContents()).toEqual(['France', 'Germany', 'Luxembourg', 'Netherlands'])
})

test('S19 — fiche de Belgium : clic sur « France » ouvre la fiche de France', async ({ page }) => {
  await open(page, 1440, 1024, { path: './#/country/BEL' })
  await borders(page).filter({ hasText: 'France' }).click()

  await expect(page).toHaveURL(/#\/country\/FRA$/)
  await expect(title(page, 'France')).toBeFocused()
})

async function belgiumFromFilteredList(page) {
  await open(page, 1440)
  await loaded(page)
  await search(page).fill('bel')
  await chooseRegion(page, 'Europe')
  await expect(countries(page)).toHaveCount(2)
  await card(page, 'Belgium').click()
  await expect(title(page, 'Belgium')).toBeVisible()
}

async function expectFilteredList(page) {
  await expect(countries(page)).toHaveCount(2)
  await expect(search(page)).toHaveValue('bel')
  expect(await currentRegion(page)).toContain('Europe')
}

test('S20 — Back : liste filtrée retrouvée, focus sur la carte Belgium', async ({ page }) => {
  await belgiumFromFilteredList(page)
  await back(page).click()

  await expectFilteredList(page)
  await expect(card(page, 'Belgium')).toBeFocused()
})

test('S21 — retour du navigateur : liste filtrée retrouvée', async ({ page }) => {
  await belgiumFromFilteredList(page)
  await page.goBack()

  await expectFilteredList(page)
})

test('S22 — fiche ouverte directement : Back mène à l\'accueil complet', async ({ page }) => {
  await open(page, 1440, 1024, { path: './#/country/BEL' })
  await expect(title(page, 'Belgium')).toBeVisible()
  await back(page).click()

  await loaded(page)
})

test('S23 — Antarctica : « Capital: None », « Currencies: None », voisins « None »', async ({ page }) => {
  await open(page, 1440, 1024, { path: './#/country/ATA' })
  await expect(title(page, 'Antarctica')).toBeVisible()

  await expect(main(page)).toContainText(/Capital:\s*None/)
  await expect(main(page)).toContainText(/Currencies:\s*None/)
  await expect(main(page)).toContainText(/Border Countries:\s*None/)
})

test('S24 — code inconnu : « Country not found » et Back vers l\'accueil', async ({ page }) => {
  await open(page, 1440, 1024, { path: './#/country/XYZ' })

  await expect(page.getByRole('heading', { name: 'Country not found' })).toBeVisible()
  await back(page).click()
  await loaded(page)
})

test('S25 — titre de l\'en-tête : accueil sans recherche ni région', async ({ page }) => {
  await belgiumFromFilteredList(page)
  await page.getByRole('link', { name: 'Where in the world?' }).click()

  await loaded(page)
  await expect(search(page)).toHaveValue('')
  await expect(page).not.toHaveURL(/search=|region=/)
})
