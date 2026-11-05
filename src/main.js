import './style.css'
import { loadCountries } from './data.js'
import { parse } from './router.js'
import { showMessage } from './messages.js'
import { createHome } from './home.js'

const home = createHome({ onChange: () => {} })
let status = 'loading'

function render() {
  const route = parse()
  if (status !== 'ready') return showMessage(home.message, status)
  home.show(route)
}

render()
loadCountries()
  .then((countries) => {
    home.setCountries(countries)
    status = 'ready'
    render()
  })
  .catch(() => {
    status = 'error'
    render()
  })
