const Page = require('./page')
const methods = require('../baseModule/baseMethods')

class IndexPage extends Page {
  async open() {
    await super.open();
  }
  
  get dictionaryList() {
    return methods.$getElements('.dictionary');
  }
}

module.exports = new IndexPage()