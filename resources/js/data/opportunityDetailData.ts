import type {
    OpportunityDetailRecord,
    OpportunityCommitteeAgent,
    OpportunityCommitteeSummary,
    OpportunityCommitteeDebateMessage,
    OpportunityChatMessage,
    OpportunityDigitalTwinSimulation,
    OpportunityFeeLine,
    OpportunityHistoricalStat,
    OpportunityHistoricalTradeRow,
    OpportunityLiveAlertItem,
    OpportunityMarketPulse,
    OpportunityMarketAnalysisTabItem,
    OpportunityMarketAnalysisSeries,
    OpportunityOrderBookSnapshot,
    OpportunityPositionRecommendation,
    OpportunityReplayMilestone,
    OpportunityRiskMetric,
    OpportunitySummaryMetric,
    OpportunityTradeSimulatorMetrics,
    OpportunityQuickSummaryItem,
} from '@/types';

const summaryMetrics: OpportunitySummaryMetric[] = [
    { label: 'Coin Pair', value: 'SOL/USDT', detail: 'Cross exchange arbitrage', tone: 'teal' },
    { label: 'Arbitrage Type', value: 'Cross Exchange', detail: 'Spot-to-spot route', tone: 'slate' },
    { label: 'Buy Exchange', value: 'Binance', detail: 'Liquidity leader', tone: 'emerald' },
    { label: 'Sell Exchange', value: 'Bybit', detail: 'Best execution target', tone: 'teal' },
    { label: 'Buy Price', value: '150.20 USDT', detail: 'Detected from order flow', tone: 'slate' },
    { label: 'Sell Price', value: '153.20 USDT', detail: 'Target exit venue', tone: 'slate' },
    { label: 'Spread', value: '1.93%', detail: 'Net of expected slip', tone: 'emerald' },
    { label: 'Estimated Gross Profit', value: '$22.14', detail: 'Before fees', tone: 'amber' },
    { label: 'Estimated Net Profit', value: '$18.42', detail: 'After fees and slippage', tone: 'emerald' },
    { label: 'Required Capital', value: '$1,000', detail: 'Recommended initial size', tone: 'slate' },
    { label: 'Opportunity Age', value: '2m 14s', detail: 'Fresh scan result', tone: 'amber' },
    { label: 'Estimated Duration', value: '14 Seconds', detail: 'Expected execution window', tone: 'teal' },
];

const quickSummary: OpportunityQuickSummaryItem[] = [
    { label: 'Opportunity ID', value: 'OPP-SOL-2024-0014', detail: 'Detected 2 minutes ago', tone: 'slate' },
    { label: 'Detection Time', value: '2m 14s ago', detail: 'Scanner pass at 10:21 UTC', tone: 'teal' },
    { label: 'Scanner Version', value: 'v3.2.1', detail: 'Latest decision stack', tone: 'teal' },
    { label: 'Market Trend', value: 'Bullish', detail: 'Momentum remains supportive', tone: 'emerald' },
    { label: 'Spread Stability', value: 'High', detail: 'Edge has remained persistent', tone: 'emerald' },
    { label: 'Arbitrage Type', value: 'Cross Exchange', detail: 'Spot to spot', tone: 'slate' },
    { label: 'Execution Type', value: 'Manual / Auto', detail: 'Future automation ready', tone: 'amber' },
    { label: 'Network', value: 'Solana', detail: 'Low congestion path', tone: 'emerald' },
    { label: 'Gas Estimate', value: '$0.18', detail: 'Transfer cost estimate', tone: 'teal' },
    { label: 'Capital Required', value: '$1,000.00', detail: 'Base allocation', tone: 'slate' },
    { label: 'Recommended Capital', value: '$1,000.00', detail: 'Committee preferred size', tone: 'emerald' },
];

const committeeSummary: OpportunityCommitteeSummary = {
    decision: 'EXECUTE',
    subDecision: 'With Reduced Size',
    confidence: 97,
    approve: 5,
    conditional: 1,
    wait: 0,
    reject: 0,
};

const committeeAgents: OpportunityCommitteeAgent[] = [
    {
        agent: 'Market Scanner AI',
        role: 'Market data surveillance',
        avatar: 'MS',
        vote: 'APPROVE',
        confidence: 98,
        reason: 'Spread confirmed across multiple exchange feeds.',
        riskFlags: ['No stale data', 'Spread strong'],
        recommendation: 'Proceed with confidence.',
        expanded: true,
    },
    {
        agent: 'Risk Officer AI',
        role: 'Risk governance',
        avatar: 'RO',
        vote: 'APPROVE',
        confidence: 95,
        reason: 'Volatility remains within acceptable limits.',
        riskFlags: ['Low volatility', 'Contained drawdown'],
        recommendation: 'Risk budget remains intact.',
    },
    {
        agent: 'Liquidity Analyst AI',
        role: 'Order book intelligence',
        avatar: 'LA',
        vote: 'APPROVE',
        confidence: 94,
        reason: 'Order book depth supports requested capital.',
        riskFlags: ['Depth sufficient', 'Slippage low'],
        recommendation: 'Liquidity can support execution.',
    },
    {
        agent: 'Execution Manager AI',
        role: 'Execution orchestration',
        avatar: 'EM',
        vote: 'CONDITIONAL APPROVAL',
        confidence: 88,
        reason: 'Execution should complete within two seconds.',
        riskFlags: ['Fill-speed constraint', 'Latency watch'],
        recommendation: 'Reduce size if route slows.',
    },
    {
        agent: 'Portfolio Manager AI',
        role: 'Capital allocation',
        avatar: 'PM',
        vote: 'REDUCE POSITION SIZE',
        confidence: 86,
        reason: 'Suggested capital reduced to improve portfolio balance.',
        riskFlags: ['Exposure concentration', 'Correlation watch'],
        recommendation: 'Keep allocation disciplined.',
    },
    {
        agent: 'Compliance & Safety AI',
        role: 'Compliance and policy',
        avatar: 'CS',
        vote: 'APPROVE',
        confidence: 99,
        reason: 'API permissions and exchange rules are compliant.',
        riskFlags: ['Permissions validated', 'Audit ready'],
        recommendation: 'No compliance blockers detected.',
    },
];

const aiExplanation = [
    'The opportunity exceeds your configured minimum spread.',
    'Liquidity is sufficient on both exchanges.',
    'Expected slippage is low.',
    'Exchange APIs are healthy.',
    'Historical success is excellent.',
    'Market regime is favorable for this route.',
];

const buyExchange = {
    exchange: 'Binance',
    logo: 'BN',
    price: '150.20 USDT',
    availableVolume: '12,850 SOL',
    orderBook: 'Strong depth',
    makerFee: '0.04%',
    takerFee: '0.06%',
    apiLatency: '28 ms',
    depositStatus: 'Enabled',
    withdrawalStatus: 'Enabled',
    health: 'Healthy',
    tone: 'emerald',
} as const;

const sellExchange = {
    exchange: 'Bybit',
    logo: 'BY',
    price: '153.20 USDT',
    availableVolume: '11,920 SOL',
    orderBook: 'Very strong',
    makerFee: '0.04%',
    takerFee: '0.06%',
    apiLatency: '31 ms',
    depositStatus: 'Enabled',
    withdrawalStatus: 'Enabled',
    health: 'Stable',
    tone: 'teal',
} as const;

const marketPulse: OpportunityMarketPulse = {
    currentHealth: 'GOOD',
    marketRegime: 'Bullish',
    marketVolatility: 'Low',
    topCoin: 'SOL',
    averageOpportunityDuration: '18 Seconds',
    averageMarketSqis: 92,
} as const;

const orderBook: OpportunityOrderBookSnapshot = {
    buyDepth: [
        { label: '0', value: 40 },
        { label: '1', value: 44 },
        { label: '2', value: 47 },
        { label: '3', value: 53 },
        { label: '4', value: 58 },
        { label: '5', value: 62 },
        { label: '6', value: 67 },
        { label: '7', value: 71 },
    ],
    sellDepth: [
        { label: '0', value: 38 },
        { label: '1', value: 42 },
        { label: '2', value: 46 },
        { label: '3', value: 51 },
        { label: '4', value: 55 },
        { label: '5', value: 61 },
        { label: '6', value: 66 },
        { label: '7', value: 70 },
    ],
    bidAskRatio: '1.18',
    depthHeatmap: [
        { label: '0.1%', buy: 86, sell: 72 },
        { label: '0.25%', buy: 82, sell: 74 },
        { label: '0.5%', buy: 76, sell: 69 },
        { label: '1.0%', buy: 72, sell: 65 },
        { label: '1.5%', buy: 68, sell: 61 },
        { label: '2.0%', buy: 61, sell: 57 },
    ],
    expectedSlippage: '0.05%',
    maximumSafeCapital: '$5,000',
};

const feeAnalysis: OpportunityFeeLine[] = [
    { label: 'Trading Fees', value: '$1.12', tone: 'slate' },
    { label: 'Withdrawal Fees', value: '$0.35', tone: 'slate' },
    { label: 'Gas Fees', value: '$0.18', tone: 'teal' },
    { label: 'Slippage', value: '$2.07', tone: 'amber' },
    { label: 'Gross Profit', value: '$22.14', tone: 'amber' },
    { label: 'Net Profit', value: '$18.42', tone: 'emerald' },
];

const riskAnalysis: OpportunityRiskMetric[] = [
    { label: 'Volatility', value: 'Low', detail: 'Intraday range is controlled', tone: 'emerald' },
    { label: 'Liquidity', value: 'High', detail: 'Order books have sufficient depth', tone: 'emerald' },
    { label: 'Exchange Risk', value: 'Low', detail: 'Venue health remains stable', tone: 'emerald' },
    { label: 'Network Congestion', value: 'Normal', detail: 'Solana transfer window is clear', tone: 'teal' },
    { label: 'Execution Risk', value: 'Low', detail: 'Fill time is still inside the target', tone: 'emerald' },
    { label: 'API Stability', value: 'Stable', detail: 'Both venues are responding quickly', tone: 'emerald' },
    { label: 'Overall Risk', value: 'LOW', detail: 'Contained and committee approved', tone: 'emerald' },
];

const committeeDebate: OpportunityCommitteeDebateMessage[] = [
    {
        speaker: 'Risk Officer AI',
        role: 'Risk governance',
        quote: 'I recommend caution because volatility has increased.',
        tone: 'amber',
    },
    {
        speaker: 'Liquidity Analyst AI',
        role: 'Order book intelligence',
        quote: 'I disagree. Liquidity remains sufficient.',
        tone: 'emerald',
    },
    {
        speaker: 'Execution Manager AI',
        role: 'Execution orchestration',
        quote: 'Execute only if both orders complete within two seconds.',
        tone: 'teal',
    },
    {
        speaker: 'Portfolio Manager AI',
        role: 'Capital allocation',
        quote: 'I recommend reducing capital.',
        tone: 'amber',
    },
    {
        speaker: 'Compliance & Safety AI',
        role: 'Compliance and policy',
        quote: 'No compliance issues detected.',
        tone: 'emerald',
    },
] ;

const digitalTwin: OpportunityDigitalTwinSimulation = {
    runs: 10000,
    successProbability: '96.8%',
    averageProfit: '$17.82',
    worstCase: '-$3.40',
    bestCase: '$24.12',
    recommendation: 'Proceed using recommended capital.',
} as const;

const liveAlerts: OpportunityLiveAlertItem[] = [
    { label: 'High Quality Opportunity', detail: 'SOL/USDT still clears the committee threshold.', time: '2m ago', tone: 'emerald', live: true },
    { label: 'Risk Increased', detail: 'BTC volatility ticked higher on one venue.', time: '4m ago', tone: 'amber' },
    { label: 'Exchange Maintenance', detail: 'Gate.io reported a short maintenance window.', time: '6m ago', tone: 'rose' },
    { label: 'Network Congestion', detail: 'Solana transfer lane is still clear.', time: '8m ago', tone: 'teal' },
    { label: 'Opportunity Expiring', detail: 'Edge remains valid but is narrowing.', time: '10m ago', tone: 'amber' },
    { label: 'Price Changed', detail: 'Sell side moved +0.12% on the last tick.', time: '12m ago', tone: 'teal' },
    { label: 'API Delay', detail: 'Response times remain below the warning threshold.', time: '15m ago', tone: 'emerald' },
];

const marketAnalysisTabs: OpportunityMarketAnalysisTabItem[] = [
    { label: 'Spread Analysis', value: 'spread' },
    { label: 'Price History', value: 'price-history' },
    { label: 'Order Book', value: 'order-book' },
    { label: 'Liquidity', value: 'liquidity' },
    { label: 'Market Trend', value: 'market-trend' },
    { label: 'Funding', value: 'funding' },
    { label: 'Historical Success', value: 'historical-success' },
];

const marketAnalysisSeries: OpportunityMarketAnalysisSeries = {
    spread: [
        { label: '14:30', value: 1.56 },
        { label: '14:35', value: 1.61 },
        { label: '14:40', value: 1.68 },
        { label: '14:45', value: 1.74 },
        { label: '14:50', value: 1.71 },
        { label: '14:55', value: 1.83 },
        { label: '15:00', value: 1.93 },
    ],
    priceHistory: [
        { label: '14:30', value: 148.9 },
        { label: '14:35', value: 149.5 },
        { label: '14:40', value: 149.1 },
        { label: '14:45', value: 150.0 },
        { label: '14:50', value: 150.4 },
        { label: '14:55', value: 151.8 },
        { label: '15:00', value: 152.7 },
    ],
    liquidity: [
        { label: '14:30', value: 72 },
        { label: '14:35', value: 74 },
        { label: '14:40', value: 77 },
        { label: '14:45', value: 81 },
        { label: '14:50', value: 84 },
        { label: '14:55', value: 87 },
        { label: '15:00', value: 90 },
    ],
    marketTrend: [
        { label: '14:30', value: 51 },
        { label: '14:35', value: 52 },
        { label: '14:40', value: 53 },
        { label: '14:45', value: 56 },
        { label: '14:50', value: 58 },
        { label: '14:55', value: 60 },
        { label: '15:00', value: 62 },
    ],
    funding: [
        { label: '14:30', value: 0.016 },
        { label: '14:35', value: 0.018 },
        { label: '14:40', value: 0.017 },
        { label: '14:45', value: 0.019 },
        { label: '14:50', value: 0.021 },
        { label: '14:55', value: 0.02 },
        { label: '15:00', value: 0.022 },
    ],
    historicalSuccess: [
        { label: 'Jan', value: 92 },
        { label: 'Feb', value: 93 },
        { label: 'Mar', value: 94 },
        { label: 'Apr', value: 95 },
        { label: 'May', value: 95 },
        { label: 'Jun', value: 96 },
        { label: 'Jul', value: 96 },
    ],
};

const tradeSimulator: OpportunityTradeSimulatorMetrics = {
    capitalPresets: [100, 500, 1000, 2500, 5000, 10000],
    recommendedCapital: '$1,000',
    maximumSafeCapital: '$5,000',
    riskExposure: '2.35%',
    expectedProfit: '$18.42',
    estimatedFees: '$1.65',
    expectedSlippage: '$2.07',
    expectedSqis: '94/100',
    committeeConfidence: '97%',
};

const chatMessages: OpportunityChatMessage[] = [
    {
        role: 'user',
        content: 'Why should I execute this trade?',
        time: 'Now',
    },
    {
        role: 'assistant',
        content: 'Liquidity is strong. Spread exceeds your threshold. Historical success rate is 96%. Expected execution time is under two seconds.',
        time: 'AI reply',
    },
    {
        role: 'user',
        content: 'What if I use $5,000?',
        time: 'Earlier',
    },
    {
        role: 'assistant',
        content: 'Expected slippage increases. Recommended capital is $2,500 unless the market stays this clean.',
        time: 'AI reply',
    },
];

const replaySteps: OpportunityReplayMilestone[] = [
    { label: 'Opportunity Detected', time: '10:21:04', note: 'Scanner flagged a fresh edge in SOL/USDT.', tone: 'teal' },
    { label: 'Liquidity Checked', time: '10:21:05', note: 'Both books passed the desk depth threshold.', tone: 'emerald' },
    { label: 'Committee Review', time: '10:21:07', note: 'Risk and liquidity approved the route.', tone: 'amber' },
    { label: 'Recommendation', time: '10:21:09', note: 'Decision engine recommended execution with reduced size.', tone: 'emerald' },
    { label: 'Spread Narrowed', time: '10:21:12', note: 'Edge compressed but still remained inside tolerance.', tone: 'amber' },
    { label: 'Opportunity Closed', time: '10:24:18', note: 'Route has now expired and moved to history.', tone: 'slate' },
];

const historicalStats: OpportunityHistoricalStat[] = [
    { label: 'Successful', value: '96', detail: '96%', tone: 'emerald' },
    { label: 'Expired', value: '2', detail: '2%', tone: 'amber' },
    { label: 'Rejected', value: '1', detail: '1%', tone: 'rose' },
    { label: 'Loss', value: '1', detail: '1%', tone: 'rose' },
    { label: 'Average Profit', value: '$17.60', detail: 'Per trade', tone: 'emerald' },
    { label: 'Average Duration', value: '18 Seconds', detail: 'Trade life cycle', tone: 'teal' },
];

const historicalTrades: OpportunityHistoricalTradeRow[] = [
    { pair: 'SOL/USDT', outcome: 'Successful', result: 'Approved', profit: '$18.42', duration: '14s' },
    { pair: 'SOL/USDT', outcome: 'Successful', result: 'Approved', profit: '$17.96', duration: '16s' },
    { pair: 'SOL/USDT', outcome: 'Expired', result: 'Missed fill', profit: '$0.00', duration: '21s' },
    { pair: 'SOL/USDT', outcome: 'Successful', result: 'Approved', profit: '$18.11', duration: '13s' },
    { pair: 'SOL/USDT', outcome: 'Rejected', result: 'Risk filter', profit: '$0.00', duration: '11s' },
];

const positionRecommendation: OpportunityPositionRecommendation = {
    recommended: '$1,000',
    maximumSafe: '$5,000',
    riskExposure: '2.35%',
    expectedProfit: '$18.42',
};

const footerDisclaimer =
    'Smapis Quant AI provides trading intelligence and automation tools. Trading involves risk. No profit is guaranteed. Users remain responsible for all trading decisions.';

export const opportunityDetailRecords: Record<string, OpportunityDetailRecord> = {
    'sol-usdt': {
        id: 'sol-usdt',
        pair: 'SOL/USDT',
        symbol: 'SOL',
        breadcrumb: ['Dashboard', 'Live Scanner', 'Opportunity Detail'],
        title: 'Opportunity Detail',
        subtitle: 'Comprehensive AI analysis and recommendation for this arbitrage opportunity.',
        status: 'LIVE',
        statusTone: 'emerald',
        arbitrageType: 'Cross Exchange',
        buyExchange,
        sellExchange,
        summaryMetrics,
        quickSummary,
        sqisScore: 94,
        sqisBand: 'Excellent',
        sqisBreakdown: [
            { label: 'Liquidity', score: 20, value: 'Order book depth supports requested capital.' },
            { label: 'Spread Quality', score: 18, value: 'Spread remains attractive after fees.' },
            { label: 'Fee Efficiency', score: 19, value: 'Costs stay within the desk threshold.' },
            { label: 'Exchange Health', score: 15, value: 'Venue health is stable on both sides.' },
            { label: 'API Stability', score: 10, value: 'No latency degradation observed.' },
            { label: 'Historical Success', score: 8, value: 'Similar setups have performed well.' },
            { label: 'Volatility', score: 4, value: 'Price action remains controlled.' },
        ],
        committeeSummary,
        committeeAgents,
        committeeDebate,
        aiExplanation,
        marketPulse,
        orderBook,
        feeAnalysis,
        riskAnalysis,
        riskScore: 22,
        riskLevel: 'LOW',
        digitalTwin,
        marketAnalysisTabs,
        marketAnalysisSeries,
        tradeSimulator,
        chatMessages,
        replaySteps,
        historicalStats,
        historicalTrades,
        positionRecommendation,
        liveAlerts,
        recommendedAction: {
            title: 'EXECUTE WITH REDUCED SIZE',
            reasons: ['Excellent liquidity', 'Healthy exchanges', 'Strong spread', 'Low execution risk'],
            buttonLabel: 'View Detailed Explanation',
            tone: 'emerald',
        },
        footerDisclaimer,
    },
};

export const opportunityDetailFallbackId = 'sol-usdt';

export function getOpportunityDetailRecord(id: string) {
    return opportunityDetailRecords[id] ?? opportunityDetailRecords[opportunityDetailFallbackId];
}
