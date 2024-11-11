import chai from 'chai'

const chaiExpect = chai.expect

async function handleElement(getElement) {
  let element

  getElement instanceof Promise ? element = await getElement : element = getElement

  return element
}

function filterGetList(list, { from, to, numbers } = {}) {
  if (from && to) {
    list = list.filter((_, index) => index >= from && index <= to)
  } else if (numbers) {
    list = list.filter((_, index) => numbers.includes(index))
  }

  return list
}

const assertions = {
  // ---------------- проверка одиночных элементов -----------------
  async $isExist(getElement, isExist = true, waiter = 10000) {
    const element = await handleElement(getElement)

    isExist ? await element.waitForExist({ timeout: waiter }) : await element.waitForExist({ timeout: waiter, reverse: true })

    chaiExpect(await element.isExisting()).equals(isExist)
  },

  async $isClickable(getElement, isClickable = true, waiter = 10000) {
    const element = await handleElement(getElement)

    isClickable ? await element.waitForClickable({ timeout: waiter }) : await element.waitForClickable({ timeout: waiter, reverse: true })

    chaiExpect(await element.isClickable()).equals(isClickable)
  },

  async $isDisplayed(getElement, isDisplayed = true, waiter = 10000) {
    const element = await handleElement(getElement)

    isDisplayed ? await element.waitForDisplayed({ timeout: waiter }) : await element.waitForDisplayed({ timeout: waiter, reverse: true })

    chaiExpect(await element.isDisplayed()).equals(isDisplayed)
  },

  async $isEnabled(getElement, isEnabled = true, waiter = 10000) {
    const element = await handleElement(getElement)

    isEnabled ? await element.waitForEnabled({ timeout: waiter }) : await element.waitForEnabled({ timeout: waiter, reverse: true })

    chaiExpect(await element.isEnabled()).equals(isEnabled)
  },

  async $haveText(getElement, exampleText) {
    const element = await handleElement(getElement)

    await expect(element).toHaveText(exampleText)
  },

  async $haveMatchText(getElement, exampleText) {
    const element = await handleElement(getElement)
    const rawText = await element.getText()
    const result = rawText.replace(/\n/g, ' ').trim()

    chaiExpect(result).equals(exampleText)
  },

  async $haveContainingText(getElement, exampleText) {
    const element = await handleElement(getElement)

    await expect(element).toHaveTextContaining(exampleText)
  },

  async $haveValue(getElement, value, haveValue = true) {
    const element = await handleElement(getElement)

    haveValue ? await expect(element).toHaveValue(value) : await expect(element).not.toHaveValue(value)
  },

  async $haveAttr(getElement, attr, attrValue) {
    const element = await handleElement(getElement)

    await expect(element).toHaveAttr(attr, attrValue)
  },

  async $haveAttrContaining(getElement, attr, attrValue) {
    const element = await handleElement(getElement)

    await expect(element).toHaveAttrContaining(attr, attrValue)
  },

  async $checkError(getElement, errorText) {
    await this.$isDisplayed(getElement)
    await this.$haveText(getElement, errorText)
  },

  // ---------------- проверка элемента из списка -----------------
  async $isExistFromList(getList, index, isExist = true, waiter) {
    const list = await handleElement(getList)

    await this.$isExist(list[index], isExist, waiter)
  },

  async $isDisplayedFromList(getList, index, isDisplayed = true, waiter) {
    const list = await handleElement(getList)

    await this.$isDisplayed(list[index], isDisplayed, waiter)
  },

  async $isClickableFromList(getList, index, isClickable = true, waiter) {
    const list = await handleElement(getList)

    await this.$isClickable(list[index], isClickable, waiter)
  },

  async $isEnabledFromList(getList, index, isEnabled = true, waiter) {
    const list = await handleElement(getList)

    await this.$isEnabled(list[index], isEnabled, waiter)
  },

  async $haveTextFromList(getList, index, exampleText) {
    const list = await handleElement(getList)

    await this.$haveText(list[index], exampleText)
  },

  async $haveMatchTextFromList(getList, index, exampleText) {
    const list = await handleElement(getList)
    
    await this.$haveMatchText(list[index], exampleText)
  },

  async $haveContainingTextFromList(getList, index, exampleText) {
    const list = await handleElement(getList)

    await this.$haveContainingText(list[index], exampleText)
  },

  async $haveValueFromList(getList, index, value, haveValue = true) {
    const list = await handleElement(getList)

    await this.$haveValue(list[index], value, haveValue)
  },

  async $haveAttrFromList(getList, index, attr, attrValue) {
    const list = await handleElement(getList)

    await this.$haveAttr(list[index], attr, attrValue)
  },

  async $haveAttrContainingFromList(getList, index, attr, attrValue) {
    const list = await handleElement(getList)

    await this.$haveAttrContaining(list[index], attr, attrValue)
  },

  async $checkErrorFromList(getList, index, errorText) {
    const list = await handleElement(getList)

    await this.$isDisplayed(list[index])
    await this.$haveText(list[index], errorText)
  },

  // ---------------- проверка всех элементов списка -----------------
  async $isExistAll(getList, isExistAll = true, { waiter, from, to, numbers } = {}) {
    let list = await handleElement(getList)

    list = await filterGetList(list, { from, to, numbers })

    for (let i = 0; i < list.length; i++) {
      await this.$isExist(list[i], isExistAll, waiter)
    }
  },

  async $isDisplayedAll(getList, isDisplayedAll = true, { waiter, from, to, numbers } = {}) {
    let list = await handleElement(getList)

    list = await filterGetList(list, { from, to, numbers })

    for (let i = 0; i < list.length; i++) {
      await this.$isDisplayed(list[i], isDisplayedAll, waiter)
    }
  },

  async $isClickableAll(getList, isClickableAll = true, { waiter, from, to, numbers } = {}) {
    let list = await handleElement(getList)

    list = await filterGetList(list, { from, to, numbers })

    for (let i = 0; i < list.length; i++) {
      await this.$isClickable(list[i], isClickableAll, waiter)
    }
  },

  async $isEnabledAll(getList, isEnabledAll = true, { waiter, from, to, numbers } = {}) {
    let list = await handleElement(getList)

    list = await filterGetList(list, { from, to, numbers })

    for (let i = 0; i < list.length; i++) {
      await this.$isEnabled(list[i], isEnabledAll, waiter)
    }
  },

  async $haveTextAll(getList, textList, sameText, { from, to, numbers } = {}) {
    let list = await handleElement(getList)

    list = await filterGetList(list, { from, to, numbers })

    for (let i = 0; i < list.length; i++) {
      sameText ? await this.$haveText(list[i], textList) : await this.$haveText(list[i], textList[i])
    }
  },

  async $haveMatchTextAll(getList, textList, sameText, { from, to, numbers } = {}) {
    let list = await handleElement(getList)

    list = await filterGetList(list, { from, to, numbers })

    for (let i = 0; i < list.length; i++) {
      sameText ? await this.$haveMatchText(list[i], textList) : await this.$haveMatchText(list[i], textList[i])
    }
  },

  async $haveContainingTextAll(getList, textList, sameText, { from, to, numbers } = {}) {
    let list = await handleElement(getList)

    list = await filterGetList(list, { from, to, numbers })

    for (let i = 0; i < list.length; i++) {
      sameText ? await this.$haveContainingText(list[i], textList) : await this.$haveContainingText(list[i], textList[i])
    }
  },

  async $haveValueAll(getList, valueList, haveValue = true, sameValue, { from, to, numbers } = {}) {
    let list = await handleElement(getList)

    list = await filterGetList(list, { from, to, numbers })

    for (let i = 0; i < list.length; i++) {
      if (haveValue) {
        sameValue ? await this.$haveContainingText(list[i], valueList) : await this.$haveContainingText(list[i], valueList[i])
      } else {
        sameValue ? await this.$haveContainingText(list[i], valueList, false) : await this.$haveContainingText(list[i], valueList[i], false)
      }
    }
  },

  async $haveAttrAll(getList, attr, attrValueList, sameValue, { from, to, numbers } = {}) {
    let list = await handleElement(getList)

    list = await filterGetList(list, { from, to, numbers })

    for (let i = 0; i < list.length; i++) {
      sameValue ? await this.$haveAttr(list[i], attr, attrValueList) : await this.$haveAttr(list[i], attr, attrValueList[i])
    }
  },

  async $haveAttrContainingAll(getList, attr, attrValueList, sameValue, { from, to, numbers } = {}) {
    let list = await handleElement(getList)

    list = await filterGetList(list, { from, to, numbers })

    for (let i = 0; i < list.length; i++) {
      sameValue ? await this.$haveAttrContaining(list[i], attr, attrValueList) : await this.$haveAttrContaining(list[i], attr, attrValueList[i])
    }
  },

  async $checkErrorAll(getList, listSize, errorTextList, sameText, { from, to, numbers } = {}) {
    let list = await handleElement(getList)

    list = await filterGetList(list, { from, to, numbers })

    await this.$isArrayOfSize(list, listSize)

    for (let i = 0; i < list.length; i++) {
      await this.$isDisplayed(list[i])

      sameText ? await this.$haveText(list[i], errorTextList) : await this.$haveText(list[i], errorTextList[i])
    }
  },

  // ------------- будет распределено позже ---------------------
  async $isArrayOfSize(getList, size) {
    const list = await handleElement(getList)

    chaiExpect(list.length).equals(size)
  },

  async $titleContaining(title) {
    await expect(browser).toHaveTitleContaining(title)
  },

  async $urlContaining(url) {
    await expect(browser).toHaveUrlContaining(url)
  },

  async $checkHandle(title, url) {
    await this.$titleContaining(title)
    await this.$urlContaining(url)
  },

  async $cookieIsExist(nameCookie, isExists) {
    isExists ? await assert.exists(browser.getCookies([nameCookie])) : await assert.isEmpty(browser.getCookies([nameCookie]))
  },

  async $checkSendRequest(method, url, code) {
    await browser.resetExpectations()
    await browser.expectRequest(method, url, code)
    await browser.assertExpectedRequestsOnly(false)
  },
}

export default assertions
