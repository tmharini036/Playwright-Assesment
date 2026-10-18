import { Exceptionslocators as loc } from '../Locators/Exceptionslocators.js';
import { env } from '../utils/envConfig.js';
import { HomePage } from './homePage.js';

export class ExceptionsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addButton = page.locator(loc.addButton);
    this.row1Input = page.locator(loc.row1Input);
    this.row1EditButton = page.locator(loc.row1EditButton);
    this.row2Input = page.locator(loc.row2Input);
    this.visibleSaveButton = page.locator(loc.visibleSaveButton);
    this.instructions = page.locator(loc.instructions);
    this.confirmation = page.locator(loc.confirmation);
  }

  async open() {
    await new HomePage(this.page).openTestExceptions();
  }

  async addRow() {
    await this.addButton.click();
  }

  async editRow1() {
    await this.row1EditButton.click();
  }

  /**
   * Row 2 is inserted about five seconds after Add.
   * @param {string} value
   */
  async fillRow2(value) {
    await this.row2Input.fill(value, { timeout: env.exceptions.row2WaitMs });
  }

  async saveVisibleRow() {
    await this.visibleSaveButton.click();
  }
}
