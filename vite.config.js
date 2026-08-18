import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/biblia-abigail/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Biblia Abigail RV1960',
        short_name: 'Abigail',
        description: 'Biblia de estudio con concordancias, anotaciones, análisis crítico y Cerebro de Abigail. El porqué de cada enlace es el corazón.',
        theme_color: '#241B36',
        background_color: '#241B36',
        display: 'standalone',
        icons: [
          {
            src: 'icons.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 3000000
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
