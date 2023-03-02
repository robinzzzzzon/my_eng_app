const Page = require('./page')
const methods = require('../baseModule/baseMethods')

class NewDictionariesPage extends Page {
  async open() {
    await super.open();
  }

  get dictionaryRoot() {
    return methods.$getElement('.dictionaryRoot');
  }
  
  get dictionaryList() {
    return methods.$getElements('.dictionary', this.dictionaryRoot);
  }

  async goToNewWordsPage(index) {
    await methods.$clickFromList(this.dictionaryList, index)
  }
}

module.exports = new NewDictionariesPage()