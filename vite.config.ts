import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'src/bytebank-base.tsx',
      output: {
        format: 'system',
        entryFileNames: 'bytebank-base.js',
      },
      external: ['react', 'react-dom', 'single-spa'],
      preserveEntrySignatures: 'strict',
    },
    outDir: 'dist',
    lib: {
      entry: 'src/bytebank-base.tsx',
      name: 'bytebank-base',
      formats: ['system'],
      fileName: () => 'bytebank-base.js',
    },
  },
  server: {
    port: 9001,
    cors: true,
  },
  preview: {
    port: 9001,
    cors: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
