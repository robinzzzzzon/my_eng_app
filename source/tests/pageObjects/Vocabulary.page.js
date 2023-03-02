const Page = require('./page')
const methods = require('../baseModule/baseMethods')

class VocabularyPage extends Page {
  async open() {
    await super.open();
  }

  get actionRoot() {
    return methods.$getElement('.actionRoot');
  }
  
  get dictionaryList() {
    return methods.$getElements('.dictionary', this.actionRoot);
  }

  async goToNewDictionariesPage() {
    await methods.$clickFromList(this.dictionaryList, 0)
  }

  async goToStudyDictionariesPage() {
    await methods.$clickFromList(this.dictionaryList, 1)
  }

  async goToStudyListPage() {
    await methods.$clickFromList(this.dictionaryList, 2)
  }
}

module.exports = new VocabularyPage()