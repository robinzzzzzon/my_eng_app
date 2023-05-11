import { domain, spinner } from '../constants'
const NewDictionaryPage = require('./NewDictionaryPage')
const StudyDictionaryPage = require('./StudyDictionaryPage')
const ActualDictionaryPage = require('./ActualDictionaryPage')
const NewDictionaryWordPage = require('./NewDictionaryWordPage')
const utils = require('../utils')

const actionRoot = document.querySelector('.actionRoot')

export async function renderPage(event) {
  event.preventDefault()

  actionRoot.innerHTML = spinner

  const studyList = await utils.makeRequest({ methodType: 'GET', getUrl: `${domain}/words/study` })

  actionRoot.innerHTML = `
    <button class="dictionary initItem shadow-lg" data-name="choose">CHOOSE WORDS</button>
    <button class="dictionary initItem shadow-lg" data-name="train">STUDY WORDS</button>
    <button class="dictionary initItem shadow-lg" data-name="seeAll">MY DICTIONARY</button>
    <button class="dictionary initItem shadow-lg" data-name="addNew">ADD DICTIONARY WORD</button>
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
  } else if (name === 'addNew') {
    await NewDictionaryWordPage.renderPage()
  }
}
