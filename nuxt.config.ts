// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  future: {
    compatibilityVersion: 3,
  },
  srcDir: '.',
  app: {
    head: {
      title: 'NEXUS SOURCING | Autonomous Apparel Buying House & Global Production',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Next-generation apparel buying house and digital manufacturing platform inspired by Nitex. 3D Clo3D sampling, certified factory network, powered by Neon PostgreSQL.',
        },
        { name: 'theme-color', content: '#0a0b0d' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
        },
      ],
    },
  },
  css: ['~/assets/css/main.css', '~/assets/css/homepage.css'],
})
