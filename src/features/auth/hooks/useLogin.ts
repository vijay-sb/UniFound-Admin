import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login, type LoginRequest, type LoginResponse } from "@/api/auth.api";

export function useLogin() {
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,

    onSuccess: (data) => {
      // 1️⃣ Store token for subsequent API calls
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_expires_in", String(data.expires_in));

      // 2️⃣ Redirect to admin dashboard (first landing page)
      navigate({
        to: "/admin/unverified",
        replace: true, // prevents going back to login
      });
    },
  });
}
