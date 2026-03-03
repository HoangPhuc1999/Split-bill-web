// src/lib/auth/AuthRepository.ts
import { http } from '../api/https';
export type RegisterPayload = {
    username: string;
    password: string;
    email: string;
};

export type TokenResponse = {
    access_token: string; // adjust to your API fields
    refresh_token?: string;
    expires_in?: number; // seconds
};

export type Me = { id: string; name: string; email?: string };

export const AuthRepository = {
    async register(body: RegisterPayload) {
        const { data } = await http.post('/auth/register', body);
        return data;
    },

    async login(username: string, password: string): Promise<TokenResponse> {
        // /token expects form-data (or x-www-form-urlencoded). Let's use URLSearchParams.
        const form = new URLSearchParams();
        form.set('username', username);
        form.set('password', password);

        const { data } = await http.post('/token', form, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return data;
    },

    async getMe(): Promise<Me> {
        const { data } = await http.post('/api/user/me'); // or GET if available
        return data;
    },
};
