const NewDictionaryPage = require('./NewDictionaryPage')
const StudyDictionaryPage = require('./StudyDictionaryPage')
const ActualDictionaryPage = require('./ActualDictionaryPage')

export function renderPage(event) {
  event.preventDefault()

  const actionRoot = document.querySelector('.actionRoot')
  actionRoot.innerHTML = `
    <button class="dictionary initItem shadow-lg" data-name="choose">ВЫБРАТЬ СЛОВА</button>
    <button class="dictionary initItem shadow-lg" data-name="train">ТРЕНИРОВАТЬ СЛОВА</button>
    <button class="dictionary initItem shadow-lg" data-name="seeAll">МОЙ СЛОВАРЬ</button>
  `

  if (!localStorage.length) {
    const trainBtn = document.querySelector('[data-name="train"]')
    trainBtn.disabled = 'true'

    const seeAllBtn = document.querySelector('[data-name="seeAll"]')
    seeAllBtn.disabled = 'true'
  }

  actionRoot.addEventListener('click', renderNextPage)
}

function renderNextPage(event) {
  if (!event.target.dataset.name) return

  const name = event.target.dataset.name

  if (name === 'choose') {
    NewDictionaryPage.renderPage()
  } else if (name === 'train') {
    StudyDictionaryPage.renderPage()
  } else if (name === 'seeAll') {
    ActualDictionaryPage.renderPage()
  }
}
