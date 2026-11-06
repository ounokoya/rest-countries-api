// Fiche d'un pays (spec §5) : infos, voisins, titre du document, focus

import { formatNumber, list, names } from './data.js'
import { detailHash } from './router.js'
import { showMessage } from './messages.js'

const SITE = 'Where in the world?'

// root : la section de la fiche
export function createDetail({ root }) {
  const article = root.querySelector('#country')
  const message = root.querySelector('#detail-message')
  const back = root.querySelector('#back')
  const flag = root.querySelector('#country-flag')
  const name = root.querySelector('#country-name')
  const borders = root.querySelector('#borders')
  const noBorders = root.querySelector('#no-borders')
  let byCode = new Map()

  function neighbour(country) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = detailHash(country.alpha3Code)
    a.textContent = country.name
    a.className = 'inline-flex h-7 min-w-24 items-center justify-center rounded-chip bg-element px-3 text-xs font-light shadow-chip transition-colors duration-200 hover:bg-hover motion-reduce:transition-none md:text-sm'
    li.append(a)
    return li
  }

  return {
    message,
    setCountries(countries) {
      byCode = new Map(countries.map((country) => [country.alpha3Code, country]))
    },
    show(code, { focus, backHref }) {
      back.href = backHref
      const country = byCode.get(code)
      if (!country) {
        article.hidden = true
        const title = showMessage(message, 'unknown')
        document.title = `Country not found · ${SITE}`
        if (focus) title.focus()
        return
      }
      showMessage(message, null)
      const img = new Image(560, 400)
      img.src = country.flags.svg
      img.alt = `Flag of ${country.name}`
      img.className = 'aspect-[1.4] h-auto w-full object-cover'
      flag.replaceChildren(img)
      name.textContent = country.name
      const values = {
        nativeName: list(country.nativeName),
        population: formatNumber(country.population),
        region: list(country.region),
        subregion: list(country.subregion),
        capital: list(country.capital),
        topLevelDomain: list(country.topLevelDomain),
        currencies: list(names(country.currencies)),
        languages: list(names(country.languages)),
      }
      for (const field of article.querySelectorAll('[data-field]')) field.textContent = values[field.dataset.field]
      const neighbours = (country.borders || []).map((c) => byCode.get(c)).filter(Boolean)
      borders.replaceChildren(...neighbours.map(neighbour))
      borders.hidden = !neighbours.length
      noBorders.hidden = Boolean(neighbours.length)
      article.hidden = false
      document.title = `${country.name} · ${SITE}`
      if (focus) name.focus()
    },
  }
}
