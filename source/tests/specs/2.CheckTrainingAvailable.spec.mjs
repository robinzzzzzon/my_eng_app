import ContentSnippets from '../snippets/contentSnippets.mjs'
import IndexPage from '../pageObjects/Index.page.mjs'
import VocabularyPage from '../pageObjects/Vocabulary.page.mjs'
import NewDictionariesPage from '../pageObjects/NewDictionaries.page.mjs'
import NewWordsPage from '../pageObjects/NewWords.page.mjs'
import StudyDictionariesPage from '../pageObjects/StudyDictionaries.page.mjs'
import StudyListPage from '../pageObjects/StudyList.page.mjs'
import assertions from '../baseModule/baseAssertions.mjs'
import methods from '../baseModule/baseMethods.mjs'

describe.skip('Check availability of training section', () => {
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
    await VocabularyPage.goToNewDictionariesPage()
  })

  it('Check content of NewDictionariesPage and go to NewWordsPage', async () => {
    await ContentSnippets.checkNewDictionariesPage()
    await NewDictionariesPage.goToNewWordsPage(3)
  })

  it('Check content of NewWordsPage, add new word ang go to IndexPage', async () => {
    await ContentSnippets.checkNewWordsPage('adult', 'взрослый')
    await NewWordsPage.clickStudyBtn()
    await assertions.$haveText(NewWordsPage.word, 'afraid')
    await IndexPage.clickHomeLink()
  })

  it('Go to StudyDictionariesPage', async () => {
    await assertions.$isDisplayedAll(IndexPage.dictionaryList)
    await assertions.$isClickableAll(IndexPage.dictionaryList)
    await IndexPage.goToVocabularyPage()
    await methods.$waitExistFromList('.actionRoot > .dictionary', 1)
    await assertions.$isDisplayedAll(VocabularyPage.dictionaryList)
    await VocabularyPage.goToStudyDictionariesPage()
  })

  it('Check content of StudyDictionariesPage and go to TrainListPage', async () => {
    await ContentSnippets.checkStudyDictionariesPage({
      arraySize: 2,
      dictionaryIndex: 1,
      dictionaryText: 'ПРИЛАГАТЕЛЬНЫЕ',
      dictionaryAttrValue: 'adjectives',
    })
    await StudyDictionariesPage.goToTrainListPage(1)
  })

  it('Check content of TrainListPage and go to IndexPage', async () => {
    await ContentSnippets.checkTrainListPage()
    await IndexPage.clickHomeLink()
  })

  it('Check availability of StudyListPage and go to this page', async () => {
    await assertions.$isDisplayedAll(IndexPage.dictionaryList)
    await assertions.$isClickableAll(IndexPage.dictionaryList)
    await IndexPage.goToVocabularyPage()
    await methods.$waitExistFromList('.actionRoot > .dictionary', 1)
    await assertions.$isDisplayedAll(VocabularyPage.dictionaryList)
    await assertions.$isEnabledFromList(VocabularyPage.dictionaryList, 1, false)
    await VocabularyPage.goToStudyListPage()
  })

  it('Check content of StudyListPage, delete added word', async () => {
    await ContentSnippets.checkStudyListPage(0, 'adult', 'взрослый')
    await StudyListPage.clickDeleteBtn(0)
  })
})
