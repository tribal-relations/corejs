const config = {
    parser: 'vue-eslint-parser',
    env: {
        browser: true,
        es2021: true,
        node: true,
        "jest/globals": true,
    },
    extends: [
        "standard-with-typescript",
        "plugin:vue/vue3-essential",

        'plugin:import/recommended',
        'plugin:import/typescript',

        '@nuxtjs/eslint-config-typescript',
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
        extraFileExtensions: ['.vue'],
        parser: "@typescript-eslint/parser",
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "vue",
        "@typescript-eslint",
        "unused-imports",
        "no-autofix",
        "jest",
        'import',
        // 'sort-class-members',

    ],
    rules: {
        "@typescript-eslint/no-extraneous-class": "off",

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

        // "@typescript-eslint/member-ordering": [
        //     "error",
        //     {
        //         "classes": {
        //             "order": "alphabetically",
        //         },
        //         "default": [
        //             // Index signature
        //             "signature",
        //             "call-signature",
        //
        //             // Fields
        //             "public-static-field",
        //             "protected-static-field",
        //             "private-static-field",
        //             "#private-static-field",
        //
        //             "public-decorated-field",
        //             "protected-decorated-field",
        //             "private-decorated-field",
        //
        //             "public-instance-field",
        //             "protected-instance-field",
        //             "private-instance-field",
        //             "#private-instance-field",
        //
        //             "public-abstract-field",
        //             "protected-abstract-field",
        //
        //             "public-field",
        //             "protected-field",
        //             "private-field",
        //             "#private-field",
        //
        //             "static-field",
        //             "instance-field",
        //             "abstract-field",
        //
        //             "decorated-field",
        //
        //             "field",
        //
        //             // Static initialization
        //             "static-initialization",
        //
        //             // Constructors
        //             "public-constructor",
        //             "protected-constructor",
        //             "private-constructor",
        //
        //             "constructor",
        //
        //             // Getters
        //             "public-static-get",
        //             "protected-static-get",
        //             "private-static-get",
        //             "#private-static-get",
        //
        //             "public-decorated-get",
        //             "protected-decorated-get",
        //             "private-decorated-get",
        //
        //             "public-instance-get",
        //             "protected-instance-get",
        //             "private-instance-get",
        //             "#private-instance-get",
        //
        //             "public-abstract-get",
        //             "protected-abstract-get",
        //
        //             "public-get",
        //             "protected-get",
        //             "private-get",
        //             "#private-get",
        //
        //             "static-get",
        //             "instance-get",
        //             "abstract-get",
        //
        //             "decorated-get",
        //
        //             "get",
        //
        //             // Setters
        //             "public-static-set",
        //             "protected-static-set",
        //             "private-static-set",
        //             "#private-static-set",
        //
        //             "public-decorated-set",
        //             "protected-decorated-set",
        //             "private-decorated-set",
        //
        //             "public-instance-set",
        //             "protected-instance-set",
        //             "private-instance-set",
        //             "#private-instance-set",
        //
        //             "public-abstract-set",
        //             "protected-abstract-set",
        //
        //             "public-set",
        //             "protected-set",
        //             "private-set",
        //             "#private-set",
        //
        //             "static-set",
        //             "instance-set",
        //             "abstract-set",
        //
        //             "decorated-set",
        //
        //             "set",
        //
        //             // Methods
        //             "public-static-method",
        //             "protected-static-method",
        //             "private-static-method",
        //             "#private-static-method",
        //
        //             "public-decorated-method",
        //             "protected-decorated-method",
        //             "private-decorated-method",
        //
        //             "public-instance-method",
        //             "protected-instance-method",
        //             "private-instance-method",
        //             "#private-instance-method",
        //
        //             "public-abstract-method",
        //             "protected-abstract-method",
        //
        //             "public-method",
        //             "protected-method",
        //             "private-method",
        //             "#private-method",
        //
        //             "static-method",
        //             "instance-method",
        //             "abstract-method",
        //
        //             "decorated-method",
        //
        //             "method"
        //         ],
        //
        //
        //         // "default": {
        //         //     "memberTypes": [
        //         //         "public-static-field",
        //         //         "protected-static-field",
        //         //         "private-static-field",
        //         //         "public-instance-field",
        //         //         "public-decorated-field",
        //         //         "public-abstract-field",
        //         //         "protected-instance-field",
        //         //         "protected-decorated-field",
        //         //         "protected-abstract-field",
        //         //         "private-instance-field",
        //         //         "private-decorated-field",
        //         //         "private-abstract-field",
        //         //         "static-field",
        //         //         "public-field",
        //         //         "instance-field",
        //         //         "protected-field",
        //         //         "private-field",
        //         //         "abstract-field",
        //         //         "constructor",
        //         //         "public-static-method",
        //         //         "protected-static-method",
        //         //         "private-static-method",
        //         //         "public-method",
        //         //         "protected-method",
        //         //         "private-method",
        //         //     ],
        //         // }
        //     }
        // ],


        // this module does not work in IDE for some reason. only in cli
        // "sort-class-members/sort-class-members": [
        //     2,
        //     {
        //         "order": [
        //             "[static-properties]",
        //             "[properties]",
        //             "[conventional-private-properties]",
        //             "constructor",
        //             "[static-methods]",
        //             "[getter-or-setter]",
        //             "[methods]",
        //             "[conventional-private-methods]"
        //         ],
        //         "groups": {
        //             "event-handlers": [{ "name": "/on.+/", "type": "method" }],
        //             "getter-or-setter": [{ "kind": "accessor", }],
        //         },
        //         "accessorPairPositioning": "getThenSet"
        //     }
        // ],



        // "sort-imports": ["error", {
        //     "ignoreCase": false,
        //     "ignoreDeclarationSort": false,
        //     "ignoreMemberSort": false,
        //     "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
        //     "allowSeparatedGroups": false
        // }],


        "import/newline-after-import": ["error", { "count": 1 }],

        // turn on errors for missing imports
        'import/no-unresolved': 'error',
        // 'import/no-named-as-default-member': 'off',
        'import/order': [
            'error',
            {
                groups: [
                    'builtin', // Built-in imports (come from NodeJS native) go first
                    'external', // <- External imports
                    'internal', // <- Absolute imports
                    'sibling',
                    'parent',
                    // ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
                    'index', // <- index imports
                    'unknown', // <- unknown
                ],
                // 'newlines-between': 'always',
                'newlines-between': 'never',
                alphabetize: {
                    /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
                    order: 'asc',
                    /* ignore case. Options: [true, false] */
                    caseInsensitive: true,
                },
            },
        ],
        "require-await": "off",
        "no-useless-constructor": "off",
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "vue/attribute-hyphenation": "off",
    }
}

module.exports = config
// export default config