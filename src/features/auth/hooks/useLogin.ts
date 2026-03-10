// ============================================================================
// USE LOGIN HOOK
// ============================================================================
// Mutation hook for user login
// Stores token and redirects to dashboard on successful login

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login, type LoginRequest, type LoginResponse } from "@/api/auth.api";

/**
 * Authenticates user with email and password
 * - Calls login API with credentials
 * - Stores returned token in localStorage
 * - Redirects to admin dashboard on success
 * - Handles loading and error states
 * 
 * @returns React Query mutation with:
 *   - mutate(credentials): Function to login with email/password
 *   - isPending: Whether login is in progress
 *   - isError: Whether login failed
 *   - error: Error object if failed
 * 
 * @example
 * const loginMutation = useLogin()
 * const handleLogin = () => {
 *   loginMutation.mutate({ email: 'admin@example.com', password: 'pwd' })
 * }
 */
export function useLogin() {
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginRequest>({
    // Function that performs the login API call
    mutationFn: login,

    // On successful login
    onSuccess: (data) => {
      // 1️⃣ Store JWT token in localStorage for subsequent API calls
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_expires_in", String(data.expires_in));

      // 2️⃣ Redirect to admin dashboard (unverified items page)
      // 'replace: true' prevents user from going back to login page via back button
      navigate({
        to: "/admin/unverified",
        replace: true,
      });
    },
  });
}
