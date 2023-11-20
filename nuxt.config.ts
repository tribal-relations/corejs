// https://nuxt.com/docs/api/configuration/nuxt-config
import typescript from '@rollup/plugin-typescript'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  // builder: 'webpack',

  srcDir: './src/ui/web',
  vite: {
    plugins: [typescript()],
  },
})
