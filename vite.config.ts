import {defineConfig} from 'vite'
import dotenv from 'dotenv'
import eslint from 'vite-plugin-eslint';

dotenv.config()

let minify: string | boolean = 'esbuild'

if (process.env.APP_ENV === 'local') {
    minify = false
}

export default defineConfig({
    plugins: [
        eslint(),
    ],
    build: {
        minify: minify,
        outDir: 'dist',
        emptyOutDir: false,
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                'console-app': './src/console-app.ts',

                // app: './src/ui/console/index.html', // console
                // app: './src/ui/web/pages/index.vue', // web
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: 'assets/[name].[ext]',
            },
        },
    },
})
