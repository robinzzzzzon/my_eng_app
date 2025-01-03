const db = require('../../../api/index.js')
const { domain } = require('../baseMethods/testData.js')
const chaiModule = require('chai')
const expect = chaiModule.expect
const chaiHttp = require('chai-http')
const chai = chaiModule.use(chaiHttp);

describe('Test of init word list', function () {
    it('Should get a word from initial wordlist of Mongo DB', async () => {
        await db.connectDb()

        const response = await chai
            .request(domain) 
            .get('/words/init')

        expect(response).to.have.status(200)
        expect(response.body[0].word).equals('climate')
    });
});