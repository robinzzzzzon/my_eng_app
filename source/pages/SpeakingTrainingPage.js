const dictionary = require('../dictionary.json')
const utils = require('../utils')

const contentRoot = document.querySelector('.content')

export function renderPage(event, config) {
  event.preventDefault()

  const data = generateSpeakingData(config)
  console.log(data)

  // позже дополнить реализацию с учетом сложности
  contentRoot.innerHTML = `
  <div class="speakingAreaRoot">
    <h2>Current topic is: AnyTopic</h2>
    <div class="mainTask"></div>
    <div class="availablePhrazes"></div>
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
      // data.sentenses = generateSentenses(options[0], options[1])
      const part1 = utils.getRandomListBySpeechPart(dictionary, 'useful phrases')
      const part2 = utils.getRandomListBySpeechPart(dictionary, 'idioms')
      data.phrases = [...part1, ...part2]
      break
    }

    case 'Second': {
      // data.sentenses = generateSentenses(options[0], options[1])
      const part1 = utils.getRandomListBySpeechPart(dictionary, 'useful phrases')
      const part2 = utils.getRandomListBySpeechPart(dictionary, 'idioms')
      data.phrases = [...part1, ...part2]
      break
    }

    case 'Third': {
      // data.sentenses = generateSentenses(options[0], options[1])
      const part1 = utils.getRandomListBySpeechPart(dictionary, 'useful phrases')
      const part2 = utils.getRandomListBySpeechPart(dictionary, 'idioms')
      data.phrases = [...part1, ...part2]
      break
    }
  }
  return data
}
