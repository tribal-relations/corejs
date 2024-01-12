import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
    test: {
        exclude: [
            ...configDefaults.exclude,
            '/.temp/*',
            '/src/domain/interface/**',
            '/src/exception/*',
            '/nuxt.config.ts',
        ],
        globals: true,
        setupFiles: ['/tests/setup-tests.ts'],
        coverage: {
            thresholds: {
                lines: 60,
                branches: 60,
                functions: 60,
                statements: 60,
            },
            reportsDirectory: './.vitest-coverage-report',
            reportOnFailure: true,
            reporter: [
                'text',
                'json',
                'json-summary',
                'html',
            ],
        },
    },
})
