import '../styles/lookThroughStyles.css'
import { domain, spinner } from '../constants'
const utils = require('../utils')
const TrainListPage = require('./TrainListPage')
const NewDictionaryPage = require('./NewDictionaryPage')
const axios = require('axios').default

const content = document.querySelector('.content')

let speechPart
let currentDictionary = []
let studyWordCounter = 0

export async function initPage(name) {
  speechPart = name

  content.innerHTML = spinner

  if (!currentDictionary.length) {
    currentDictionary = await utils.makeRequest({
      methodType: 'GET',
      getUrl: `${domain}/words/init/`,
      getParams: { wordType: speechPart },
    })

    currentDictionary = await utils.filterCurrentDictionary(currentDictionary, speechPart)

    if (!currentDictionary.data.length) renderEmptyDictionary()
  }

  renderPage()
}

function renderPage() {
  content.innerHTML = `
    <div class="cardRoot shadow">
        <div class="cardWordArea" id="wordArea">
            <div><b>${currentDictionary.data[0].word}</b></div>
            <div>${currentDictionary.data[0].translate}</div> 
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

function showNewWord(event) {
  event.preventDefault()

  currentDictionary.data.shift()

  if (!currentDictionary.data.length) {
    renderEmptyDictionary()
  } else {
    renderPage()
  }
}

async function studyThisWord(event) {
  event.preventDefault()

  const studyBtn = document.querySelector('#studyBtn')
  studyBtn.textContent = ''
  studyBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
  studyBtn.disabled = true

  const addStudyWord = {
    word: currentDictionary.data[0].word,
    translate: currentDictionary.data[0].translate,
    wordType: currentDictionary.data[0].wordType,
    studyLevel: 0,
  }

  await axios.post(`${domain}/words/study/`, addStudyWord)

  studyBtn.innerHTML = ''
  studyBtn.textContent = 'Изучить'
  studyBtn.disabled = false

  studyWordCounter++

  if (studyWordCounter === 10) {
    showTrainSuggest()
  } else {
    showNewWord(event)
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
  findNewBtn.addEventListener('click', NewDictionaryPage.renderPage)

  checkTrainAvailable()
}

async function checkTrainAvailable() {
  const studyList = await utils.makeRequest({
    methodType: 'GET',
    getUrl: `${domain}/words/study/`,
    getParams: { wordType: speechPart },
  })

  if (!studyList.data.length) {
    const studyBtn = document.querySelector('#studyBtn')
    studyBtn.disabled = true
  } else {
    const studyBtn = document.querySelector('#studyBtn')
    studyBtn.addEventListener('click', () => TrainListPage.renderPage(speechPart))
  }
}

function showTrainSuggest() {
  currentDictionary.data.shift()

  const wordArea = document.querySelector('#wordArea')
  const cardBtnDiv = document.querySelector('.cardBtnDiv')

  wordArea.innerHTML = '<p>Хороший набор слов. <br>Переходим к тренировкам?)</p>'
  cardBtnDiv.innerHTML = `
      <button class="myBtn btn-lg" id="startTrainBtn">Тренировать</button>
      <button class="myBtn btn-lg" id="goOnBtn">Пока нет</button>
    `

  const trainBtn = document.querySelector('#startTrainBtn')
  trainBtn.addEventListener('click', () => TrainListPage.renderPage(speechPart))
  const goOnBtn = document.querySelector('#goOnBtn')
  goOnBtn.addEventListener('click', () => {
    studyWordCounter = 0
    renderPage()
  })
}
