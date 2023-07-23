const Page = require('../pageObjects/page')
const IndexPage = require('../pageObjects/Index.page')
const VocabularyPage = require('../pageObjects/Vocabulary.page')
const NewDictionariesPage = require('../pageObjects/NewDictionaries.page')
const NewWordsPage = require('../pageObjects/NewWords.page')
const StudyDictionariesPage = require('../pageObjects/StudyDictionaries.page')
const StudyListPage = require('../pageObjects/StudyList.page')
const TrainListPage = require('../pageObjects/TrainList.page')
const assertions = require('../baseModule/baseAssertions')
const data = require('../mocks/textData')

class ContentSnippets extends Page {
  async checkIndexPage() {
    await assertions.$checkDisplayed(IndexPage.homeLink)
    await assertions.$isClickable(IndexPage.homeLink)
    await assertions.$haveText(IndexPage.homeLink, 'Home')
    await assertions.$haveAttr(IndexPage.homeLink, 'href', 'localhost')
    await assertions.$checkDisplayedAll(IndexPage.dictionaryList)
    await assertions.$isClickableAll(IndexPage.dictionaryList)
    await assertions.$haveTextAll(IndexPage.dictionaryList, data.indexPageDictionaries)
  }

  async checkVocabularyPage() {
    await assertions.$checkDisplayedAll(VocabularyPage.dictionaryList)
    await assertions.$isArrayOfSize(VocabularyPage.dictionaryList, 4)
    await assertions.$isClickableAll(VocabularyPage.dictionaryList)
    await assertions.$haveTextAll(VocabularyPage.dictionaryList, data.vocabularyPageDictionaries)
  }

  async checkNewDictionariesPage() {
    await assertions.$checkDisplayed(NewDictionariesPage.dictionaryRoot)
    await assertions.$checkDisplayedAll(NewDictionariesPage.dictionaryList)
    await assertions.$isClickableAll(NewDictionariesPage.dictionaryList)
    await assertions.$isArrayOfSize(NewDictionariesPage.dictionaryList, 10)
    await assertions.$haveTextAll(NewDictionariesPage.dictionaryList, data.newDictPageDictionaries)
  }

  async checkNewWordsPage(word, translation) {
    await assertions.$checkDisplayed(NewWordsPage.cardRoot)
    await assertions.$checkDisplayed(NewWordsPage.wordArea)
    await assertions.$haveText(NewWordsPage.word, word)
    await assertions.$haveText(NewWordsPage.translate, translation)
    await assertions.$isClickable(NewWordsPage.alreadyKnowBtn)
    await assertions.$isClickable(NewWordsPage.studyBtn)
    await assertions.$haveText(NewWordsPage.alreadyKnowBtn, 'Уже знаю')
    await assertions.$haveText(NewWordsPage.studyBtn, 'Изучить')
  }

  async checkStudyListPage(itemIndex, word, translation) {
    await assertions.$checkDisplayed(StudyListPage.studyListRoot)
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
    await assertions.$checkDisplayed(StudyDictionariesPage.dictionaryRoot)
    await assertions.$checkDisplayedAll(StudyDictionariesPage.dictionaryList)
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
    await assertions.$checkDisplayed(TrainListPage.trainRoot)
    await assertions.$checkDisplayedAll(TrainListPage.trainList)
    await assertions.$checkDisplayedAll(TrainListPage.trainSvgList)
    await assertions.$isClickableAll(TrainListPage.trainList)
    await assertions.$haveAttrFromList(TrainListPage.trainList, 0, 'id', 'writeTraining')
    await assertions.$haveAttrFromList(TrainListPage.trainList, 1, 'id', 'puzzleTraining')
    await assertions.$haveAttrFromList(TrainListPage.trainList, 2, 'id', 'chooseTraining')
  }
}
module.exports = new ContentSnippets()
