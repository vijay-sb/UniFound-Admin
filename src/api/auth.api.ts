import { apiRequest } from "./client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
}

export function login(data: LoginRequest) {
  return apiRequest<LoginResponse, LoginRequest>("/auth/login", {
    method: "POST",
    body: data,
  });
}
