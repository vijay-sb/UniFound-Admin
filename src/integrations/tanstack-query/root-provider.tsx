// ============================================================================
// REACT QUERY ROOT PROVIDER SETUP
// ============================================================================
// Initializes and provides React Query client to the entire application
// Handles caching, server state management, and data synchronization

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * Creates and initializes the React Query client
 * Configures caching, refetch, and retry strategies
 * 
 * @returns Object with queryClient for use in Provider
 */
export function getContext() {
  // Create a new QueryClient instance with default settings
  const queryClient = new QueryClient()
  return {
    queryClient,
  }
}

interface ProviderProps {
  children: React.ReactNode; // Application components to wrap
  queryClient: QueryClient; // React Query client instance
}

/**
 * Provider component that wraps the app with React Query
 * All components can use React Query hooks (useQuery, useMutation) inside
 * 
 * @param children - Components to wrap with React Query provider
 * @param queryClient - Configured React Query client
 * @returns Provider wrapper for app
 * 
 * @example
 * const { queryClient } = getContext()
 * <Provider queryClient={queryClient}>
 *   <App />
 * </Provider>
 */
export function Provider({
  children,
  queryClient,
}: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
