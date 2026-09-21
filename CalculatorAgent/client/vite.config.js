import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      exclude: ['src/main.js', 'src/App.vue'],
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 85,
        lines: 95,
      },
    },
  },
});