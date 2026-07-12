export type TradeSide = 'long' | 'short';
export type OpportunityStatus = 'new' | 'watch' | 'active' | 'queued' | 'closed' | 'rejected';

export interface SqisBreakdownItem {
    label: string;
    score: number;
    value: string;
}

export interface ScannerFilterProfile {
    id: string;
    name: string;
    description: string;
    minSqis: number;
    minProfit: number;
    active: boolean;
    riskBias: 'conservative' | 'balanced' | 'aggressive';
}

export interface OpportunityReplayStep {
    label: string;
    time: string;
    price: string;
    action: string;
    note: string;
}

export interface ExecutionQueueItem {
    id: string;
    pair: string;
    status: 'Queued' | 'Running' | 'Paused' | 'Completed';
    buyExchange: string;
    sellExchange: string;
    estProfit: string;
    reason: string;
}

export interface CommitteeAgentVote {
    agent: string;
    vote: 'Approve' | 'Conditional' | 'Wait' | 'Reject';
    confidence: number;
    reason: string;
    riskFlags: string[];
}

export interface Opportunity {
    id: string;
    symbol: string;
    pair: string;
    side: TradeSide;
    status: OpportunityStatus;
    strategy: string;
    timeframe: string;
    buyExchange: string;
    sellExchange: string;
    sqis: number;
    sqisBand: 'Elite' | 'High' | 'Good' | 'Watch';
    confidence: number;
    expectedProfit: string;
    expectedProfitPct: string;
    riskReward: string;
    spread: string;
    liquidity: string;
    risk: string;
    entry: string;
    target: string;
    stop: string;
    fee: string;
    executionWindow: string;
    tags: string[];
    updatedAt: string;
    thesis: string;
    replayNote: string;
    marketBias: string;
    sqisBreakdown: SqisBreakdownItem[];
    committeeVotes: CommitteeAgentVote[];
    replayTimeline: OpportunityReplayStep[];
}

export interface OpportunitySummaryMetric {
    label: string;
    value: string;
    detail: string;
    tone: import('./index').DashboardTone;
}

export interface OpportunityQuickSummaryItem {
    label: string;
    value: string;
    detail: string;
    tone: import('./index').DashboardTone;
}

export interface OpportunityCommitteeSummary {
    decision: string;
    subDecision: string;
    confidence: number;
    approve: number;
    conditional: number;
    wait: number;
    reject: number;
}

export interface OpportunityCommitteeAgent {
    agent: string;
    role: string;
    avatar: string;
    vote: 'APPROVE' | 'CONDITIONAL APPROVAL' | 'WAIT' | 'REJECT' | 'REDUCE POSITION SIZE';
    confidence: number;
    reason: string;
    riskFlags: string[];
    recommendation: string;
    expanded?: boolean;
}

export interface OpportunityCommitteeDebateMessage {
    speaker: string;
    role: string;
    quote: string;
    tone: import('./index').DashboardTone;
}

export interface OpportunityMarketPulse {
    currentHealth: string;
    marketRegime: string;
    marketVolatility: string;
    topCoin: string;
    averageOpportunityDuration: string;
    averageMarketSqis: number;
}

export interface OpportunityDigitalTwinSimulation {
    runs: number;
    successProbability: string;
    averageProfit: string;
    worstCase: string;
    bestCase: string;
    recommendation: string;
}

export interface OpportunityLiveAlertItem {
    label: string;
    detail: string;
    time: string;
    tone: import('./index').DashboardTone;
    live?: boolean;
}

export interface OpportunityExchangeAnalysis {
    exchange: string;
    logo: string;
    price: string;
    availableVolume: string;
    orderBook: string;
    makerFee: string;
    takerFee: string;
    apiLatency: string;
    depositStatus: string;
    withdrawalStatus: string;
    health: string;
    tone: import('./index').DashboardTone;
}

export interface OpportunityDepthHeatmapCell {
    label: string;
    buy: number;
    sell: number;
}

export interface OpportunityOrderBookSnapshot {
    buyDepth: import('./index').ChartPoint[];
    sellDepth: import('./index').ChartPoint[];
    bidAskRatio: string;
    depthHeatmap: OpportunityDepthHeatmapCell[];
    expectedSlippage: string;
    maximumSafeCapital: string;
}

export interface OpportunityFeeLine {
    label: string;
    value: string;
    tone: import('./index').DashboardTone;
}

export interface OpportunityRiskMetric {
    label: string;
    value: string;
    detail: string;
    tone: import('./index').DashboardTone;
}

export type OpportunityMarketAnalysisTab =
    | 'spread'
    | 'price-history'
    | 'order-book'
    | 'liquidity'
    | 'market-trend'
    | 'funding'
    | 'historical-success';

export interface OpportunityMarketAnalysisTabItem {
    label: string;
    value: OpportunityMarketAnalysisTab;
}

export interface OpportunityMarketAnalysisSeries {
    spread: import('./index').ChartPoint[];
    priceHistory: import('./index').ChartPoint[];
    liquidity: import('./index').ChartPoint[];
    marketTrend: import('./index').ChartPoint[];
    funding: import('./index').ChartPoint[];
    historicalSuccess: import('./index').ChartPoint[];
}

export interface OpportunityHistoricalStat {
    label: string;
    value: string;
    detail: string;
    tone: import('./index').DashboardTone;
}

export interface OpportunityHistoricalTradeRow {
    pair: string;
    outcome: string;
    result: string;
    profit: string;
    duration: string;
}

export interface OpportunityChatMessage {
    role: 'user' | 'assistant';
    content: string;
    time: string;
}

export interface OpportunityReplayMilestone {
    label: string;
    time: string;
    note: string;
    tone: import('./index').DashboardTone;
}

export interface OpportunityTradeSimulatorMetrics {
    capitalPresets: number[];
    recommendedCapital: string;
    maximumSafeCapital: string;
    riskExposure: string;
    expectedProfit: string;
    estimatedFees: string;
    expectedSlippage: string;
    expectedSqis: string;
    committeeConfidence: string;
}

export interface OpportunityPositionRecommendation {
    recommended: string;
    maximumSafe: string;
    riskExposure: string;
    expectedProfit: string;
}

export interface OpportunityDetailRecord {
    id: string;
    pair: string;
    symbol: string;
    breadcrumb: string[];
    title: string;
    subtitle: string;
    status: string;
    statusTone: import('./index').DashboardTone;
    arbitrageType: string;
    buyExchange: OpportunityExchangeAnalysis;
    sellExchange: OpportunityExchangeAnalysis;
    summaryMetrics: OpportunitySummaryMetric[];
    quickSummary: OpportunityQuickSummaryItem[];
    sqisScore: number;
    sqisBand: string;
    sqisBreakdown: SqisBreakdownItem[];
    committeeSummary: OpportunityCommitteeSummary;
    committeeAgents: OpportunityCommitteeAgent[];
    committeeDebate: OpportunityCommitteeDebateMessage[];
    aiExplanation: string[];
    marketPulse: OpportunityMarketPulse;
    orderBook: OpportunityOrderBookSnapshot;
    feeAnalysis: OpportunityFeeLine[];
    riskAnalysis: OpportunityRiskMetric[];
    riskScore: number;
    riskLevel: string;
    digitalTwin: OpportunityDigitalTwinSimulation;
    marketAnalysisTabs: OpportunityMarketAnalysisTabItem[];
    marketAnalysisSeries: OpportunityMarketAnalysisSeries;
    tradeSimulator: OpportunityTradeSimulatorMetrics;
    chatMessages: OpportunityChatMessage[];
    replaySteps: OpportunityReplayMilestone[];
    historicalStats: OpportunityHistoricalStat[];
    historicalTrades: OpportunityHistoricalTradeRow[];
    positionRecommendation: OpportunityPositionRecommendation;
    liveAlerts: OpportunityLiveAlertItem[];
    recommendedAction: {
        title: string;
        reasons: string[];
        buttonLabel: string;
        tone: import('./index').DashboardTone;
    };
    footerDisclaimer: string;
}
