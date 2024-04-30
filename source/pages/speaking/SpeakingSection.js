const FreeSpeakingConfiguration = require('./FreeSpeakingConfiguration')
const TranslationConfiguration = require('./TranslationConfiguration')

const actionRoot = document.querySelector('.actionRoot')

export async function renderPage(event) {
  event.preventDefault()

  actionRoot.innerHTML = `
    <button class="dictionary initItem shadow-lg" data-name="translation">TRANSLATION</button>
    <button class="dictionary initItem shadow-lg" data-name="free">FREE SPEAKING</button>
  `

  actionRoot.addEventListener('click', renderNextPage)
}

async function renderNextPage(event) {
  if (!event.target.dataset.name) return

  const name = event.target.dataset.name

  if (name === 'free') {
    FreeSpeakingConfiguration.renderPage(event)
  } else if (name === 'translation') {
    TranslationConfiguration.renderPage(event)
  }
}
