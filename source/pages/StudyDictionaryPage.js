const TrainListPage = require('./TrainListPage')
const utils = require('../utils')
const { speechList, domain } = require('../constants')

const content = document.querySelector('.content')

export async function renderPage() {
  let dictionaryRoot = document.createElement('div')
  dictionaryRoot.classList.add('dictionaryRoot')

  content.innerHTML = `
    <div class="d-flex align-items-center">
      <strong>Loading...</strong>
      <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
    </div>
    `

  // Пока оставить. Если проблема после подключения к апи будет актуальна - сделать реализацию.
  for (const key of Object.keys(localStorage)) {
    const item = utils.getWordsFromStorage(key)
    if (!item.length) localStorage.removeItem(key)
  }

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
