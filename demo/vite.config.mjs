import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [mdx(), react(), tailwindcss()],
  root: './src',
  base: './',
  build: {
    outDir: path.resolve(__dirname, '../build'),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
  define: {
    global: {},
  },
});
