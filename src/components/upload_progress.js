export const progressBar = () => (`
  <div class="progress u-hide">
    <progress value="0" max="100" class="progress-bar"></progress>
    <span class="progress-advance"></span>
  </div>
  <div class="progress-output"></div>
`)

export const progressStatus = data => {
  const d = document,
    c = console.log,
    progress = d.querySelectorAll('.progress'),
    progressBar = d.querySelectorAll('.progress-bar'),
    progressAdvance = d.querySelectorAll('.progress-advace'),
    progressOutput = d.querySelectorAll('.progress-output')

    progress.forEach(progress => {
      let advance = Math.floor((data.bytesTransferred / data.totalBytes) * 100)
      progress.querySelector('.progress-bar').value = advance
      progress.querySelector('.progress-advance').innerHTML = `${advance}%`
      //c(advance)
    })
}

export const showProgress = () => document.querySelectorAll('.progress')
    .forEach(bar => bar.classList.remove('u-hide'))

export const hideProgress = () => document.querySelectorAll('.progress')
    .forEach(bar => bar.classList.add('u-hide'))

export const clearProgress = () => {
  const d = document
  d.querySelectorAll('.progress-output').forEach(output => output.innerHTML = '')
  d.querySelectorAll('.progress-bar').forEach(bar => bar.value = 0)
  d.querySelectorAll('.progress-advance').forEach(advance => advance.innerHTML = '')
}
