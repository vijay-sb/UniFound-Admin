// ============================================================================
// ROOT ROUTE COMPONENT
// ============================================================================
// Main application shell that wraps all routes
// Provides global layout, header, devtools, and navigation

import { Outlet, createRootRouteWithContext, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type { QueryClient } from '@tanstack/react-query'

/**
Context type passed to all routes
Available to route components via router context
*/
interface MyRouterContext {
  queryClient: QueryClient; // React Query client for data management
}

/**
Create root route with context support
All child routes inherit this context
*/
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

/**
Root component that wraps entire application
- Renders Header and devtools only on non-login pages
- Provides Outlet for page content
- Includes TanStack devtools for debugging

@returns Application shell JSX
*/
function RootComponent() {
  const location = useLocation()
  // Hide header and devtools on login and landing pages for cleaner aesthetic
  const isLoginPage = location.pathname.includes('/login')
  const isLandingPage = location.pathname === '/'
  const hideHeaderAndDevtools = isLoginPage || isLandingPage

  return (
    <>
      {/* Global Header (hidden on login/landing page) */}
      {!hideHeaderAndDevtools && <Header />}
      
      {/* Page Content - changes based on current route */}
      <Outlet />
      
      {/* Development Tools (hidden on login/landing page) */}
      {!hideHeaderAndDevtools && (
        <TanStackDevtools
          config={{
            position: 'bottom-right', // Bottom right corner of screen
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      )}
    </>
  )
}
