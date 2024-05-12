import '../../styles/translationTraining.css'
const apiGpt = require('../../utils/chatGptApi')
const utils = require('../../utils/utils')
const { spinner } = require('../../utils/constants')

let paragraphList = [];
let trainingConfig = null;

const contentRoot = document.querySelector('.content')

export async function renderPage(event, config) {
    event.preventDefault()

    if (!trainingConfig) {
        trainingConfig = config
    }

    if (!paragraphList.length) {
        contentRoot.innerHTML = spinner
        paragraphList = await apiGpt.getRandomTextExamples(trainingConfig)
        paragraphList = paragraphList.choices[0].message.content.split('[SECTION]').filter(el => el)
    }

    contentRoot.innerHTML = `
    <div class='trainingRoot'>
        <div class='paragraphArea'>
            <p>${paragraphList.shift()}</p>
        </div>
        <div class='timerArea'>
            <div id='timer'></div>
            <div>
                <button class='myBtn nextBtn'>Show next</button>
            </div>
        </div>
    </div>
    `

    if (config[2]) {
        const timerDiv = document.querySelector('#timer')
        utils.setTimer(timerDiv, 3)
    }

    const nextBtn = document.querySelector('.nextBtn')
    nextBtn.addEventListener('click', showNextText)
}

function showNextText(event) {
    event.preventDefault()

    if(!paragraphList.length) {
        contentRoot.innerHTML = `
            <div class='trainingRoot'>
            <div class='paragraphArea'>
                <p>Ты отлично позанимался!</p>
            </div>
            <div class='timerArea'>
                <div id='timer'></div>
                <div>
                    <button class='myBtn nextBtn'>Want more</button>
                </div>
            </div>
        </div>
        `

        const nextBtn = document.querySelector('.nextBtn')
        nextBtn.addEventListener('click', () => renderPage(event, trainingConfig))
    } else {
        renderPage(event, trainingConfig)
    }
}