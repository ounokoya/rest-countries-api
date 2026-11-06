// Carte d'un pays de la liste (spec §2) : construction du DOM et chargement du drapeau (ADR-0009)

import { formatNumber, list, normalize } from './data.js'
import { detailHash } from './router.js'

const FIRST_SCREEN = 8 // drapeaux chargés tout de suite (ADR-0009)

export function createCard(template, country, index) {
  const li = template.content.firstElementChild.cloneNode(true)
  const link = li.querySelector('a')
  link.href = detailHash(country.alpha3Code)
  const img = new Image(264, 160)
  if (index >= FIRST_SCREEN) img.loading = 'lazy' // avant src : poser src lance aussitôt le téléchargement
  img.alt = ''
  img.decoding = 'async'
  img.src = country.flags.svg
  img.className = 'aspect-[264/160] h-auto w-full object-cover' // recadré : les drapeaux n'ont pas tous les mêmes proportions
  li.querySelector('[data-slot="flag"]').append(img)
  const values = { name: country.name, population: formatNumber(country.population), region: list(country.region), capital: list(country.capital) }
  for (const field of li.querySelectorAll('[data-field]')) field.textContent = values[field.dataset.field]
  return { li, link, code: country.alpha3Code, key: normalize(country.name), region: country.region }
}
