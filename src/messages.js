// Messages de la page (spec §2) : chargement, erreur, aucun résultat, pays inconnu

const TEXTS = {
  loading: { role: 'status', title: 'Loading countries…' },
  error: { role: 'alert', title: 'Could not load countries', detail: 'Please check your connection and reload the page.' },
  empty: { title: 'No countries found', detail: 'Try another name or region.', heading: 2 },
  unknown: { title: 'Country not found', detail: 'This address does not match any country.', heading: 1 },
}

export function showMessage(slot, kind) {
  if (!kind) {
    slot.hidden = true
    slot.replaceChildren()
    return
  }
  const { role, title, detail, heading } = TEXTS[kind]
  const box = document.createElement('div')
  if (role) box.setAttribute('role', role)
  const head = document.createElement(heading ? `h${heading}` : 'p')
  head.className = 'text-lg leading-6 font-extrabold'
  head.textContent = title
  if (heading === 1) head.tabIndex = -1
  box.append(head)
  if (detail) {
    const p = document.createElement('p')
    p.className = 'mt-3 font-light'
    p.textContent = detail
    box.append(p)
  }
  slot.replaceChildren(box)
  slot.hidden = false
  return head
}
