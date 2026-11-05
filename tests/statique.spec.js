import { test, expect } from '@playwright/test'
import { execFileSync } from 'node:child_process'

// S31 (validateur W3C Nu) ; les fitness functions des ADR s'ajouteront ici

const vnu = new URL('../node_modules/vnu-jar/build/dist/vnu.jar', import.meta.url).pathname

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
