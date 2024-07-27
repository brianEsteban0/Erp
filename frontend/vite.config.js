import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 1208;

console.log(`Configurando el puerto: ${port}`);

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(port),
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:1208',
        changeOrigin: false,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:1208',
        changeOrigin: false,
        secure: false,
      },
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
});
