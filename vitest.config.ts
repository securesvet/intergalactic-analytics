import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: "jsdom",
    browser: {
      provider: 'playwright',
      enabled: true,
      instances: [
        { browser: 'chromium' }
      ]
    },
  },
})
