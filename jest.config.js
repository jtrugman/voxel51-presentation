module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.e2e\\.js$',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testMatch: ['**/?(*.)+(spec|test|e2e).[jt]s?(x)'],

  };
  