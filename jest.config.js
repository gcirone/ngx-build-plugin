const jestJunitConfig = {
  outputDirectory: '<rootDir>/build/test-results/jest',
  outputName: 'results.xml'
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  name: 'ngx-build-plugin',
  roots: ['<rootDir>/src/'],

  testMatch: ['**/*+(spec|test).+(ts|js)?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],

  collectCoverage: true,
  coverageReporters: ['lcovonly', 'html', 'text-summary'],
  coveragePathIgnorePatterns: ['/node_modules/', '/build/', 'json'],
  coverageDirectory: '<rootDir>/build/coverage',

  reporters: ['default', ['jest-junit', jestJunitConfig]],
  cacheDirectory: '<rootDir>/build/.jest-cache'
};
