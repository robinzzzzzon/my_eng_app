const initWord = {
  word: { type: String, required: true },
  translate: { type: String, required: true },
  wordType: { type: String, required: true },
}

const studyWord = {
  word: { type: String, required: true },
  translate: { type: String, required: true },
  wordType: { type: String, required: true },
  studyLevel: { type: Number, required: true },
}

module.exports = {
  initWord,
  studyWord,
}
