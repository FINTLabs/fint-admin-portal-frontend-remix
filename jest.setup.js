module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        // If you're using CSS Modules, this setup is helpful
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    transform: {
        // Transform files with babel-jest
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
};
