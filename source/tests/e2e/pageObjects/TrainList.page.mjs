import Page from './page.mjs'
import methods from '../baseModule/baseMethods.mjs'

class TrainListPage extends Page {
  async open() {
    await super.open()
  }

  get trainRoot() {
    return methods.$getElement('.trainList')
  }

  get trainList() {
    return methods.$getElements('div', this.trainRoot)
  }

  get trainSvgList() {
    return methods.$getElements('svg', this.trainRoot)
  }

  async goToWriteTraining() {
    await methods.$clickFromList(this.trainList, 0)
  }

  async goToPuzzleTraining() {
    await methods.$clickFromList(this.trainList, 1)
  }

  async goToChooseTraining() {
    await methods.$clickFromList(this.trainList, 2)
  }
}

export default new TrainListPage()
