import './styles/indexStyles.css'
import './styles/commonStyles.css'
import './bootstrap/btstrp_css/bootstrap.min.css'
const VocabularyPage = require('./pages/VocabularyPage')
const SpeakingConfPage = require('./pages/SpeakingConfPage')

const actionRoot = document.querySelector('.actionRoot')
actionRoot.addEventListener('click', renderNextPage)

function renderNextPage(event) {
  event.preventDefault()

  if (!event.target.dataset.name) return

  const name = event.target.dataset.name

  if (name === 'vocabulary') {
    VocabularyPage.renderPage(event)
  } else if (name === 'speaking') {
    SpeakingConfPage.renderPage(event)
  }
}
