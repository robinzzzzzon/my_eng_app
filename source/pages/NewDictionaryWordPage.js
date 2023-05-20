import '../styles/newWordStyles.css'
const utils = require('../utils')
const { domain } = require('../constants')

const content = document.querySelector('.content')

export async function renderPage() {
  content.innerHTML = `
      <div class="wordFormRoot">
        <div class="newWordInfo alert alert-primary" role="alert">
          Here you can add a new word to initial dictionary!
        </div>
        <div class="newWordContent">
          <div>
            <label for="word" class="form-label">New Word</label>
            <input type="text" class="wordInput form-control" id="word"></input>
          </div>
          <div>
            <label for="translation" class="form-label">Translation</label>
            <input type="text" class="translateInput form-control" id="translation"></input>
          </div>
          <div>
            <label for="type" class="form-label">Word type</label>
            <select class="typeSelect form-select" id="type">
              <option selected disabled value="">choose type...</option>
              <option>nouns</option>
              <option>verbs</option>
              <option>phrasal verbs</option>
              <option>adjectives</option>
              <option>adverbs</option>
              <option>pronouns</option>
              <option>numerals</option>
              <option>other parts</option>
              <option>idioms</option>
              <option>useful phrases</option>
            </select>
          </div>
          <div id="studyCb">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">Add to study list</label>
          </div>
          <div>
            <button class="myBtn" id="addBtn">CONFIRM</button>
          </div>
        </div>
      </div>
    `

  const addBtn = document.querySelector('#addBtn')

  addBtn.addEventListener('click', sendNewWord)
}

async function sendNewWord() {
  const word = document.querySelector('.wordInput')
  const translate = document.querySelector('.translateInput')
  const select = document.querySelector('.typeSelect')
  const studyCb = document.querySelector('#flexCheckDefault')

  if (!word.value || !translate.value || select.options[0].selected) return

  const newWord = {
    word: word.value,
    translate: translate.value,
    wordType: select.options[select.selectedIndex].text,
  }

  await utils.makeRequest({ methodType: 'POST', getUrl: `${domain}/words/init/`, getBody: newWord })

  if (studyCb.checked) {
    newWord.studyLevel = 0

    await utils.makeRequest({
      methodType: 'POST',
      getUrl: `${domain}/words/study/`,
      getBody: newWord,
    })
  }

  await renderPage()
}
