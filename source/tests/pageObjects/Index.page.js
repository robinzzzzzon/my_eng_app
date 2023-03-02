const Page = require('./page')
const methods = require('../baseModule/baseMethods')

class IndexPage extends Page {
  async open() {
    await super.open()
  }

  get dictionaryList() {
    return methods.$getElements('.dictionary')
  }

  // to-do: replace to widget
  get homeLink() {
    return methods.$getElement('a=Home')
  }

  async goToVocabularyPage() {
    await methods.$clickFromList(this.dictionaryList, 0)
  }

  async goToSpeakingPage() {
    await methods.$clickFromList(this.dictionaryList, 1)
  }

  async clickHomeLink() {
    await methods.$click(this.homeLink)
  }
}

module.exports = new IndexPage()
