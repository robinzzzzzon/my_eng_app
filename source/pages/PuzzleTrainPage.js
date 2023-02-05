import '../styles/puzzleTrainStyles.css'
const NewDictionaryPage = require('./NewDictionaryPage')
const utils = require('../utils')

const contentRoot = document.querySelector('.content')

let speechPart
let initDictionary = []
let currentDictionary = []

export function renderPage(name) {
  speechPart = name

  initDictionary = utils.getWordsFromStorage(speechPart)

  if (!localStorage.length) {
    return
  } else if (!currentDictionary.length) {
    currentDictionary = utils.getWordsFromStorage(speechPart)
  }

  contentRoot.innerHTML = `
      <div class="wrapper">
        <div class="myProgressBar shadow"></div>
        <div class="rootArea shadow">
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

// функция для эвентов по клику или по нажатию клавиши:
function moveCharToWordArea(event) {
  event.preventDefault()

  const targetChar = event.target
  const keyChar = event.key
  const wordDiv = document.querySelector('#wordDiv')
  const charArea = document.querySelector('#charArea')
  wordDiv.style.gridTemplateColumns = `repeat(${currentDictionary[0].word.length}, 1fr)`
  const charsList = document.querySelectorAll('#charArea > .char')

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

function checkEnterWord(event) {
  event.preventDefault()

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

    if (!currentDictionary.length) {
      toggleClassForChar(resultChars)

      setTimeout(() => {
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

        utils.checkEmptyStorageBySpeechPart(speechPart)

        newBtn.addEventListener('click', NewDictionaryPage.renderPage)
        retryBtn.addEventListener('click', () => renderPage(speechPart))
      }, '300')
    } else {
      toggleClassForChar(resultChars)

      setTimeout(() => {
        renderPage(speechPart)
      }, 300)
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
