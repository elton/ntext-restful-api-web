import solid from '@astrojs/solid-js'
import { defineConfig } from 'astro/config'
import dotenv from 'dotenv'
import UnoCSS from 'unocss/astro'

// 加载环境变量
dotenv.config()

export default defineConfig({
  // output: 'hybrid',
  // server: {
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //   },
  // },
  // adapter: node({
  //   mode: 'standalone',
  // }),
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    solid(),
    // AstroCompress will not compress your requests, only your statically generated build and pre-rendered routes.
    // Use AstroCompress last in your integration list for the best optimization.
  ],
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  },
  vite: {
    plugins: [
      {
        name: 'load-env',
        config: () => ({
          define: {
            'import.meta.env': {
              ...process.env,
            },
          },
        }),
      },
    ],
  },
})
