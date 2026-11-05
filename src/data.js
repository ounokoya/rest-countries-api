// Lecture de data.json (ADR-0006) et valeurs affichées (spec §2)

export async function loadCountries() {
  const response = await fetch(`${import.meta.env.BASE_URL}data.json`)
  if (!response.ok) throw new Error(`data.json : ${response.status}`)
  return response.json()
}

export const formatNumber = (n) => Number(n).toLocaleString('en-US')

// Plusieurs valeurs séparées par « , » ; valeur absente ou liste vide : « None » (Q-B6, Q-B7)
export function list(values) {
  const items = (Array.isArray(values) ? values : [values]).filter((v) => v !== undefined && v !== null && String(v).trim() !== '')
  return items.length ? items.join(', ') : 'None'
}

export const names = (items) => (items || []).map((item) => item.name)

// Comparaison de la recherche : minuscules, sans accents ni espaces autour (Q5)
export const normalize = (text) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()

export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
