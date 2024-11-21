/* eslint-disable security/detect-object-injection */
async function handleElement(getElement) {
  let element

  getElement instanceof Promise ? element = await getElement : element = getElement

  return element
}

async function prepareState(getElement) {
  await getElement.waitForExist()
  await getElement.waitForDisplayed()
}

const methods = {
  // ---------------- действия с 1м элементом -----------------
  async $click(getElement) {
    const element = await handleElement(getElement)

    try {
      await prepareState(element)
      await element.waitForClickable()
      await element.click()
    } catch (error) {
      throw new Error(`Couldn't click on ${element}`)
    }
  },

  async $clickRandomXoffset(getElement, { right, left, step, withoutZero }) {
    const element = await handleElement(getElement)

    let pixelList = []

    while (right > left - 1) {
      pixelList.push(right)
      right = right - step
    }

    if (withoutZero) {
      pixelList = pixelList.filter((obj, _) => obj !== 0)
    }

    const randomX = pixelList[Math.floor(Math.random() * pixelList.length)]

    await prepareState(element)
    await element.click({ x: randomX })
  },

  async $clickXoffset(getElement, xOffset) {
    const element = await handleElement(getElement)

    await prepareState(element)
    await element.click({ x: xOffset })
  },

  async $setValue(getElement, value) {
    const element = await handleElement(getElement)

    try {
      await prepareState(element)
      await element.setValue(value)
    } catch (error) {
      throw new Error(`Couldn't set value for ${element}`)
    }
  },

  async $clearValue(getElement) {
    const element = await handleElement(getElement)

    try {
      await prepareState(element)
      await element.clearValue()
    } catch (error) {
      throw new Error(`Couldn't clear value of ${element}`)
    }
  },

  async $selectByAttribute(getElement, attr, value) {
    const element = await handleElement(getElement)

    try {
      await prepareState(element)
      await element.selectByAttribute(attr, value)
    } catch (error) {
      throw new Error(`Couldn't select ${element} by attribute`)
    }
  },

  async $selectByVisibleText(getElement, value) {
    const element = await handleElement(getElement)

    try {
      await prepareState(element)
      await element.selectByVisibleText(value)
    } catch (error) {
      throw new Error(`Couldn't select ${element} by text`)
    }
  },

  async $moveTo(getElement) {
    const element = await handleElement(getElement)

    try {
      await element.waitForExist()
      const location = await element.getLocation()

      await element.moveTo({ ...location })
    } catch (error) {
      throw new Error(`Couldn't move to ${element}`)
    }
  },

  // ---------------- действия с элементом из списка -----------------
  async $clickFromList(getList, index) {
    const list = await handleElement(getList)

    try {
      await prepareState(list[index])
      await list[index].waitForClickable()
      await this.$click(list[index])
    } catch (error) {
      throw new Error(`Couldn't click on ${list[index]}`)
    }
  },

  async $clickAnyFromList(getList) {
    const list = await handleElement(getList)

    try {
      const element = list[Math.floor(Math.random() * list.length)]

      await prepareState(element)
      await element.waitForClickable()
      await this.$click(element)
    } catch (error) {
      throw new Error(`Couldn't click on element from ${list}`)
    }
  },

  async $setValueFromList(getList, index, value) {
    const list = await handleElement(getList)

    try {
      await prepareState(list[index])
      await this.$setValue(list[index], value)
    } catch (error) {
      throw new Error(`Couldn't set value for ${list[index]}`)
    }
  },

  async $clearValueFromList(getList, index) {
    const list = await handleElement(getList)

    try {
      await prepareState(list[index])
      await this.$clearValue(list[index])
    } catch (error) {
      throw new Error(`Couldn't clear value for ${list[index]}`)
    }
  },

  async $moveToFromList(getList, index) {
    const list = await handleElement(getList)

    try {
      await list[index].waitForExist()
      await this.$moveTo(list[index])
    } catch (error) {
      throw new Error(`Couldn't move to ${list[index]}`)
    }
  },

  // ---------------- действия со всеми элементами списка -----------------
  async $clickAll(getList) {
    const list = await handleElement(getList)

    try {
      await list.forEach((element) => {
        ;(async () => {
          await this.$click(element)
        })()
      })
    } catch (error) {
      throw new Error(`Couldn't click on element from ${list}`)
    }
  },

  // ----------------- прочее ---------------------
  // add smth to store:
  async $addDataToStore(data, list) {
    const storeList = await browser.sharedstore.get(list) || []

    storeList.push(data)

    await browser.sharedstore.set(list, storeList)
  },

  // update smth in store:
  async $updateDataInStore(keyName, data, list) {
    const storeList = await browser.sharedstore.get(list) || []

    storeList.forEach(el => {
      if (el.keyName === keyName) {
        for (const [key, value] of Object.entries(data)) {
          el[key] = value
        }
      }
    })

    await browser.sharedstore.set(list, storeList)
  },

  // get smth from store:
  async $getDataFromStore(list, { firstParam, secondParam }) {
    let storeList = browser.sharedStore.get(list) || []

    // just for example
    storeList = storeList
      .filter(el => el === firstParam)
      .filter(el => el !== secondParam)
      .map(el => el.key)

    return storeList
  },

  async $safeCookie(keyName, storeList) {
    await this.$updateDataInStore(keyName, { cookie: await browser.getCookies() }, storeList)
  },

  async $setCookie(cookie, browserCookieName) {
    if (browserCookieName) {
      await browser.setCookies({ name: browserCookieName, value: cookie, path: '/' })
    } else {
      await browser.setCookies(cookie)
    }
  },

  async $dragAndDrop(getElement, targetX, targetY) {
    const element = await handleElement(getElement)

    try {
      await prepareState(element)
      await element.dragAndDrop({ x: targetX, y: targetY })
    } catch (error) {
      throw new Error(`Couldn't drag ${element}`)
    }
  },

  async $cutValue() {
    await browser.keys(['Control', 'a'])
    await browser.keys(['Control', 'x'])
  },

  async $copyValue() {
    await browser.keys(['Control', 'a'])
    await browser.keys(['Control', 'c'])
  },

  async $pasteValue() {
    await browser.keys(['Control', 'a'])
    await browser.keys(['Control', 'v'])
  },

  async $handleAlert(bool) {
    if (bool) {
      await browser.acceptAlert()
    } else {
      await browser.dismissAlert()
    }
  },

  // вэйтер создания одиночного элемента
  async $waitExist(cssSelectorElement, tryCount = 5, msCount = 1000) {
    await browser.execute(
      async (cssSelectorElement, tryCount, msCount) => {
        let retryCount = tryCount

        do {
          const waitElement = document.querySelector(cssSelectorElement)

          if (!waitElement) {
            await (async () => await new Promise((resolve) => setTimeout(resolve, msCount)))()

            retryCount--
          } else {
            retryCount = 0
          }
        } while (retryCount > 0)
      },
      cssSelectorElement,
      tryCount,
      msCount,
    )
  },

  // вэйтер создания элемента с опросом списка
  async $waitExistFromList(cssSelectorList, index, tryCount = 5, msCount = 1000) {
    await browser.execute(
      async (cssSelectorList, index, tryCount, msCount) => {
        let retryCount = tryCount

        do {
          const waitList = document.querySelectorAll(cssSelectorList)

          if (!waitList[index]) {
            await (async () => await new Promise((resolve) => setTimeout(resolve, msCount)))()

            retryCount--
          } else {
            retryCount = 0
          }
        } while (retryCount > 0)
      },
      cssSelectorList,
      index,
      tryCount,
      msCount,
    )
  },

  async $waitUntilGetText(getElement, text, timeout) {
    const element = await handleElement(getElement)

    await browser.waitUntil(async () => (await element.getText()) === text, {
      timeout,
      timeoutMsg: `expected text to be different after ${timeout}ms`,
    })
  },

  async $checkNeedRefresh(getElement, ms = 8000, tryCount = 6) {
    const element = await handleElement(getElement)

    let count = tryCount
    let isExist

    do {
      if (!count) {
        throw new Error(`Can't wait for ${element} is exist`)
      }

      isExist = await element.isExisting()

      if (!isExist) {
        await (async () => await new Promise((resolve) => setTimeout(resolve, ms)))()

        await browser.refresh()

        count--
      }
    } while (!isExist)
  },

  $getElement(selector, getParent) {
    if (getParent) {
      return (async () => {
        const parent = await getParent

        return parent.$(selector)
      })()
    }

    return (async () => await $(selector))()
  },

  $getElementFromList(selector, index, getParent) {
    return (async () => {
      const parent = await getParent

      return parent[index].$(selector)
    })()
  },

  $getElements(selector, getParent) {
    if (getParent) {
      return (async () => {
        const parent = await getParent

        return parent.$$(selector)
      })()
    }

    return (async () => await $$(selector))()
  },

  $getElementsFromList(selector, index, getParent) {
    return (async () => {
      const parent = await getParent

      return parent[index].$$(selector)
    })()
  },
}

export default methods
