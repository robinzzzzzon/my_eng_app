import Page from './page.mjs'
import methods from '../baseModule/baseMethods.mjs'

class StudyListPage extends Page {
  async open() {
    await super.open()
  }

  get studyListRoot() {
    return methods.$getElement('.actualDictionaryRoot')
  }

  get wordItemList() {
    return methods.$getElements('.actualItem', this.studyListRoot)
  }

  get wordList() {
    return methods.$getElements('#word', this.studyListRoot)
  }

  get translateList() {
    return methods.$getElements('#translate', this.studyListRoot)
  }

  get resetBtnList() {
    return methods.$getElements('button=Reset', this.studyListRoot)
  }

  get deleteBtnList() {
    return methods.$getElements('button=Delete', this.studyListRoot)
  }

  get emptyListText() {
    return methods.$getElement('p', this.studyListRoot)
  }

  get understandBtn() {
    return methods.$getElement('#understandBtn')
  }

  async clickResetBtn(index) {
    await methods.$clickFromList(this.resetBtnList, index)
  }

  async clickDeleteBtn(index) {
    await methods.$clickFromList(this.deleteBtnList, index)
  }

  async clickUnderstandBtn() {
    await methods.$click(this.understandBtn)
  }
}

export default new StudyListPage()
