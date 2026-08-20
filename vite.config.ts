import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Base path configuration
// ---------------------------------------------------------------
// Default: '/'  -> for a user site served at username.github.io
// For a PROJECT page (username.github.io/<repo>), build with:
//   VITE_BASE=/<repo>/ npm run build
// The GitHub Actions workflow reads the `VITE_BASE` repository
// variable, so no code change is needed.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
  },
});
