export type LayoutName = 'public' | 'auth' | 'app';
export type TrendDirection = 'up' | 'down' | 'flat';

export interface NavigationItem {
    label: string;
    description: string;
    to: string;
    badge?: string;
    icon?: string;
    tone?: 'teal' | 'emerald' | 'amber' | 'rose' | 'slate';
}

export interface NavigationGroup {
    title: string;
    items: NavigationItem[];
}

export interface StatCard {
    label: string;
    value: string;
    change: string;
    trend: TrendDirection;
    note: string;
}

export interface LandingHighlight {
    title: string;
    description: string;
    kicker?: string;
}

export interface AiModule {
    title: string;
    description: string;
    status: string;
    score: string;
    focus: string;
}

export interface ChartPoint {
    label: string;
    value: number;
}

export type DashboardTone = 'teal' | 'emerald' | 'amber' | 'rose' | 'slate';

export interface DashboardSummaryCard {
    label: string;
    value: string;
    change: string;
    note: string;
    tone: DashboardTone;
    icon: string;
    chips?: DashboardExchangeChip[];
}

export interface DashboardExchangeChip {
    name: string;
    tone: DashboardTone;
}

export interface DashboardDecisionFeedItem {
    title: string;
    text: string;
    badge?: string;
    badgeTone?: DashboardTone;
    time: string;
    tone: DashboardTone;
    icon: string;
}

export interface DashboardOpportunityRow {
    pair: string;
    buyExchange: string;
    sellExchange: string;
    estimatedProfit: string;
    sqis: number;
    risk: string;
    riskTone: DashboardTone;
}

export interface DashboardAllocationItem {
    label: string;
    value: string;
    percentage: number;
    tone: DashboardTone;
}

export interface DashboardPerformanceMetric {
    label: string;
    value: string;
}

export interface DashboardRiskMetric {
    label: string;
    value: string;
    tone: DashboardTone;
}

export interface DashboardQuickAction {
    label: string;
    description: string;
    to: string;
    tone: DashboardTone;
    icon: string;
}

export interface DashboardEventItem {
    label: string;
    countdown: string;
    detail: string;
    tone: DashboardTone;
}

export interface DashboardFooterLink {
    label: string;
    href: string;
    description: string;
    external?: boolean;
}

export interface PricingPlan {
    name: string;
    price: string;
    cadence: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    cta: string;
    tone: 'slate' | 'teal' | 'emerald' | 'amber' | 'rose';
}

export interface Holding {
    name: string;
    symbol: string;
    allocation: number;
    quantity: string;
    avgCost: string;
    marketValue: string;
    pnl: string;
    trend: TrendDirection;
}

export interface PaperTrade {
    id: string;
    symbol: string;
    side: import('./opportunity').TradeSide;
    status: 'open' | 'closed' | 'queued' | 'draft';
    openedAt: string;
    entry: string;
    exit: string;
    pnl: string;
    strategy: string;
    exchange: string;
    size: string;
    confidence: number;
    note: string;
}

export * from './user';
export * from './exchange';
export * from './risk';
export * from './opportunity';
export * from './scanner';
