import '../styles/actualDictionaryStyles.css'
const utils = require('../utils')

const content = document.querySelector('.content')

export function renderActualDictionaryPage() {
  content.innerHTML = `<div class="actualDictionaryRoot"></div>`

  const actualDictinaryRoot = document.querySelector('.actualDictionaryRoot')
  const dictionary = utils.getWordsFromStorage('all-study-words')

  for (let index = 0; index < dictionary.length; index++) {
    const item = document.createElement('div')
    item.classList.add('actualItem')
    item.classList.add('shadow-sm')
    item.innerHTML = `
      <div id="word">${dictionary[index].word}</div>
      <div id="translate">${dictionary[index].translate}</div>
      <div class="wordBtnRoot">
        <button class="btn btn-outline-secondary btn-sm" id="clearProgress">Reset</button>
        <button class="btn btn-outline-warning btn-sm" id="removeWord">Delete</button>
      </div>
    `
    dictionary[index].word
    actualDictinaryRoot.append(item)
    item.addEventListener('click', clearWordProgress)
    item.addEventListener('click', removeWord)

    let windowInnerHeight = window.innerHeight - 250
    let actualDictionaryRootHeight = getComputedStyle(actualDictinaryRoot).height.substring(0, 4)

    if (windowInnerHeight < +actualDictionaryRootHeight) {
      actualDictinaryRoot.style.height = `${windowInnerHeight}px`
      actualDictinaryRoot.style.overflow = 'scroll'
    }
  }
}

function clearWordProgress(event) {
  event.preventDefault()

  const clearBtn = event.target

  if (clearBtn.id !== 'clearProgress') return

  const word = this.querySelector('div').textContent

  let findType

  const allWordsList = utils.getWordsFromStorage('all-study-words').map((item) => {
    if (item.word === word) {
      item.studyLevel = 0
      findType = item.wordType
    }
    return item
  })

  const typeWordsList = utils.getWordsFromStorage(findType).map((item) => {
    if (item.word === word) {
      item.studyLevel = 0
    }
    return item
  })

  localStorage.setItem('all-study-words', JSON.stringify(allWordsList))
  localStorage.setItem(findType, JSON.stringify(typeWordsList))
}

function removeWord(event) {
  event.preventDefault()

  const removeBtn = event.target

  if (removeBtn.id !== 'removeWord') return

  const word = this.querySelector('div').textContent

  let findType

  const allWordsList = utils.getWordsFromStorage('all-study-words').filter((item) => {
    if (item.word === word) {
      findType = item.wordType
      return
    }
    return item
  })

  const typeWordsList = utils.getWordsFromStorage(findType).filter((item) => item.word !== word)

  if (!typeWordsList.length) {
    localStorage.removeItem(findType)
  } else {
    localStorage.setItem(findType, JSON.stringify(typeWordsList))
  }

  if (!allWordsList.length) {
    localStorage.removeItem('all-study-words')
  } else {
    localStorage.setItem('all-study-words', JSON.stringify(allWordsList))
  }

  renderActualDictionaryPage()
}
