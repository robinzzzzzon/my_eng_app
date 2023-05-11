import '../styles/newWordStyles.css'
const utils = require('../utils')
const { domain, spinner } = require('../constants')

const content = document.querySelector('.content')

export async function renderPage() {
  content.innerHTML = `
    <div class="wordFormRoot">
        <div class="alert alert-info" id="newInfo" role="alert">Here you may add a new word to default dictionary...</div>
        <form class="row g-3 needs-validation">
            <div class="col-md-4">
                <label for="validationCustom01" class="form-label">New word</label>
                <input type="text" class="form-control wordInput" id="validationCustom01" value="" required>
                <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="col-md-4">
                <label for="validationCustom02" class="form-label">Translation</label>
                <input type="text" class="form-control translateInput" id="validationCustom02" value="" required>
                <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="col-md-3">
                <label for="validationCustom04" class="form-label">Word type</label>
                <select class="form-select" id="validationCustom04" required>
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
                <div class="invalid-feedback">Please select a word type.</div>
            </div>
            <div>
                <button class="btn btn-primary" id="addBtn">Add</button>
            </div>
        </form>
    </div>
    `

  const addBtn = document.querySelector('#addBtn')

  addBtn.addEventListener('click', sendNewWord)
}

// to-do: разобраться с отправкой
async function sendNewWord() {
  const word = document.querySelector('.wordInput')
  const translate = document.querySelector('.translateInput')
  const select = document.querySelector('.wordFormRoot form select')

  if (!word.value || !translate.value || select.options[0]) return

  const newWord = {
    word: word.value,
    translate: translate.value,
    wordType: select.options[select.selectedIndex].text,
  }

  await utils.makeRequest({ methodType: 'POST', getUrl: `${domain}/words/init/`, getBody: newWord })
}
