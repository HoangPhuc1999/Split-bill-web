// src/lib/auth/withAuth.ts

import { AuthError, ensureAccessToken } from './tokenManager';

export async function withAuth<T>(fn: () => Promise<T>): Promise<T> {
    try {
        await ensureAccessToken();
    } catch (e) {
        if (e instanceof AuthError) {
            // Don't show toast from withAuth - let the calling component handle it
            console.log('Authentication failed in withAuth:', e.message);
            throw e;
        }
        console.log('Unknown auth error in withAuth:', e);
        throw e;
    }
    return await fn();
}
