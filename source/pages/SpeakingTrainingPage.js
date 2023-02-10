import '../styles/speakingTrainingStyles.css'

const dictionary = require('../dictionary.json')
const constants = require('../constants')
const utils = require('../utils')

let speechConfig

const contentRoot = document.querySelector('.content')

export function renderPage(event, config) {
  event.preventDefault()

  speechConfig = config

  const data = generateSpeakingData(speechConfig)

  contentRoot.innerHTML = `
  <div class="speakingAreaRoot">
    <div id="topicDiv">
      <h3>${data.topic}</h3>
    </div>
    <p>You should use these words or phrases:</p>
    <div class="availablePhrases"></div>
    <button class="myBtn nextBtn">Next</button>
  </div>
  `

  const phrasesRoot = document.querySelector('.availablePhrases')

  for (let index = 0; index < data.phrases.length; index++) {
    const phrase = document.createElement('div')
    phrase.setAttribute('id', 'phrase')
    phrase.textContent = data.phrases[index].word
    phrasesRoot.append(phrase)
  }

  phrasesRoot.addEventListener('click', (event) => {
    const target = event.target.closest('div')

    if (target.id !== 'phrase') return

    target.style.backgroundColor = '#DCDCDC'
  })

  const nextBtn = document.querySelector('.nextBtn')
  nextBtn.addEventListener('click', () => renderPage(event, speechConfig))
}

function generateSpeakingData(options) {
  let data = {}

  switch (options[1]) {
    case 'First': {
      data.topic = utils.getRandomTopic(constants.easyTopicList)
      const part1 = utils.getRandomListBySpeechPart(dictionary, 'nouns', 5)
      const part2 = utils.getRandomListBySpeechPart(dictionary, 'adjectives', 5)
      const part3 = utils.getRandomListBySpeechPart(dictionary, 'adverbs', 5)
      data.phrases = [...part1, ...part2, ...part3]
      break
    }

    case 'Second': {
      data.topic = utils.getRandomTopic(constants.middleTopicList)
      const part1 = utils.getRandomListBySpeechPart(dictionary, 'phrasal verbs', 5)
      const part2 = utils.getRandomListBySpeechPart(dictionary, 'useful phrases', 5)
      const part3 = utils.getRandomListBySpeechPart(dictionary, 'adverbs', 2)
      const part4 = utils.getRandomListBySpeechPart(dictionary, 'nouns', 3)
      data.phrases = [...part1, ...part2, ...part3, ...part4]
      break
    }

    case 'Third': {
      data.topic = utils.getRandomTopic(constants.hardTopicList)
      const part1 = utils.getRandomListBySpeechPart(dictionary, 'phrasal verbs', 5)
      const part2 = utils.getRandomListBySpeechPart(dictionary, 'useful phrases', 7)
      const part3 = utils.getRandomListBySpeechPart(dictionary, 'idioms', 3)
      data.phrases = [...part1, ...part2, ...part3]
      break
    }
  }
  return data
}
