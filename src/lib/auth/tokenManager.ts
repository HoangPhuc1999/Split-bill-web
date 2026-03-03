// src/lib/auth/tokenManager.ts
import { clearTokens, loadTokens } from './tokenStore';
export class AuthError extends Error {}
const SKEW_MS = 30_000; // refresh 30s before expiry

function isExpiringSoon(expiresAt?: number) {
    if (!expiresAt) return false; // no expiry info -> assume OK
    return Date.now() + SKEW_MS >= expiresAt; // about to expire
}

/** Ensure we have a valid access token before any API call. */
export async function ensureAccessToken(): Promise<void> {
    const t = loadTokens();
    if (!t?.accessToken) return;

    if (!isExpiringSoon(t.expiresAt)) return; // still valid

    // If you DO have a refresh endpoint, put it here.
    if (!t.refreshToken) {
        // No refresh -> force re-login
        clearTokens();
        throw new AuthError('Session expired');
    }

    // Example refresh flow — adjust path/body to your backend
    // const { data } = await http.post<RefreshResponse>('/token/refresh', {
    //   refresh_token: t.refreshToken,
    // });
    // setTokens({
    //   accessToken: data.access_token,
    //   refreshToken: data.refresh_token ?? t.refreshToken,
    //   expiresAt: data.expires_in ? Date.now() + data.expires_in * 1000 : t.expiresAt,
    // });
}

export async function checkAccessToken(): Promise<boolean> {
    const t = loadTokens();
    if (!t?.accessToken) return false;

    if (!isExpiringSoon(t.expiresAt)) return true; // still valid

    // If you DO have a refresh endpoint, put it here.
    if (!t.refreshToken) {
        // No refresh -> force re-login
        clearTokens();
        throw new AuthError('Session expired');
    }
    return false;
}
