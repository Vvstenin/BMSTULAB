// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'views'), // указываем папку с index.html
  build: {
    outDir: path.resolve(__dirname, 'dist'), // куда собрать
    emptyOutDir: true
  }
});
