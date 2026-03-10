// ============================================================================
// VITE CONFIGURATION FILE
// ============================================================================
// This file configures the Vite build tool and development server
// - Sets up React, TailwindCSS, TanStack Router, and dev tools plugins
// - Configures path aliases, testing environment, and API proxy

import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // Register all plugins for the build process
  plugins: [
    // Development tools plugin for debugging
    devtools(),
    // TanStack Router plugin with automatic code splitting for routes
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true, // Automatically split code per route
    }),
    // React plugin for Fast Refresh (hot module replacement)
    viteReact(),
    // TailwindCSS plugin for styling
    tailwindcss(),
  ],

  // Configure path aliases for cleaner imports
  resolve: {
    alias: {
      // '@' alias points to src/ directory (e.g., @/api/ instead of ../../../api/)
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Configure Vitest for unit and component testing
  test: {
    // Enable global test functions (describe, it, expect) without imports
    globals: true,
    // Use happy-dom for a lightweight DOM environment
    environment: 'happy-dom',
    // Run setup file before tests (mocks, polyfills, etc.)
    setupFiles: './vitest.setup.ts',
  },

  // Development server configuration with API proxy
  server: {
    proxy: {
      // Proxy all /api requests to the backend server
      '/api': {
        target: 'http://localhost:8080', // Backend server URL
        changeOrigin: true, // Modify origin header to match target
        secure: false, // Allow insecure connections for development
      },
    },
  },
})
