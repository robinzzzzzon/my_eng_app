const IndexPage = require('../pageObjects/IndexPage')
const assertions = require('../baseModule/baseAssertions')
const methods = require('../baseModule/baseMethods');
const data = require('../mocks/textData')


describe('Проверка осн. элементов страницы /about', () => {
  before(async () => {
    await IndexPage.open()
    // await browser.setupInterceptor() почему-то не работает функция интерсептора. Разобраться.
    await assertions.$urlContaining('3000')
  });

  it('Проверка роута на стартовую страницу по лого хэдера', async () => {
    await assertions.$checkDisplayedAll(IndexPage.dictionaryList)
    await assertions.$isClickableAll(IndexPage.dictionaryList)
    await assertions.$haveTextAll(IndexPage.dictionaryList, data.indexPageDictionaries)
    await methods.$clickFromList(IndexPage.dictionaryList, 0)
    await browser.pause(3000)
    await methods.$clickFromList(IndexPage.dictionaryList, 2)
    await browser.pause(3000)
  });
});
