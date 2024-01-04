const config = {
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
    setupFilesAfterEnv: ['./tests/setup-tests.ts'],
    silent: false,
    verbose: true,
    setupFiles: ['dotenv/config'],
    extensionsToTreatAsEsm: ['.ts'],
    // transform: {
    //     '^.+\\.(ts|tsx)$': 'ts-jest',
    // },
}
module.exports = config

// export default config