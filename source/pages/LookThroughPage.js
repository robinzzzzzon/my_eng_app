import '../styles/lookThroughStyles.css'
const utils = require('../utils')
const dictionary = require('../dictionary.json')
const TrainListPage = require('./TrainListPage')
const NewDictionaryPage = require('./NewDictionaryPage')

const contentRoot = document.querySelector('.content')

let speechPart
let currentDictionary = []

export function renderLookThroughPage(name) {
  speechPart = name

  if (!currentDictionary.length) {
    currentDictionary = dictionary.filter((item) => item.wordType === speechPart)
    currentDictionary = utils.filterCurrentDictionary(currentDictionary, speechPart)

    if (!currentDictionary.length) renderEmptyDictionary(true)
  }

  contentRoot.innerHTML = `
    <div class="cardRoot">
        <div class="cardWordArea" id="wordArea">
            <div><b>${currentDictionary[0].word}</b></div>
            <div>${currentDictionary[0].translate}</div> 
        </div>
        <div class="cardBtnDiv">
            <button class="myBtn btn-lg" id="knowBtn">Уже знаю</button> 
            <button class="myBtn btn-lg" id="studyBtn">Изучить</button>
        </div>
    </div>`

  const knowBtn = document.querySelector('#knowBtn')
  const studyBtn = document.querySelector('#studyBtn')

  knowBtn.addEventListener('click', showNewWord)
  studyBtn.addEventListener('click', studyThisWord)
}

export function showNewWord(event) {
  event.preventDefault()

  currentDictionary.shift()

  if (!currentDictionary.length) {
    renderEmptyDictionary()
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

function checkTrainAvailable() {
  if (!JSON.parse(localStorage.getItem(speechPart))) {
    const studyBtn = document.querySelector('#studyBtn')
    studyBtn.disabled = true
  } else {
    const studyBtn = document.querySelector('#studyBtn')
    studyBtn.addEventListener('click', () => TrainListPage.renderTrainListPage(speechPart))
  }
}

function renderEmptyDictionary() {
  const wordArea = document.querySelector('#wordArea')
  const cardBtnDiv = document.querySelector('.cardBtnDiv')

  wordArea.innerHTML = '<p>Вы посмотрели все слова!<br>Попробуем выучить новое? :)</p>'
  cardBtnDiv.innerHTML = `
      <button class="myBtn btn-lg" id="findNewBtn">Выбрать слова</button>
      <button class="myBtn btn-lg" id="studyBtn">Начать учить</button>
    `

  const findNewBtn = document.querySelector('#findNewBtn')
  findNewBtn.addEventListener('click', NewDictionaryPage.renderNewDictionariesPage)

  checkTrainAvailable()
}
