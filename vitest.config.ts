import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        setupFiles: ['/tests/setup-tests.ts'],
        coverage: {
            exclude: [
                ...configDefaults.exclude,
                'src/domain/interface/**',
                'src/exception/*',
                'nuxt.config.ts',
                '.nuxt',
                '.eslintrc.cjs',
            ],
            thresholds: {
                lines: 80,
                branches: 80,
                functions: 75,
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
