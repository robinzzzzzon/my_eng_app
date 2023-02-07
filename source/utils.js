export function addWordToStorage(getWord, storageName) {
  let studyWords = this.getWordsFromStorage(storageName)
  const nameList = studyWords.map((el) => el.word)
  if (!nameList.includes(getWord.word)) {
    getWord.studyLevel = 0
    studyWords.push(getWord)
    localStorage.setItem(storageName, JSON.stringify(studyWords))
  }
}

export function getWordsFromStorage(itemName) {
  return JSON.parse(localStorage.getItem(itemName) || '[]')
}

export function filterCurrentDictionary(dictionary, speechPart) {
  let studyArray = getWordsFromStorage(speechPart)

  if (studyArray) {
    studyArray = studyArray.map((item) => item.word)

    dictionary = dictionary.filter((item) => !studyArray.includes(item.word))
  }

  return dictionary
}

export function modifyStudyLevel(speechPart, getWord, isRight) {
  let speechDictionary = []
  let allStudyDictionary = []

  if (speechPart === 'all-study-words') {
    speechDictionary = JSON.parse(localStorage.getItem(getWord.wordType))
    allStudyDictionary = getWordsFromStorage(speechPart)
  } else {
    speechDictionary = getWordsFromStorage(speechPart)
    allStudyDictionary = getWordsFromStorage('all-study-words')
  }

  const currentWord = speechDictionary.find((item) => item.word === getWord.word)

  if (isRight) {
    if (currentWord.studyLevel === 4) {
      speechDictionary = speechDictionary.filter((item) => item.word !== getWord.word)
      allStudyDictionary = allStudyDictionary.filter((item) => item.word !== getWord.word)

      if (!allStudyDictionary.length) {
        localStorage.clear()
      } else if (speechPart === 'all-study-words') {
        localStorage.setItem(getWord.wordType, JSON.stringify(speechDictionary))
        localStorage.setItem(speechPart, JSON.stringify(allStudyDictionary))
      } else {
        localStorage.setItem(speechPart, JSON.stringify(speechDictionary))
        localStorage.setItem('all-study-words', JSON.stringify(allStudyDictionary))
      }

      return
    }

    speechDictionary.forEach((item) => {
      if (item.word === getWord.word) {
        item.studyLevel++
      }
    })

    allStudyDictionary.forEach((item) => {
      if (item.word === getWord.word) {
        item.studyLevel++
      }
    })
  } else {
    if (currentWord.studyLevel === 0) return

    speechDictionary.forEach((item) => {
      if (item.word === getWord.word) {
        item.studyLevel--
      }
    })

    allStudyDictionary.forEach((item) => {
      if (item.word === getWord.word) {
        item.studyLevel--
      }
    })
  }

  if (speechPart === 'all-study-words') {
    localStorage.setItem(getWord.wordType, JSON.stringify(speechDictionary))
    localStorage.setItem(speechPart, JSON.stringify(allStudyDictionary))
  } else {
    localStorage.setItem(speechPart, JSON.stringify(speechDictionary))
    localStorage.setItem('all-study-words', JSON.stringify(allStudyDictionary))
  }
}

export function fillProgressBar(initDictionary, currentDictionary, selector = '.myProgressBar') {
  const progressBar = document.querySelector(selector)
  progressBar.style.gridTemplateColumns = `repeat(${initDictionary.length}, 1fr)`

  for (let index = 0; index < initDictionary.length; index++) {
    const item = document.createElement('div')
    progressBar.append(item)
  }

  const colorizeLength = initDictionary.length - currentDictionary.length

  let itemList = document.querySelector(selector).childNodes
  itemList = Array.from(itemList)

  for (let index = 0; index < colorizeLength; index++) {
    itemList[index].style.backgroundColor = '#98FB98'
  }
}

export function checkEmptyStorageBySpeechPart(speechPart) {
  if (!JSON.parse(localStorage.getItem(speechPart)).length) {
    retryBtn.disabled = 'true'
    localStorage.removeItem(speechPart)
  }
}

export function getRandomListBySpeechPart(dictionary, speechPart, size = 5) {
  const speechDictionary = dictionary.filter((item) => item.wordType === speechPart)
  let randomList = []

  while (randomList.length !== size) {
    const phrase = speechDictionary[Math.floor(Math.random() * speechDictionary.length)]

    if (!randomList.includes(phrase)) randomList.push(phrase)
  }

  return randomList
}

export function getRandomTopic(topicList) {
  return topicList[Math.floor(Math.random() * topicList.length)]
}
