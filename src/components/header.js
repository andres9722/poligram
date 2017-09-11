import { signOut } from './auth.js'

const header = () => (`
  <header class="header u-fixed">
    <h1 class="header-logo">poligram</h1>
    <h1 class="header-title">poligram</h1>
    ${signOut()}
  </header>
`)

export default header
