const mongoose = require('mongoose')
const WordScheme = require('./Word')

const InitSchema = new mongoose.Schema(WordScheme.initWord)
const StudySchema = new mongoose.Schema(WordScheme.studyWord)
const InitListModel = mongoose.model('AllWord', InitSchema)
const StudyListModel = mongoose.model('StudyWord', StudySchema)

module.exports = {
  async addNewWord(req, res) {
    try {
      const addedWord = await InitListModel.create(req.body)
      res.json(addedWord)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async getInitList(req, res) {
    let getWords = null
    try {
      if (!req.query) {
        getWords = await InitListModel.find()
      } else {
        getWords = await InitListModel.find(req.query)
      }

      return res.json(getWords)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async getInitWord(req, res) {
    try {
      const getWord = InitListModel.findById(req.params.id)
      return res.json(getWord)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async updateInitWord(req, res) {
    try {
      const updatedWord = await InitListModel.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      })
      return res.json(updatedWord)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async deleteInitWord(req, res) {
    try {
      const deletedWord = await InitListModel.findByIdAndDelete(req.params.id)
      return res.json(deletedWord)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async addStudyWord(req, res) {
    try {
      const addedWord = await StudyListModel.create(req.body)
      res.json(addedWord)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async getStudyList(req, res) {
    let getWords = null

    try {
      if (!req.query) {
        getWords = await StudyListModel.find()
      } else {
        getWords = await StudyListModel.find(req.query)
      }

      return res.json(getWords)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async getStudyWord(req, res) {
    try {
      const getWord = await StudyListModel.findById(req.params.id)
      return res.json(getWord)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async updateStudyWord(req, res) {
    try {
      const updatedWord = await StudyListModel.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      })
      return res.json(updatedWord)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async deleteStudyWord(req, res) {
    try {
      const deletedWord = await StudyListModel.findByIdAndDelete(req.params.id)
      return res.json(deletedWord)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },
}
