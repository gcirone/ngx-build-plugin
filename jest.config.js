const jestJunitConfig = {
  outputDirectory: '<rootDir>/dist/test-results/jest',
  outputName: 'results.xml'
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  name: 'ngx-build-plugin',
  roots: ['<rootDir>/src/'],

  testMatch: ['**/*+(spec|test).+(ts|js)?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  collectCoverage: true,
  coverageReporters: ['lcovonly', 'html', 'text-summary'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', 'json'],
  coverageDirectory: '<rootDir>/dist/coverage',

  reporters: ['default', ['jest-junit', jestJunitConfig]],
  cacheDirectory: '<rootDir>/dist/.jest-cache'
};
