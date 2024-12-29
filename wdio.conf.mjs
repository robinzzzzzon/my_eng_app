/* eslint-disable no-console */
import chai from 'chai'
import allure from '@wdio/allure-reporter'
import { concurrentConfig } from './wdio.shared_concurrent.conf.mjs'
import { parallelConfig } from './wdio.shared_parallel.conf.mjs'

const dynamicConfig = {}

if (process.env.CI) {
  dynamicConfig.reporters = [
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
  ]
} else {
  dynamicConfig.services = [
    [
      'chromedriver',
      {
        logFileName: 'wdio-chromedriver.log',
        outputDir: 'driver-logs',
        args: ['--silent'],
      }
    ],
    ['intercept'], 
    ['shared-store']
  ]
  dynamicConfig.reporters = ['spec']
  // dynamicConfig.capabilities = [concurrentConfig.selenoidCaps, parallelConfig.selenoidCaps]
  dynamicConfig.capabilities = [
    {
      maxInstances: 1,
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
        'selenoid:options' : {
          enableVNC: true,
          enableVideo: false,
          sessionTimeout: '5m',
          logLevel: 'WARNING'
        }
    }
  ]
  dynamicConfig.protocol = 'http',
  dynamicConfig.hostname = 'localhost',
  dynamicConfig.path = '/wd/hub',
  dynamicConfig.port = 4444
}

export const config = Object.assign(
  {},
  {
    specs: ['./source/tests/e2e/specs/*.spec.mjs'],
    exclude: [],
    logLevel: 'error',
    coloredLogs: true,
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 30000,
    connectionRetryCount: 2,
    framework: 'mocha',
    mochaOpts: {
      ui: 'bdd',
      timeout: 30000,
    },

    onPrepare(/* config, capabilities */) {
      /* eslint-disable no-console */
      console.log('*** Normandy SR-2 is ready to fly, Captain ***')
      /* eslint-enable no-console */
    },

    before(/* capabilities, specs */) {
      global.allure = allure
      global.assert = chai.assert
      global.should = chai.should()
      global.browser.maximizeWindow()
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
