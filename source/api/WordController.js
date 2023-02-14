const WordService = require('./WordService')

module.exports = {
  async add(req, res) {
    try {
      const post = await WordService.add(req.body)
      res.json(post)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async getAll(req, res) {
    try {
      const getWords = await WordService.getAll()
      return res.json(getWords)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async getOne(req, res) {
    try {
      const getWord = await WordService.getOne(req.params.id)
      return res.json(getWord)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async update(req, res) {
    try {
      const updateWord = await WordService.update(req.body)
      return res.json(updateWord)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async delete(req, res) {
    try {
      const deleteWord = await WordService.delete(req.params.id)
      return res.json(deleteWord)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },
}
