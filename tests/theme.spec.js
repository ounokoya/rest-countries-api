import { test, expect } from '@playwright/test'
import { open, themeButton, pageBackground } from './helpers.js'

// Spec §5 — S26 et S27

const BLUE_950 = 'rgb(32, 44, 55)'
const GREY_50 = 'rgb(252, 252, 252)'

test('S26 — au premier passage, le thème de l\'appareil', async ({ page }) => {
  await open(page, 1440, 1024, { theme: 'dark' })
  await expect.poll(() => pageBackground(page)).toBe(BLUE_950)
  await expect(themeButton(page)).toHaveAttribute('aria-pressed', 'true')

  await page.emulateMedia({ colorScheme: 'light' })
  await page.reload()
  await expect.poll(() => pageBackground(page)).toBe(GREY_50)
  await expect(themeButton(page)).toHaveAttribute('aria-pressed', 'false')
})

test('S27 — « Dark Mode » bascule le thème ; le choix est gardé au rechargement', async ({ page }) => {
  await open(page, 1440)
  await expect.poll(() => pageBackground(page)).toBe(GREY_50)

  await themeButton(page).click()
  await expect.poll(() => pageBackground(page)).toBe(BLUE_950)
  await expect(themeButton(page)).toHaveAttribute('aria-pressed', 'true')

  await page.reload()
  await expect.poll(() => pageBackground(page)).toBe(BLUE_950)
  await expect(themeButton(page)).toHaveAttribute('aria-pressed', 'true')

  await themeButton(page).click()
  await expect.poll(() => pageBackground(page)).toBe(GREY_50)
  await expect(themeButton(page)).toHaveAttribute('aria-pressed', 'false')
})
