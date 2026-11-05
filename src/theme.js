// Bouton « Dark Mode » (ADR-0008) : le thème initial est posé dans <head> avant le premier affichage

export function initTheme(button) {
  const root = document.documentElement
  const sync = () => button.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'))
  button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem('theme', root.dataset.theme)
    } catch {
      // stockage bloqué : le choix vaut pour cette visite
    }
    sync()
  })
  sync()
}
