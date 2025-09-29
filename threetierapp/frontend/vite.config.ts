import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar } from '@quasar/vite-plugin'
import Pages from 'vite-plugin-pages'
import VueRouter from 'unplugin-vue-router/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    quasar(),
    Pages(),
    VueRouter()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
})
