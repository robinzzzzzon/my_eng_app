import { domain } from '../constants'
const NewDictionaryPage = require('./NewDictionaryPage')
const StudyDictionaryPage = require('./StudyDictionaryPage')
const ActualDictionaryPage = require('./ActualDictionaryPage')
const utils = require('../utils')

const actionRoot = document.querySelector('.actionRoot')

export async function renderPage(event) {
  event.preventDefault()

  actionRoot.innerHTML = `
      <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    `

  const studyList = await utils.makeRequest({ methodType: 'GET', getUrl: `${domain}/words/study` })

  actionRoot.innerHTML = `
    <button class="dictionary initItem shadow-lg" data-name="choose">ВЫБРАТЬ СЛОВА</button>
    <button class="dictionary initItem shadow-lg" data-name="train">ТРЕНИРОВАТЬ СЛОВА</button>
    <button class="dictionary initItem shadow-lg" data-name="seeAll">МОЙ СЛОВАРЬ</button>
  `

  if (!studyList.data.length) {
    const trainBtn = document.querySelector('[data-name="train"]')
    trainBtn.disabled = 'true'

    const seeAllBtn = document.querySelector('[data-name="seeAll"]')
    seeAllBtn.disabled = 'true'
  }

  actionRoot.addEventListener('click', renderNextPage)
}

async function renderNextPage(event) {
  if (!event.target.dataset.name) return

  const name = event.target.dataset.name

  if (name === 'choose') {
    await NewDictionaryPage.renderPage()
  } else if (name === 'train') {
    await StudyDictionaryPage.renderPage()
  } else if (name === 'seeAll') {
    await ActualDictionaryPage.initPage()
  }
}
