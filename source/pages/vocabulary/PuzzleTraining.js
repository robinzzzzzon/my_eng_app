import '../../styles/puzzleTraining.css'
import { spinner } from '../../utils/constants'
const NewDictionary = require('./NewDictionary')
const utils = require('../../utils/utils')

const content = document.querySelector('.content')

let speechPart = null
let initDictionary = null
let currentDictionary = null
let chars = null
let badgeSpanClassList = 'position-absolute translate-middle badge rounded-pill charSpan'

export async function renderPage(name) {
  speechPart = name

  content.innerHTML = spinner

  if (!initDictionary) {
    initDictionary = await utils.fillArray(speechPart)
  }

  if (!currentDictionary) {
    currentDictionary = await utils.fillArray(speechPart)
  }

  content.innerHTML = `
      <div class="wrapper">
        <div class="myProgressBar shadow"></div>
        <div class="rootArea shadow">
          <div class="spellArea">
            <div id="translateDiv">${currentDictionary.data[0].translate}</div>
              <div id="wordDiv"></div>
            </div>
            <div id="charArea" tabindex="0"></div>
            <div class="btnDiv">
                <button class="myBtn" id="checkBtn" disabled>Проверить</button>
                <button class="myBtn" id="clearBtn">Сбросить</button>
            </div>
          </div>
      </div>
    `

  utils.fillProgressBar(initDictionary, currentDictionary)

  genCharacters(currentDictionary.data[0])

  const checkBtn = document.querySelector('#checkBtn')
  const clearBtn = document.querySelector('#clearBtn')
  checkBtn.addEventListener('click', checkEnterWord)
  clearBtn.addEventListener('click', clearWordProgress)
  clearBtn.disabled = false
  const charArea = document.querySelector('#charArea')
  charArea.addEventListener('click', moveCharToWordArea)
  charArea.addEventListener('keydown', moveCharToWordArea)
}

function genCharacters(getWord) {
  do {
    chars = getWord.word.split('').sort(() => Math.random() - 0.5)
  } while (chars.join('') === getWord.word)

  const optimizeChars = utils.optimizeCharacters(chars)

  const charArea = document.querySelector('#charArea')
  charArea.style.gridTemplateColumns = `repeat(${optimizeChars.length}, 1fr)`

  for (let index = 0; index < optimizeChars.length; index++) {
    const charDiv = document.createElement('div')
    charDiv.classList.add('char')
    charDiv.style.position = 'relative'

    if (optimizeChars[index].count > 1) {
      charDiv.innerHTML = `
      ${optimizeChars[index].element} <span class="${badgeSpanClassList}">${optimizeChars[index].count}</span>
      `
    } else {
      charDiv.textContent = optimizeChars[index].element
    }

    charArea.append(charDiv)
  }

  charArea.style.outline = '0'
  charArea.focus()
}

function clearWordProgress(event, word = currentDictionary.data[0]) {
  event.preventDefault()

  const charArea = document.querySelector('#charArea')
  const wordDiv = document.querySelector('#wordDiv')
  charArea.innerHTML = ''
  wordDiv.innerHTML = ''

  genCharacters(word)
}

function moveCharToWordArea(event) {
  event.preventDefault()

  let key = event.key
  const target = event.target
  const charArea = document.querySelector('#charArea')
  const charsList = document.querySelectorAll('#charArea > .char')
  const wordDiv = document.querySelector('#wordDiv')
  wordDiv.style.gridTemplateColumns = `repeat(${currentDictionary.data[0].word.length}, 1fr)`

  if (key) {
    if (key === ' ') key = '-'

    for (let i = 0; i < charsList.length; i++) {
      if (charsList[i].textContent.trim().split(' ').join('').includes(key)) {
        handleKeyboardEvent(charsList[i], key)
        break
      }
    }
  }

  if (target.classList.contains('char')) {
    handleKeyboardEvent(target)
  }

  if (!charArea.innerHTML) {
    const checkBtn = document.querySelector('#checkBtn')
    const clearBtn = document.querySelector('#clearBtn')
    checkBtn.disabled = false
    clearBtn.disabled = true

    if (key === 'Enter') {
      checkBtn.addEventListener('keyDown', checkEnterWord(event))
    }
  }
}

function handleKeyboardEvent(getChar, getKey) {
  let content = getChar.textContent.trim().split(' ').join('')
  let key = getKey

  if (!key) {
    key = content.substring(0, 1)
  }

  let count = content.substring(1, 2)

  if (count > 1) {
    const charDiv = document.createElement('div')
    charDiv.classList.add('char')
    charDiv.innerHTML = `${key}`
    wordDiv.append(charDiv)

    getChar.innerHTML = `${key} <span class="${badgeSpanClassList}">${--count}</span>`
  } else {
    getChar.innerHTML = `${key}`
    wordDiv.append(getChar)
  }
}

async function checkEnterWord(event) {
  event.preventDefault()

  const translateDiv = document.querySelector('#translateDiv')
  const wordDiv = document.querySelector('#wordDiv')
  const btnDiv = document.querySelector('.btnDiv')
  const checkBtn = document.querySelector('#checkBtn')
  const clearBtn = document.querySelector('#clearBtn')
  const resultChars = document.querySelectorAll('#wordDiv > .char')

  let resultWord = ''

  for (let index = 0; index < currentDictionary.data[0].word.length; index++) {
    if (resultChars[index].textContent === '-') resultChars[index].textContent = ' '
    resultWord = resultWord.concat(resultChars[index].textContent)
  }

  if (resultWord === currentDictionary.data[0].word) {
    await utils.modifyStudyLevel(currentDictionary.data[0].word, true)

    currentDictionary.data.shift()

    if (!currentDictionary.data.length) {
      currentDictionary = null
      initDictionary = null

      toggleClassForChar(resultChars)

      const progressBar = document.querySelector('.myProgressBar')
      progressBar.innerHTML = ''
      translateDiv.textContent = 'Отлично! Тебе это удалось :)'
      wordDiv.innerHTML = ''
      btnDiv.innerHTML = ''
      const newBtn = document.createElement('button')
      newBtn.classList.add('myBtn')
      newBtn.setAttribute('id', 'findNewBtn')
      newBtn.textContent = 'Выбрать слова'
      const retryBtn = document.createElement('button')
      retryBtn.classList.add('myBtn')
      retryBtn.setAttribute('id', 'retryBtn')
      retryBtn.textContent = 'Еще раз'
      btnDiv.append(newBtn)
      btnDiv.append(retryBtn)

      await utils.checkAvailableStudyWords(speechPart)

      newBtn.addEventListener('click', NewDictionary.renderPage)
      retryBtn.addEventListener('click', () => renderPage(speechPart))
    } else {
      toggleClassForChar(resultChars)

      setTimeout(() => {
        renderPage(speechPart)
      }, 300)
    }
  } else {
    await utils.modifyStudyLevel(currentDictionary.data[0].word)

    toggleClassForChar(resultChars, 'wrongChar')

    setTimeout(() => {
      clearWordProgress(event)

      checkBtn.disabled = true
      clearBtn.disabled = false
    }, 300)
  }
}

function toggleClassForChar(charArray, className = 'accessChar') {
  for (let index = 0; index < charArray.length; index++) {
    charArray[index].classList.toggle(className)
  }
}
