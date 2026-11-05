import { test, expect } from '@playwright/test'
import { open, loaded, title, openRegions, diffRatio } from './helpers.js'

// Spec §7 — S34 à S37 : seuils calibrés en Phase 3 (specs/visuel/penpot/maquette.md),
// jeu de données de test qui reproduit le contenu des images FM (G3)

const home = (page) => loaded(page, 8)
const detail = async (page) => { await page.goto('./#/country/BEL'); await expect(title(page, 'Belgium')).toBeVisible() }
const screens = [
  { id: 'S34', ref: 'desktop-accueil-clair.jpg', w: 1440, h: 1024, theme: 'light', fixture: 'accueil', go: home, open: true },
  { id: 'S34', ref: 'desktop-accueil-sombre.jpg', w: 1440, h: 1024, theme: 'dark', fixture: 'accueil', go: home, open: true },
  { id: 'S35', ref: 'desktop-fiche-clair.jpg', w: 1440, h: 1024, theme: 'light', fixture: 'fiche', go: detail },
  { id: 'S35', ref: 'desktop-fiche-sombre.jpg', w: 1440, h: 1024, theme: 'dark', fixture: 'fiche', go: detail },
  { id: 'S36', ref: 'mobile-accueil-clair.jpg', w: 375, h: 3305, theme: 'light', fixture: 'accueil', go: home, open: true },
  { id: 'S36', ref: 'mobile-accueil-sombre.jpg', w: 375, h: 3305, theme: 'dark', fixture: 'accueil', go: home, open: true },
  { id: 'S37', ref: 'mobile-fiche-clair.jpg', w: 375, h: 985, theme: 'light', fixture: 'fiche', go: detail },
  { id: 'S37', ref: 'mobile-fiche-sombre.jpg', w: 375, h: 985, theme: 'dark', fixture: 'fiche', go: detail },
]

for (const { id, ref, w, h, theme, fixture, go, open: list } of screens) {
  test(`${id} — ${ref} (≤ 5,0 %)`, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await open(page, w, h, { theme, fixture })
    await go(page)
    if (list) await openRegions(page)
    await page.mouse.move(0, 0) // aucun survol pendant la capture
    await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode().catch(() => {}))))

    const shot = await page.screenshot({ caret: 'hide', animations: 'disabled' })
    await testInfo.attach(ref.replace('.jpg', '.png'), { body: shot, contentType: 'image/png' })
    const ratio = diffRatio(shot, ref)
    testInfo.annotations.push({ type: 'pixels différents', description: `${(ratio * 100).toFixed(2)} %` })
    expect(ratio).toBeLessThanOrEqual(0.05)
  })
}
