import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: '@bytebank/base',
      filename: 'remoteEntry.js',
      exposes: {
        './bytebank-base': './src/exposes/bytebank-base.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 9001,
  },
  preview: {
    port: 9001,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
