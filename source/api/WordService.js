const mongoose = require('mongoose')
const WordScheme = require('./Word')

const Schema = new mongoose.Schema(WordScheme.word)
const Model = mongoose.model('Word', Schema)

module.exports = {
  async add(wordBody) {
    const createdWord = await Model.create(wordBody)
    return createdWord
  },

  async getAll() {
    const getWords = await Model.find()
    return getWords
  },

  async getOne(id) {
    if (!id) {
      throw new Error('Id не указан')
    }

    const getWord = await Model.findById(id)
    return getWord
  },

  async update(wordBody) {
    if (!wordBody._id) {
      throw new Error('Id не указан')
    }

    const updateWord = await Model.findByIdAndUpdate(wordBody._id, wordBody, { new: true })
    return updateWord
  },

  async delete(id) {
    if (!id) {
      throw new Error('Id не указан')
    }

    const deleteWord = await Model.findByIdAndDelete(id)
    return deleteWord
  },
}
