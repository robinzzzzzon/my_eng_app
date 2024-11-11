const wdioConstants = {
  basePath: './source/tests/specs',
  moonChromeVrsnList: ['128.0', '129.0', '130.0'],
  baseCaps: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--no-sandbox',
        '--ignore-certificate-errors',
        '--disable-infobars',
        // '--headless',
        '--disable-gpu',
        '--enable-features=NetworkService,NetworkServiceInProcess',
        '--disable-dev-shm-usage',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
      ],
    },
  },
  moonOpts: {
    enableVNC: false,
    enableVideo: false,
    sessionTimeout: '7m',
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
      moonCaps: Object.assign(
        {},
        this.baseCaps,
        {
          maxInstances: moonCount,
          browserVersion: this.moonChromeVrsnList[Math.floor(Math.random() * this.moonChromeVrsnList.length)],
          'moon:options': this.moonOpts,
          specs: this.specPath
        }
      )
    }
  }
}

export default wdioConstants