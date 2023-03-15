/* eslint-disable no-console */
const https = require('https')
const fs = require('fs')
const allure = require('@wdio/allure-reporter').default
const chai = require('chai')

const dynamicConfig = {}

// selenoid configuration:
// dynamicConfig.services = [['intercept'], ['shared-store']]
// dynamicConfig.hostname = 'localhost'
// dynamicConfig.port = 4444
// dynamicConfig.protocol = 'http'
// dynamicConfig.path = '/wd/hub'
dynamicConfig.capabilities = [
  {
    maxInstances: 1,
    browserName: 'chrome',
    'selenoid:options': {
      enableVNC: true,
      enableLog: true,
    },
    'goog:chromeOptions': {
      args: [
        '--no-sandbox',
        '--ignore-certificate-errors',
        '--disable-infobars',
        // '--headless',
        '--disable-gpu',
        '--window-size=1440,735',
        '--enable-features=NetworkService,NetworkServiceInProcess',
        '--disable-dev-shm-usage',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
      ],
    },
  },
]

exports.config = Object.assign(
  {},
  {
    specs: ['./source/tests/specs/*.spec.js'],
    exclude: [],
    logLevel: 'error',
    coloredLogs: true,
    bail: 0,
    // baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 60000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000,
    },
    reporters: [
      'spec',
      [
        'allure',
        {
          outputDir: './source/tests/reports/allure-results/',
          disableWebdriverStepsReporting: true,
          disableWebdriverScreenshotsReporting: false,
          useCucumberStepReporter: false,
        },
      ],
    ],
    onPrepare(/* config, capabilities */) {
      /* eslint-disable no-console */
      console.log('*** Normandy SR-2 is ready to fly, Captain ***')
      /* eslint-enable no-console */
    },

    before(/* capabilities, specs */) {
      global.allure = allure
      global.assert = chai.assert
      global.browser.setWindowSize(1920, 1080)
      global.should = chai.should()
    },

    async afterTest(test, context, { error }) {
      if (error) {
        await browser.takeScreenshot()
      }
    },

    async afterSuite() {
      if (!process.env.CI) {
        /* eslint-disable no-console */
        console.log('*** Suite end ***')
        /* eslint-enable no-console */
        // await browser.debug()
      }
    },

    async onComplete(exitCode, config, capabilities) {
      /* eslint-disable no-console */
      console.log('*** Thanks for the flight ***')
      // if (process.env.CI) {
      // }
      /* eslint-enable no-console */
    },
  },
  dynamicConfig,
)
