import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        setupFiles: ['/tests/setup-tests.ts'],
        coverage: {
            reportOnFailure: true,
            reporter: [
                // 'text',
                'json',
                'json-summary',
                // 'html',
            ],
        },
    },
})
