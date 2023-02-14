const Router = require('express')
const WordController = require('./WordController')

const router = new Router()

router.post('/words', WordController.add)
router.get('/words', WordController.getAll)
router.get('/words/:id', WordController.getOne)
router.put('/words/:id', WordController.update)
router.delete('/words/:id', WordController.delete)

module.exports = {
  router,
}
