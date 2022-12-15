import puppeteer from 'puppeteer';

describe('Ppp', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test('test', async () => {
    page.goto('http://localhost:8888');
  });
});
