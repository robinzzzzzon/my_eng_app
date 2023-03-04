const ContentSnippets = require('../snippets/contentSnippets')
const IndexPage = require('../pageObjects/Index.page')
const VocabularyPage = require('../pageObjects/Vocabulary.page')
const NewDictionariesPage = require('../pageObjects/NewDictionaries.page')
const NewWordsPage = require('../pageObjects/NewWords.page')
const StudyListPage = require('../pageObjects/StudyList.page')
const assertions = require('../baseModule/baseAssertions')
const methods = require('../baseModule/baseMethods')

describe('Add new study word and then delete it', () => {
  before(async () => {
    await IndexPage.open()
    await assertions.$urlContaining('3000')
  })

  it('Check content of IndexPage and go to VocabularyPage', async () => {
    await ContentSnippets.checkIndexPage()
    await IndexPage.goToVocabularyPage()
  })

  it('Check content of VocabularyPage and go to NewDictionariesPage', async () => {
    await ContentSnippets.checkVocabularyPage()
    await assertions.$isDisabledFromList(VocabularyPage.dictionaryList, 1)
    await assertions.$isDisabledFromList(VocabularyPage.dictionaryList, 2)
    await VocabularyPage.goToNewDictionariesPage()
  })

  it('Check content of NewDictionariesPage and go to NewWordsPage', async () => {
    await ContentSnippets.checkNewDictionariesPage()
    await NewDictionariesPage.goToNewWordsPage(2)
  })

  it('Check content of NewWordsPage, add new word ang go to IndexPage', async () => {
    await ContentSnippets.checkNewWordsPage('climate', 'климат')
    await NewWordsPage.clickStudyBtn()
    await assertions.$haveText(NewWordsPage.word, 'panel')
    await IndexPage.clickHomeLink()
  })

  it('Check availability of StudyListPage and go to this page', async () => {
    await assertions.$checkDisplayedAll(IndexPage.dictionaryList)
    await assertions.$isClickableAll(IndexPage.dictionaryList)
    await IndexPage.goToVocabularyPage()
    await methods.$waitExistFromList('.actionRoot > .dictionary', 2)
    await assertions.$checkDisplayedAll(VocabularyPage.dictionaryList)
    await assertions.$isDisabledFromList(VocabularyPage.dictionaryList, 1, true)
    await assertions.$isDisabledFromList(VocabularyPage.dictionaryList, 2, true)
    await VocabularyPage.goToStudyListPage()
  })

  it('Check content of StudyListPage, delete added word and go to NewDictionariesPage', async () => {
    await ContentSnippets.checkStudyListPage(0, 'climate', 'климат')
    await StudyListPage.clickDeleteBtn(0)
    await methods.$waitExist('#understandBtn')
    await assertions.$checkDisplayed(StudyListPage.understandBtn)
    await assertions.$isClickable(StudyListPage.understandBtn)
    await assertions.$haveText(
      StudyListPage.emptyListText,
      'Список изучаемых слов пуст. Вы можете добавить новые',
    )
    await StudyListPage.clickUnderstandBtn()
    await assertions.$checkDisplayed(NewDictionariesPage.dictionaryRoot)
    await assertions.$checkDisplayedAll(NewDictionariesPage.dictionaryList)
  })
})
