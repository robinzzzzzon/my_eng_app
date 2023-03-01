class Page {
  async open(path = 'http://localhost:3000') {
    await browser.url(path)
}

  async getUrl(path) {
    return (
      (await browser.config.baseUrl) + ((await browser.config.basePath) || '') + path
    );
  }

  async takeScreen() {
    await browser.setTimeout({
      pageLoad: 10000,
      script: 60000,
    });

    await browser.saveScreenshot('./test/reports/allure-results/screen.png');
  }
}

module.exports = Page
