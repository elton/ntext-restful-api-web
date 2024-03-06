import node from '@astrojs/node'
import solid from '@astrojs/solid-js'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS({ injectReset: true }), solid()],
  output: 'hybrid',
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  adapter: node({
    mode: 'standalone',
  }),
})
