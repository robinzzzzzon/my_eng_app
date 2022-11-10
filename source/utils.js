export function addWordToStorage(getWord, storageName) {
  let studyWords = this.getWordsFromStorage(storageName)
  const nameList = studyWords.map((el) => el.word)
  if (!nameList.includes(getWord.word)) {
    studyWords.push(getWord)
    localStorage.setItem(storageName, JSON.stringify(studyWords))
  }
}

export function getWordsFromStorage(itemName) {
  return JSON.parse(localStorage.getItem(itemName) || '[]')
}

export function getNewPartOfDictionary(speechPart, dictionary, index) {
  const intervalList = [
    { begin: 0, end: 10 },
    { begin: 10, end: 20 },
    { begin: 20, end: 30 },
    { begin: 30, end: 40 },
    { begin: 40, end: 50 },
  ]
  let interval = intervalList[index]

  return dictionary.filter((item) => item.wordType === speechPart).slice(interval.begin, interval.end)
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
    if (currentWord.studyLevel === 0) {
      return
    }

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
