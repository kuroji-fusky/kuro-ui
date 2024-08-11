import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel/serverless"
import tailwind from "@astrojs/tailwind"
import svelte from "@astrojs/svelte"
import autoprefixer from "autoprefixer"
import Icons from "unplugin-icons/vite"

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [tailwind(), svelte()],
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
        customCollections: {},
      }),
    ],
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
})
