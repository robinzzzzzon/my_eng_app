const LookThroughPage = require('./LookThroughPage')
const utils = require('../utils')
const { speechList, domain, spinner } = require('../constants')

const content = document.querySelector('.content')

export async function renderPage() {
  let dictionaryRoot = document.createElement('div')
  dictionaryRoot.classList.add('dictionaryRoot')

  content.innerHTML = spinner

  for (let index = 0; index < speechList.length; index++) {
    const item = document.createElement('button')
    item.classList.add('dictionary')
    item.classList.add('shadow-lg')
    item.style.backgroundColor = speechList[index].color
    item.setAttribute('data-name', speechList[index].dataName)
    item.textContent = speechList[index].translateName.toUpperCase()

    const dictionaryList = await utils.makeRequest({
      methodType: 'GET',
      getUrl: `${domain}/words/init/`,
      getParams: { wordType: speechList[index].dataName },
    })

    const studyList = await utils.makeRequest({
      methodType: 'GET',
      getUrl: `${domain}/words/study/`,
      getParams: { wordType: speechList[index].dataName },
    })

    if (dictionaryList.data.length === studyList.data.length) item.disabled = 'true'

    dictionaryRoot.append(item)
  }

  content.innerHTML = ''
  content.append(dictionaryRoot)

  dictionaryRoot.addEventListener('click', (event) => {
    event.preventDefault()

    if (!event.target.dataset.name) return

    const name = event.target.dataset.name

    LookThroughPage.initPage(name)
  })
}
