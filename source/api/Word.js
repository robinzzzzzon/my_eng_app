const mongoose = require('mongoose')

const word = {
  word: { type: String, required: true },
  translate: { type: String, required: true },
  wordType: { type: String, required: true },
}

module.exports = {
  word,
}
