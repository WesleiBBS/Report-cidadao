import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,txt,woff2}']
      },
      includeAssets: ['icon.svg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Report Cidadão - Reporte Estradas',
        short_name: 'Report Cidadão',
        description: 'PWA para reportar problemas nas estradas e vias públicas',
        theme_color: '#f97316',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/Report-cidadao/',
        start_url: '/Report-cidadao/',
        lang: 'pt-BR',
        categories: ['utilities', 'government'],
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: '/Report-cidadao/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Força nomes únicos para evitar cache
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Limpa o diretório dist antes de cada build
    emptyOutDir: true,
    // Força rebuild dos CSS modules
    cssCodeSplit: true,
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    // Força reload quando CSS mudar
    watch: {
      include: ['**/*.css', '**/*.scss', '**/*.sass', '**/*.less']
    }
  },
  // Configurações para CSS
  css: {
    // Força reconstrução do CSS
    postcss: {
      plugins: []
    },
    // Desenvolvimento: não minimiza para debug
    devSourcemap: true
  },
  // Cache busting
  define: {
    __CSS_VERSION__: JSON.stringify(Date.now())
  }
})
