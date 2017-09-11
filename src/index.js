import css from './style.scss'
import { init, ga } from './components/helpers/init.js'
import {isAuth } from './components/auth.js'

init()

const app = `
  <main class="POLIgram">
    ${isAuth()}
  </main>
`

document.getElementById('root').innerHTML = app

ga()

