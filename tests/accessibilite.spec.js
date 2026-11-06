import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { open, loaded, search, countries, card, back, title, themeButton, borders } from './helpers.js'

// Spec §6 — S28, S29, S30, S32, S33

// Parcours au Tab jusqu'au dernier élément (le focus revient au document ou au premier élément)
async function outlines(page) {
  const seen = []
  for (let i = 0; i < 600; i++) {
    await page.keyboard.press('Tab')
    const info = await page.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      if (!el.dataset.visited) el.dataset.visited = '1'
      else return { again: true }
      const s = getComputedStyle(el)
      const label = (el.getAttribute('aria-label') || el.labels?.[0]?.textContent || el.textContent || el.tagName).trim().slice(0, 40)
      return { label, ok: (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2) || s.boxShadow !== 'none' }
    })
    if (!info || info.again) break
    seen.push(info)
  }
  return seen
}

test('S28 — accueil et fiche : chaque élément focalisé au clavier, jusqu\'au dernier, a un contour de 2 px au moins', async ({ page }) => {
  test.setTimeout(90_000)
  await open(page, 1440)
  await loaded(page)
  const home = await outlines(page)
  expect(home.length, 'accueil : thème, recherche, filtre et 250 cartes').toBeGreaterThanOrEqual(253)
  await page.goto('./#/country/BEL')
  await expect(title(page, 'Belgium')).toBeVisible()
  // même document (route par l'adresse) : on efface les marques du premier parcours
  await page.evaluate(() => { document.activeElement?.blur(); document.querySelectorAll('[data-visited]').forEach((el) => delete el.dataset.visited) })
  const detail = await outlines(page)
  expect(detail.length, 'fiche : Back, thème et 4 voisins').toBeGreaterThanOrEqual(6)

  const missing = [...home, ...detail].filter((x) => !x.ok).map((x) => x.label)
  expect(missing).toEqual([])
})

async function tabUntil(page, locator, key = 'Tab', max = 15) {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press(key)
    if (await locator.evaluate((el) => el === document.activeElement)) return
  }
  throw new Error('élément jamais atteint au clavier')
}

test('S29 — clavier seul : recherche, fiche de Belgium, Back, liste filtrée retrouvée', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)
  await tabUntil(page, search(page))
  await page.keyboard.type('bel')
  await expect(countries(page)).toHaveCount(3)
  await tabUntil(page, card(page, 'Belgium'))
  await page.keyboard.press('Enter')
  await expect(title(page, 'Belgium')).toBeFocused()
  await tabUntil(page, back(page), 'Shift+Tab')
  await page.keyboard.press('Enter')

  await expect(countries(page)).toHaveCount(3)
  await expect(card(page, 'Belgium')).toBeFocused()
})

const states = {
  'accueil': async (page) => { await loaded(page) },
  'aucun résultat': async (page) => { await loaded(page); await search(page).fill('zzz'); await expect(page.getByRole('heading', { name: 'No countries found' })).toBeVisible() },
  'fiche': async (page) => { await page.goto('./#/country/BEL'); await expect(title(page, 'Belgium')).toBeVisible() },
  'pays inconnu': async (page) => { await page.goto('./#/country/XYZ'); await expect(page.getByRole('heading', { name: 'Country not found' })).toBeVisible() },
}

for (const theme of ['light', 'dark']) {
  for (const width of [1440, 375]) {
    for (const [name, go] of Object.entries(states)) {
      test(`S30 — axe-core : ${name} (${theme}, ${width} px)`, async ({ page }) => {
        test.setTimeout(60_000) // axe-core analyse les 250 cartes de l'accueil en 15 à 20 s
        await open(page, width, 1024, { theme })
        await go(page)
        const { violations } = await new AxeBuilder({ page }).analyze()
        const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact))
        expect(serious.map((v) => `${v.id} : ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([])
      })
    }
    test(`S30 — axe-core : erreur de chargement (${theme}, ${width} px)`, async ({ page }) => {
      await page.route('**/data.json', (route) => route.fulfill({ status: 500, body: 'erreur' }))
      await open(page, width, 1024, { theme })
      await expect(page.getByRole('alert')).toContainText('Could not load countries')
      const { violations } = await new AxeBuilder({ page }).analyze()
      expect(violations.filter((v) => ['serious', 'critical'].includes(v.impact)).map((v) => v.id)).toEqual([])
    })
  }
}

test('S32 — prefers-reduced-motion : aucune transition (thème, cartes, Back, voisins)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await open(page, 1440)
  await loaded(page)
  const still = (locator) => locator.evaluate((el) => {
    const s = getComputedStyle(el)
    return s.transitionProperty === 'none' || s.transitionDuration.split(',').every((d) => parseFloat(d) === 0)
  })
  expect(await still(themeButton(page))).toBe(true)
  expect(await still(card(page, 'Germany'))).toBe(true)
  await page.goto('./#/country/BEL')
  await expect(title(page, 'Belgium')).toBeVisible()
  expect(await still(back(page))).toBe(true)
  expect(await still(borders(page).first())).toBe(true)
})

test('S33 — drapeaux : dimensions déclarées ; les 8 premiers chargés tout de suite, les suivants en différé', async ({ page }) => {
  await open(page, 1440)
  await loaded(page)
  const flag = (i) => countries(page).nth(i).locator('img')
  for (const i of [0, 3, 7, 8, 100, 249]) {
    const [w, h, loading] = await flag(i).evaluate((img) => [img.getAttribute('width'), img.getAttribute('height'), img.getAttribute('loading')])
    expect.soft(w && h, `dimensions du drapeau ${i + 1}`).toBeTruthy()
    expect.soft(loading === 'lazy', `chargement différé du drapeau ${i + 1}`).toBe(i >= 8)
  }
})

test('S33 — au premier affichage, seuls les drapeaux proches de l\'écran sont téléchargés', async ({ page }) => {
  const flags = new Set()
  page.on('request', (r) => { if (r.url().startsWith('https://flagcdn.com/')) flags.add(r.url()) })
  await open(page, 1440)
  await loaded(page)
  await page.waitForTimeout(500)
  expect(flags.size).toBeGreaterThanOrEqual(8)
  expect(flags.size).toBeLessThan(80)
})
