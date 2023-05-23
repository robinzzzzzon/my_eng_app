import '../styles/puzzleTrainStyles.css'
import { domain, spinner } from '../constants'
const NewDictionaryPage = require('./NewDictionaryPage')
const utils = require('../utils')

const content = document.querySelector('.content')

let speechPart = null
let initDictionary = null
let currentDictionary = null
let chars = null

export async function renderPage(name) {
  speechPart = name

  content.innerHTML = spinner

  if (!initDictionary) {
    initDictionary = await utils.makeRequest({
      methodType: 'GET',
      getUrl: `${domain}/words/study`,
      getParams: { wordType: speechPart },
    })
  }

  if (!currentDictionary) {
    currentDictionary = await utils.makeRequest({
      methodType: 'GET',
      getUrl: `${domain}/words/study`,
      getParams: { wordType: speechPart },
    })
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

  chars = utils.optimizeCharacters(chars)

  const charArea = document.querySelector('#charArea')
  charArea.style.gridTemplateColumns = `repeat(${chars.length}, 1fr)`

  for (let index = 0; index < chars.length; index++) {
    const charDiv = document.createElement('div')
    charDiv.classList.add('char')

    if (chars[index].count > 1) {
      charDiv.innerHTML = `
      ${chars[index].element} <span class="badge charSpan">${chars[index].count}</span>
      `
    } else {
      charDiv.textContent = chars[index].element
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

  const targetChar = event.target
  const key = event.key
  const charArea = document.querySelector('#charArea')
  const charsList = document.querySelectorAll('#charArea > .char')
  const wordDiv = document.querySelector('#wordDiv')
  wordDiv.style.gridTemplateColumns = `repeat(${currentDictionary.data[0].word.length}, 1fr)`

  // подумать, может получится вынести обработку переноса для key и target в базовую реализацию
  charsList.forEach(char => {
    if (char.textContent.includes(key)) {

      let content = char.textContent.trim()

      let count = content.substring(2, 3)

      if (count > 1) {
        const charDiv = document.createElement('div')
        charDiv.classList.add('char')
        charDiv.innerHTML = `${key}`
        wordDiv.append(charDiv)

        char.innerHTML = `
        ${key} <span class="badge charSpan">${--count}</span>
        `
      } else {
        char.innerHTML = `${key}`
        wordDiv.append(char)
      }
    }
  })

  if (targetChar.classList.contains('char')) {
    
    let content = targetChar.textContent.trim()

      const key = content.substring(0, 1)
      let count = content.substring(2, 3)

      if (count > 1) {
        const charDiv = document.createElement('div')
        charDiv.classList.add('char')
        charDiv.innerHTML = `${key}`
        wordDiv.append(charDiv)

        targetChar.innerHTML = `
        ${key} <span class="badge charSpan">${--count}</span>
        `
      } else {
        targetChar.innerHTML = `${key}`
        wordDiv.append(targetChar)
      }
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
    resultWord = resultWord.concat(resultChars[index].textContent)
  }

  if (resultWord === currentDictionary.data[0].word) {
    await utils.modifyStudyLevel(speechPart, currentDictionary.data[0], true)

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

      newBtn.addEventListener('click', NewDictionaryPage.renderPage)
      retryBtn.addEventListener('click', () => renderPage(speechPart))
    } else {
      toggleClassForChar(resultChars)

      setTimeout(() => {
        renderPage(speechPart)
      }, 300)
    }
  } else {
    await utils.modifyStudyLevel(speechPart, currentDictionary.data[0])

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
