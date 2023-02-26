import '../styles/writeTrainStyles.css'
const utils = require('../utils')
const constants = require('../constants')
const NewDictionaryPage = require('./NewDictionaryPage')

const content = document.querySelector('.content')

let speechPart
let initDictionary = null
let currentDictionary = null
let charIndex = 0

export async function renderPage(name) {
  speechPart = name

  content.innerHTML = constants.spinner

  if (!initDictionary) {
    initDictionary = await utils.makeRequest({
      methodType: 'GET',
      getUrl: `${constants.domain}/words/study`,
      getParams: { wordType: speechPart },
    })
  }

  if (!currentDictionary) {
    currentDictionary = await utils.makeRequest({
      methodType: 'GET',
      getUrl: `${constants.domain}/words/study`,
      getParams: { wordType: speechPart },
    })
  }

  content.innerHTML = `
    <div class="wrapper">
      <div class="myProgressBar shadow"></div>
      <div class="rootDiv shadow">
        <div class="translateDiv">${currentDictionary.data[0].translate}</div>
        <input type="text" class="writeInput" placeholder=" Пишите здесь...">
        <div class="btnDiv">
            <button class="myBtn" id="suggestBtn">Подсказать</button>
            <button class="myBtn" id="checkBtn">Проверить</button>
        </div>
      </div>
    </div>
    `

  utils.fillProgressBar(initDictionary, currentDictionary)

  const input = document.querySelector('.writeInput')
  input.focus()
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      checkWord(event)
    }
  })

  const suggestBtn = document.querySelector('#suggestBtn')
  suggestBtn.addEventListener('click', suggestChar)
  const checkBtn = document.querySelector('#checkBtn')
  checkBtn.addEventListener('click', checkWord)
}

function suggestChar(event) {
  event.preventDefault()

  let chars = currentDictionary.data[0].word.split('')
  const input = document.querySelector('.writeInput')
  let inputValue = input.value
  const currentValue = currentDictionary.data[0].word.substring(0, charIndex)

  if (inputValue !== currentValue || !chars[charIndex]) {
    return
  } else {
    inputValue = inputValue.concat(chars.slice(charIndex, charIndex + 1))
    input.value = inputValue
    charIndex++
  }
}

async function checkWord(event) {
  event.preventDefault()

  const input = document.querySelector('.writeInput')
  const enterWord = input.value.toLowerCase().trim()

  if (enterWord === currentDictionary.data[0].word) {
    await utils.modifyStudyLevel(speechPart, currentDictionary.data[0], true)

    currentDictionary.data.shift()

    input.style.backgroundColor = constants.system_colors.success
    charIndex = 0

    if (!currentDictionary.data.length) {
      currentDictionary = null
      initDictionary = null

      const progressBar = document.querySelector('.myProgressBar')
      progressBar.innerHTML = ''
      input.outerHTML = ''
      const translateDiv = document.querySelector('.translateDiv')
      translateDiv.textContent = 'Это было круто! Ты молодец :)'
      const btnDiv = document.querySelector('.btnDiv')
      btnDiv.innerHTML = ''
      const newBtn = document.createElement('button')
      newBtn.classList.add('myBtn')
      newBtn.setAttribute('id', 'findNewBtn')
      newBtn.textContent = 'Выбрать слова'
      const oneMoreBtn = document.createElement('button')
      oneMoreBtn.classList.add('myBtn')
      oneMoreBtn.setAttribute('id', 'retryBtn')
      oneMoreBtn.textContent = 'Еще раз'
      btnDiv.append(newBtn)
      btnDiv.append(oneMoreBtn)

      await utils.checkAvailableStudyWords(speechPart)

      newBtn.addEventListener('click', NewDictionaryPage.renderPage)
      oneMoreBtn.addEventListener('click', () => renderPage(speechPart))
    } else {
      setTimeout(() => {
        renderPage(speechPart)
      }, 200)
    }
  } else {
    await utils.modifyStudyLevel(speechPart, currentDictionary.data[0])

    input.style.backgroundColor = constants.system_colors.failed

    setTimeout(() => {
      clearProgress()
    }, 200)
  }
}

function clearProgress() {
  const input = document.querySelector('.writeInput')
  input.style.backgroundColor = ''
  input.value = ''
  charIndex = 0
}
