// Liste des régions sur mesure, motif « select-only combobox » de l'APG (ADR-0007)

const PLACEHOLDER = 'Filter by Region'

export function createRegionFilter({ onSelect }) {
  const button = document.querySelector('#region')
  const listbox = document.querySelector('#regions')
  const value = button.querySelector('[data-value]')
  const options = [...listbox.querySelectorAll('[role="option"]')]
  const last = options.length - 1
  let selected = 0
  let active = 0

  const isOpen = () => button.getAttribute('aria-expanded') === 'true'

  function setActive(index) {
    active = Math.max(0, Math.min(last, index))
    options.forEach((option, i) => option.classList.toggle('is-active', i === active))
    button.setAttribute('aria-activedescendant', options[active].id)
  }

  function open(index = selected) {
    listbox.hidden = false
    button.setAttribute('aria-expanded', 'true')
    setActive(index)
  }

  function close() {
    listbox.hidden = true
    button.setAttribute('aria-expanded', 'false')
    button.removeAttribute('aria-activedescendant')
    options.forEach((option) => option.classList.remove('is-active'))
  }

  function choose(index, notify = true) {
    selected = index
    options.forEach((option, i) => option.setAttribute('aria-selected', String(i === index)))
    value.textContent = index === 0 ? PLACEHOLDER : options[index].textContent
    if (notify) onSelect(options[index].dataset.region)
  }

  // Une lettre mène à la région suivante qui commence par elle
  function typeAhead(key) {
    const from = isOpen() ? active : selected
    for (let step = 1; step <= options.length; step++) {
      const i = (from + step) % options.length
      if (options[i].textContent.toLowerCase().startsWith(key.toLowerCase())) return i
    }
    return null
  }

  // Élément focalisable et non <button> (exemple de l'APG) : Entrée et Espace ne produisent pas de clic,
  // le clavier est géré par keydown ; un clic (souris ou lecteur d'écran) ouvre ou ferme
  button.addEventListener('click', () => {
    if (isOpen()) close()
    else open()
  })

  button.addEventListener('keydown', (event) => {
    const { key } = event
    const letter = key.length === 1 && key !== ' ' && !event.ctrlKey && !event.metaKey && !event.altKey
    if (!isOpen()) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) open()
      else if (key === 'Home') open(0)
      else if (key === 'End') open(last)
      else if (letter) open(typeAhead(key) ?? selected)
      else return
      event.preventDefault()
      return
    }
    switch (key) {
      case 'ArrowDown': setActive(active + 1); break
      case 'ArrowUp': setActive(active - 1); break
      case 'Home': case 'PageUp': setActive(0); break
      case 'End': case 'PageDown': setActive(last); break
      case 'Enter': case ' ': choose(active); close(); break
      case 'Escape': close(); break
      case 'Tab': choose(active); close(); return
      default:
        if (!letter) return
        setActive(typeAhead(key) ?? active)
    }
    event.preventDefault()
  })

  options.forEach((option, i) => {
    option.addEventListener('mousedown', (event) => event.preventDefault()) // le focus reste sur le bouton
    option.addEventListener('click', () => {
      choose(i)
      close()
      button.focus()
    })
  })

  document.addEventListener('pointerdown', (event) => {
    if (isOpen() && !button.parentElement.contains(event.target)) close()
  })

  return {
    set(region) {
      const i = options.findIndex((option) => option.dataset.region === region)
      choose(i < 0 ? 0 : i, false)
    },
  }
}
