const TrainListPage = require('./TrainListPage')
const { speechList } = require('../constants')

const content = document.querySelector('.content')

export function renderStudyDictionariesPage() {
  let dictionaryRoot = document.createElement('div')
  dictionaryRoot.classList.add('dictionaryRoot')

  for (let index = 0; index < localStorage.length; index++) {
    const dictionary = document.createElement('button')
    dictionary.classList.add('dictionary')
    dictionary.classList.add('shadow-lg')
    dictionary.setAttribute('data-name', `${localStorage.key(index)}`)
    if (localStorage.key(index) === 'all-study-words') {
      dictionary.textContent = 'ВСЕ СЛОВА'
    } else {
      const text = speechList.find((el) => el.dataName === localStorage.key(index))
      dictionary.textContent = text.translateName.toUpperCase()
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

    TrainListPage.renderTrainListPage(name)
  })
}
