import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import generateSitemap from 'vite-plugin-sitemap';

const SITE_URL = 'https://example.com';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    generateSitemap({
      hostname: SITE_URL,
      dynamicRoutes: ['/'],
    }),
  ],
  server: {
    host: '0.0.0.0', // Bind to all interfaces
    port: 5173, // Optional: Specify a port (default is 5173)
  },
});
