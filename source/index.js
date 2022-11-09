import './styles/indexStyles.css';
import './styles/commonStyles.css'
const NewDictionaryPage = require('./pages/NewDictionaryPage')
const StudyDictionaryPage = require('./pages/StudyDictionaryPage')

const actionRoot = document.querySelector('.actionRoot')
actionRoot.addEventListener('click', renderIndexPage)

if (!localStorage.length) {
    const trainBtn = document.querySelector('[data-name="train"]')
    trainBtn.disabled = 'true'
}

export function renderIndexPage(event) {
    event.preventDefault()
    
    if (!event.target.dataset.name) {
        return
    }

    const name = event.target.dataset.name
    
    if (name === 'study') {
        NewDictionaryPage.renderNewDictionaryPage()
    } else if (name === 'train') {
        StudyDictionaryPage.renderStudyDictionaryPage()
    }

}