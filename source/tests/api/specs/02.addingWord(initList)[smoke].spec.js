const { domain } = require('../baseMethods/testData.js')
const chaiModule = require('chai')
const expect = chaiModule.expect
const chaiHttp = require('chai-http')
const chai = chaiModule.use(chaiHttp);

describe('Test of init word list', function () {

    let wordResponse

    it('Try add a word to initial wordlist of Mongo DB', async () => {

        wordResponse = await chai
            .request(domain)
            .post('/words/init')
            .send({
                word: 'TEST-WORD',
                translate: 'TEST-TRANSLATION',
                wordType: 'nouns'
            })

        expect(wordResponse).to.have.status(200)
    });

    it('Make sure that the word was added', async () => {
        const response = await chai
            .request(domain) 
            .get('/words/init')
            .query({ word: 'TEST-WORD' })

        expect(response).to.have.status(200)
        expect(response.body[0].word).equals('TEST-WORD')
    })

    it('Delete the word from initial list', async () => {

        const response = await chai
            .request(domain)
            .delete(`/words/init/${wordResponse.body._id}`)

        expect(response).to.have.status(200)
        expect(response.body.word).equals('TEST-WORD')
    })
});