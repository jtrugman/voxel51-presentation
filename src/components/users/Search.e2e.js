const puppeteer = require('puppeteer');

describe('Search Component E2E Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000'); // Update with your React app's URL
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should show alert when search is submitted with empty input', async () => {
    await page.click('input[type="submit"]');
    const alertText = await page.$eval('.alert', el => el.textContent); // Update selector based on your app
    expect(alertText).toBe('Please enter something');
  });

  it('should clear input and show users after a successful search', async () => {
    await page.type('input[type="text"]', 'someUsername');
    await page.click('input[type="submit"]');
    await page.waitForSelector('.user'); // Update selector based on your app
    const inputText = await page.$eval('input[type="text"]', el => el.value);
    expect(inputText).toBe('');
    const users = await page.$$eval('.user', users => users.map(u => u.textContent)); // Update selector based on your app
    expect(users.length).toBeGreaterThan(0);
  });

  it('should clear users when the clear button is clicked', async () => {
    await page.click('.btn-light.btn-block'); // Update selector based on your app
    const users = await page.$('.user'); // Update selector based on your app
    expect(users).toBeNull();
  });
});
