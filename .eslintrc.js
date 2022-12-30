module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: ['plugin:react/recommended', 'standard-with-typescript', 'plugin:i18next/recommended', 'plugin:storybook/recommended'],
    parser: '@typescript-eslint/parser',
    overrides: [{
        files: ['*.ts', '*.tsx'],
        extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
        rules: {
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unsafe-call': 'warn'
        },

        parserOptions: {
            project: ['./tsconfig.json']
        }
    }, {
        files: ['*.stories.tsx'],
        rules: {
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            'i18next/no-literal-string': 'off'
        }
    }, {
        files: ['*.config.ts'],
        rules: {
            '@typescript-eslint/no-non-null-assertion': 'off'
        }
    }, {
        files: ['*.test.tsx', '*.test.ts'],
        rules: {
            '@typescript-eslint/unbound-method': 'off'
        }
    }],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks', 'fsd-plugin-fsd', 'unused-imports'],
    rules: {
        '@typescript-eslint/strict-boolean-expressions': 'off',
        'react/jsx-indent': [2, 4],
        indent: [2, 4, {
            SwitchCase: 1
        }],
        '@typescript-eslint/indent': [2, 4],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        'eol-last': 0,
        'unused-imports/no-unused-imports': 'error',
        'no-multiple-empty-lines': ['error', {
            max: 1,
            maxEOF: 0
        }],
        'react/react-in-jsx-scope': 'off',
        'no-underscore-dangle': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'i18next/no-literal-string': ['error', {
            markupOnly: true
        }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/display-name': 'off',
        'no-undef': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/prefer-ts-expect-error': 'off',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        'n/no-callback-literal': 'off',
        'fsd-plugin-fsd/path-checker': ['error', { alias: '@' }],
        'fsd-plugin-fsd/public-api-imports-fsd': [
            'error',
            {
                alias: '@',
                testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx']
            }
        ],
        'fsd-plugin-fsd/layer-imports': [
            'error',
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProvider', '**/testing']
            }
        ],
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/return-await': 'off'
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true
    }
}