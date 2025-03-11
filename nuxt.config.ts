// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxtjs/tailwindcss',
            '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      piniaPersistedState: true,
    },
  },
  devtools: { enabled: true }
})
