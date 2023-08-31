import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://thomasforbes.com',
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
})
