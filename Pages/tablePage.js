import { Tablelocators as loc } from '../Locators/Tablelocators.js';
import { HomePage } from './homePage.js';

export class TablePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.enrollDropdownButton = page.locator(loc.enrollDropdownButton);
    this.enrollLabel = page.locator(loc.enrollLabel);
    this.resetButton = page.locator(loc.resetButton);
    this.sortBySelect = page.locator(loc.sortBy);
    this.noData = page.locator(loc.noData);
    this.visibleRows = page.locator(loc.visibleRows);
  }

  language(value) {
    return this.page.locator(loc.language(value));
  }

  level(value) {
    return this.page.locator(loc.level(value));
  }

  async open() {
    await new HomePage(this.page).openTestTable();
  }

  /**
   * @param {'Any' | 'Java' | 'Python'} value
   */
  async selectLanguage(value) {
    await this.language(value).check();
  }

  /**
   * @param {'Beginner' | 'Intermediate' | 'Advanced'} value
   * @param {boolean} checked
   */
  async setLevel(value, checked) {
    const checkbox = this.level(value);
    if (checked) {
      await checkbox.check();
    } else {
      await checkbox.uncheck();
    }
  }

  /**
   * @param {'any' | '5000' | '10000' | '50000'} value
   */
  async selectMinEnrollments(value) {
    await this.enrollDropdownButton.click();
    await this.page.locator(loc.enrollOption(value)).click();
  }

  /**
   * @param {'col_id' | 'col_course' | 'col_lang' | 'col_level' | 'col_enroll'} value
   */
  async sortBy(value) {
    await this.sortBySelect.selectOption(value);
  }

  async reset() {
    await this.resetButton.click();
  }

  async getVisibleCourses() {
    return this.visibleRows.evaluateAll((rows) =>
      rows.map((row) => {
        const cell = (name) => row.querySelector(`td[data-col="${name}"]`).innerText.trim();
        return {
          name: cell('course'),
          language: cell('language'),
          level: cell('level'),
          enrollments: Number(cell('enrollments').replace(/[, ]/g, '')),
        };
      }),
    );
  }
}
