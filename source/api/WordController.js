const mongoose = require('mongoose')
const WordScheme = require('./Word')

const Schema = new mongoose.Schema(WordScheme.word)
const Model = mongoose.model('Word', Schema)

module.exports = {
  async add(req, res) {
    try {
      const { word, translate, wordType } = req.body
      const post = await Model.create({ word, translate, wordType })
      res.json(post)
    } catch (e) {
      res.status(500).json(e)
    }
  },

  async getAll(req, res) {
    try {
      const getWords = await Model.find()
      return res.json(getWords)
    } catch (e) {
      res.status(500).json(e)
    }
  },

  async getOne(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        res.status(400).json('Id не указан')
      }

      const getWord = await Model.findById(id)
      return res.json(getWord)
    } catch (e) {
      res.status(500).json(e)
    }
  },

  async update(req, res) {
    try {
      const getWord = req.body

      if (!getWord._id) {
        res.status(400).json('Id не указан')
      }

      const updateWord = await Model.findByIdAndUpdate(getWord._id, getWord, { new: true })
      return res.json(updateWord)
    } catch (e) {
      res.status(500).json(e)
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        res.status(400).json('Id не указан')
      }

      const deleteWord = await Model.findByIdAndDelete(id)
      return res.json(deleteWord)
    } catch (e) {
      res.status(500).json(e)
    }
  },
}
