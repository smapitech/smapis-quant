import type {
    AiModule,
    ChartPoint,
    CommitteeAgentVote,
    ExecutionQueueItem,
    ExchangeConnection,
    Holding,
    LandingHighlight,
    NavigationGroup,
    NavigationItem,
    Opportunity,
    PaperTrade,
    PricingPlan,
    RiskLimit,
    RiskMetric,
    RiskReportItem,
    ScannerFilterProfile,
    StatCard,
    WalletBalance,
} from '@/types';

export interface DecisionFeedItem {
    symbol: string;
    sqis: number;
    decision: string;
    rationale: string;
    age: string;
    bias: string;
}

export interface AllocationSlice {
    label: string;
    value: string;
    percentage: number;
    tone: 'emerald' | 'teal' | 'amber' | 'slate';
}

export interface TradingPlanCard {
    title: string;
    description: string;
    status: string;
    note: string;
}

export const demoUser = {
    id: 'user-isaac-01',
    name: 'Isaac Okafor',
    email: 'isaac@smapisquant.ai',
    initials: 'IO',
    role: 'portfolio_manager',
    title: 'Pro Trader',
    workspace: 'Smapis Quant OS',
    timezone: 'WAT',
    status: 'active',
} as const;

export const demoSession = {
    user: demoUser,
    token: 'demo-session-token',
    expiresAt: '2026-07-07T23:59:59+01:00',
    twoFactorEnabled: true,
    lastSignIn: '2026-07-06T07:18:00+01:00',
} as const;

export const sidebarNavigation: NavigationGroup[] = [
    {
        title: 'Desk',
        items: [
            {
                label: 'Dashboard',
                to: '/dashboard',
                description: 'Account pulse, risk, and AI decisions.',
                badge: 'Core',
                icon: 'grid',
                tone: 'teal',
            },
            {
                label: 'Live Scanner',
                to: '/scanner',
                description: 'Real-time opportunity discovery.',
                badge: 'Live',
                icon: 'scan',
                tone: 'emerald',
            },
            {
                label: 'Opportunities',
                to: '/opportunities',
                description: 'Ranked trade ideas and replays.',
                icon: 'layers',
                tone: 'amber',
            },
            {
                label: 'AI Center',
                to: '/ai-center',
                description: 'Model orchestration and committee flow.',
                icon: 'brain',
                tone: 'teal',
            },
        ],
    },
    {
        title: 'Execution',
        items: [
            {
                label: 'Paper Trading',
                to: '/paper-trading',
                description: 'Simulated execution and journals.',
                icon: 'paper',
                tone: 'slate',
            },
            {
                label: 'Auto Trading',
                to: '/auto-trading',
                description: 'Risk-guarded automation settings.',
                icon: 'bolt',
                tone: 'amber',
            },
            {
                label: 'Portfolio',
                to: '/portfolio',
                description: 'Allocation, exposure, and holdings.',
                icon: 'portfolio',
                tone: 'emerald',
            },
            {
                label: 'Exchanges',
                to: '/exchange-manager',
                description: 'Connected venues and API health.',
                icon: 'exchange',
                tone: 'teal',
            },
            {
                label: 'Wallets',
                to: '/wallets',
                description: 'Asset balances and custody view.',
                icon: 'wallet',
                tone: 'slate',
            },
            {
                label: 'Strategies',
                to: '/strategies',
                description: 'Marketplace and strategy registry.',
                icon: 'layers',
                tone: 'amber',
            },
        ],
    },
    {
        title: 'Insights',
        items: [
            {
                label: 'Analytics',
                to: '/analytics',
                description: 'Performance, attribution, and trends.',
                icon: 'chart',
                tone: 'teal',
            },
            {
                label: 'Risk Center',
                to: '/risk-center',
                description: 'Limits, exposure, and stress tests.',
                icon: 'shield',
                tone: 'rose',
            },
            {
                label: 'Alerts',
                to: '/alerts',
                description: 'Notifications and escalation rules.',
                icon: 'bell',
                tone: 'amber',
            },
            {
                label: 'Academy',
                to: '/academy',
                description: 'Training and playbooks.',
                icon: 'academy',
                tone: 'slate',
            },
            {
                label: 'Billing',
                to: '/billing',
                description: 'Plan and usage management.',
                icon: 'billing',
                tone: 'teal',
            },
            {
                label: 'Settings',
                to: '/settings',
                description: 'Workspace and execution preferences.',
                icon: 'settings',
                tone: 'slate',
            },
        ],
    },
];

export const publicHighlights: LandingHighlight[] = [
    {
        title: 'Signal pipeline',
        description: 'Rank market opportunities by SQIS, liquidity, and execution quality before anything reaches the desk.',
        kicker: 'Desk ready',
    },
    {
        title: 'AI Trade Committee',
        description: 'Structured votes from market, risk, liquidity, execution, portfolio, and compliance agents.',
        kicker: 'Governed decisions',
    },
    {
        title: 'Paper lane',
        description: 'Validate strategies in a realistic simulation environment before they ever touch live capital.',
        kicker: 'Controlled rehearsal',
    },
    {
        title: 'Multi-exchange control',
        description: 'Track venue health, latency, and account status from one institutional workspace.',
        kicker: 'Operations',
    },
];

export const landingStats: StatCard[] = [
    {
        label: 'Live scanners',
        value: '18',
        change: '+4 today',
        trend: 'up',
        note: 'Across crypto, FX, and equities-derived feeds.',
    },
    {
        label: 'Committee agents',
        value: '6',
        change: 'All online',
        trend: 'up',
        note: 'Each agent has a distinct review role.',
    },
    {
        label: 'Avg SQIS',
        value: '84',
        change: '+3.2',
        trend: 'up',
        note: 'Only high conviction ideas rise to the top.',
    },
    {
        label: 'Paper win rate',
        value: '61%',
        change: '+2.4%',
        trend: 'up',
        note: 'Simulation performance remains a placeholder.',
    },
];

export const pricingPlans: PricingPlan[] = [
    {
        name: 'Research',
        price: '$49',
        cadence: '/ month',
        description: 'For solo analysts and builders testing the platform foundation.',
        features: ['Live scanner', 'Paper trading', 'Risk dashboard', 'Email alerts'],
        highlighted: false,
        cta: 'Start research',
        tone: 'slate',
    },
    {
        name: 'Desk',
        price: '$149',
        cadence: '/ month',
        description: 'For professional traders using the AI Trade Committee and multi-exchange control.',
        features: ['SQIS engine', 'Committee votes', 'Portfolio analytics', 'Exchange manager', 'Slack alerts'],
        highlighted: true,
        cta: 'Choose desk',
        tone: 'teal',
    },
    {
        name: 'Institutional',
        price: 'Custom',
        cadence: 'pricing',
        description: 'For teams that need governance, higher limits, and custom integrations.',
        features: ['SSO', 'Role-based controls', 'Custom connectors', 'Priority support'],
        highlighted: false,
        cta: 'Talk to sales',
        tone: 'emerald',
    },
];

export const dashboardStats: StatCard[] = [
    {
        label: 'Total Capital',
        value: '$125,430.16',
        change: '+3.42%',
        trend: 'up',
        note: 'Includes paper capital and live-approved allocation.',
    },
    {
        label: "Today's Estimated Profit",
        value: '$1,248.75',
        change: '+12.61%',
        trend: 'up',
        note: 'Derived from current opportunity set.',
    },
    {
        label: 'Open Opportunities',
        value: '23',
        change: '+5 vs yesterday',
        trend: 'up',
        note: 'Filtered by confidence and liquidity.',
    },
    {
        label: 'Average SQIS',
        value: '85',
        change: 'High quality',
        trend: 'up',
        note: 'Only the strongest ideas remain on the desk.',
    },
    {
        label: 'Risk Status',
        value: 'LOW RISK',
        change: 'All systems normal',
        trend: 'flat',
        note: 'Exposure and drawdown remain within limits.',
    },
    {
        label: 'Connected Exchanges',
        value: '6',
        change: '4 healthy / 2 limited',
        trend: 'up',
        note: 'Latency and API health are tracked continuously.',
    },
    {
        label: 'Paper Trading Balance',
        value: '$50,000.00',
        change: '+0.00%',
        trend: 'flat',
        note: 'Simulation capital, isolated from live capital.',
    },
    {
        label: 'Live Trading Status',
        value: 'STANDBY',
        change: 'Auto trading disabled',
        trend: 'flat',
        note: 'Activation is reserved for future settings.',
    },
];

export const dashboardDecisionFeed: DecisionFeedItem[] = [
    {
        symbol: 'SOL/USDT',
        sqis: 92,
        decision: 'Approve',
        rationale: 'Spread confirmed across fresh market depth.',
        age: 'Just now',
        bias: 'Momentum',
    },
    {
        symbol: 'BTC/USDT',
        sqis: 88,
        decision: 'Approve',
        rationale: 'Macro trend remains supported above the mean.',
        age: '2m ago',
        bias: 'Trend',
    },
    {
        symbol: 'ETH/USDT',
        sqis: 84,
        decision: 'Conditional',
        rationale: 'Needs cleaner liquidity before execution.',
        age: '4m ago',
        bias: 'Continuation',
    },
    {
        symbol: 'ARB/USDT',
        sqis: 78,
        decision: 'Wait',
        rationale: 'Opportunity is decent but not exceptional.',
        age: '6m ago',
        bias: 'Range',
    },
];

export const dashboardCapitalAllocation: AllocationSlice[] = [
    { label: 'Spot', value: '62.3%', percentage: 62.3, tone: 'emerald' },
    { label: 'Stablecoin', value: '22.5%', percentage: 22.5, tone: 'teal' },
    { label: 'USDT', value: '10.1%', percentage: 10.1, tone: 'amber' },
    { label: 'Others', value: '5.1%', percentage: 5.1, tone: 'slate' },
];

export const dashboardPortfolioSeries: ChartPoint[] = [
    { label: '00:00', value: 96 },
    { label: '04:00', value: 102 },
    { label: '08:00', value: 101 },
    { label: '12:00', value: 110 },
    { label: '16:00', value: 118 },
    { label: '20:00', value: 114 },
    { label: '24:00', value: 121 },
];

export const scannerSummaryStats: StatCard[] = [
    {
        label: 'Total Opportunities',
        value: '128',
        change: '+18 vs last scan',
        trend: 'up',
        note: 'Across all connected feeds.',
    },
    {
        label: 'High Quality (SQIS 80+)',
        value: '28',
        change: '21.9%',
        trend: 'up',
        note: 'The committee only needs to review the best candidates.',
    },
    {
        label: 'Est. Total Profit',
        value: '$2,612.45',
        change: 'Across all pops',
        trend: 'up',
        note: 'Based on the latest scanner snapshot.',
    },
    {
        label: 'Scan Speed',
        value: '1.2s',
        change: 'Real-time',
        trend: 'flat',
        note: 'The future live feed will update here.',
    },
];

export const scannerFilters: string[] = ['All Pairs', 'All Exchanges', 'High SQIS', 'Min Profit', 'Momentum', 'Mean Reversion'];

export const scannerProfiles: ScannerFilterProfile[] = [
    {
        id: 'conservative',
        name: 'Conservative',
        description: 'Higher SQIS, lower risk, tighter liquidity requirements.',
        minSqis: 88,
        minProfit: 0.45,
        active: false,
        riskBias: 'conservative',
    },
    {
        id: 'balanced',
        name: 'Balanced',
        description: 'Default desk profile with a fair trade-off between quality and throughput.',
        minSqis: 80,
        minProfit: 0.35,
        active: true,
        riskBias: 'balanced',
    },
    {
        id: 'aggressive',
        name: 'Aggressive',
        description: 'Lets momentum and volatility play a larger role in the final score.',
        minSqis: 72,
        minProfit: 0.25,
        active: false,
        riskBias: 'aggressive',
    },
    {
        id: 'custom',
        name: 'My Custom',
        description: 'User-defined profile reserved for later editable settings.',
        minSqis: 76,
        minProfit: 0.30,
        active: false,
        riskBias: 'balanced',
    },
];

export const scannerOpportunities: Opportunity[] = [
    {
        id: 'sol-usdt-breakout',
        symbol: 'SOL',
        pair: 'SOL/USDT',
        side: 'long',
        status: 'active',
        strategy: 'Breakout continuation',
        timeframe: '15M',
        buyExchange: 'Binance',
        sellExchange: 'Bybit',
        sqis: 92,
        sqisBand: 'Elite',
        confidence: 97,
        expectedProfit: '$18.42',
        expectedProfitPct: '0.48%',
        riskReward: '1:2.4',
        spread: '0.68',
        liquidity: 'High',
        risk: 'Low',
        entry: '$143.62',
        target: '$145.80',
        stop: '$142.30',
        fee: '0.04%',
        executionWindow: '12s',
        tags: ['Momentum', 'High Liquidity', 'Top of book'],
        updatedAt: 'Just now',
        thesis: 'Spread is tight, momentum is rising, and the book is confirming a directional impulse.',
        replayNote: 'This is the strongest live setup in the scanner.',
        marketBias: 'Bullish continuation',
        sqisBreakdown: [
            { label: 'Trend', score: 94, value: 'Strong impulse' },
            { label: 'Liquidity', score: 96, value: 'Top of book depth' },
            { label: 'Execution', score: 90, value: 'Low slippage' },
            { label: 'Risk', score: 88, value: 'Contained' },
            { label: 'Committee', score: 93, value: 'Approved' },
        ],
        committeeVotes: [
            {
                agent: 'Market Scanner AI',
                vote: 'Approve',
                confidence: 98,
                reason: 'Spread confirmed across fresh market depth.',
                riskFlags: ['None'],
            },
            {
                agent: 'Risk Officer AI',
                vote: 'Approve',
                confidence: 95,
                reason: 'Exposure remains within the intra-day budget.',
                riskFlags: ['Low spread risk'],
            },
            {
                agent: 'Liquidity Analyst AI',
                vote: 'Approve',
                confidence: 96,
                reason: 'Order book can absorb the proposed size cleanly.',
                riskFlags: ['None'],
            },
            {
                agent: 'Execution Manager AI',
                vote: 'Conditional',
                confidence: 91,
                reason: 'Use a smaller first clip and scale only if price holds.',
                riskFlags: ['Partial fill risk'],
            },
            {
                agent: 'Portfolio Manager AI',
                vote: 'Approve',
                confidence: 94,
                reason: 'Adds diversification without increasing correlated exposure.',
                riskFlags: ['Low concentration'],
            },
            {
                agent: 'Compliance & Safety AI',
                vote: 'Approve',
                confidence: 97,
                reason: 'All checks passed for desk policy.',
                riskFlags: ['None'],
            },
        ],
        replayTimeline: [
            {
                label: 'Scanner hit',
                time: '09:12',
                price: '$141.20',
                action: 'Detected',
                note: 'Momentum began to compress above support.',
            },
            {
                label: 'Committee review',
                time: '09:15',
                price: '$142.40',
                action: 'Approved',
                note: 'All six agents voted with high confidence.',
            },
            {
                label: 'Entry window',
                time: '09:18',
                price: '$143.62',
                action: 'Ready',
                note: 'Best execution window is the next few seconds.',
            },
            {
                label: 'Replay marker',
                time: 'Now',
                price: '$144.30',
                action: 'Replay',
                note: 'This will later use the true replay engine.',
            },
        ],
    },
    {
        id: 'btc-usdt-pullback',
        symbol: 'BTC',
        pair: 'BTC/USDT',
        side: 'long',
        status: 'watch',
        strategy: 'Trend pullback',
        timeframe: '1H',
        buyExchange: 'OKX',
        sellExchange: 'Binance',
        sqis: 88,
        sqisBand: 'High',
        confidence: 89,
        expectedProfit: '$32.18',
        expectedProfitPct: '0.35%',
        riskReward: '1:1.9',
        spread: '0.48',
        liquidity: 'High',
        risk: 'Low',
        entry: '$64,210',
        target: '$64,980',
        stop: '$63,770',
        fee: '0.03%',
        executionWindow: '3m',
        tags: ['Trend', 'Macro', 'Low Vol'],
        updatedAt: '2 min ago',
        thesis: 'Price is still respecting the pullback structure after a clean impulse leg.',
        replayNote: 'Good candidate if the next candle confirms.',
        marketBias: 'Bullish trend',
        sqisBreakdown: [
            { label: 'Trend', score: 91, value: 'Above 20 EMA' },
            { label: 'Liquidity', score: 88, value: 'Sufficient' },
            { label: 'Execution', score: 85, value: 'Acceptable' },
            { label: 'Risk', score: 87, value: 'Contained' },
            { label: 'Committee', score: 86, value: 'Conditional' },
        ],
        committeeVotes: [],
        replayTimeline: [],
    },
    {
        id: 'eth-usdt-continuation',
        symbol: 'ETH',
        pair: 'ETH/USDT',
        side: 'long',
        status: 'new',
        strategy: 'Continuation grind',
        timeframe: '4H',
        buyExchange: 'Bybit',
        sellExchange: 'OKX',
        sqis: 84,
        sqisBand: 'High',
        confidence: 87,
        expectedProfit: '$15.67',
        expectedProfitPct: '0.42%',
        riskReward: '1:2.1',
        spread: '0.52',
        liquidity: 'High',
        risk: 'Low',
        entry: '$3,412.00',
        target: '$3,455.00',
        stop: '$3,386.50',
        fee: '0.05%',
        executionWindow: '5m',
        tags: ['Continuation', 'High Liquidity'],
        updatedAt: '4 min ago',
        thesis: 'Momentum is holding above the anchored VWAP and volume is building.',
        replayNote: 'Good companion trade to the main SOL impulse.',
        marketBias: 'Bullish continuation',
        sqisBreakdown: [],
        committeeVotes: [],
        replayTimeline: [],
    },
    {
        id: 'arb-usdt-range',
        symbol: 'ARB',
        pair: 'ARB/USDT',
        side: 'short',
        status: 'queued',
        strategy: 'Range fade',
        timeframe: '15M',
        buyExchange: 'Gate.io',
        sellExchange: 'Binance',
        sqis: 78,
        sqisBand: 'Good',
        confidence: 79,
        expectedProfit: '$8.74',
        expectedProfitPct: '0.61%',
        riskReward: '1:1.6',
        spread: '0.21',
        liquidity: 'Medium',
        risk: 'Medium',
        entry: '$1.48',
        target: '$1.44',
        stop: '$1.50',
        fee: '0.06%',
        executionWindow: '1m',
        tags: ['Mean reversion'],
        updatedAt: '7 min ago',
        thesis: 'The range is getting stretched and mean reversion is improving.',
        replayNote: 'Useful for testing the paper queue later.',
        marketBias: 'Neutral to bearish',
        sqisBreakdown: [],
        committeeVotes: [],
        replayTimeline: [],
    },
    {
        id: 'avax-usdt-momentum',
        symbol: 'AVAX',
        pair: 'AVAX/USDT',
        side: 'long',
        status: 'watch',
        strategy: 'Momentum breakout',
        timeframe: '1H',
        buyExchange: 'OKX',
        sellExchange: 'KuCoin',
        sqis: 79,
        sqisBand: 'Good',
        confidence: 82,
        expectedProfit: '$7.19',
        expectedProfitPct: '0.40%',
        riskReward: '1:1.8',
        spread: '0.26',
        liquidity: 'Medium',
        risk: 'Medium',
        entry: '$36.10',
        target: '$36.82',
        stop: '$35.84',
        fee: '0.05%',
        executionWindow: '2m',
        tags: ['Momentum', 'Early move'],
        updatedAt: '8 min ago',
        thesis: 'Early momentum is present but the book is thinner than ideal.',
        replayNote: 'Worth watching if the desk wants more volume.',
        marketBias: 'Bullish',
        sqisBreakdown: [],
        committeeVotes: [],
        replayTimeline: [],
    },
];

export const executionQueue: ExecutionQueueItem[] = [
    {
        id: 'queue-1',
        pair: 'SOL/USDT',
        status: 'Queued',
        buyExchange: 'Binance',
        sellExchange: 'Bybit',
        estProfit: '$18.42',
        reason: 'High SQIS and tight spread',
    },
    {
        id: 'queue-2',
        pair: 'BTC/USDT',
        status: 'Running',
        buyExchange: 'OKX',
        sellExchange: 'Binance',
        estProfit: '$32.18',
        reason: 'Awaiting next confirmation candle',
    },
    {
        id: 'queue-3',
        pair: 'ARB/USDT',
        status: 'Paused',
        buyExchange: 'Gate.io',
        sellExchange: 'Binance',
        estProfit: '$8.74',
        reason: 'Liquidity cooled during the last cycle',
    },
];

export const opportunityDetail: Opportunity = scannerOpportunities[0];

export const aiStats: StatCard[] = [
    {
        label: 'Model uptime',
        value: '99.7%',
        change: '+0.3%',
        trend: 'up',
        note: 'Signal orchestration remained healthy this week.',
    },
    {
        label: 'Prompt versions',
        value: '14',
        change: '+2 staged',
        trend: 'up',
        note: 'Versioned prompts are ready for review and release.',
    },
    {
        label: 'Signals routed',
        value: '1,284',
        change: '+84 today',
        trend: 'up',
        note: 'Opportunity routing feeds the dashboard and scanner.',
    },
];

export const aiModules: AiModule[] = [
    {
        title: 'Signal router',
        description: 'Ranks opportunities by model confidence, liquidity, and context.',
        status: 'Running',
        score: '94%',
        focus: 'Routing',
    },
    {
        title: 'Prompt lab',
        description: 'Version controls prompts used by the analysis assistant.',
        status: 'Drafting',
        score: '81%',
        focus: 'Research',
    },
    {
        title: 'Narrative engine',
        description: 'Summarizes market shifts into concise execution notes.',
        status: 'Healthy',
        score: '88%',
        focus: 'Reporting',
    },
];

export const aiCommitteeFeed: CommitteeAgentVote[] = opportunityDetail.committeeVotes;

export const riskMetrics: RiskMetric[] = [
    {
        label: 'Daily loss limit',
        value: '1.8%',
        severity: 'medium',
        detail: 'Current exposure remains comfortably below the cap.',
        limit: '2.0%',
    },
    {
        label: 'Open leverage',
        value: '1.2x',
        severity: 'low',
        detail: 'Conservative leverage is keeping volatility in check.',
        limit: '1.5x',
    },
    {
        label: 'Correlation heat',
        value: 'Moderate',
        severity: 'medium',
        detail: 'Portfolio clusters are diversified but still slightly concentrated.',
        limit: 'Low',
    },
    {
        label: 'Tail risk buffer',
        value: 'Strong',
        severity: 'low',
        detail: 'Stress tests show sufficient room under current position sizing.',
        limit: 'Strong',
    },
];

export const riskSnapshotStats: StatCard[] = [
    {
        label: 'Exposure cap',
        value: '1.8%',
        change: 'Near target',
        trend: 'flat',
        note: 'Exposure remains under the configured ceiling.',
    },
    {
        label: 'Portfolio VAR',
        value: '$4.2k',
        change: '-12%',
        trend: 'down',
        note: 'Scenario testing shows lower downside pressure.',
    },
    {
        label: 'Correlation load',
        value: 'Medium',
        change: 'Balanced',
        trend: 'flat',
        note: 'Position clustering is acceptable for the demo shell.',
    },
    {
        label: 'Open risk units',
        value: '6',
        change: 'Stable',
        trend: 'up',
        note: 'Only a small amount of risk budget is being used.',
    },
];

export const riskLimits: RiskLimit[] = [
    {
        label: 'Max per-trade risk',
        current: '0.40%',
        threshold: '0.50%',
        severity: 'low',
        note: 'The desk is sizing conservatively.',
    },
    {
        label: 'Max daily loss',
        current: '1.8%',
        threshold: '2.0%',
        severity: 'medium',
        note: 'One more hit and the guardrail will tighten.',
    },
    {
        label: 'Open correlation',
        current: 'Moderate',
        threshold: 'Low',
        severity: 'medium',
        note: 'The next release will include correlation clustering.',
    },
    {
        label: 'Circuit breaker',
        current: 'Armed',
        threshold: 'Triggered > 2.2%',
        severity: 'low',
        note: 'Auto suspend remains a future live-trading safeguard.',
    },
];

export const riskReports: RiskReportItem[] = [
    {
        label: 'Spread',
        value: '0.68',
        status: 'Low',
        detail: 'The spread is tight enough to support execution.',
    },
    {
        label: 'Slippage',
        value: '0.04%',
        status: 'Low',
        detail: 'Projected slippage stays minimal on the selected size.',
    },
    {
        label: 'Correlation',
        value: 'Managed',
        status: 'Medium',
        detail: 'Portfolio overlap remains controlled but visible.',
    },
    {
        label: 'Exposure',
        value: 'Contained',
        status: 'Low',
        detail: 'The risk budget still has room for more signals.',
    },
];

export const exchangeConnections: ExchangeConnection[] = [
    {
        id: 'binance',
        name: 'Binance',
        venue: 'Spot',
        type: 'spot',
        status: 'connected',
        region: 'Global',
        latency: '22 ms',
        latencyMs: 22,
        markets: 412,
        feeTier: 'VIP 2',
        apiHealth: 98,
        balance: '$82,430',
        note: 'Best execution for large spot pairs.',
    },
    {
        id: 'bybit',
        name: 'Bybit',
        venue: 'Perpetuals',
        type: 'perpetuals',
        status: 'connected',
        region: 'Asia',
        latency: '31 ms',
        latencyMs: 31,
        markets: 188,
        feeTier: 'Tier 1',
        apiHealth: 96,
        balance: '$45,210',
        note: 'Healthy order flow for leveraged pairs.',
    },
    {
        id: 'okx',
        name: 'OKX',
        venue: 'Spot + Perps',
        type: 'cex',
        status: 'limited',
        region: 'Global',
        latency: '38 ms',
        latencyMs: 38,
        markets: 224,
        feeTier: 'Tier 2',
        apiHealth: 84,
        balance: '$61,800',
        note: 'Limited mode while keys are being rotated.',
    },
    {
        id: 'paper',
        name: 'Paper Environment',
        venue: 'Simulation',
        type: 'wallet',
        status: 'connected',
        region: 'Local',
        latency: '4 ms',
        latencyMs: 4,
        markets: 27,
        feeTier: 'Demo',
        apiHealth: 100,
        balance: '$50,000',
        note: 'Isolated from live execution.',
    },
];

export const walletBalances: WalletBalance[] = [
    {
        id: 'wallet-usdt',
        asset: 'USDT',
        chain: 'TRC-20',
        available: '48,200',
        locked: '0',
        valueUsd: '$48,200',
        status: 'healthy',
    },
    {
        id: 'wallet-btc',
        asset: 'BTC',
        chain: 'BTC',
        available: '1.84',
        locked: '0.02',
        valueUsd: '$118,200',
        status: 'healthy',
    },
    {
        id: 'wallet-eth',
        asset: 'ETH',
        chain: 'ERC-20',
        available: '22.60',
        locked: '0.00',
        valueUsd: '$76,880',
        status: 'watch',
    },
    {
        id: 'wallet-sol',
        asset: 'SOL',
        chain: 'SPL',
        available: '314.00',
        locked: '0.00',
        valueUsd: '$58,300',
        status: 'healthy',
    },
];

export const portfolioHoldings: Holding[] = [
    {
        name: 'Bitcoin',
        symbol: 'BTC',
        allocation: 34,
        quantity: '1.84',
        avgCost: '$58,900',
        marketValue: '$118,200',
        pnl: '+18.2%',
        trend: 'up',
    },
    {
        name: 'Ethereum',
        symbol: 'ETH',
        allocation: 27,
        quantity: '22.6',
        avgCost: '$2,980',
        marketValue: '$76,880',
        pnl: '+14.5%',
        trend: 'up',
    },
    {
        name: 'Solana',
        symbol: 'SOL',
        allocation: 17,
        quantity: '314.0',
        avgCost: '$162.00',
        marketValue: '$58,300',
        pnl: '+9.1%',
        trend: 'up',
    },
    {
        name: 'Cash reserve',
        symbol: 'USDT',
        allocation: 22,
        quantity: '48,200',
        avgCost: '$1.00',
        marketValue: '$48,200',
        pnl: '0.0%',
        trend: 'flat',
    },
];

export const portfolioStats: StatCard[] = [
    {
        label: 'Net liquidation',
        value: '$301,580',
        change: '+3.6% month-over-month',
        trend: 'up',
        note: 'Placeholder for the eventual live account view.',
    },
    {
        label: 'Cash reserve',
        value: '$48,200',
        change: '22% of equity',
        trend: 'flat',
        note: 'Capital remains available for new setups.',
    },
    {
        label: 'Open exposure',
        value: '78%',
        change: 'Within guardrail',
        trend: 'flat',
        note: 'Position sizing still leaves room for deployment.',
    },
    {
        label: 'Unrealized PnL',
        value: '+$42,180',
        change: '+8.4%',
        trend: 'up',
        note: 'Performance is skewed by BTC and ETH strength.',
    },
];

export const portfolioAllocationSeries: AllocationSlice[] = dashboardCapitalAllocation;

export const paperTrades: PaperTrade[] = [
    {
        id: 'paper-1',
        symbol: 'ETH/USDT',
        side: 'long',
        status: 'open',
        openedAt: 'Today, 09:20',
        entry: '$3,398',
        exit: 'Pending',
        pnl: '+1.8%',
        strategy: 'Breakout continuation',
        exchange: 'Bybit',
        size: '$8,000',
        confidence: 91,
        note: 'Scaled in using a two-step entry.',
    },
    {
        id: 'paper-2',
        symbol: 'BTC/USDT',
        side: 'long',
        status: 'closed',
        openedAt: 'Yesterday, 15:05',
        entry: '$64,010',
        exit: '$64,910',
        pnl: '+1.4%',
        strategy: 'Trend pullback',
        exchange: 'Binance',
        size: '$12,500',
        confidence: 88,
        note: 'Exited at the predefined target.',
    },
    {
        id: 'paper-3',
        symbol: 'SOL/USDT',
        side: 'short',
        status: 'queued',
        openedAt: 'Pending approval',
        entry: '$189.40',
        exit: 'Awaiting trigger',
        pnl: '0.0%',
        strategy: 'Range compression',
        exchange: 'OKX',
        size: '$5,000',
        confidence: 79,
        note: 'Waiting for the next momentum break.',
    },
    {
        id: 'paper-4',
        symbol: 'ARB/USDT',
        side: 'short',
        status: 'draft',
        openedAt: 'Draft only',
        entry: '$1.48',
        exit: 'N/A',
        pnl: '0.0%',
        strategy: 'Range fade',
        exchange: 'Gate.io',
        size: '$2,500',
        confidence: 72,
        note: 'Model is still validating the setup.',
    },
];

export const paperTradeStats: StatCard[] = [
    {
        label: 'Open trades',
        value: '5',
        change: '+2 today',
        trend: 'up',
        note: 'Simulation lane is actively cycling through ideas.',
    },
    {
        label: 'Closed trades',
        value: '42',
        change: '+11 this month',
        trend: 'up',
        note: 'Trade review notes will land here later.',
    },
    {
        label: 'Demo win rate',
        value: '61%',
        change: '+2.1%',
        trend: 'up',
        note: 'Still only placeholder paper statistics.',
    },
    {
        label: 'Avg slippage',
        value: '0.08%',
        change: 'Flat',
        trend: 'flat',
        note: 'Execution samples remain tightly controlled.',
    },
];

export const analyticsStats: StatCard[] = [
    {
        label: 'Sharpe ratio',
        value: '2.41',
        change: '+0.18',
        trend: 'up',
        note: 'Strategy stack improved after reweighting.',
    },
    {
        label: 'Max drawdown',
        value: '6.2%',
        change: '-1.4%',
        trend: 'down',
        note: 'Reduced through tighter stop logic.',
    },
    {
        label: 'Average hold',
        value: '9.4h',
        change: '-1.1h',
        trend: 'down',
        note: 'Shorter holding time on momentum setups.',
    },
    {
        label: 'Win rate',
        value: '63%',
        change: '+2%',
        trend: 'up',
        note: 'Rolling sample across the last 90 trades.',
    },
];

export const profitTrendSeries: ChartPoint[] = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 18 },
    { label: 'Wed', value: 16 },
    { label: 'Thu', value: 24 },
    { label: 'Fri', value: 21 },
    { label: 'Sat', value: 27 },
    { label: 'Sun', value: 25 },
];

export const analyticsSeries: ChartPoint[] = profitTrendSeries;

export const settingsSections: NavigationItem[] = [
    {
        label: 'Workspace profile',
        to: '/settings',
        description: 'Branding, base currency, and locale defaults.',
    },
    {
        label: 'Alerting',
        to: '/settings',
        description: 'Delivery channels for scanner and risk notifications.',
    },
    {
        label: 'Execution defaults',
        to: '/settings',
        description: 'Order behavior, slippage guard, and size caps.',
    },
    {
        label: 'Automation guardrails',
        to: '/settings',
        description: 'Future auto trading settings and safety limits.',
    },
];

export const settingsTabs = ['Workspace', 'Trading', 'Risk', 'Notifications', 'Billing'];

export const autoTradingControls: TradingPlanCard[] = [
    {
        title: 'Auto trading',
        description: 'Keep disabled until the execution layer and approvals are wired.',
        status: 'Disabled',
        note: 'Future live automation control surface.',
    },
    {
        title: 'Risk guard',
        description: 'Hard stops for max loss, leverage, and correlated exposure.',
        status: 'Active',
        note: 'Guardrails are ready for later connection.',
    },
    {
        title: 'Emergency pause',
        description: 'Manual and automated pause signals for risky sessions.',
        status: 'Armed',
        note: 'Compliance and safety will later hook here.',
    },
];

export const strategyMarketplace: TradingPlanCard[] = [
    {
        title: 'Momentum Continuation',
        description: 'Designed for trend expansion and breakout confirmation.',
        status: 'Verified',
        note: 'Ready to be backtested later.',
    },
    {
        title: 'Liquidity Sweep Fade',
        description: 'Looks for liquidity grabs and quick mean-reversion entries.',
        status: 'Research',
        note: 'Ideal for the strategy marketplace shell.',
    },
    {
        title: 'Opening Range Expansion',
        description: 'Targets early session volatility with strict controls.',
        status: 'Community',
        note: 'Marketplace listing placeholder.',
    },
];
