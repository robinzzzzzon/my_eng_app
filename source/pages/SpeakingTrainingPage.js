import '../styles/speakingTrainingStyles.css'

const dictionary = require('../dictionary.json')
const constants = require('../constants')
const utils = require('../utils')

const contentRoot = document.querySelector('.content')

export function renderPage(event, config) {
  event.preventDefault()

  const data = generateSpeakingData(config)

  contentRoot.innerHTML = `
  <div class="speakingAreaRoot">
    <h2>Current topic: ${data.topic}</h2>
    <p>You should use these words or phrases:</p>
    <div class="availablePhrases">
    </div>
    <button class="myBtn">Next</button>
  </div>
  `

  const phrasesRoot = document.querySelector('.availablePhrases')

  for (let index = 0; index < data.phrases.length; index++) {
    const phrase = document.createElement('div')
    phrase.textContent = data.phrases[index].word
    phrasesRoot.append(phrase)
  }
}

function generateSpeakingData(options) {
  let data = {}

  switch (options[2]) {
    case 'First': {
      data.topic = utils.getRandomTopic(constants.easyTopicList)
      const part1 = utils.getRandomListBySpeechPart(dictionary, 'useful phrases')
      const part2 = utils.getRandomListBySpeechPart(dictionary, 'idioms')
      data.phrases = [...part1, ...part2]
      break
    }

    case 'Second': {
      data.topic = utils.getRandomTopic(constants.middleTopicList)
      const part1 = utils.getRandomListBySpeechPart(dictionary, 'useful phrases')
      const part2 = utils.getRandomListBySpeechPart(dictionary, 'idioms')
      data.phrases = [...part1, ...part2]
      break
    }

    case 'Third': {
      data.topic = utils.getRandomTopic(constants.hardTopicList)
      const part1 = utils.getRandomListBySpeechPart(dictionary, 'useful phrases')
      const part2 = utils.getRandomListBySpeechPart(dictionary, 'idioms')
      data.phrases = [...part1, ...part2]
      break
    }
  }
  return data
}
