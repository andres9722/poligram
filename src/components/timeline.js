import firebase from 'firebase'

const timeline = () => {
  const d = document,
    c = console.log,
    dbRef = firebase.database().ref().child('photos')

  const timelineScripts = setInterval(() => {
    if(d.readyState === 'complete') {
      clearInterval(timelineScripts)
      const timelinePhotos = d.querySelector('.timeline-photos')

      function photoTemplate(obj) {
        return `
          <figure class="photo">
            <img class="photo-image" src="${obj.photoURL}">
            <figcaption class="photo-author">
              <img src="${obj.avatar}" class="photo-author__avatar">
              <p class="photo-author__name">${obj.displayName}</p>
            </figcaption>
            <section class="icons">
              <i class="fa fa-heart"></i>
              <i class="fa fa-comment"></i>
              <i class="fa fa-share"></i>
            </section>
          </figure>
        `
      }

      dbRef.once('value', data =>  {
        //c(data, data.key, data.val())
        data.forEach(photo => {
          timelinePhotos.insertAdjacentHTML('afterbegin', photoTemplate(photo.val()))
        })
      })

      dbRef.on('child_added', data => {
        timelinePhotos.insertAdjacentHTML('afterbegin', photoTemplate(data.val()))
      })
    }
  }, 100)

return `
  <article class="timeline content-section u-show">
    <aside class="timeline-photos"></aside>
  </article>
  `
}

export default timeline
