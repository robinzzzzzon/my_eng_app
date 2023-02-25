const Router = require('express')
const WordController = require('./WordController')

const router = new Router()

router.post('/words/init', WordController.addNewWord)
router.get('/words/init/', WordController.getInitList)
router.get('/words/init/:id', WordController.getInitWord)
router.put('/words/init/:id', WordController.updateInitWord)
router.delete('/words/init/:id', WordController.deleteInitWord)
router.post('/words/study', WordController.addStudyWord)
router.get('/words/study', WordController.getStudyList)
router.get('/words/study/:id', WordController.getStudyWord)
router.put('/words/study/:id', WordController.updateStudyWord)
router.delete('/words/study/:id', WordController.deleteStudyWord)

module.exports = {
  router,
}
