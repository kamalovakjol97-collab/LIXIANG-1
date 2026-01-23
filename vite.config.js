import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        copyFileSync(
          join(process.cwd(), '_redirects'),
          join(process.cwd(), 'dist', '_redirects')
        )
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
