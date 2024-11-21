import Page from './page.mjs'
import methods from '../baseModule/baseMethods.mjs'

class NewWordsPage extends Page {
  async open() {
    await super.open();
  }

  get cardRoot() {
    return methods.$getElement('.cardRoot');
  }
  
  get wordArea() {
    return methods.$getElement('#wordArea');
  }

  get word() {
    return methods.$getElement('div > b', this.wordArea)
  }

  get translate() {
    return methods.$getElement('div:nth-child(2)', this.wordArea)
  }

  get alreadyKnowBtn() {
    return methods.$getElement('#knowBtn')
  }

  get studyBtn() {
    return methods.$getElement('#studyBtn')
  }

  get notYetBtn() {
    return methods.$getElement('button=Пока нет')
  }

  get letsTrainBtn() {
    return methods.$getElement('button=Тренировать')
  }

  async clickAlreadyKnowBtn() {
    await methods.$click(this.alreadyKnowBtn)
  }

  async clickStudyBtn() {
    await methods.$click(this.studyBtn)
  }

  async clickNotYetBtn() {
    await methods.$click(this.notYetBtn)
  }

  async clickTrainBtn() {
    await methods.$click(this.letsTrainBtn)
  }
}

export default new NewWordsPage()