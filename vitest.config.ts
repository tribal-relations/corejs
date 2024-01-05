import {defineConfig} from 'vitest/config'
import {configDefaults} from 'vitest/config'

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
            reportsDirectory: './.vitest-coverage-report',
            reportOnFailure: true,
            reporter: [
                // 'text',
                // 'json',
                // 'json-summary',
                'html',
            ],
        },
    },
})
