const db = require('../../../api/index.js')
const { domain } = require('../baseMethods/testData.js')
const chaiModule = require('chai')
const expect = chaiModule.expect
const chaiHttp = require('chai-http')
const chai = chaiModule.use(chaiHttp);

describe('Test of study wordlist', function () {
    let wordResponse

    it('Try add a word to study wordlist of Mongo DB', async () => {

        wordResponse = await chai
            .request(domain)
            .post('/words/study')
            .send({
                word: 'TEST-STUDY-WORD',
                translate: 'TEST-STUDY-TRANSLATION',
                wordType: 'verbs',
                studyLevel: 0
            })

        expect(wordResponse).to.have.status(200)
    });

    it('Should get a word from study wordlist', async () => {

        const response = await chai
            .request(domain) 
            .get('/words/study')
            .query({ translate: 'TEST-STUDY-TRANSLATION' })

        expect(response).to.have.status(200)
        expect(response.body[0].word).equals('TEST-STUDY-WORD')
    });

    it('Delete the word from study list', async () => {

        const response = await chai
            .request(domain)
            .delete(`/words/study/${wordResponse.body._id}`)

        expect(response).to.have.status(200)
        expect(response.body.word).equals('TEST-STUDY-WORD')

        await db.disconnectDb()
    })
});