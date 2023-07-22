module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy" ,
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
  };
  