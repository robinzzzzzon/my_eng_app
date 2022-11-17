import '../styles/lookThroughStyles.css'
const utils = require('../utils')
const dictionary = require('../dictionary.json')
const TrainListPage = require('./TrainListPage')
const NewDictionaryPage = require('./NewDictionaryPage')

const contentRoot = document.querySelector('.content')

let speechPart
let indexPart = 0
let initDictionary = []
let currentDictionary = []

export function renderLookThroughPage(name) {
  speechPart = name

  initDictionary = dictionary.filter((item) => item.wordType === speechPart)

  if (!currentDictionary.length) {
    currentDictionary = utils.getNewPartOfDictionary(speechPart, dictionary, indexPart)

    let studyArray = JSON.parse(localStorage.getItem(speechPart))

    if (studyArray) {
      studyArray = studyArray.map((item) => item.word)

      currentDictionary = currentDictionary.filter((item) => !studyArray.includes(item.word))

      if (!currentDictionary.length) {
        do {
          indexPart++
          currentDictionary = utils.getNewPartOfDictionary(speechPart, dictionary, indexPart)
        } while (!currentDictionary.length)
      }
    }
  }

  contentRoot.innerHTML = `
    <div class="cardRoot">
        <div class="cardWordArea" id="wordArea">
            <div><b>${currentDictionary[0].word}</b></div>
            <hr color=#cff0fe opacity=0.8>
            <div>${currentDictionary[0].translate}</div> 
        </div>
        <div class="cardBtnDiv">
            <button type="submit" class="btn" id="knowBtn">Уже знаю</button> 
            <button type="submit" class="btn studyBtn">Изучить</button>
        </div>
    </div>`

  const knowBtn = document.querySelector('#knowBtn')
  const studyBtn = document.querySelector('.studyBtn')

  knowBtn.addEventListener('click', showNewWord)
  studyBtn.addEventListener('click', studyThisWord)
}

export function showNewWord(event) {
  event.preventDefault()

  let currentWord = currentDictionary.shift()

  if (!currentDictionary.length) {
    let lastDictionaryWord = initDictionary.at(initDictionary.length - 1)

    if (currentWord.word === lastDictionaryWord.word) {
      renderEmptyDictionary(true)
    } else {
      renderEmptyDictionary()
    }
  } else {
    renderLookThroughPage(speechPart)
  }
}

function studyThisWord(event) {
  event.preventDefault()

  utils.addWordToStorage(currentDictionary[0], `${speechPart}`)
  utils.addWordToStorage(currentDictionary[0], `all-study-words`)

  showNewWord(event)
}

function startShowNewPart(event) {
  event.preventDefault()

  indexPart++
  renderLookThroughPage(speechPart)
}

function checkTrainAvailable(selector) {
  if (!JSON.parse(localStorage.getItem(speechPart))) {
    const studyBtn = document.querySelector(selector)
    studyBtn.disabled = true
  } else {
    const studyBtn = document.querySelector(selector)
    studyBtn.addEventListener('click', () => TrainListPage.renderTrainListPage(speechPart))
  }
}

function renderEmptyDictionary(isFinished) {
  const wordArea = document.querySelector('#wordArea')
  const cardBtnDiv = document.querySelector('.cardBtnDiv')

  if (isFinished) {
    indexPart = 0
    wordArea.innerHTML = '<p>Вы посмотрели все слова!<br>Попробуем выучить новое? :)</p>'
    cardBtnDiv.innerHTML = `
        <button type="submit" class="btn" id="findNewBtn">Выбрать слова</button>
        <button type="submit" class="btn studyBtn">Начать учить</button>
    `

    const findNewBtn = document.querySelector('#findNewBtn')
    findNewBtn.addEventListener('click', NewDictionaryPage.renderNewDictionariesPage)

    checkTrainAvailable('.studyBtn')
  } else {
    wordArea.innerHTML = '<p>Слова просмотрены!<br>Как на счет новых?</p>'
    cardBtnDiv.innerHTML = `
        <button type="submit" class="btn goOnBtn">Хочу еще</button>
        <button type="submit" class="btn studyBtn">Начать учить</button>
    `

    const goOnBtn = document.querySelector('.goOnBtn')
    goOnBtn.addEventListener('click', startShowNewPart)

    checkTrainAvailable('.studyBtn')
  }
}
