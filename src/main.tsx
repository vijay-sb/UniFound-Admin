// ============================================================================
// APPLICATION ENTRY POINT
// ============================================================================
// Bootstrap file that initializes and renders the React application
// - Sets up Router, Query Client, Theme Provider, and other providers
// - Mounts the app to the DOM

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'

// Import the generated route tree (auto-generated from file-based routing)
import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// ============================================================================
// ROUTER SETUP
// ============================================================================
// Initialize TanStack Router with configuration for optimal performance

const TanStackQueryProviderContext = TanStackQueryProvider.getContext()
const router = createRouter({
  // Use auto-generated routes from file system
  routeTree,
  // Pass providers (QueryClient) context to router
  context: {
    ...TanStackQueryProviderContext,
  },
  // Preload routes when user hovers (better UX)
  defaultPreload: 'intent',
  // Restore scroll position when navigating back
  scrollRestoration: true,
  // Enable structural sharing for better performance
  defaultStructuralSharing: true,
  // Don't preload stale data on first navigation
  defaultPreloadStaleTime: 0,
})

// Register router type for TypeScript support
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// ============================================================================
// APPLICATION RENDER
// ============================================================================
// Render the app with all providers wrapped around the router

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  // Mount app with: StrictMode → QueryProvider → Router
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  )
}

// Initialize performance monitoring
// Pass console.log to log metrics during development
reportWebVitals()
