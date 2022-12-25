const LookThroughPage = require('./LookThroughPage')
const dictionary = require('../dictionary.json')
const utils = require('../utils')
const { speechList } = require('../constants')

const content = document.querySelector('.content')

export function renderNewDictionariesPage() {
  content.innerHTML = `<div class="dictionaryRoot"></div>`

  const dictionaryRoot = document.querySelector('.dictionaryRoot')

  for (let index = 0; index < speechList.length; index++) {
    const item = document.createElement('button')
    item.classList.add('dictionary')
    item.classList.add('shadow-lg')
    item.style.backgroundColor = speechList[index].color
    item.setAttribute('data-name', speechList[index].dataName)
    item.textContent = speechList[index].translateName.toUpperCase()

    const dictionaryList = dictionary.filter((item) => item.wordType === speechList[index].dataName)
    const storageList = utils.getWordsFromStorage(speechList[index].dataName)

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
