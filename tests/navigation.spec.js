import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/homePage.js';
import { env } from '../utils/envConfig.js';

test.describe('Navigation', () => {
  /** @type {HomePage} */
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test('TC-NAV-01: Practice menu opens the Practice page with all links', async () => {
    await homePage.goToPractice();

    await expect(homePage.testLoginLink).toBeVisible();
    await expect(homePage.testExceptionsLink).toBeVisible();
    await expect(homePage.testTableLink).toBeVisible();
  });

});
