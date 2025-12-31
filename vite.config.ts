import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const devPlugins: any[] = [];
if (process.env.NODE_ENV !== 'production') devPlugins.push(vitePluginExposeEntry());

export default defineConfig({
  plugins: [react(), ...devPlugins],
  build: {
    rollupOptions: {
      input: 'src/bytebank-base.tsx',
      output: {
        format: 'es',
        entryFileNames: 'bytebank-base.js',
      },
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'single-spa', 'single-spa-react', 'scheduler'],
      preserveEntrySignatures: 'strict',
    },
    outDir: 'dist',
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
export function vitePluginExposeEntry() {
  return {
    name: 'vite-plugin-expose-bytebank-base',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        if (url === '/bytebank-base.js') {
          // Return a small ESM wrapper that re-exports the source entry
          const content = `export * from '/src/bytebank-base.tsx';`;
          res.setHeader('Content-Type', 'application/javascript');
          res.end(content);
          return;
        }
        next();
      });
    },
  };
}

// In dev, Vite will pick up this plugin if imported by the config
