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
                lines: 80,
                branches: 80,
                functions: 65,
                statements: 80,
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
