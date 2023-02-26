const TrainListPage = require('./TrainListPage')
const utils = require('../utils')
const { speechList, domain, spinner } = require('../constants')

const content = document.querySelector('.content')

export async function renderPage() {
  let dictionaryRoot = document.createElement('div')
  dictionaryRoot.classList.add('dictionaryRoot')

  content.innerHTML = spinner

  const allStudyList = await utils.makeRequest({
    methodType: 'GET',
    getUrl: `${domain}/words/study/`,
  })

  if (allStudyList.data.length) {
    const dictionary = createStudyDictionary()
    dictionaryRoot.append(dictionary)
  }

  for (let index = 0; index < speechList.length; index++) {
    const studyList = await utils.makeRequest({
      methodType: 'GET',
      getUrl: `${domain}/words/study/`,
      getParams: { wordType: speechList[index].dataName },
    })

    if (studyList.data.length) {
      const dictionary = createStudyDictionary(speechList[index])
      dictionaryRoot.append(dictionary)
    }
  }

  content.innerHTML = ''
  content.append(dictionaryRoot)

  dictionaryRoot.addEventListener('click', (event) => {
    event.preventDefault()

    if (!event.target.dataset.name) return

    const name = event.target.dataset.name

    TrainListPage.renderPage(name)
  })
}

function createStudyDictionary(speechListItem) {
  const dictionary = document.createElement('button')
  dictionary.classList.add('dictionary')
  dictionary.classList.add('shadow-lg')

  if (speechListItem) {
    dictionary.setAttribute('data-name', `${speechListItem.dataName}`)
    dictionary.textContent = speechListItem.translateName.toUpperCase()
    dictionary.style.backgroundColor = speechListItem.color
  } else {
    dictionary.setAttribute('data-name', 'all-study-words')
    dictionary.textContent = 'ВСЕ СЛОВА'
    dictionary.style.backgroundColor = '#2D9CA0'
  }

  return dictionary
}
