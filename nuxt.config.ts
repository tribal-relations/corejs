// https://nuxt.com/docs/api/configuration/nuxt-config
import typescript from '@rollup/plugin-typescript'
import { defineNuxtConfig } from 'nuxt/config'
import {Plugin} from "rollup";

const tsPlugin: Plugin = typescript()
export default defineNuxtConfig({
  devtools: { enabled: true },
  // builder: 'webpack',

  srcDir: './src/ui/web',
  vite: {
    plugins: [tsPlugin],
  },
})
