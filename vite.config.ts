import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

dotenv.config()

let minify: string | boolean = 'esbuild'

if (process.env.APP_ENV === 'local') {
    minify = false
}

export default defineConfig({
    plugins: [
        eslint(),
        vue({
            template: { transformAssetUrls },
        }),

        // @quasar/plugin-vite options list:
        // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
        quasar({
            sassVariables: 'src/quasar-variables.sass',
        }),
    ],
    build: {
        minify,
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
