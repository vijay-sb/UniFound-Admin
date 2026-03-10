// ============================================================================
// API CLIENT CONFIGURATION
// ============================================================================
// Central HTTP client for all API requests
// - Handles request/response formatting
// - Manages authentication tokens
// - Custom error handling with status-based messages

// Base URL for all API requests
const API_BASE_URL = "/api";

// Supported HTTP methods
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Configuration options for API requests
 * @template TBody - Type of request body
 */
interface RequestOptions<TBody> {
  method?: HttpMethod; // HTTP method (defaults to GET)
  body?: TBody; // Request payload
  token?: string; // Optional explicit token (uses localStorage by default)
}

/**
 * Custom error class for API responses
 * Extends Error with HTTP status code for better error handling
 */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/**
 * Makes authenticated HTTP requests to the backend API
 * @template TResponse - Expected response data type
 * @template TBody - Request body type
 * @param endpoint - API endpoint path (e.g., '/admin/items')
 * @param options - Request configuration
 * @returns Promise with response data
 * @throws ApiError - When response is not OK
 * @example
 * const items = await apiRequest<AdminItem[]>('/admin/items')
 * await apiRequest<void>('/admin/items/123/verify', { method: 'POST' })
 */
export async function apiRequest<TResponse, TBody = unknown>(
  endpoint: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", body } = options;

  // Get stored authentication token from localStorage
  const token = localStorage.getItem("access_token");

  // Execute fetch request with proper headers and authentication
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      // Include Bearer token if available
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Handle error responses (status >= 400)
  if (!res.ok) {
    let message = "Something went wrong";

    // Try to extract error message from response body
    try {
      const data = await res.json();
      message = data.message ?? message;
    } catch {
      // Ignore JSON parse errors (response might not be JSON)
    }

    throw new ApiError(res.status, message);
  }

  // Parse and return response as JSON
  return res.json() as Promise<TResponse>;
}
