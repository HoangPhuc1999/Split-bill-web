// src/lib/auth/tokenStore.ts
type Tokens = {
    accessToken: string;
    refreshToken?: string;
    expiresAt?: number;
};

let memTokens: Tokens | null = null;
export const LS_KEY = 'auth.tokens';

export function loadTokens(): Tokens | null {
    if (memTokens) return memTokens;
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return null;
        memTokens = JSON.parse(raw);
        return memTokens;
    } catch {
        return null;
    }
}

export function setTokens(tokens: Tokens | null) {
    memTokens = tokens;
    if (!tokens) {
        localStorage.removeItem(LS_KEY);
        return;
    }
    localStorage.setItem(LS_KEY, JSON.stringify(tokens));
}

export function getAccessToken() {
    return memTokens?.accessToken ?? loadTokens()?.accessToken ?? null;
}

export function clearTokens() {
    setTokens(null);
}
