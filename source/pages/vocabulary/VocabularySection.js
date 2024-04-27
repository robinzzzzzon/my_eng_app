import { domain, spinner } from '../../utils/constants'
const NewDictionary = require('./NewDictionary')
const StudyDictionary = require('./StudyDictionary')
const ActualDictionary = require('./ActualDictionary')
const AddDictionaryWord = require('./AddDictionaryWord')
const utils = require('../../utils/utils')

const actionRoot = document.querySelector('.actionRoot')

export async function renderPage(event) {
  event.preventDefault()

  actionRoot.innerHTML = spinner

  const studyList = await utils.makeRequest({ methodType: 'GET', getUrl: `${domain}/words/study` })

  actionRoot.innerHTML = `
    <button class="dictionary initItem shadow-lg" data-name="seekNew">CHOOSE WORDS</button>
    <button class="dictionary initItem shadow-lg" data-name="getTraining">STUDY WORDS</button>
    <button class="dictionary initItem shadow-lg" data-name="seeActual">MY DICTIONARY</button>
    <button class="dictionary initItem shadow-lg" data-name="addNew">ADD DICTIONARY WORD</button>
  `

  if (!studyList.data.length) {
    const trainingBtn = document.querySelector('[data-name="getTraining"]')
    trainingBtn.disabled = 'true'

    const seeActualBtn = document.querySelector('[data-name="seeActual"]')
    seeActualBtn.disabled = 'true'
  }

  actionRoot.addEventListener('click', renderNextPage)
}

async function renderNextPage(event) {
  if (!event.target.dataset.name) return

  const name = event.target.dataset.name

  if (name === 'seekNew') {
    await NewDictionary.renderPage()
  } else if (name === 'getTraining') {
    await StudyDictionary.renderPage()
  } else if (name === 'seeActual') {
    await ActualDictionary.initPage()
  } else if (name === 'addNew') {
    await AddDictionaryWord.renderPage()
  }
}
