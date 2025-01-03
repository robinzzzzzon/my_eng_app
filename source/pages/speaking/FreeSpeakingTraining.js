import '../../styles/freeSpeakingTraining.css'
import { setTimer, getRandomListBySpeechPart } from '../../utils/utils'
import { getTopicList } from '../../utils/chatGptApi';
import { spinner } from '../../utils/constants';
import dictionary from '../../utils/dictionary.json'

const contentRoot = document.querySelector('.content')

let topicList = []

class FreeSpeakingTraining {
  async renderPage(event, config) {
    event.preventDefault()

    if (!topicList.length) {
      contentRoot.innerHTML = spinner

      topicList = await getTopicList(config)
      topicList = topicList.choices[0].message.content.split('[TOPIC]').filter(el => el)
    }
    
    contentRoot.innerHTML = `
    <div class="speakingAreaRoot">
      <h3>${topicList.shift()}</h3>
      <br>
      <p>You should use these words or phrases:</p>
      <div class="availablePhrases"></div>
      <div id="timer"></div>
      <button class="myBtn nextBtn">Next</button>
    </div>
    `
  
    if (config[3]) {
      const timer = document.querySelector('#timer')

      setTimer(timer)
    }
  
    const phrasesRoot = document.querySelector('.availablePhrases')

    const wordList = this.generateWords(config);
  
    for (let index = 0; index < wordList.length; index++) {
      const phrase = document.createElement('div')
      phrase.setAttribute('id', 'phrase')
      phrase.textContent = wordList[index].word
      phrasesRoot.append(phrase)
    }
  
    phrasesRoot.addEventListener('click', (event) => {
      const target = event.target.closest('div')
  
      if (target.id !== 'phrase') return
  
      target.style.backgroundColor = '#DCDCDC'
    })
  
    const nextBtn = document.querySelector('.nextBtn')
    nextBtn.addEventListener('click', async () => this.renderPage(event, config))
  }
  
  generateWords(options) {
    let words

    if (options[2]) {
      return getRandomListBySpeechPart(dictionary, 'idioms', 15)
    }
  
    switch (options[1]) {
      case '5': {
        const part1 = getRandomListBySpeechPart(dictionary, 'nouns', 5)
        const part2 = getRandomListBySpeechPart(dictionary, 'adjectives', 5)
        const part3 = getRandomListBySpeechPart(dictionary, 'adverbs', 5)
        words = [...part1, ...part2, ...part3]
        break
      }
  
      case '10': {
        const part1 = getRandomListBySpeechPart(dictionary, 'phrasal verbs', 5)
        const part2 = getRandomListBySpeechPart(dictionary, 'useful phrases', 5)
        const part3 = getRandomListBySpeechPart(dictionary, 'adverbs', 2)
        const part4 = getRandomListBySpeechPart(dictionary, 'nouns', 3)
        words = [...part1, ...part2, ...part3, ...part4]
        break
      }
  
      case '20': {
        const part1 = getRandomListBySpeechPart(dictionary, 'phrasal verbs', 5)
        const part2 = getRandomListBySpeechPart(dictionary, 'useful phrases', 7)
        const part3 = getRandomListBySpeechPart(dictionary, 'idioms', 3)
        words = [...part1, ...part2, ...part3]
        break
      }
    }
    return words
  }
}

export default new FreeSpeakingTraining()