// ============================================================================
// AUTHENTICATION UTILITIES
// ============================================================================
// Helper functions for managing auth tokens and checking authentication status

/**
 * Retrieves the stored JWT access token from localStorage
 * @returns The access token string or null if not found
 */
export function getAccessToken(): string | null {
  return localStorage.getItem("access_token");
}

/**
 * Checks if the user is authenticated by verifying token exists
 * @returns true if access token is present, false otherwise
 */
export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}

/**
 * Clears all authentication data from localStorage
 * Used when user logs out to ensure complete session cleanup
 */
export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token_expires_in");
}
