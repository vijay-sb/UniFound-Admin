const API_BASE_URL = "/api";
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface RequestOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
  token?: string;
}
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
export async function apiRequest<TResponse, TBody = unknown>(
  endpoint: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", body } = options;

  const token = localStorage.getItem("access_token");

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = "Something went wrong";

    try {
      const data = await res.json();
      message = data.message ?? message;
    } catch {
      // ignore JSON parse errors
    }

    throw new ApiError(res.status, message);
  }

  return res.json() as Promise<TResponse>;
}
