const LookThroughPage = require('./LookThroughPage')
const dictionary = require('../dictionary.json')
const utils = require('../utils')

const content = document.querySelector('.content')
const speechList = ['verbs', 'illegal verbs', 'phrazal verbs', 'nouns', 'adjectives', 'adverbs', 'pronouns', 'numerals', 'other parts', 'idioms']

export function renderNewDictionariesPage() {
  content.innerHTML = `<div class="dictionaryRoot"></div>`

  const dictionaryRoot = document.querySelector('.dictionaryRoot')

  for (let index = 0; index < speechList.length; index++) {
    const item = document.createElement('button')
    item.classList.add('dictionary')
    item.classList.add('shadow-lg')
    item.setAttribute('data-name', speechList[index])
    item.textContent = speechList[index].toUpperCase()

    const dictionaryList = dictionary.filter((item) => item.wordType === speechList[index])
    const storageList = utils.getWordsFromStorage(speechList[index])

    if (dictionaryList.length === storageList.length) item.disabled = 'true'

    dictionaryRoot.append(item)
  }

  dictionaryRoot.addEventListener('click', (event) => {
    event.preventDefault()

    if (!event.target.dataset.name) return

    const name = event.target.dataset.name

    LookThroughPage.renderLookThroughPage(name)
  })
}
