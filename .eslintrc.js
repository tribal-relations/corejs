module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        es2021: true,
        node: true,
        "jest/globals": true,
    },
    extends: [
        "standard-with-typescript",
        "plugin:vue/vue3-essential"
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                ".eslintrc.{js,cjs}",
                "*.ts",
            ],
            extends: [
                // 'plugin:@typescript-eslint/recommended',
                // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            parserOptions: {
                sourceType: "script",
                project: ["./tsconfig.json"]
            }
        }
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "vue",
        "@typescript-eslint",
        "unused-imports",
        "no-autofix",
        "jest",
    ],
    rules: {
        // "indent": ["warn", 4],
        "indent": "off",
        "indent-legacy": "off",
        "no-autofix/indent": "off",
        "no-autofix/indent-legacy": "off",

        "@typescript-eslint/indent": "off",
        "@typescript-eslint/indent-legacy": "off",
        "no-autofix/@typescript-eslint/indent": "off",
        "no-autofix/@typescript-eslint/indent-legacy": "off",

        'no-trailing-spaces': "error",
        "comma-dangle": ["error", "always-multiline"],
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always",
        }],
        "@typescript-eslint/space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always",
        }],

        "no-unused-vars": 'off',
        "@typescript-eslint/no-unused-vars": 'off',
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            {"vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_"}
        ],
        '@typescript-eslint/strict-boolean-expressions': 'off',
    }
}
