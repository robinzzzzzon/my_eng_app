import '../styles/chooseTrainStyles.css'
const utils = require('../utils')
const fullDictionary = require('../dictionary.json')
const NewDictionaryPage = require('./NewDictionaryPage')

const contentRoot = document.querySelector('.content')

let speechPart
let currentDictionary = []

export function renderChoosePage(name) {
  speechPart = name

  let initDictionary = utils.getWordsFromStorage(speechPart)

  if (!localStorage.length) {
    return
  } else if (!currentDictionary.length) {
    currentDictionary = utils.getWordsFromStorage(speechPart)
  }

  const translateArray = getRandomTranslateArray(currentDictionary[0])

  contentRoot.innerHTML = `
    <div class="wrapper">
      <div class="myProgressBar"></div>
      <div class="trainArea">
        <div id="wordItem">${currentDictionary[0].word}</div>
        <div class="itemArea">
            <div id="item">${translateArray[0]}</div>
            <div id="item">${translateArray[1]}</div>
            <div id="item">${translateArray[2]}</div>
            <div id="item">${translateArray[3]}</div>
        </div>
      </div>
    </div>
    `

  utils.fillProgressBar(initDictionary, currentDictionary)

  const itemArea = document.querySelector('.itemArea')
  itemArea.addEventListener('click', checkChooseWord)
}

function getRandomTranslateArray(studyWord) {
  let translateArray = []
  const getTranslate = studyWord.translate

  for (let index = 0; translateArray.length < 3; index++) {
    const translate = fullDictionary[Math.floor(Math.random() * fullDictionary.length)].translate
    if (!translateArray.includes(translate) && translate !== getTranslate) {
      translateArray.push(translate)
    }
  }

  translateArray.push(getTranslate)

  return translateArray.sort(() => Math.random() - 0.5)
}

function checkChooseWord(event) {
  event.preventDefault()

  const chooseWord = event.target

  if (chooseWord.id !== 'item') return

  if (chooseWord.textContent === currentDictionary[0].translate) {
    chooseWord.style.backgroundColor = '#94ff94'
    utils.modifyStudyLevel(speechPart, currentDictionary[0], true)
    currentDictionary.shift()
  } else {
    chooseWord.style.backgroundColor = '#ff8c8c'
    utils.modifyStudyLevel(speechPart, currentDictionary[0])
  }

  if (!currentDictionary.length) {
    setTimeout(() => {
      contentRoot.innerHTML = `
            <div class="finishArea">
                <div id="finishWordArea">Вы хорошо позанимались!</div>
                <div class="finishBtnArea">
                    <button type="button" class="myBtn btn-lg" id="findNewBtn">Новые слова</button>
                    <button type="button" class="myBtn btn-lg" id="retryBtn">Еще раз</button>
                </div>
            </div>
            `

      const findNewBtn = document.querySelector('#findNewBtn')
      const retryBtn = document.querySelector('#retryBtn')

      if (!JSON.parse(localStorage.getItem(speechPart)).length) {
        retryBtn.disabled = 'true'
        localStorage.removeItem(speechPart)
      }

      findNewBtn.addEventListener('click', NewDictionaryPage.renderNewDictionariesPage)
      retryBtn.addEventListener('click', () => renderChoosePage(speechPart))
    }, '300')
  } else {
    setTimeout(() => {
      renderChoosePage(speechPart)
    }, '300')
  }
}
