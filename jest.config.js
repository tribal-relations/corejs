module.exports = {
    // "roots": [
    //     "./src"
    // ],
    // "testMatch": [
    //     "./tests/**/*.+(ts|tsx|js)",
    //     "./tests/",
    //
    //     "**/__tests__/**/*.+(ts|tsx|js)",
    //     "**/tests/**/*.+(ts|tsx|js)",
    //     "**/?(*.)+(spec|test).+(ts|tsx|js)"
    // ],
    "silent": false,
    "verbose": true,
    "setupFiles": ['dotenv/config'],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
}