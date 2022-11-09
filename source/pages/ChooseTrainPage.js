import '../styles/chooseTrainStyles.css'
const utils = require('../utils')
const fullDictionary = require('../dictionary.json')
const NewDictionaryPage = require('./NewDictionaryPage')

const contentRoot = document.querySelector('.content')

let speechPart
let currentDictionary = []
    
export function renderChoosePage(name) {
    speechPart = name

    if (!localStorage.length) {
        return
    } else if (!currentDictionary.length) {
        currentDictionary = utils.getWordsFromStorage(`${speechPart}`)
    }
    
    const translateArray = getRandomTranslateArray(currentDictionary[0])

    contentRoot.innerHTML = `
    <div class="trainArea">
        <div id="wordItem">${currentDictionary[0].word}</div>
        <div class="itemArea">
            <div id="item">${translateArray[0]}</div>
            <div id="item">${translateArray[1]}</div>
            <div id="item">${translateArray[2]}</div>
            <div id="item">${translateArray[3]}</div>
        </div>
    </div>
    `

    const itemArea = document.querySelector('.itemArea')
    itemArea.addEventListener('click', checkChooseWord)
}

function getRandomTranslateArray(studyWord) {
    let translateArray = []
    const getTranslate = studyWord.translate
    
    for (let index = 0; translateArray.length < 3; index++) {
        const translate = fullDictionary[Math.floor(Math.random()*fullDictionary.length)].translate
        if((!translateArray.includes(translate)) && (translate !== getTranslate)) {
            translateArray.push(translate)
        }
    }
    
    translateArray.push(getTranslate)

    return translateArray.sort(() => Math.random() - 0.5)
}

function checkChooseWord(event) {
    event.preventDefault()

    const chooseWord = event.target

    if (chooseWord.id !== 'item') {
        return
    } else if (chooseWord.textContent !== currentDictionary[0].translate) {
        chooseWord.style.backgroundColor = '#FF6347';
        utils.modifyStudyLevel(speechPart, currentDictionary[0])
    } else {
        chooseWord.style.backgroundColor = '#90EE90';
        utils.modifyStudyLevel(speechPart, currentDictionary[0], true)
    }

    currentDictionary.shift();

    if (!currentDictionary.length) {
        setTimeout(() => {
            contentRoot.innerHTML = `
            <div class="finishArea">
                <div id="finishWordArea">Вы хорошо позанимались!</div>
                <div class="finishBtnArea">
                    <button class="btn" id="findNewBtn">Новые слова</button>
                    <button class="btn" id="retryBtn">Еще раз</button>
                </div>
            </div>
            `

            const findNewBtn = document.querySelector('#findNewBtn')
            const retryBtn = document.querySelector('#retryBtn')

            if ((!JSON.parse(localStorage.getItem(speechPart)).length)) {
                retryBtn.disabled = 'true'
                localStorage.removeItem(speechPart)
            }

            findNewBtn.addEventListener('click', NewDictionaryPage.renderNewDictionaryPage)
            retryBtn.addEventListener('click', () => renderChoosePage(speechPart))
        }, '300')
    } else {
        setTimeout(() => {
            renderChoosePage(speechPart)
          }, '300')
    }
}
