import path from 'path'

export default {
    clearMocks: true,
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: [
        '\\\\node_modules\\\\'
    ],
    moduleDirectories: [
        'node_modules'
    ],
    rootDir: '../../',
    testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
    modulePaths: [
        '<rootDir>src'
    ],
    setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.ts'],
    moduleNameMapper: {
        '\\.s?css$': 'identity-obj-proxy',
        '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx')
    },
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node'
    ]
}
