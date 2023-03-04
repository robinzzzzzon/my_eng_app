const chai = require('chai')
const chaiExpect = chai.expect

module.exports = {
  // ---------------- проверка одиночных элементов -----------------
  async $isClickable(getElement) {
    let element = getElement

    if (getElement instanceof Promise) {
      element = await getElement
    }

    await element.isClickable()
  },

  async $checkDisplayed(getElement) {
    let element = getElement

    if (getElement instanceof Promise) {
      element = await getElement
    }

    await expect(element).toBeDisplayed()
  },

  async $isDisabled(getElement, isNotDisable) {
    let element = getElement

    if (getElement instanceof Promise) {
      element = await getElement
    }

    if (isNotDisable) {
      await expect(element).not.toBeDisabled()
    } else {
      await expect(element).toBeDisabled()
    }
  },

  async $haveText(getElement, exampleText) {
    let element = getElement

    if (getElement instanceof Promise) {
      element = await getElement
    }

    await expect(element).toHaveText(exampleText)
  },

  async $haveMatchText(getElement, exampleText) {
    let element = getElement

    if (getElement instanceof Promise) {
      element = await getElement
    }

    const rawText = await element.getText()
    const result = await rawText.replace(/\n/g, ' ').trim()

    chaiExpect(result).equal(exampleText)
  },

  async $haveContainingText(getElement, exampleText) {
    let element = getElement

    if (getElement instanceof Promise) {
      element = await getElement
    }

    await expect(element).toHaveTextContaining(exampleText)
  },

  async $haveValue(getElement, value) {
    let element = getElement

    if (getElement instanceof Promise) {
      element = await getElement
    }

    await expect(element).toHaveValue(value)
  },

  async $checkError(getElement, errorText) {
    await this.$checkDisplayed(getElement)
    await this.$haveText(getElement, errorText)
  },

  async $haveAttr(getElement, attr, attrValue) {
    let element = getElement

    if (getElement instanceof Promise) {
      element = await getElement
    }

    await expect(element).toHaveAttr(attr, attrValue)
  },

  async $haveAttrContaining(getElement, attr, attrValue) {
    let element = getElement

    if (getElement instanceof Promise) {
      element = await getElement
    }

    await expect(element).toHaveAttrContaining(attr, attrValue)
  },
  // ---------------- проверка элемента из списка -----------------

  async $checkDisplayedFromList(getList, index) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    await expect(list[index]).toBeDisplayed()
  },

  async $checkDisplayedFromList(getList, index) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    await expect(list[index]).toBeDisplayed()
  },

  async $isDisabledFromList(getList, index, isNotDisable) {
    let list = getList

    if (list instanceof Promise) {
      list = await getList
    }

    if (isNotDisable) {
      await expect(list[index]).not.toBeDisabled()
    } else {
      await expect(list[index]).toBeDisabled()
    }
  },

  async $isClickableFromList(getList, index) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    await list[index].isClickable()
  },

  async $haveTextFromList(getList, index, exampleText) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    await expect(list[index]).toHaveText(exampleText)
  },

  async $haveMatchTextFromList(getList, index, exampleText) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    const rawText = await list[index].getText()
    const result = await rawText.replace(/\n/g, ' ').trim()

    chaiExpect(result).equal(exampleText)
  },

  async $haveContainingTextFromList(getList, index, exampleText) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    await expect(list[index]).toHaveTextContaining(exampleText)
  },

  async $checkErrorFromList(getList, index, errorText) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    await this.$checkDisplayed(list[index])
    await this.$haveTextFromList(list, index, errorText)
  },

  async $haveAttrFromList(getList, index, attr, attrValue) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    await expect(list[index]).toHaveAttr(attr, attrValue)
  },

  async $haveAttrContainingFromList(getList, index, attr, attrValue) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    await expect(list[index]).toHaveAttrContaining(attr, attrValue)
  },
  // ---------------- проверка всех элементов списка -----------------

  async $checkDisplayedAll(getList) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    for (let i = 0; i < list.length; i++) {
      await this.$checkDisplayed(list[i])
    }
  },

  async $isClickableAll(getList) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    for (let i = 0; i < list.length; i++) {
      await this.$isClickable(list[i])
    }
  },

  async $haveTextAll(getList, textList) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    for (let i = 0; i < list.length; i++) {
      await this.$haveText(list[i], textList[i])
    }
  },

  async $haveMatchTextAll(getList, textList) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    for (let i = 0; i < list.length; i++) {
      await this.$haveMatchText(list[i], textList[i])
    }
  },

  async $checkErrorAll(getList, getListSize, errorTextList, bool) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    await this.$isArrayOfSize(list, getListSize)

    for (let i = 0; i < list.length; i++) {
      await this.$checkDisplayed(list[i])

      if (bool) {
        await this.$haveText(list[i], errorTextList)
      } else {
        await this.$haveText(list[i], errorTextList[i])
      }
    }
  },

  async $haveAttrAll(getList, attr, attrValueList, bool) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    for (let i = 0; i < list.length; i++) {
      if (bool) {
        await this.$haveAttr(list[i], attr, attrValueList)
      } else {
        await this.$haveAttr(list[i], attr, attrValueList[i])
      }
    }
  },

  async $haveAttrContainingAll(getList, attr, attrValueList, bool) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    for (let i = 0; i < list.length; i++) {
      if (bool) {
        await this.$haveAttrContaining(list[i], attr, attrValueList)
      } else {
        await this.$haveAttrContaining(list[i], attr, attrValueList[i])
      }
    }
  },

  async $isDisableAll(getList) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    for (let i = 0; i < list.length; i++) {
      await this.$isDisable(list[i])
    }
  },
  // ------------- будет распределено позже ---------------------
  async $isArrayOfSize(getList, size) {
    let list = getList

    if (getList instanceof Promise) {
      list = await getList
    }

    await expect(list).toBeElementsArrayOfSize(size)
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

  async $cookieIsExist(nameCookie, bool) {
    if (bool) {
      await assert.exists(browser.getCookies([nameCookie]))
    } else {
      await assert.isEmpty(browser.getCookies([nameCookie]))
    }
  },

  async $checkSendRequest(method, url, code) {
    await browser.resetExpectations()
    await browser.expectRequest(method, url, code)
    await browser.assertExpectedRequestsOnly(false)
  },
}
