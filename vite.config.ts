import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

const UI_CHUNKS = new Set([
  '@tanstack/react-router',
  '@radix-ui/react-dialog',
  '@radix-ui/react-label',
  '@radix-ui/react-navigation-menu',
  '@radix-ui/react-popover',
  '@radix-ui/react-select',
  '@radix-ui/react-separator',
  '@radix-ui/react-slot',
  '@radix-ui/react-switch',
  '@radix-ui/react-tooltip',
  'cmdk',
  'class-variance-authority',
  'clsx',
  'lucide-react'
])

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          const match = id.match(/\/node_modules\/((?:@[^/]+\/)?[^/]+)\//)
          if (match && UI_CHUNKS.has(match[1])) {
            return 'ui'
          }
        }
      }
    }
  },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
