import '../styles/puzzleTrainStyles.css'
const NewDictionaryPage = require('./NewDictionaryPage')
const utils = require('../utils')

const contentRoot = document.querySelector('.content')

let speechPart
let initDictionary = []
let currentDictionary = []

export function renderPuzzlePage(name) {
  speechPart = name

  if (!localStorage.length) {
    return
  } else if (!currentDictionary.length) {
    currentDictionary = utils.getWordsFromStorage(speechPart)
  }

  initDictionary = utils.getWordsFromStorage(speechPart)

  contentRoot.innerHTML = `
      <div class="wrapper">
        <div class="myProgressBar"></div>
        <div class="rootArea">
          <div class="spellArea">
            <div id="translateDiv">${currentDictionary[0].translate}</div>
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

  genCharacters(currentDictionary[0])

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

function clearWordProgress(event, word = currentDictionary[0]) {
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
  const keyChar = event.key
  const wordDiv = document.querySelector('#wordDiv')
  const charArea = document.querySelector('#charArea')
  wordDiv.style.gridTemplateColumns = `repeat(${currentDictionary[0].word.length}, 1fr)`
  const charsList = document.querySelectorAll('#charArea > .char')

  const arr = []
  charsList.forEach((item) => {
    if (item.textContent === keyChar) {
      arr.push(item)
      wordDiv.append(arr[0])
      return
    }
  })

  if (targetChar.id !== 'charArea') {
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

function checkEnterWord(event) {
  event.preventDefault()

  const rootArea = document.querySelector('.rootArea')
  const translateDiv = document.querySelector('#translateDiv')
  const wordDiv = document.querySelector('#wordDiv')
  const btnDiv = document.querySelector('.btnDiv')
  const checkBtn = document.querySelector('#checkBtn')
  const clearBtn = document.querySelector('#clearBtn')
  const resultChars = document.querySelectorAll('#wordDiv > .char')

  let resultWord = ''

  for (let index = 0; index < currentDictionary[0].word.length; index++) {
    resultWord = resultWord.concat(resultChars[index].textContent)
  }

  if (resultWord === currentDictionary[0].word) {
    utils.modifyStudyLevel(speechPart, currentDictionary[0], true)

    currentDictionary.shift()

    utils.fillProgressBar(initDictionary, currentDictionary)

    if (!currentDictionary.length) {
      toggleClassForChar(resultChars)

      setTimeout(() => {
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

        if (!JSON.parse(localStorage.getItem(speechPart)).length) {
          retryBtn.disabled = 'true'
          localStorage.removeItem(speechPart)
        }

        newBtn.addEventListener('click', NewDictionaryPage.renderNewDictionariesPage)
        retryBtn.addEventListener('click', () => renderPuzzlePage(speechPart))
      }, '300')
    } else {
      toggleClassForChar(resultChars)

      setTimeout(() => {
        wordDiv.innerHTML = ''
        charArea.innerHTML = ''
        translateDiv.textContent = currentDictionary[0].translate
        checkBtn.disabled = true
        clearBtn.disabled = false
        rootArea.style.height = '400px'
        checkBtn.style.marginTop = '15px'
        clearBtn.style.marginTop = '15px'

        genCharacters(currentDictionary[0])
      }, '300')
    }
  } else {
    utils.modifyStudyLevel(speechPart, currentDictionary[0])

    toggleClassForChar(resultChars, 'wrongChar')

    setTimeout(() => {
      clearWordProgress(event)
      checkBtn.disabled = true
      clearBtn.disabled = false
    }, '300')
  }
}

function toggleClassForChar(charArray, className = 'accessChar') {
  for (let index = 0; index < charArray.length; index++) {
    charArray[index].classList.toggle(className)
  }
}
