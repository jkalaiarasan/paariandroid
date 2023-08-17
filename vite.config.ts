import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import ViteHttp2Proxy from 'vite-plugin-http2-proxy'; // Import the HTTP2 proxy plugin

export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
