export type AuthTone = 'teal' | 'emerald' | 'amber' | 'rose' | 'slate';

export interface AuthSecurityBadge {
    label: string;
    tone: AuthTone;
}

export interface AuthPanelMetric {
    label: string;
    value: string;
    tone: AuthTone;
}

export interface AuthPanelConfig {
    eyebrow: string;
    title: string;
    description: string;
    previewTitle: string;
    previewMetrics: AuthPanelMetric[];
    badges: AuthSecurityBadge[];
    checklist: string[];
    accent: AuthTone;
}

export const demoLoginCredentials = {
    email: 'demo@smapisquant.ai',
    password: 'Demo12345!',
};

export const loginPanel: AuthPanelConfig = {
    eyebrow: 'Secure access',
    title: 'Trade intelligence begins with secure access.',
    description: 'Monitor arbitrage opportunities, review AI risk scores, and manage trading activity from one protected workspace.',
    previewTitle: 'Workspace snapshot',
    previewMetrics: [
        { label: 'SQIS', value: '92/100', tone: 'teal' },
        { label: 'Risk Level', value: 'Low', tone: 'emerald' },
        { label: 'Exchange Health', value: 'Stable', tone: 'teal' },
        { label: 'API Security', value: 'Active', tone: 'emerald' },
    ],
    badges: [
        { label: 'Encrypted API Keys', tone: 'emerald' },
        { label: '2FA Ready', tone: 'teal' },
        { label: 'Audit Logs', tone: 'slate' },
        { label: 'Trading-only API Recommended', tone: 'amber' },
    ],
    checklist: [
        'Real-time arbitrage intelligence',
        'AI trade committee review',
        'Paper trading isolation',
        'Risk-first execution controls',
    ],
    accent: 'teal',
};

export const registerPanel: AuthPanelConfig = {
    eyebrow: 'Responsible onboarding',
    title: 'Start with intelligence before execution.',
    description: 'Create your account, test strategies with paper trading, and upgrade to live automation only when you are ready.',
    previewTitle: 'What you unlock',
    previewMetrics: [
        { label: 'Scanner', value: 'Live', tone: 'teal' },
        { label: 'Paper Trading', value: 'Ready', tone: 'emerald' },
        { label: 'Risk Controls', value: 'On', tone: 'amber' },
        { label: 'Committee', value: 'Enabled', tone: 'teal' },
    ],
    badges: [
        { label: 'Responsible setup', tone: 'emerald' },
        { label: 'Risk-first defaults', tone: 'amber' },
        { label: 'Audit-ready', tone: 'slate' },
    ],
    checklist: [
        'Live arbitrage scanner',
        'AI confidence score',
        'Paper trading mode',
        'Risk-first execution',
        'Portfolio analytics',
        'Opportunity Replay',
        'AI Trade Committee',
    ],
    accent: 'emerald',
};

export const accountTypeOptions = [
    { label: 'Individual Trader', value: 'individual_trader' },
    { label: 'Developer', value: 'developer' },
    { label: 'Trading Team', value: 'trading_team' },
    { label: 'Investment Company', value: 'investment_company' },
];

export const countryOptions = [
    { label: 'Nigeria', value: 'Nigeria' },
    { label: 'United States', value: 'United States' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'United Arab Emirates', value: 'United Arab Emirates' },
    { label: 'Singapore', value: 'Singapore' },
];
