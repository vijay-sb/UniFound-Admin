// ============================================================================
// REACT QUERY DEVTOOLS INTEGRATION
// ============================================================================
// Configures and exports React Query devtools panel for debugging
// Shows real-time query state, cache, and network requests

import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

/**
 * Devtools plugin configuration for TanStack Devtools
 * Displays React Query debugging panel in development
 * Shows:
 * - All active queries and their state
 * - Cache contents and entry details
 * - Network request history
 * - Manual query refetching
 * 
 * @returns Devtools plugin object for integration into main devtools
 */
export default {
  name: 'Tanstack Query',
  render: <ReactQueryDevtoolsPanel />,
}
