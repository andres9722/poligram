import firebase from 'firebase'

const profile = () => {
  const d = document,
    c = console.log,
    user = firebase.auth().currentUser,
    dbRef = firebase.database().ref().child('photos')

    let profilePhotos = ''

  const profileScripts = setInterval(() => {
    if(d.readyState === 'complete') {
      clearInterval(profileScripts)
        dbRef.once('value', data =>  {
          //c(data, data.key, data.val())
          data.forEach(photo => {
            if(photo.val().uid === user.uid) {
              profilePhotos += `<img src="${photo.val().photoURL}">`
            }
          })
          d.querySelector('.profile-photos').innerHTML = profilePhotos
        })

        dbRef.on('child_added', data => {
          if(data.val().uid === user.uid) {
           d.querySelector('.profile-photos').innerHTML += `<img src="${data.val().photoURL}">`
          }
        })
    }
  }, 100)

return `
  <article class="profile content-section u-hide">
    <h2 class="profile-name">${user.displayName}</h2>
    <p class="profile-email">${user.email}</p>
    <img class="profile-avatar" src="${user.photoURL}">
    <h3 class="profile-your-photos">Tus fotos</h3>
    <aside class="profile-photos"></aside>
  </article>
  `
}

export default profile
