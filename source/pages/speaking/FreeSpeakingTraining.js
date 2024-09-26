import '../../styles/freeSpeakingTraining.css'
import { easyTopicList, middleTopicList, hardTopicList } from '../../utils/constants'
import { setTimer, getRandomTopic, getRandomListBySpeechPart } from '../../utils/utils'
import dictionary from '../../utils/dictionary.json'

const contentRoot = document.querySelector('.content')

class FreeSpeakingTraining {
  renderPage(event, config) {
    event.preventDefault()
    
    const data = this.generateSpeakingData(config)
  
    contentRoot.innerHTML = `
    <div class="speakingAreaRoot">
      <div id="topicDiv">
        <h3>${data.topic}</h3>
      </div>
      <p>You should use these words or phrases:</p>
      <div class="availablePhrases"></div>
      <div id="timer"></div>
      <button class="myBtn nextBtn">Next</button>
    </div>
    `
  
    const timer = document.querySelector('#timer')
    
    setTimer(timer)
  
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
    nextBtn.addEventListener('click', () => this.renderPage(event, config))
  }
  
  generateSpeakingData(options) {
    let data = {}
  
    switch (options[1]) {
      case 'First': {
        data.topic = getRandomTopic(easyTopicList)
        const part1 = getRandomListBySpeechPart(dictionary, 'nouns', 5)
        const part2 = getRandomListBySpeechPart(dictionary, 'adjectives', 5)
        const part3 = getRandomListBySpeechPart(dictionary, 'adverbs', 5)
        data.phrases = [...part1, ...part2, ...part3]
        break
      }
  
      case 'Second': {
        data.topic = getRandomTopic(middleTopicList)
        const part1 = getRandomListBySpeechPart(dictionary, 'phrasal verbs', 5)
        const part2 = getRandomListBySpeechPart(dictionary, 'useful phrases', 5)
        const part3 = getRandomListBySpeechPart(dictionary, 'adverbs', 2)
        const part4 = getRandomListBySpeechPart(dictionary, 'nouns', 3)
        data.phrases = [...part1, ...part2, ...part3, ...part4]
        break
      }
  
      case 'Third': {
        data.topic = getRandomTopic(hardTopicList)
        const part1 = getRandomListBySpeechPart(dictionary, 'phrasal verbs', 5)
        const part2 = getRandomListBySpeechPart(dictionary, 'useful phrases', 7)
        const part3 = getRandomListBySpeechPart(dictionary, 'idioms', 3)
        data.phrases = [...part1, ...part2, ...part3]
        break
      }
    }
    return data
  }
}

export default new FreeSpeakingTraining()