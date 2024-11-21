import Page from './page.mjs'
import methods from '../baseModule/baseMethods.mjs'

class IndexPage extends Page {
  async open() {
    await super.open()
  }

  get dictionaryList() {
    return methods.$getElements('.dictionary')
  }

  // TODO: replace to widget
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

export default new IndexPage()
