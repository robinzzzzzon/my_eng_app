import '../styles/chooseTrainStyles.css'
const utils = require('../utils')
const constants = require('../constants')
const NewDictionaryPage = require('./NewDictionaryPage')

const content = document.querySelector('.content')

let speechPart
let initDictionary = null
let currentDictionary = null
let fullDictionary = null

export async function renderPage(name) {
  speechPart = name

  content.innerHTML = constants.spinner

  if (!currentDictionary) {
    currentDictionary = await utils.makeRequest({
      methodType: 'GET',
      getUrl: `${constants.domain}/words/study/`,
      getParams: { wordType: speechPart },
    })
  }

  if (!initDictionary) {
    initDictionary = await utils.makeRequest({
      methodType: 'GET',
      getUrl: `${constants.domain}/words/study/`,
      getParams: { wordType: speechPart },
    })
  }

  const translateArray = await getRandomTranslateArray(currentDictionary.data[0])

  content.innerHTML = `
    <div class="wrapper">
      <div class="myProgressBar shadow"></div>
      <div class="trainArea shadow">
        <div id="wordItem">${currentDictionary.data[0].word}</div>
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

async function getRandomTranslateArray(studyWord) {
  if (!fullDictionary) {
    fullDictionary = await utils.makeRequest({
      methodType: 'GET',
      getUrl: `${constants.domain}/words/init/`,
    })
  }

  let translateArray = []
  const getTranslate = studyWord.translate

  for (let index = 0; translateArray.length < 3; index++) {
    const translate =
      fullDictionary.data[Math.floor(Math.random() * fullDictionary.data.length)].translate
    if (!translateArray.includes(translate) && translate !== getTranslate) {
      translateArray.push(translate)
    }
  }

  translateArray.push(getTranslate)

  return translateArray.sort(() => Math.random() - 0.5)
}

async function checkChooseWord(event) {
  event.preventDefault()

  const chooseWord = event.target

  if (chooseWord.id !== 'item') return

  if (chooseWord.textContent === currentDictionary.data[0].translate) {
    chooseWord.style.backgroundColor = constants.system_colors.success
    await utils.modifyStudyLevel(speechPart, currentDictionary.data[0], true)
    currentDictionary.data.shift()
  } else {
    chooseWord.style.backgroundColor = constants.system_colors.failed
    await utils.modifyStudyLevel(speechPart, currentDictionary.data[0])
  }

  if (!currentDictionary.data.length) {
    currentDictionary = null
    initDictionary = null

    content.innerHTML = `
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

    await utils.checkAvailableStudyWords(speechPart)

    findNewBtn.addEventListener('click', NewDictionaryPage.renderPage)
    retryBtn.addEventListener('click', () => renderPage(speechPart))
  } else {
    renderPage(speechPart)
  }
}
