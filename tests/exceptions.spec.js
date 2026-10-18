import { test, expect } from '@playwright/test';
import { ExceptionsPage } from '../Pages/exceptionsPage.js';
import { env } from '../utils/envConfig.js';

test.describe('Exceptions', () => {
  /** @type {ExceptionsPage} */
  let exceptionsPage;

  test.beforeEach(async ({ page }) => {
    exceptionsPage = new ExceptionsPage(page);
    await exceptionsPage.open();
  });

  test('TC-EX-01: Add shows the Row 2 input after it is rendered', async () => {
    await exceptionsPage.addRow();

    await expect(exceptionsPage.row2Input).toBeVisible({ timeout: env.exceptions.row2WaitMs });
  });

  test('TC-EX-02: the visible Save button stores Row 2', async () => {
    await exceptionsPage.addRow();
    await exceptionsPage.fillRow2(env.exceptions.row2Value);
    await exceptionsPage.saveVisibleRow();

    await expect(exceptionsPage.row2Input).toHaveValue(env.exceptions.row2Value);
    await expect(exceptionsPage.confirmation).toHaveText(env.exceptions.row2SavedMessage);
  });

  test('TC-EX-03: Edit enables the disabled Row 1 input', async () => {
    await exceptionsPage.editRow1();
    await exceptionsPage.row1Input.clear();
    await exceptionsPage.row1Input.fill(env.exceptions.editedRow1Value);

    await expect(exceptionsPage.row1Input).toHaveValue(env.exceptions.editedRow1Value);
  });

  test('TC-EX-04: Add removes the instructions element', async () => {
    await expect(exceptionsPage.instructions).toBeVisible();

    await exceptionsPage.addRow();

    await expect(exceptionsPage.instructions).toHaveCount(0);
  });

  test('TC-EX-05: Row 2 is displayed when the wait is longer than 3 seconds', async () => {
    await exceptionsPage.addRow();

    await expect(exceptionsPage.row2Input).toBeVisible({ timeout: env.exceptions.row2WaitMs });
  });
});
