import '../../styles/translationTraining.css'
const apiGpt = require('../../utils/chatGptApi')
const utils = require('../../utils/utils')
const { spinner } = require('../../utils/constants')

export async function renderPage(event, config) {
    event.preventDefault()

    const contentRoot = document.querySelector('.content')

    contentRoot.innerHTML = spinner

    const paragraph = await apiGpt.getRandomTextExamples(config)

    contentRoot.innerHTML = `
    <div class='trainingRoot'>
        <div class='paragraphArea'>${paragraph.choices[0].message.content}</div>
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
}