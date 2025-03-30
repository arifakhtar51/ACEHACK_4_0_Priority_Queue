import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   https: {
  //     key: './localhost-key.pem',
  //     cert: './localhost.pem'
  //   }
  // },
  base:'/',
  build: {
    outDir: 'dist'
  },
  server: {
    historyApiFallback: true // Ensures proper routing fallback
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
