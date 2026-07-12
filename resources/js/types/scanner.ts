export type ScannerTone = 'teal' | 'emerald' | 'amber' | 'rose' | 'slate';
export type ScannerRiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type ScannerStatus = 'Live' | 'Queued' | 'Paper' | 'Completed' | 'Cancelled' | 'Failed' | 'Watching' | 'Paused';
export type ScannerFilterKind = 'select' | 'number' | 'text';

export interface ScannerFilterOption {
    label: string;
    value: string;
}

export interface ScannerFilterState {
    exchange: string;
    buyExchange: string;
    sellExchange: string;
    coin: string;
    pair: string;
    network: string;
    minimumSpread: string;
    maximumSpread: string;
    minimumNetProfit: string;
    liquidity: string;
    volatility: string;
    riskLevel: string;
    sqis: string;
    aiConfidence: string;
    tradingVolume: string;
    depositStatus: string;
    withdrawalStatus: string;
    executionTime: string;
    favoriteOnly: boolean;
    hideHighRisk: boolean;
    hideLowLiquidity: boolean;
}

export interface ScannerFilterField {
    key: keyof ScannerFilterState;
    label: string;
    kind: ScannerFilterKind;
    options?: ScannerFilterOption[];
    placeholder?: string;
    helper?: string;
    suffix?: string;
    span?: '1' | '2' | '3';
}

export interface ScannerPreset {
    id: string;
    label: string;
    description: string;
    tone: ScannerTone;
    minSqis: number;
    minProfit: string;
    filters: Partial<ScannerFilterState>;
}

export interface ScannerMetricCard {
    label: string;
    value: string;
    note: string;
    change: string;
    tone: ScannerTone;
    icon: string;
}

export interface ScannerOpportunityRow {
    id: string;
    pair: string;
    symbol: string;
    network: string;
    favorite: boolean;
    buyExchange: string;
    buyPrice: string;
    sellExchange: string;
    sellPrice: string;
    spreadPct: string;
    grossProfit: string;
    fees: string;
    estimatedNetProfit: string;
    liquidity: 'High' | 'Medium' | 'Low';
    orderBook: string;
    exchangeHealth: 'Stable' | 'Healthy' | 'Watch' | 'Limited';
    volatility: 'Low' | 'Moderate' | 'Elevated';
    sqis: number;
    aiConfidence: number;
    risk: ScannerRiskLevel;
    executionTime: string;
    status: ScannerStatus;
    tradingVolume: string;
    depositStatus: 'Open' | 'Limited' | 'Paused';
    withdrawalStatus: 'Open' | 'Limited' | 'Paused';
    updatedAt: string;
    sparkline: number[];
    live: boolean;
}

export interface ScannerQueueItem {
    id: string;
    bucket: 'Queued Trades' | 'Paper Trades' | 'Completed' | 'Cancelled' | 'Failed';
    pair: string;
    status: string;
    exchangeRoute: string;
    estimatedProfit: string;
    note: string;
    tone: ScannerTone;
}

export interface ScannerAlertItem {
    id: string;
    title: string;
    text: string;
    time: string;
    tone: ScannerTone;
    live?: boolean;
}

export interface ScannerHeatmapItem {
    symbol: string;
    value: number;
    tone: 'positive' | 'neutral' | 'negative';
}

export interface ScannerMarketMetric {
    label: string;
    value: string;
    change: string;
    tone: ScannerTone;
    data: number[];
}

export interface ScannerCommitteeVote {
    agent: string;
    vote: 'Approve' | 'Conditional' | 'Wait' | 'Reject';
    confidence: number;
    reason: string;
    riskFlags: string[];
}

export interface ScannerRiskCheck {
    label: string;
    value: string;
    status: string;
    tone: ScannerTone;
}

export interface ScannerSqisBreakdownItem {
    label: string;
    value: string;
    score: number;
}

export interface ScannerReplayStep {
    label: string;
    time: string;
    price: string;
    action: string;
    note: string;
}

export interface ScannerPreviewSummary {
    pair: string;
    buyExchange: string;
    sellExchange: string;
    sqis: number;
    expectedProfit: string;
    spread: string;
    liquidity: string;
    risk: ScannerRiskLevel;
    recommendation: string;
    confidence: number;
    estimatedDuration: string;
}
