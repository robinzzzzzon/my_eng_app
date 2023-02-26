import '../styles/puzzleTrainStyles.css'
import { domain, spinner } from '../constants'
const NewDictionaryPage = require('./NewDictionaryPage')
const utils = require('../utils')

const content = document.querySelector('.content')

let speechPart
let initDictionary = null
let currentDictionary = null

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
  let chars

  do {
    chars = getWord.word.split('').sort(() => Math.random() - 0.5)
  } while (chars.join('') === getWord.word)

  const charArea = document.querySelector('#charArea')
  charArea.style.gridTemplateColumns = `repeat(${chars.length}, 1fr)`

  for (let index = 0; index < chars.length; index++) {
    const charDiv = document.createElement('div')
    charDiv.classList.add('char')
    charDiv.textContent = chars[index]
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

// функция для эвентов по клику или по нажатию клавиши:
function moveCharToWordArea(event) {
  event.preventDefault()

  const targetChar = event.target
  const keyChar = event.key
  const charsList = document.querySelectorAll('#charArea > .char')
  const charArea = document.querySelector('#charArea')
  const wordDiv = document.querySelector('#wordDiv')
  wordDiv.style.gridTemplateColumns = `repeat(${currentDictionary.data[0].word.length}, 1fr)`

  // по 1му совпадению с клавиатуры перемещаем char:
  const arr = []
  charsList.forEach((item) => {
    if (item.textContent === keyChar) {
      arr.push(item)
      wordDiv.append(arr[0])
      return
    }
  })

  if (targetChar.classList.contains('char')) {
    wordDiv.append(targetChar)
  }

  if (!charArea.innerHTML) {
    const checkBtn = document.querySelector('#checkBtn')
    const clearBtn = document.querySelector('#clearBtn')
    checkBtn.disabled = false
    clearBtn.disabled = true

    if (keyChar === 'Enter') {
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
