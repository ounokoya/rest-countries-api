import { test, expect } from '@playwright/test'
import { open, loaded, card, back, title, box, near } from './helpers.js'

// Spec §4 — S1 à S6 (positions de la maquette Penpot, à 1 px près)

const field = (page) => page.getByRole('search')
const filterBox = (page) => page.getByRole('button', { name: /^Filter by Region/ })
const flag = (page) => page.getByRole('img', { name: 'Flag of Belgium' })

test('S1 — 1440 × 1024 : en-tête, recherche, filtre et grille de 4 cartes de la maquette', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)

  expect((await box(page.getByRole('banner'))).height).toBe(80)
  near(await box(field(page)), { x: 80, y: 128, width: 480, height: 56 }, 'recherche')
  near(await box(filterBox(page)), { x: 1160, y: 128, width: 200, height: 56 }, 'filtre')
  const first = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria']
  for (const [i, x] of [80, 419, 757, 1096].entries()) near(await box(card(page, first[i])), { x, y: 232, width: 264, height: 336 }, first[i])
  // drapeau de test presque carré (300 × 260) : la carte garde sa taille, le drapeau est recadré
  near(await box(card(page, 'American Samoa')), { x: 80, y: 643, width: 264, height: 336 }, 'American Samoa')
})

test('S2 — 375 × 812 : recherche, filtre dessous, cartes centrées', async ({ page }) => {
  await open(page, 375, 812)
  await loaded(page)

  near(await box(field(page)), { x: 16, y: 104, width: 343, height: 48 }, 'recherche')
  near(await box(filterBox(page)), { x: 16, y: 192, width: 200, height: 48 }, 'filtre')
  near(await box(card(page, 'Afghanistan')), { x: 56, y: 272, width: 264, height: 336 }, 'Afghanistan')
  near(await box(card(page, 'Åland Islands')), { x: 56, y: 648 }, 'Åland Islands')
})

test('S3 — 768 × 1024 : recherche et filtre sur une ligne, 2 colonnes de cartes', async ({ page }) => {
  await open(page, 768)
  await loaded(page)

  near(await box(field(page)), { x: 48, y: 128, width: 448, height: 56 }, 'recherche')
  near(await box(filterBox(page)), { x: 520, y: 128, width: 200, height: 56 }, 'filtre')
  near(await box(card(page, 'Afghanistan')), { x: 48, width: 312 }, 'Afghanistan')
  near(await box(card(page, 'Åland Islands')), { x: 408, width: 312 }, 'Åland Islands')
})

for (const [width, columns] of [[1024, 3], [1280, 4]]) {
  test(`S4 — ${width} px : ${columns} cartes sur la 1re rangée`, async ({ page }) => {
    await open(page, width)
    await loaded(page)
    const names = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa']
    const ys = []
    for (const n of names) ys.push((await box(card(page, n))).y)
    expect(ys.filter((y) => y === ys[0])).toHaveLength(columns)
  })
}

test('S5 — fiche de Belgium : Back, drapeau et nom aux positions de la maquette (1440, 375, 768)', async ({ page }) => {
  await open(page, 1440, 1024, { path: './#/country/BEL' })
  await expect(title(page, 'Belgium')).toBeVisible()
  near(await box(back(page)), { x: 80, y: 160, width: 136, height: 40 }, 'Back 1440')
  near(await box(flag(page)), { x: 80, y: 280, width: 560, height: 400 }, 'drapeau 1440')
  near(await box(title(page, 'Belgium')), { x: 784 }, 'nom 1440')

  await page.setViewportSize({ width: 375, height: 985 })
  near(await box(back(page)), { x: 28, y: 120, width: 104, height: 32 }, 'Back 375')
  near(await box(flag(page)), { x: 28, y: 216, width: 320, height: 229 }, 'drapeau 375')

  await page.setViewportSize({ width: 768, height: 1024 })
  near(await box(back(page)), { x: 48, y: 160 }, 'Back 768')
  near(await box(flag(page)), { x: 48, y: 280, width: 672, height: 480 }, 'drapeau 768')
})

for (const width of [320, 767, 768, 1023, 1024, 1440]) {
  test(`S6 — ${width} px : pas de défilement horizontal (accueil et fiche) ; le nom le plus long tient dans sa carte`, async ({ page }) => {
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    await open(page, width)
    await loaded(page)
    expect(await overflow()).toBe(0)

    const uk = card(page, 'United Kingdom of Great Britain and Northern Ireland')
    const name = uk.getByRole('heading', { level: 2 })
    const [c, n] = [await box(uk), await box(name)]
    expect(n.x + n.width).toBeLessThanOrEqual(c.x + c.width)

    await page.goto('./#/country/GBR')
    await expect(title(page, 'United Kingdom of Great Britain and Northern Ireland')).toBeVisible()
    expect(await overflow()).toBe(0)
  })
}
