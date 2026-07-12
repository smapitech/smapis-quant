import { defineStore } from 'pinia';

import { demoSession } from '@/data/mockData';
import type { AuthCredentials, AuthSession, UserProfile } from '@/types';

interface AuthState {
    session: AuthSession;
    loading: boolean;
    error: string | null;
}

const initialSession: AuthSession = {
    user: demoSession.user,
    token: demoSession.token,
    expiresAt: demoSession.expiresAt,
    twoFactorEnabled: demoSession.twoFactorEnabled,
    lastSignIn: demoSession.lastSignIn,
};

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        session: initialSession,
        loading: false,
        error: null,
    }),
    getters: {
        user: (state): UserProfile | null => state.session.user,
        isAuthenticated: (state): boolean => Boolean(state.session.user),
        userLabel: (state): string => state.session.user?.title ?? 'Guest',
        workspaceName: (state): string => state.session.user?.workspace ?? 'Smapis Quant OS',
    },
    actions: {
        async signIn(credentials: AuthCredentials) {
            this.loading = true;
            this.error = null;

            // TODO: replace with Laravel auth request and real session handling.
            await new Promise((resolve) => setTimeout(resolve, 150));

            this.session = {
                ...this.session,
                user: demoSession.user,
                token: 'demo-session-token',
                expiresAt: '2026-07-07T23:59:59+01:00',
                twoFactorEnabled: credentials.remember ? true : this.session.twoFactorEnabled,
                lastSignIn: new Date().toISOString(),
            };

            this.loading = false;
        },
        signOut() {
            // TODO: invalidate the Laravel session when auth is connected.
            this.session = {
                ...this.session,
                token: null,
                user: null,
            };
        },
    },
});
