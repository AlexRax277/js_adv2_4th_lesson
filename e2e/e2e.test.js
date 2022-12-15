import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8888';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 50,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test.each([
    '4',
    'afaasfk',
    '135463746354',
    '4400 4164 2568 1234',
  ])('test form-control invalid', async (n, done) => {
    await page.goto(baseUrl);
    const formGroup = await page.$('.form-group');
    const input = await formGroup.$('.form-control');
    const button = await formGroup.$('.btn');

    await input.type(n);
    await button.click();

    const msg = await formGroup.$eval('.msg', (el) => el.classList.value);

    await expect(msg).toEqual('msg invalid');
    done();
  });

  test.each([
    ['371449635398431', 'am-exp'],
    ['30569309025904', 'din-cl'],
    ['6011111111111117', 'disc'],
    ['3530111333300000', 'jcb'],
    ['5555555555554444', 'master'],
    ['4111111111111111', 'visa'],
    ['2200 0000 0000 0004', 'mir'],
  ])('test form-control frame', async (n, res, done) => {
    await page.goto(baseUrl);
    const formGroup = await page.$('.form-group');
    const input = await formGroup.$('.form-control');
    const button = await formGroup.$('.btn');

    await input.type(n);
    await button.click();

    const cardInFrame = await page.$eval('.frame', (el) => el.classList.value);

    await expect(cardInFrame).toEqual(`card ${res} frame`);
    done();
  });
});
