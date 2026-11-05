import './style.css'
import { loadCountries } from './data.js'
import { showMessage } from './messages.js'

const homeMessage = document.querySelector('#home-message')

showMessage(homeMessage, 'loading')
loadCountries()
  .then(() => showMessage(homeMessage, null))
  .catch(() => showMessage(homeMessage, 'error'))
