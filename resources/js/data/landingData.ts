export type LandingTone = 'teal' | 'emerald' | 'amber' | 'rose' | 'slate';

export interface LandingTrustMetric {
    label: string;
    value: string;
    detail: string;
    tone: LandingTone;
}

export interface LandingFeature {
    title: string;
    description: string;
    tone: LandingTone;
    badge: string;
}

export interface LandingStep {
    step: string;
    title: string;
    description: string;
}

export interface LandingCommitteeVote {
    agent: string;
    vote: string;
    confidence: number;
    reason: string;
    riskFlags: string[];
    tone: LandingTone;
}

export interface LandingSecurityItem {
    label: string;
    detail: string;
    tone: LandingTone;
}

export interface LandingPricingPlan {
    name: string;
    price: string;
    cadence: string;
    description: string;
    features: string[];
    tone: LandingTone;
    highlighted?: boolean;
    cta: string;
}

export const landingTrustMetrics: LandingTrustMetric[] = [
    { label: '50+ Exchanges', value: '50+', detail: 'Across spot, derivatives, and wallet venues', tone: 'teal' },
    { label: 'Opportunities Scanned Daily', value: '100K+', detail: 'Streaming scans and cross-venue checks', tone: 'emerald' },
    { label: 'Uptime', value: '99.9%', detail: 'Built for long-running market sessions', tone: 'slate' },
    { label: 'Average API Response', value: '<50ms', detail: 'Fast enough for informed review loops', tone: 'amber' },
    { label: 'Market Monitoring', value: '24/7', detail: 'Always-on observation and alerting', tone: 'teal' },
    { label: 'Security', value: 'Bank-Level', detail: 'Encrypted keys and access controls', tone: 'emerald' },
];

export const landingFeatures: LandingFeature[] = [
    {
        title: 'Live Arbitrage Scanner',
        description: 'Scan global markets for real-time cross-exchange opportunities.',
        tone: 'teal',
        badge: 'Scanner',
    },
    {
        title: 'AI Risk Officer',
        description: 'Every opportunity is validated against liquidity, fees, slippage, volatility, and exchange health.',
        tone: 'emerald',
        badge: 'Risk',
    },
    {
        title: 'Paper Trading',
        description: 'Test strategies safely with virtual capital before going live.',
        tone: 'amber',
        badge: 'Simulation',
    },
    {
        title: 'AI Trade Committee',
        description: 'Multiple AI agents review every opportunity before execution.',
        tone: 'teal',
        badge: 'Committee',
    },
    {
        title: 'Opportunity Replay',
        description: 'Replay past opportunities and learn how each market move developed.',
        tone: 'slate',
        badge: 'Replay',
    },
    {
        title: 'Portfolio Protection',
        description: 'Lock profits, manage exposure, and control risk with intelligent capital rules.',
        tone: 'rose',
        badge: 'Protection',
    },
];

export const landingHowItWorks: LandingStep[] = [
    {
        step: '01',
        title: 'Connect Exchanges',
        description: 'Bring in approved venues and keep API access scoped to trading only.',
    },
    {
        step: '02',
        title: 'Scan Opportunities',
        description: 'Monitor markets continuously for cross-exchange spread and liquidity conditions.',
    },
    {
        step: '03',
        title: 'AI Validates Risk',
        description: 'Committee agents score the setup, review risk flags, and reduce false positives.',
    },
    {
        step: '04',
        title: 'Review, Paper Trade, or Execute',
        description: 'Stay in simulation until you are ready to move into live automation.',
    },
];

export const landingCommitteeVotes: LandingCommitteeVote[] = [
    {
        agent: 'Market Scanner AI',
        vote: 'Approve',
        confidence: 98,
        reason: 'Spread confirmed across fresh market depth.',
        riskFlags: ['None'],
        tone: 'emerald',
    },
    {
        agent: 'Risk Officer AI',
        vote: 'Approve',
        confidence: 95,
        reason: 'Exposure remains within the intraday budget.',
        riskFlags: ['Low spread risk'],
        tone: 'emerald',
    },
    {
        agent: 'Liquidity Analyst AI',
        vote: 'Approve',
        confidence: 96,
        reason: 'Order book can absorb the proposed size cleanly.',
        riskFlags: ['None'],
        tone: 'emerald',
    },
    {
        agent: 'Execution Manager AI',
        vote: 'Conditional',
        confidence: 91,
        reason: 'Use a smaller first clip and scale only if price holds.',
        riskFlags: ['Partial fill risk'],
        tone: 'amber',
    },
    {
        agent: 'Portfolio Manager AI',
        vote: 'Reduce Position',
        confidence: 94,
        reason: 'Keeps the exposure balanced with other live ideas.',
        riskFlags: ['Low concentration'],
        tone: 'teal',
    },
    {
        agent: 'Compliance & Safety AI',
        vote: 'Approve',
        confidence: 97,
        reason: 'All checks passed for desk policy.',
        riskFlags: ['None'],
        tone: 'emerald',
    },
];

export const landingSecurity: LandingSecurityItem[] = [
    { label: 'Encrypted API keys', detail: 'Stored securely and never exposed in the UI.', tone: 'emerald' },
    { label: 'Trading-only API permission recommended', detail: 'Withdrawals stay disabled by default.', tone: 'amber' },
    { label: 'Two-factor authentication ready', detail: 'Keep access locked down for every desk user.', tone: 'teal' },
    { label: 'Audit logs', detail: 'Trace sensitive actions and account changes.', tone: 'slate' },
    { label: 'Withdrawal permission warning system', detail: 'Surface risky key permissions before they are used.', tone: 'rose' },
    { label: 'Role-based access control', detail: 'Limit what each desk member can see and change.', tone: 'emerald' },
];

export const landingPricingPlans: LandingPricingPlan[] = [
    {
        name: 'Free',
        price: '$0',
        cadence: '/ month',
        description: 'Try the platform with a constrained scanner and simulation first.',
        features: ['Limited scanner', 'Paper trading', '1 exchange connection', 'Basic alerts'],
        tone: 'slate',
        cta: 'Start Free',
    },
    {
        name: 'Starter',
        price: '$49',
        cadence: '/ month',
        description: 'For solo traders who want more signal coverage and replay tools.',
        features: ['More exchange connections', 'AI alerts', 'Opportunity Replay', 'Analytics'],
        tone: 'teal',
        cta: 'Choose Starter',
    },
    {
        name: 'Professional',
        price: '$149',
        cadence: '/ month',
        description: 'For active desks that need committee review and automation guardrails.',
        features: ['Unlimited exchanges', 'AI Trade Committee', 'Auto execution settings', 'Portfolio analytics'],
        tone: 'emerald',
        highlighted: true,
        cta: 'Choose Professional',
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        cadence: 'pricing',
        description: 'For teams, white-label deployments, and dedicated support.',
        features: ['Teams', 'White label', 'API access', 'Priority support'],
        tone: 'amber',
        cta: 'Talk to Sales',
    },
];

export const landingHeroPreview = {
    pair: 'SOL/USDT',
    buy: 'Binance @ $150.20',
    sell: 'Bybit @ $153.10',
    spread: '1.93%',
    netProfit: '$18.42',
    sqis: '94/100',
    recommendation: 'EXECUTE',
    committee: {
        approve: 5,
        conditional: 1,
        reject: 0,
    },
    risk: 'Low',
};

