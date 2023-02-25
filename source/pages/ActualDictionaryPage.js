import { domain } from '../constants'
import '../styles/actualDictionaryStyles.css'
const utils = require('../utils')

const content = document.querySelector('.content')
let studyList = null

export async function initPage() {
  content.innerHTML = `<div class="actualDictionaryRoot"></div>`

  studyList = await utils.makeRequest({ methodType: 'GET', getUrl: `${domain}/words/study` })

  renderPage()
}

function renderPage() {
  const actualDictionaryRoot = document.querySelector('.actualDictionaryRoot')
  actualDictionaryRoot.innerHTML = ''

  for (let index = 0; index < studyList.data.length; index++) {
    const item = document.createElement('div')
    item.classList.add('actualItem')
    item.classList.add('shadow-sm')
    item.innerHTML = `
      <div id="word">${studyList.data[index].word}</div>
      <div id="translate">${studyList.data[index].translate}</div>
      <div class="wordBtnRoot">
        <button class="btn btn-outline-secondary btn-sm" id="clearProgress">Reset</button>
        <button class="btn btn-outline-warning btn-sm" id="removeWord">Delete</button>
      </div>
    `

    actualDictionaryRoot.append(item)
    item.addEventListener('click', clearWordProgress)
    item.addEventListener('click', removeWord)

    let windowInnerHeight = window.innerHeight - 250
    let actualDictionaryRootHeight = getComputedStyle(actualDictionaryRoot).height.substring(0, 4)

    if (windowInnerHeight < +actualDictionaryRootHeight) {
      actualDictionaryRoot.style.height = `${windowInnerHeight}px`
      actualDictionaryRoot.style.overflow = 'scroll'
    }
  }
}

async function clearWordProgress(event) {
  event.preventDefault()

  const clearBtn = event.target

  if (clearBtn.id !== 'clearProgress') return

  const itemWordText = this.querySelector('div').textContent

  await studyList.data.forEach((item) => {
    if (item.word === itemWordText) {
      item.studyLevel = 0
      utils.makeRequest({
        methodType: 'UPDATE',
        getUrl: `${domain}/words/study/${item._id}`,
        getBody: item,
      })
    }
  })
}

async function removeWord(event) {
  event.preventDefault()

  const removeBtn = event.target

  if (removeBtn.id !== 'removeWord') return

  let findWord = null
  const thisWordText = this.querySelector('div').textContent

  studyList.data.forEach((item) => {
    if (item.word === thisWordText) {
      findWord = item
    }
  })

  await utils.makeRequest({
    methodType: 'DELETE',
    getUrl: `${domain}/words/study/${findWord._id}`,
  })

  studyList.data = Array.from(studyList.data).filter((item) => item.word !== thisWordText)

  renderPage()
}
