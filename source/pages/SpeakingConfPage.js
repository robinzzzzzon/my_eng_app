import '../styles/speakingConfStyles.css'
const SpeakingTrainingPage = require('../pages/SpeakingTrainingPage')

export function renderPage(event) {
  event.preventDefault()

  const contentRoot = document.querySelector('.content')

  contentRoot.innerHTML = `
  <div class="speakingConfRoot">
    <label for="tenses">Choose type of tenses:</label>
    <select class="form-select form-select-lg" id="tenses" aria-label="Eng Tenses">
      <option selected value="1">Simple</option>
      <option value="2">Simple, Continious</option>
      <option value="3">Simple, Continious, Perfect</option>
      <option value="4">Simple, Continious, Perfect, Perfect continious</option>
    </select>

    <label for="sentenseTypes">Choose type of sentences:</label>
    <select class="form-select form-select-lg" id="sentenseTypes" aria-label="Sentence types">
      <option selected value="1">Narrative</option>
      <option value="2">Narrative, Interrogative</option>
      <option value="3">Narrative, Interrogative, Negative</option>
    </select>

    <label for="levels">Choose difficulty level:</label>
    <select class="form-select form-select-lg" id="levels" aria-label="Difficulty training levels">
      <option selected value="1">First</option>
      <option value="2">Second</option>
      <option value="3">Third</option>
    </select>

    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="passiveVoice">
      <label class="form-check-label" for="passiveVoice">Should we use the passive voice?</label>
    </div>

    <button class="myBtn" id="confirmBtn">Confirm</button>
  </div>
  `

  const confirmBtn = document.querySelector('#confirmBtn')
  confirmBtn.addEventListener('click', (event) => {
    event.preventDefault()

    let config = document.querySelectorAll('.speakingConfRoot select')

    config = Array.from(config).map((select) => select.options[select.selectedIndex].text)

    const passiveToggle = document.querySelector('.speakingConfRoot input')
    config.push(passiveToggle.checked)

    SpeakingTrainingPage.renderPage(event, config)
  })
}
