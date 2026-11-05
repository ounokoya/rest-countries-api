// Adresses en #/… (ADR-0006) : l'adresse décide de l'écran

import { REGIONS } from './data.js'

export function parse(hash = location.hash) {
  const path = hash.replace(/^#/, '') || '/'
  const country = path.match(/^\/country\/([A-Za-z]{3})\/?$/)
  if (country) return { view: 'detail', code: country[1].toUpperCase() }
  const query = new URLSearchParams(path.split('?')[1] || '')
  const region = query.get('region') || ''
  return { view: 'home', search: query.get('search') || '', region: REGIONS.includes(region) ? region : '' }
}

export function homeHash({ search = '', region = '' } = {}) {
  const query = new URLSearchParams()
  if (search) query.set('search', search)
  if (region) query.set('region', region)
  const text = query.toString()
  return text ? `#/?${text}` : '#/'
}

export const detailHash = (code) => `#/country/${code}`

// Recherche et filtre remplacent l'entrée d'historique : une entrée par écran, pas par lettre
export const replace = (hash) => history.replaceState(history.state, '', hash)
