import firebase from 'firebase'
import { clearProgress } from './upload_progress'


const footer = () => {
  const d = document,
    c = console.log

  const footerScripts = setInterval(() => {
    if(d.readyState === 'complete') {
      clearInterval(footerScripts)

      const nav = d.querySelector('.footer-menu'),
        sections = d.querySelectorAll('.content-section')

      nav.addEventListener('click', e => {
        e.preventDefault()
        window.scrollTo(0,0)
        if(e.target.parentElement.matches('button')) {
          let btn = e.target.parentElement,
            btnSection = btn.className.split('-')[0]

          sections.forEach(section => {
            if(section.classList.contains(btnSection)) {
              section.classList.add('u-show', 'u-fadein')
              section.classList.remove('u-hide')
            } else {
              section.classList.remove('u-show')
              section.classList.add('u-hide', 'u-fadein')
            }
          })
          clearProgress()
          //c(btn, btnSection)
        }
      })
    }
  }, 100)

return `
  <footer class="footer u-fixed">
    <nav class="footer-menu">
      <button class="profile-button" title="Perfil">
        <i class="fa fa-user"></i>
      </button>
      <button class="uploader-button" title="Perfil">
        <i class="fa fa-picture-o"></i>
      </button>
      <button class="timeline-button" title="Perfil">
        <i class="fa fa-home"></i>
      </button>
      <button class="camera-button" title="Perfil">
        <i class="fa fa-camera"></i>
      </button>
    </nav>
  </footer>
  `
}

export default footer
