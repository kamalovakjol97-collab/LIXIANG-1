import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        const redirectsFile = join(process.cwd(), '_redirects')
        if (existsSync(redirectsFile)) {
          try {
            copyFileSync(
              redirectsFile,
              join(process.cwd(), 'dist', '_redirects')
            )
          } catch (error) {
            console.warn('Failed to copy _redirects file:', error)
          }
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
