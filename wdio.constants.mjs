const wdioConstants = {
  basePath: './source/tests/e2e/specs',
  moonChromeVrsnList: ['128.0', '129.0', '130.0'],
  baseCaps: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--no-sandbox',
        '--ignore-certificate-errors',
        '--disable-infobars',
        '--headless',
        '--disable-gpu',
        '--enable-features=NetworkService,NetworkServiceInProcess',
        '--disable-dev-shm-usage',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
      ],
    },
  },
  selenoidOpts: {
    enableVNC: true,
    enableVideo: false,
    sessionTimeout: '5m',
    logLevel: 'WARNING'
  },
  giveCapsList: function(specPath, localCount, moonCount) {
    return {
      localCaps: Object.assign(
        {},
        this.baseCaps,
        {
          maxInstances: localCount,
          specs: specPath,
        }
      ),
      selenoidCaps: Object.assign(
        {},
        this.baseCaps,
        {
          maxInstances: moonCount,
          browserVersion: this.moonChromeVrsnList[Math.floor(Math.random() * this.moonChromeVrsnList.length)],
          'selenoid:options': this.selenoidOpts,
          specs: specPath
        }
      )
    }
  }
}

export default wdioConstants