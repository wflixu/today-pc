import { defineConfig,type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: {
  //   cors: true,
  //   proxy: {
  //     '^/api/.*': {
  //       // target: 'https://www.wflixu.cn',
  //       target: 'http://127.0.0.1:7001',
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/fallback/, '')
  //     }
  //   }
  // },

})

