export const env = {
  baseURL: 'https://practicetestautomation.com',
  paths: {
    home: '/',
  },
  urls: {
    practice: /\/practice\/?$/,
    login: /\/practice-test-login\/?$/,
    exceptions: /\/practice-test-exceptions\/?$/,
    table: /\/practice-test-table\/?$/,
  },
  login: {
    validUser: 'student',
    validPassword: 'Password123',
    invalidUser: 'incorrectUser',
    invalidPassword: 'incorrectPassword',
    invalidUsernameMessage: 'Your username is invalid!',
    invalidPasswordMessage: 'Your password is invalid!',
    successUrl: /practicetestautomation\.com\/logged-in-successfully\/?/,
    successText: /Congratulations|successfully logged in/i,
  },
  exceptions: {
    row2WaitMs: 15_000,
    editedRow1Value: 'Sushi',
    row2Value: 'Noodles',
    row2SavedMessage: 'Row 2 was saved',
  },
  table: {
    minEnrollments: '10000',
    noMatchMessage: 'No matching courses.',
  },
};
