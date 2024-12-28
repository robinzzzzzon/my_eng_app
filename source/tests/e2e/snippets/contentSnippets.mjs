import Page from '../pageObjects/page.mjs'
import IndexPage from '../pageObjects/Index.page.mjs'
import VocabularyPage from '../pageObjects/Vocabulary.page.mjs'
import NewDictionariesPage from '../pageObjects/NewDictionaries.page.mjs'
import NewWordsPage from '../pageObjects/NewWords.page.mjs'
import StudyDictionariesPage from '../pageObjects/StudyDictionaries.page.mjs'
import StudyListPage from '../pageObjects/StudyList.page.mjs'
import TrainListPage from '../pageObjects/TrainList.page.mjs'
import assertions from '../baseModule/baseAssertions.mjs'
import data from '../mocks/textData.mjs'

class ContentSnippets extends Page {
  async checkIndexPage() {
    await assertions.$isDisplayed(IndexPage.homeLink)
    await assertions.$isClickable(IndexPage.homeLink)
    await assertions.$haveText(IndexPage.homeLink, 'Home')
    await assertions.$haveAttr(IndexPage.homeLink, 'href', 'localhost')
    await assertions.$isDisplayedAll(IndexPage.dictionaryList)
    await assertions.$isClickableAll(IndexPage.dictionaryList)
    await assertions.$haveTextAll(IndexPage.dictionaryList, data.indexPageDictionaries)
  }

  async checkVocabularyPage() {
    // TODO: parametrize and replace to baseAssertions
    await browser.waitUntil(async function () {
      const list = await VocabularyPage.dictionaryList
  
      return (list.length) === 4
    }, {
      timeout: 5000,
      timeoutMsg: 'expected length to be different after 5s'
    })
    await assertions.$isArrayOfSize(VocabularyPage.dictionaryList, 4)
    await assertions.$isExistAll(VocabularyPage.dictionaryList)
    await assertions.$isClickableFromList(VocabularyPage.dictionaryList, 0)
    await assertions.$isClickableFromList(VocabularyPage.dictionaryList, 1, false)
    await assertions.$isClickableFromList(VocabularyPage.dictionaryList, 2, false)
    await assertions.$isClickableFromList(VocabularyPage.dictionaryList, 3)
    await assertions.$haveTextAll(VocabularyPage.dictionaryList, data.vocabularyPageDictionaries)
  }

  async checkNewDictionariesPage() {
    await assertions.$isDisplayed(NewDictionariesPage.dictionaryRoot)
    await assertions.$isDisplayedAll(NewDictionariesPage.dictionaryList)
    await assertions.$isClickableAll(NewDictionariesPage.dictionaryList)
    await assertions.$isArrayOfSize(NewDictionariesPage.dictionaryList, 11)
    await assertions.$haveTextAll(NewDictionariesPage.dictionaryList, data.newDictPageDictionaries)
  }

  async checkNewWordsPage(word, translation) {
    await assertions.$isDisplayed(NewWordsPage.cardRoot)
    await assertions.$isDisplayed(NewWordsPage.wordArea)
    await assertions.$haveText(NewWordsPage.word, word)
    await assertions.$haveText(NewWordsPage.translate, translation)
    await assertions.$isClickable(NewWordsPage.alreadyKnowBtn)
    await assertions.$isClickable(NewWordsPage.studyBtn)
    await assertions.$haveText(NewWordsPage.alreadyKnowBtn, 'Уже знаю')
    await assertions.$haveText(NewWordsPage.studyBtn, 'Изучить')
  }

  async checkStudyListPage(itemIndex, word, translation) {
    await assertions.$isDisplayed(StudyListPage.studyListRoot)
    await assertions.$haveTextFromList(StudyListPage.wordList, itemIndex, word)
    await assertions.$haveTextFromList(StudyListPage.translateList, itemIndex, translation)
    await assertions.$isClickableFromList(StudyListPage.resetBtnList, itemIndex)
    await assertions.$isClickableFromList(StudyListPage.deleteBtnList, itemIndex)
    await assertions.$haveTextFromList(StudyListPage.resetBtnList, itemIndex, 'Reset')
    await assertions.$haveTextFromList(StudyListPage.deleteBtnList, itemIndex, 'Delete')
  }

  async checkStudyDictionariesPage({
    arraySize,
    dictionaryIndex,
    dictionaryText,
    dictionaryAttrValue,
  }) {
    await assertions.$isDisplayed(StudyDictionariesPage.dictionaryRoot)
    await assertions.$isDisplayedAll(StudyDictionariesPage.dictionaryList)
    await assertions.$isArrayOfSize(StudyDictionariesPage.dictionaryList, arraySize)
    await assertions.$isClickableAll(StudyDictionariesPage.dictionaryList)
    await assertions.$haveTextFromList(StudyDictionariesPage.dictionaryList, 0, 'ВСЕ СЛОВА')
    await assertions.$haveTextFromList(
      StudyDictionariesPage.dictionaryList,
      dictionaryIndex,
      dictionaryText,
    )
    await assertions.$haveAttrFromList(
      StudyDictionariesPage.dictionaryList,
      1,
      'data-name',
      dictionaryAttrValue,
    )
  }

  async checkTrainListPage() {
    await assertions.$isDisplayed(TrainListPage.trainRoot)
    await assertions.$isDisplayedAll(TrainListPage.trainList)
    await assertions.$isDisplayedAll(TrainListPage.trainSvgList)
    await assertions.$isClickableAll(TrainListPage.trainList)
    await assertions.$haveAttrFromList(TrainListPage.trainList, 0, 'id', 'writeTraining')
    await assertions.$haveAttrFromList(TrainListPage.trainList, 1, 'id', 'puzzleTraining')
    await assertions.$haveAttrFromList(TrainListPage.trainList, 2, 'id', 'chooseTraining')
  }
}
export default new ContentSnippets()
