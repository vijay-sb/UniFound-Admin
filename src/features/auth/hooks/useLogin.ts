import { useMutation } from "@tanstack/react-query";
import { login, type LoginRequest, type LoginResponse } from "@/api/auth.api";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      // store token for subsequent API calls
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_expires_in", String(data.expires_in));
    },
  });
}
