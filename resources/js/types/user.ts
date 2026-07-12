export type UserRole = 'admin' | 'portfolio_manager' | 'trader' | 'analyst' | 'viewer';
export type UserStatus = 'active' | 'pending' | 'suspended';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    initials: string;
    role: UserRole;
    title: string;
    workspace: string;
    timezone: string;
    status: UserStatus;
    avatarUrl?: string;
}

export interface AuthSession {
    user: UserProfile | null;
    token: string | null;
    expiresAt: string | null;
    twoFactorEnabled: boolean;
    lastSignIn: string | null;
}

export interface AuthCredentials {
    email: string;
    password: string;
    remember: boolean;
}
