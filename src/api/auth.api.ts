// ============================================================================
// AUTHENTICATION API
// ============================================================================
// API calls for user authentication (login)

import { apiRequest } from "./client";

/**
 * Request body for login endpoint
 * Contains user credentials
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Response from successful login
 * Contains JWT token and expiration time
 */
export interface LoginResponse {
  access_token: string; // JWT token for authenticating future requests
  expires_in: number; // Token expiration time in seconds
}

/**
 * Authenticates user with email and password
 * Stores returned token for use in subsequent API calls
 * @param data - Login credentials
 * @returns Promise with access token and expiration time
 * @throws ApiError - If credentials are invalid
 * @example
 * const response = await login({ email: 'admin@unifound.sys', password: '...' })
 * // Returns: { access_token: 'eyJhbGc...', expires_in: 3600 }
 */
export function login(data: LoginRequest) {
  return apiRequest<LoginResponse, LoginRequest>("/auth/login", {
    method: "POST",
    body: data,
  });
}
