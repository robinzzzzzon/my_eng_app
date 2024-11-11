import Page from './page.mjs'
import methods from '../baseModule/baseMethods.mjs'

class StudyDictionariesPage extends Page {
  async open() {
    await super.open()
  }

  get dictionaryRoot() {
    return methods.$getElement('.dictionaryRoot')
  }

  get dictionaryList() {
    return methods.$getElements('.dictionary', this.dictionaryRoot)
  }

  async goToTrainListPage(index) {
    await methods.$clickFromList(this.dictionaryList, index)
  }
}

export default new StudyDictionariesPage()
