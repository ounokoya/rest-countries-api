// Filtre des régions (ADR-0010) : un bouton ouvre la liste, des boutons radio natifs ;
// le navigateur gère le groupe (Tab, flèches) et les lecteurs d'écran

const PLACEHOLDER = 'Filter by Region'

export function createRegionFilter({ onSelect }) {
  const button = document.querySelector('#region')
  const panel = document.querySelector('#regions')
  const value = document.querySelector('#region-value')
  const root = button.parentElement
  const radios = [...panel.querySelectorAll('input[type="radio"]')]

  const isOpen = () => button.getAttribute('aria-expanded') === 'true'

  function open() {
    panel.hidden = false
    button.setAttribute('aria-expanded', 'true')
  }

  function close(focusButton = false) {
    if (!isOpen()) return
    panel.hidden = true
    button.setAttribute('aria-expanded', 'false')
    if (focusButton) button.focus()
  }

  // Le bouton affiche la région choisie ; son nom reste « Filter by Region » (suivi de la région)
  function show(region) {
    value.textContent = region || PLACEHOLDER
    button.setAttribute('aria-labelledby', region ? 'region-label region-value' : 'region-value')
  }

  button.addEventListener('click', () => (isOpen() ? close() : open()))

  for (const radio of radios) {
    radio.addEventListener('change', () => {
      show(radio.value)
      onSelect(radio.value)
    })
  }

  // Un clic de souris sur une région ferme la liste ; les flèches (clic de detail 0) choisissent sans fermer
  panel.addEventListener('click', (event) => {
    if (event.target.matches('input') && event.detail > 0) close(true)
  })

  root.addEventListener('keydown', (event) => {
    if (!isOpen()) return
    if (event.key === 'Escape' || (event.key === 'Enter' && event.target.matches('input'))) {
      event.preventDefault()
      close(true)
    }
  })

  // Focus ou clic hors du filtre : la liste se ferme
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget)) close()
  })
  document.addEventListener('pointerdown', (event) => {
    if (!root.contains(event.target)) close()
  })

  return {
    set(region) {
      const radio = radios.find((r) => r.value === region) || radios[0]
      radio.checked = true
      show(radio.value)
    },
  }
}
