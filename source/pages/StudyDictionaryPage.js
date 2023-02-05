const TrainListPage = require('./TrainListPage')
const utils = require('../utils')
const { speechList } = require('../constants')

const content = document.querySelector('.content')

export function renderPage() {
  let dictionaryRoot = document.createElement('div')
  dictionaryRoot.classList.add('dictionaryRoot')

  for (const key of Object.keys(localStorage)) {
    const item = utils.getWordsFromStorage(key)
    if (!item.length) localStorage.removeItem(key)
  }

  for (let index = 0; index < localStorage.length; index++) {
    const dictionary = document.createElement('button')
    dictionary.classList.add('dictionary')
    dictionary.classList.add('shadow-lg')
    dictionary.setAttribute('data-name', `${localStorage.key(index)}`)
    if (localStorage.key(index) === 'all-study-words') {
      dictionary.textContent = 'ВСЕ СЛОВА'
      dictionary.style.backgroundColor = '#2D9CA0'
    } else {
      const findDictionary = speechList.find((el) => el.dataName === localStorage.key(index))
      dictionary.textContent = findDictionary.translateName.toUpperCase()
      dictionary.style.backgroundColor = findDictionary.color
    }

    dictionaryRoot.append(dictionary)
  }

  content.innerHTML = ''
  content.append(dictionaryRoot)

  dictionaryRoot = document.querySelector('.dictionaryRoot')

  dictionaryRoot.addEventListener('click', (event) => {
    event.preventDefault()

    if (!event.target.dataset.name) return

    const name = event.target.dataset.name

    TrainListPage.renderPage(name)
  })
}
