// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { worker, workers } from 'node:cluster';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries : 0,
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',

  projects: [

    { name: 'chrome',
    use: {
    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace : 'on' //retain-on-failure
        },
    }
],

});
module.exports = config

