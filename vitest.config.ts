import { defineConfig, configDefaults } from 'vitest/config'
// import selectReporter from './tests/select-reporter'

export default defineConfig({
    test: {
        // reporters: (folder) => {
        //     const reporter = selectReporter(folder)
        //     return [reporter.name]
        // },
        globals: true,
        typecheck: {
            enabled: true,
            ignoreSourceErrors: false,
        },
        setupFiles: ['/tests/setup-tests.ts'],
        coverage: {
            exclude: [
                ...configDefaults.exclude,
                'tests/*reporter.ts',
                'src/domain/interface',
                'src/exception',
                'src/exception-handler',
                'nuxt.config.ts',
                '.nuxt',
                '.eslintrc.cjs',
                // temporary
                '**/*.vue',
            ],
            thresholds: {
                lines: 80,
                branches: 80,
                functions: 70,
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
