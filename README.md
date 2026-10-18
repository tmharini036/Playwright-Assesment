# Practice Test Automation — Playwright POM

Page Object Model tests for three Practice Test Automation pages:

- [Login](https://practicetestautomation.com/practice-test-login/)
- [Exceptions](https://practicetestautomation.com/practice-test-exceptions/)
- [Course table](https://practicetestautomation.com/practice-test-table/)

Each test starts at the [home page](https://practicetestautomation.com/), clicks **Practice** in the top menu, then opens the page under test from its link (**Test Login Page**, **Test Exceptions**, or **Test Table**). The URL is asserted at each step, so a broken menu or link fails the test.

Locators, page actions, and specs are split so a new page can be added without changing the others.

## Prerequisites

- Node.js 18 or newer
- Network access to `https://practicetestautomation.com`

## Setup

```bash
npm install
npx playwright install chromium
```

## Run

```bash
npm test
```

Headed browser:

```bash
npm run test:headed
```

HTML report:

```bash
npm run report
```

## Project structure

```text
Assesment/
  Locators/          Selector catalog
    Homelocators.js
    Loginlocators.js
    Exceptionslocators.js
    Tablelocators.js
  Pages/             Actions for each screen
    homePage.js      Home -> Practice -> page link
    loginPage.js
    exceptionsPage.js
    tablePage.js
  tests/             Assertions
    navigation.spec.js
    login.spec.js
    exceptions.spec.js
    table.spec.js
  utils/
    envConfig.js     URLs, credentials, and expected messages
    playwright.config.js
```

## Tests

| ID | Spec | Check |
| --- | --- | --- |
| TC-NAV-01 | navigation | Practice menu shows all three practice links |
| TC-NAV-02 | navigation | Test Login Page link |
| TC-NAV-03 | navigation | Test Exceptions link |
| TC-NAV-04 | navigation | Test Table link |
| TC-LOGIN-01 | login | Valid login URL, success text, and Log out |
| TC-LOGIN-02 | login | Incorrect username |
| TC-LOGIN-03 | login | Incorrect password |
| TC-EX-01 | exceptions | Row 2 input appears after Add |
| TC-EX-02 | exceptions | Visible Save stores Row 2 |
| TC-EX-03 | exceptions | Edit enables the disabled input |
| TC-EX-04 | exceptions | Instructions are removed after Add |
| TC-EX-05 | exceptions | Row 2 appears when the wait is longer than 3 seconds |
| TC-TABLE-01 | table | Language = Java |
| TC-TABLE-02 | table | Beginner only |
| TC-TABLE-03 | table | Min enrollments 10,000+ compared as numbers |
| TC-TABLE-04 | table | Python + Beginner + 10,000+ |
| TC-TABLE-05 | table | No matching courses |
| TC-TABLE-06 | table | Reset restores defaults and hides itself |
| TC-TABLE-07 | table | Enrollments sort ascending numerically |
| TC-TABLE-08 | table | Course name stays A–Z after a filter change |

Valid login data is username `student` and password `Password123`.
