import './styles/indexStyles.css'
import './styles/commonStyles.css'
const NewDictionaryPage = require('./pages/NewDictionaryPage')
const StudyDictionaryPage = require('./pages/StudyDictionaryPage')
const ActualDictionaryPage = require('./pages/ActualDictionaryPage')

const actionRoot = document.querySelector('.actionRoot')
actionRoot.addEventListener('click', renderIndexPage)

if (!localStorage.length) {
  const trainBtn = document.querySelector('[data-name="train"]')
  trainBtn.disabled = 'true'

  const seeAllBtn = document.querySelector('[data-name="seeAll"]')
  seeAllBtn.disabled = 'true'
}

export function renderIndexPage(event) {
  event.preventDefault()

  if (!event.target.dataset.name) return

  const name = event.target.dataset.name

  if (name === 'choose') {
    NewDictionaryPage.renderNewDictionariesPage()
  } else if (name === 'train') {
    StudyDictionaryPage.renderStudyDictionariesPage()
  } else if (name === 'seeAll') {
    ActualDictionaryPage.renderActualDictionaryPage()
  }
}
