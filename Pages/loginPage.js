import { Loginlocators as loc } from '../Locators/Loginlocators.js';
import { HomePage } from './homePage.js';

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator(loc.usernameInput);
    this.passwordInput = page.locator(loc.passwordInput);
    this.submitButton = page.locator(loc.submitButton);
    this.errorMessage = page.locator(loc.errorMessage);
    this.successText = page.locator(loc.successText);
    this.logoutLink = page.locator(loc.logoutLink);
  }

  async open() {
    await new HomePage(this.page).openTestLogin();
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
