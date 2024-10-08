import FreeSpeakingConfiguration from './FreeSpeakingConfiguration'
import TranslationConfiguration from './TranslationConfiguration'

class SpeakingSection {
  renderPage(event) {
    event.preventDefault()
    
    const actionRoot = document.querySelector('.actionRoot')
    
    actionRoot.innerHTML = `
      <button class="dictionary initItem shadow-lg" data-name="translation">TRANSLATION</button>
      <button class="dictionary initItem shadow-lg" data-name="free">FREE SPEAKING</button>
    `
  
    actionRoot.addEventListener('click', this.renderNextPage)
  }

  renderNextPage(event) {
    if (!event.target.dataset.name) return
  
    const name = event.target.dataset.name
  
    if (name === 'free') {
      FreeSpeakingConfiguration.renderPage(event)
    } else if (name === 'translation') {
      TranslationConfiguration.renderPage(event)
    }
  }
}

export default new SpeakingSection()