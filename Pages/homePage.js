import { expect } from '@playwright/test';
import { Homelocators as loc } from '../Locators/Homelocators.js';
import { env } from '../utils/envConfig.js';

export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.practiceMenu = page.locator(loc.practiceMenu);
    this.practiceHeading = page.locator(loc.practiceHeading);
    this.testLoginLink = page.locator(loc.testLoginLink);
    this.testExceptionsLink = page.locator(loc.testExceptionsLink);
    this.testTableLink = page.locator(loc.testTableLink);
  }

  async open() {
    await this.page.goto(env.baseURL, { waitUntil: 'domcontentloaded' });
  }

  async goToPractice() {
    await this.clickAndWaitForUrl(this.practiceMenu, env.urls.practice);
    await expect(this.practiceHeading).toBeVisible();
  }

  async openTestLogin() {
    await this.navigateFromPractice(this.testLoginLink, env.urls.login);
  }

  async openTestExceptions() {
    await this.navigateFromPractice(this.testExceptionsLink, env.urls.exceptions);
  }

  async openTestTable() {
    await this.navigateFromPractice(this.testTableLink, env.urls.table);
  }

  /**
   * @param {import('@playwright/test').Locator} link
   * @param {RegExp} expectedUrl
   */
  async navigateFromPractice(link, expectedUrl) {
    await this.open();
    await this.goToPractice();
    await this.clickAndWaitForUrl(link, expectedUrl);
  }

  /**
   * @param {import('@playwright/test').Locator} link
   * @param {RegExp} expectedUrl
   */
  async clickAndWaitForUrl(link, expectedUrl) {
    await Promise.all([
      this.page.waitForURL(expectedUrl, { waitUntil: 'domcontentloaded' }),
      link.click(),
    ]);
  }
}
