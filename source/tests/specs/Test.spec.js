const IndexPage = require('../pageObjects/Index.page')
const VocabularyPage = require('../pageObjects/Vocabulary.page')
const NewDictionariesPage = require('../pageObjects/NewDictionaries.page')
const NewWordsPage = require('../pageObjects/NewWords.page')
const StudyListPage = require('../pageObjects/StudyList.page')
const assertions = require('../baseModule/baseAssertions')
const data = require('../mocks/textData')

describe('Проверка my eng app', () => {
  before(async () => {
    await IndexPage.open()
    await assertions.$urlContaining('3000')
  })

  it('Step 1', async () => {
    await assertions.$checkDisplayed(IndexPage.homeLink)
    await assertions.$isClickable(IndexPage.homeLink)
    await assertions.$haveText(IndexPage.homeLink, 'Home')
    await assertions.$haveAttr(IndexPage.homeLink, 'href', 'localhost')
    await assertions.$checkDisplayedAll(IndexPage.dictionaryList)
    await assertions.$isClickableAll(IndexPage.dictionaryList)
    await assertions.$haveTextAll(IndexPage.dictionaryList, data.indexPageDictionaries)
    await IndexPage.goToVocabularyPage()
  })

  it('Step 2', async () => {
    await assertions.$checkDisplayedAll(VocabularyPage.dictionaryList)
    await assertions.$isArrayOfSize(VocabularyPage.dictionaryList, 3)
    await assertions.$isClickableAll(VocabularyPage.dictionaryList)
    await assertions.$haveTextAll(VocabularyPage.dictionaryList, data.vocabularyPageDictionaries)
    // to-do: оставить только один либо isDisable либо isEnable и сделать реализацию для fromList
    // await assertions.$isDisable()

    await VocabularyPage.goToNewDictionariesPage()
  })

  it('Step 3', async () => {
    await assertions.$checkDisplayed(NewDictionariesPage.dictionaryRoot)
    await assertions.$checkDisplayedAll(NewDictionariesPage.dictionaryList)
    await assertions.$isClickableAll(NewDictionariesPage.dictionaryList)
    await assertions.$isArrayOfSize(NewDictionariesPage.dictionaryList, 10)
    await assertions.$haveTextAll(NewDictionariesPage.dictionaryList, data.newDictPageDictionaries)
    await NewDictionariesPage.goToNewWordsPage(2)
  })

  it('Step 4', async () => {
    await assertions.$checkDisplayed(NewWordsPage.cardRoot)
    await assertions.$checkDisplayed(NewWordsPage.wordArea)
    await assertions.$haveText(NewWordsPage.word, 'climate')
    await assertions.$haveText(NewWordsPage.translate, 'климат')
    await assertions.$isClickable(NewWordsPage.alreadyKnowBtn)
    await assertions.$isClickable(NewWordsPage.studyBtn)
    await assertions.$haveText(NewWordsPage.alreadyKnowBtn, 'Уже знаю')
    await assertions.$haveText(NewWordsPage.studyBtn, 'Изучить')
    await NewWordsPage.clickStudyBtn()
    await assertions.$haveText(NewWordsPage.word, 'panel')
    await IndexPage.clickHomeLink()
  })

  it('Step 5', async () => {
    await assertions.$checkDisplayedAll(IndexPage.dictionaryList)
    await assertions.$isClickableAll(IndexPage.dictionaryList)
    await IndexPage.goToVocabularyPage()
    await assertions.$checkDisplayedAll(VocabularyPage.dictionaryList)
    // потом сделать норм ожидание
    await browser.pause(3000)
    await VocabularyPage.goToStudyListPage()
  })

  it('Step 6', async () => {
    await assertions.$checkDisplayed(StudyListPage.studyListRoot)
    await assertions.$haveTextFromList(StudyListPage.wordList, 0, 'climate')
    await assertions.$haveTextFromList(StudyListPage.translateList, 0, 'климат')
    await assertions.$isClickableFromList(StudyListPage.resetBtnList, 0)
    await assertions.$isClickableFromList(StudyListPage.deleteBtnList, 0)
    await assertions.$haveTextFromList(StudyListPage.resetBtnList, 0, 'Reset')
    await assertions.$haveTextFromList(StudyListPage.deleteBtnList, 0, 'Delete')
    await StudyListPage.clickDeleteBtn(0)
    await browser.pause(3000)
    await assertions.$haveText(
      StudyListPage.emptyListText,
      'Список изучаемых слов пуст. Вы можете добавить новые',
    )

    await assertions.$checkDisplayed(StudyListPage.understandBtn)
    await assertions.$isClickable(StudyListPage.understandBtn)
    await StudyListPage.clickUnderstandBtn()
    await assertions.$checkDisplayed(NewDictionariesPage.dictionaryRoot)
    await assertions.$checkDisplayedAll(NewDictionariesPage.dictionaryList)
  })
})
