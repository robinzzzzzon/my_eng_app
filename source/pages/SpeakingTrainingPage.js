const dictionary = require('../dictionary.json')
const constants = require('../constants')
const utils = require('../utils')

const contentRoot = document.querySelector('.content')

export function renderPage(event, config) {
  event.preventDefault()

  const data = generateSpeakingData(config)

  // поправить разворачивание элементов массива.
  contentRoot.innerHTML = `
  <div class="speakingAreaRoot">
    <h2>${data.topic}</h2>
    <div class="availablePhrazes">
      <p>You should use these words:</p>
      <div>${data.phrases}</div>
    </div>
    <div>
      <button class="myBtn">Next</button>
    </div>
  </div>
  `
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
