// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest');

// This loads Next.js config into Jest
const createJestConfig = nextJest({
	dir: './', // Path to your Next.js app root
});

/** @type {import('jest').Config} */
const customJestConfig = {
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	// Add more extensions if needed
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

module.exports = createJestConfig(customJestConfig);
