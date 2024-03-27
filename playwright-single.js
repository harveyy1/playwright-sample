const { chromium } = require('playwright')
const { expect } = require('@playwright/test');

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Focusrite Web',
      'name': 'Playwright Sample Test',
      'user': 'harvey.prewer',
      'accessKey': 'PR5vz7C7ATNow9Sx0vX5ypBtK0sX4MHhp39Xg6qv7Tmk3OZ6kg',
      'network': true,
      'video': true,
      'console': true
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()

  await page.goto('https://downloads.focusrite.com/focusrite');

  await page.getByRole('button', { name: 'Allow all cookies' }).click();
  

  // Click the get started link.
  await page.getByRole('link', { name: 'Get Novation downloads' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Novation Downloads' })).toBeVisible();

  await browser.close()
})()
