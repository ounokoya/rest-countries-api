// Accueil : liste des pays, recherche, filtre, annonces (spec §5)

import { formatNumber, list, normalize } from './data.js'
import { detailHash, homeHash, replace } from './router.js'
import { showMessage } from './messages.js'
import { createRegionFilter } from './region-filter.js'

const FIRST_SCREEN = 8 // drapeaux chargés tout de suite (ADR-0009)

export function createHome({ onChange }) {
  const listEl = document.querySelector('#countries')
  const search = document.querySelector('#search')
  const count = document.querySelector('#count')
  const message = document.querySelector('#home-message')
  const template = document.querySelector('#card-template')
  let items = []
  let state = { search: '', region: '' }

  function card(country, index) {
    const li = template.content.firstElementChild.cloneNode(true)
    const link = li.querySelector('a')
    link.href = detailHash(country.alpha3Code)
    const img = new Image(264, 160)
    img.src = country.flags.svg
    img.alt = ''
    img.decoding = 'async'
    if (index >= FIRST_SCREEN) img.loading = 'lazy'
    img.className = 'aspect-[264/160] h-auto w-full object-cover' // recadré : les drapeaux n'ont pas tous les mêmes proportions
    li.querySelector('[data-slot="flag"]').append(img)
    const values = { name: country.name, population: formatNumber(country.population), region: list(country.region), capital: list(country.capital) }
    for (const field of li.querySelectorAll('[data-field]')) field.textContent = values[field.dataset.field]
    return { li, link, code: country.alpha3Code, key: normalize(country.name), region: country.region }
  }

  function render({ focusCode } = {}) {
    const query = normalize(state.search)
    const shown = items.filter((item) => (!state.region || item.region === state.region) && item.key.includes(query))
    listEl.replaceChildren(...shown.map((item) => item.li))
    count.textContent = shown.length === 1 ? '1 country' : `${shown.length} countries`
    showMessage(message, shown.length ? null : 'empty')
    if (focusCode) shown.find((item) => item.code === focusCode)?.link.focus()
  }

  // Recherche et filtre : l'adresse suit les choix sans empiler d'entrées (ADR-0006)
  function update(change) {
    state = { ...state, ...change }
    const hash = homeHash(state)
    replace(hash)
    onChange(hash)
    render()
  }
  const regions = createRegionFilter({ onSelect: (region) => update({ region }) })
  search.addEventListener('input', () => update({ search: search.value }))
  search.form.addEventListener('submit', (event) => event.preventDefault())

  return {
    message,
    setCountries(countries) {
      items = countries.map(card)
    },
    show(route, options) {
      state = { search: route.search, region: route.region }
      search.value = route.search
      regions.set(route.region)
      render(options)
    },
  }
}
