import { defineConfig } from "astro/config"

import vercel from "@astrojs/vercel/serverless"
import tailwind from "@astrojs/tailwind"
import svelte from "@astrojs/svelte"

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [tailwind(), svelte()],
  prefetch: {
    prefetchAll: true,
  },
})
