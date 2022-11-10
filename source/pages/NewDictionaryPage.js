const LookThroughPage = require('./LookThroughPage')

const content = document.querySelector('.content')

export function renderNewDictionaryPage() {
  content.innerHTML = `
        <div class="dictionaryRoot">
            <div class="dictionary" data-name="verbs">VERBS</div>
            <div class="dictionary" data-name="illegal verbs">ILLEGAL VERBS</div>
            <div class="dictionary" data-name="phrazal verbs">PHRAZAL VERBS</div>
            <div class="dictionary" data-name="nouns">NOUNS</div>
            <div class="dictionary" data-name="adjectives">ADJECTIVES</div>
            <div class="dictionary" data-name="adverbs">ADVERBS</div>
            <div class="dictionary" data-name="pronouns">PRONOUNS</div>
            <div class="dictionary" data-name="numerals">NUMERALS</div>
            <div class="dictionary" data-name="other parts">OTHER PARTS</div>
            <div class="dictionary" data-name="idioms">IDIOMS</div>
        </div>
    `

  const dictionaryRoot = document.querySelector('.dictionaryRoot')

  dictionaryRoot.addEventListener('click', (event) => {
    event.preventDefault()

    if (!event.target.dataset.name) return

    const name = event.target.dataset.name

    LookThroughPage.renderLookThroughPage(name)
  })
}
