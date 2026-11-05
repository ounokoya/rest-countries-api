import './style.css'
import { loadCountries } from './data.js'
import { parse, homeHash } from './router.js'
import { showMessage } from './messages.js'
import { createHome } from './home.js'
import { createDetail } from './detail.js'
import { initTheme } from './theme.js'

const TITLE = document.title
const homeView = document.querySelector('#home')
const detailView = document.querySelector('#detail')
let status = 'loading'
let previous = null // écran affiché avant celui-ci
let listHash = '#/' // dernière liste vue, avec sa recherche et sa région
let lastCode = null // pays de la dernière fiche, pour rendre le focus à sa carte
let cameFromList = false

initTheme(document.querySelector('#theme'))

const home = createHome({ onChange: (hash) => { listHash = hash } })
const detail = createDetail()

// Back : retour d'historique quand on vient de la liste, sinon le lien mène à la dernière liste (Q4)
document.querySelector('#back').addEventListener('click', (event) => {
  if (!cameFromList) return
  event.preventDefault()
  history.back()
})

function render(navigated) {
  const route = parse()
  homeView.hidden = route.view !== 'home'
  detailView.hidden = route.view !== 'detail'
  if (route.view === 'detail') {
    if (navigated) cameFromList = previous?.view === 'home'
    window.scrollTo(0, 0)
  }
  if (status !== 'ready') {
    if (route.view === 'detail') document.querySelector('#country').hidden = true
    showMessage(route.view === 'home' ? home.message : detail.message, status)
  } else if (route.view === 'home') {
    listHash = homeHash(route)
    document.title = TITLE
    home.show(route, { focusCode: navigated && previous?.view === 'detail' ? lastCode : null })
  } else {
    lastCode = route.code
    detail.show(route.code, { focus: navigated, backHref: listHash })
  }
  previous = route
}

window.addEventListener('hashchange', () => render(true))
render(false)
loadCountries()
  .then((countries) => {
    home.setCountries(countries)
    detail.setCountries(countries)
    status = 'ready'
    render(false)
  })
  .catch(() => {
    status = 'error'
    render(false)
  })
