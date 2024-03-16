import node from '@astrojs/node'
import solid from '@astrojs/solid-js'
import compress from 'astro-compress'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  // server: {
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //   },
  // },
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    solid(),
    // AstroCompress will not compress your requests, only your statically generated build and pre-rendered routes.
    // Use AstroCompress last in your integration list for the best optimization.
    compress(),
  ],
})
