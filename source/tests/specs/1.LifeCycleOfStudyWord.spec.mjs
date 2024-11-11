import ContentSnippets from '../snippets/contentSnippets.mjs'
import IndexPage from '../pageObjects/Index.page.mjs'
import VocabularyPage from '../pageObjects/Vocabulary.page.mjs'
import NewDictionariesPage from '../pageObjects/NewDictionaries.page.mjs'
import NewWordsPage from '../pageObjects/NewWords.page.mjs'
import StudyListPage from '../pageObjects/StudyList.page.mjs'
import assertions from '../baseModule/baseAssertions.mjs'
import methods from '../baseModule/baseMethods.mjs'

describe.skip('Add new study word and then delete it', () => {
  before(async () => {
    await IndexPage.open()
    await assertions.$urlContaining('localhost')
  })

  it('Check content of IndexPage and go to VocabularyPage', async () => {
    await ContentSnippets.checkIndexPage()
    await IndexPage.goToVocabularyPage()
  })

  it('Check content of VocabularyPage and go to NewDictionariesPage', async () => {
    await ContentSnippets.checkVocabularyPage()
    await assertions.$isEnabledFromList(VocabularyPage.dictionaryList, 1, false)
    await assertions.$isEnabledFromList(VocabularyPage.dictionaryList, 2, false)
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
    await assertions.$isDisplayedAll(IndexPage.dictionaryList)
    await assertions.$isClickableAll(IndexPage.dictionaryList)
    await IndexPage.goToVocabularyPage()
    await methods.$waitExistFromList('.actionRoot > .dictionary', 2)
    await assertions.$isDisplayedAll(VocabularyPage.dictionaryList)
    await assertions.$isEnabledFromList(VocabularyPage.dictionaryList, 1)
    await assertions.$isEnabledFromList(VocabularyPage.dictionaryList, 2)
    await VocabularyPage.goToStudyListPage()
  })

  it('Check content of StudyListPage, delete added word and go to NewDictionariesPage', async () => {
    await ContentSnippets.checkStudyListPage(0, 'climate', 'климат')
    await StudyListPage.clickDeleteBtn(0)
    await methods.$waitExist('#understandBtn')
    await assertions.$isDisplayed(StudyListPage.understandBtn)
    await assertions.$isClickable(StudyListPage.understandBtn)
    await assertions.$haveText(
      StudyListPage.emptyListText,
      'Список изучаемых слов пуст. Вы можете добавить новые',
    )
    await StudyListPage.clickUnderstandBtn()
    await assertions.$isDisplayed(NewDictionariesPage.dictionaryRoot)
    await assertions.$isDisplayedAll(NewDictionariesPage.dictionaryList)
  })
})
