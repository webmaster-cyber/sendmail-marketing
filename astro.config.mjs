import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import keystatic from '@keystatic/astro'
import node from '@astrojs/node'

export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    keystatic(),
  ],
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  site: 'https://sendmail.co.zw',
})
