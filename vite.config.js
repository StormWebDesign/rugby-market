import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Custom plugin for SPA routing with dots in URLs
const spaFallbackPlugin = () => ({
  name: 'spa-fallback',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      // If URL contains a dot but doesn't have a file extension we recognize,
      // treat it as a SPA route
      const url = req.url || '';
      const hasProfileSlugPattern = /^\/[a-z0-9]+\.[a-z0-9]+$/i.test(url);

      if (hasProfileSlugPattern) {
        req.url = '/index.html';
      }
      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    spaFallbackPlugin(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174,
    host: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin'],
      },
    },
  },
  appType: 'spa',
})
