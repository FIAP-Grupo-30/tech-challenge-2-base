import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 👉 Plugin para expor Header/Footer em DEV
function vitePluginExposeEntry() {
  return {
    name: 'vite-plugin-expose-bytebank-base',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';

        if (url === '/bytebank-ui.js') {
          // Headers obrigatórios
          res.setHeader('Content-Type', 'application/javascript');

          // 🔥 CORS (ESSENCIAL para consumo em outra porta)
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', '*');

          res.end(`
            import 'http://localhost:9001/src/components/ByteBankHeader.js';
            import 'http://localhost:9001/src/components/ByteBankFooter.js';
          `);
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  const plugins = [react()];

  // 👇 Plugin só em DEV
  if (process.env.NODE_ENV !== 'production') {
    plugins.push(vitePluginExposeEntry());
  }

  return {
    plugins,

    build: {
      rollupOptions: {
        input: 'src/bytebank-base.tsx',
        output: {
          format: 'es',
          entryFileNames: 'bytebank-base.js',
        },
        external: [
          'react',
          'react-dom',
          'react-dom/client',
          'react/jsx-runtime',
          'single-spa',
          'single-spa-react',
          'scheduler',
        ],
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
  };
});
