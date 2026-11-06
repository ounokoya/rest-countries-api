// Accueil : liste des pays, recherche, filtre, annonces (spec §5)

import { normalize } from './data.js'
import { homeHash, replace } from './router.js'
import { showMessage } from './messages.js'
import { createRegionFilter } from './region-filter.js'
import { createCard } from './card.js'

// root : la section de l'accueil ; template : le modèle de carte (rapport IA R5)
export function createHome({ root, template, onChange }) {
  const listEl = root.querySelector('#countries')
  const search = root.querySelector('#search')
  const count = root.querySelector('#count')
  const message = root.querySelector('#home-message')
  let items = []
  let state = { search: '', region: '' }

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
  const regions = createRegionFilter({ root: root.querySelector('[data-region-filter]'), onSelect: (region) => update({ region }) })
  search.addEventListener('input', () => update({ search: search.value }))

  return {
    message,
    setCountries(countries) {
      items = countries.map((country, index) => createCard(template, country, index))
    },
    show(route, options) {
      state = { search: route.search, region: route.region }
      search.value = route.search
      regions.set(route.region)
      render(options)
    },
  }
}
