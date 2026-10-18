import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage.js';
import { env } from '../utils/envConfig.js';

test.describe('Login', () => {
  /** @type {LoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('TC-LOGIN-01: valid credentials open the success page', async () => {
    await loginPage.login(env.login.validUser, env.login.validPassword);

    await expect(loginPage.page).toHaveURL(env.login.successUrl);
    await expect(loginPage.successText).toBeVisible();
    await expect(loginPage.logoutLink).toBeVisible();
  });

  test('TC-LOGIN-02: incorrect username shows an invalid username error', async () => {
    await loginPage.login(env.login.invalidUser, env.login.validPassword);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(env.login.invalidUsernameMessage);
  });

  test('TC-LOGIN-03: incorrect password shows an invalid password error', async () => {
    await loginPage.login(env.login.validUser, env.login.invalidPassword);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(env.login.invalidPasswordMessage);
  });
});
