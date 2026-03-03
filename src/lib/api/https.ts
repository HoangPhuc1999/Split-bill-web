// src/lib/api/http.ts
import axios from "axios";
import { clearTokens, getAccessToken, loadTokens } from "../auth/tokenStore";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 120000, // Increased timeout to 60 seconds for AI calls
});

http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Optional: 401 retry via refresh (same as in ensureAccessToken, kept as a safety net)
let refreshing = false;
let waiters: Array<() => void> = [];
type ApiError = Error & {
  status?: number;
  key?: string | null;
  data?: unknown; // unwrapped body for extra details
};
http.interceptors.response.use(
  (response) => {
    const d = response.data;
    return d.body;
  },
  // error -> unwrap body/key and throw a friendly error
  async (err) => {
    const original = err.config;

    // 401 retry branch (unchanged)
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      const tokens = loadTokens();
      if (!tokens?.refreshToken) {
        clearTokens();
        return Promise.reject(err);
      }

      if (refreshing) {
        await new Promise<void>((res) => waiters.push(res));
      } else {
        refreshing = true;
        try {
          // TODO: call refresh endpoint here (if you have one)
        } finally {
          refreshing = false;
          // biome-ignore lint/suspicious/useIterableCallbackReturn: <explanation>
          waiters.forEach((fn) => fn());
          waiters = [];
        }
      }

      original.headers.Authorization = `Bearer ${getAccessToken()}`;
      return http(original);
    }

    const res = err.response;
    if (res?.data) {
      const d = res.data as { body?: unknown; key?: string };
      const body = d?.body;
      const key = d?.key;

      // Create more descriptive error message
      let errorMessage = "Request failed";
      if (typeof body === "string" && body.trim()) {
        errorMessage = body;
      } else if (key && typeof key === "string") {
        errorMessage = key;
      }

      const e = new Error(errorMessage) as ApiError;

      e.status = res.status;
      e.key = key ?? null;
      e.data = body;

      return Promise.reject(e);
    }

    return Promise.reject(err);
  },
);
