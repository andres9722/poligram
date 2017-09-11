import firebase from 'firebase'
import { pwa, isOnLine } from './helpers/init.js'
import app from './app.js'

const d = document,
  c = console.log

const githubSignIn = () => {
  const provider = new firebase.auth.GithubAuthProvider()
  firebase.auth().signInWithPopup(provider)
    .then(result => c(`${result.user.email} ha iniciado sesion con Github`, result))
    .catch(err => c(`Error: ${err.code}: ${err.message}`))
}

const githubSignOut = () =>  {
  firebase.auth().signOut()
    .then( () => c('Te has desconectado correctamente de GitHub'))
    .catch( () => c('Ocurrio un error al desconectarse de Github'))
}

const signIn = () => {
  d.addEventListener('click', e => {
    if(e.target.matches('.sign-button'))
      githubSignIn()
  })

  return `
    <div class="sign">
      <h1 class="sign-title">POLIgram</h1>
      <h1 class="sign-retitle">poligram</h1>
      <button class="sign-button">
        <i class="fa fa-sign-in"></i>
        Entra con
        <i class="fa fa-github"></i>
      </button>
    </div>
  `
}

export const signOut = () => {
  d.addEventListener('click', e => {
    if(e.target.matches('.logout'))
      githubSignOut()
  })

  return `
    <div class="sign header-logot">
      <button class="logout">
        <i class="logout fa fa-sign-out"></i>
      </button>
    </div>
  `
}

export const isAuth = () => {
  firebase.auth().onAuthStateChanged(user => {
    const POLIgram = d.querySelector('.POLIgram')
    //c(user)

    if(user) {
      POLIgram.innerHTML = app()
      POLIgram.classList.add('u-jc-flex-start')
      pwa()
      //c('Usuario autenticado')
    } else {
      POLIgram.innerHTML = signIn()
      POLIgram.classList.remove('u-jc-flex-start')
      //c('Usuario NO autenticado')
    }

    isOnLine()
  })
}
