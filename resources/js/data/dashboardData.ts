import type {
    ChartPoint,
    DashboardAllocationItem,
    DashboardDecisionFeedItem,
    DashboardEventItem,
    DashboardFooterLink,
    DashboardOpportunityRow,
    DashboardPerformanceMetric,
    DashboardQuickAction,
    DashboardRiskMetric,
    DashboardSummaryCard,
} from '@/types';

export const dashboardSummaryCards: DashboardSummaryCard[] = [
    {
        label: 'Total Capital',
        value: '$125,430.16',
        change: '+3.42% vs yesterday',
        note: 'Across active paper and approved live allocations.',
        tone: 'emerald',
        icon: 'CAP',
    },
    {
        label: "Today's Estimated Profit",
        value: '$1,248.75',
        change: '+12.61% vs yesterday',
        note: 'Net of fees, slippage, and desk-level safety rules.',
        tone: 'teal',
        icon: 'PRF',
    },
    {
        label: 'Open Opportunities',
        value: '23',
        change: '+5 vs yesterday',
        note: 'Filtered by liquidity, SQIS, and risk posture.',
        tone: 'amber',
        icon: 'OPP',
    },
    {
        label: 'Average SQIS',
        value: '85',
        change: 'High Quality',
        note: 'The average signal remains well above the watch zone.',
        tone: 'slate',
        icon: 'SQI',
    },
    {
        label: 'Risk Status',
        value: 'LOW RISK',
        change: 'All systems normal',
        note: 'Exposure and guardrails are comfortably within range.',
        tone: 'emerald',
        icon: 'RSK',
    },
    {
        label: 'Connected Exchanges',
        value: '6',
        change: 'Binance, Bybit, OKX, Gate.io, KuCoin, MEXC',
        note: 'All venues are tracked for health and latency.',
        tone: 'teal',
        icon: 'VEN',
        chips: [
            { name: 'Binance', tone: 'amber' },
            { name: 'Bybit', tone: 'slate' },
            { name: 'OKX', tone: 'emerald' },
            { name: 'Gate.io', tone: 'teal' },
            { name: 'KuCoin', tone: 'emerald' },
            { name: 'MEXC', tone: 'slate' },
        ],
    },
    {
        label: 'Paper Trading Balance',
        value: '$50,000.00',
        change: '+0.00%',
        note: 'Simulation capital is isolated from live execution.',
        tone: 'amber',
        icon: 'PPR',
    },
];

export const dashboardPortfolioSeries: ChartPoint[] = [
    { label: '00:00', value: 118 },
    { label: '02:00', value: 120 },
    { label: '04:00', value: 119 },
    { label: '06:00', value: 123 },
    { label: '08:00', value: 127 },
    { label: '10:00', value: 126 },
    { label: '12:00', value: 130 },
    { label: '14:00', value: 132 },
    { label: '16:00', value: 131 },
    { label: '18:00', value: 134 },
    { label: '20:00', value: 136 },
    { label: '22:00', value: 139 },
];

export const portfolioCapitalAllocation: DashboardAllocationItem[] = [
    { label: 'Spot', value: '62.3%', percentage: 62.3, tone: 'emerald' },
    { label: 'Stablecoin', value: '22.5%', percentage: 22.5, tone: 'teal' },
    { label: 'USDT', value: '10.1%', percentage: 10.1, tone: 'amber' },
    { label: 'Others', value: '5.1%', percentage: 5.1, tone: 'slate' },
];

export const portfolioPerformanceMetrics: DashboardPerformanceMetric[] = [
    { label: 'Total Trades', value: '18' },
    { label: 'Win Rate', value: '77.8%' },
    { label: 'Total Profit', value: '$1,248.75' },
    { label: 'Average Profit Per Trade', value: '$69.38' },
    { label: 'Best Trade', value: '$312.45' },
    { label: 'Worst Trade', value: '-$18.72' },
];

export const aiDecisionFeed: DashboardDecisionFeedItem[] = [
    {
        title: 'High-quality opportunity detected',
        text: 'SOL/USDT across Binance -> Bybit',
        badge: 'SQIS 92',
        badgeTone: 'emerald',
        time: '2m ago',
        tone: 'emerald',
        icon: 'SQ',
    },
    {
        title: 'Risk level increased',
        text: 'High volatility detected on BTC market',
        badge: 'Medium Risk',
        badgeTone: 'amber',
        time: '6m ago',
        tone: 'amber',
        icon: 'RK',
    },
    {
        title: 'AI Trade Committee approved',
        text: 'ETH/USDT opportunity',
        badge: 'EXECUTE',
        badgeTone: 'teal',
        time: '8m ago',
        tone: 'teal',
        icon: 'AI',
    },
    {
        title: 'Position size adjusted',
        text: 'Reduced position size for MATIC/USDT',
        badge: 'Strategy Rule',
        badgeTone: 'slate',
        time: '12m ago',
        tone: 'slate',
        icon: 'SZ',
    },
    {
        title: 'New exchange connected',
        text: 'OKX exchange successfully connected',
        time: '18m ago',
        tone: 'emerald',
        icon: 'EX',
    },
];

export const topOpportunities: DashboardOpportunityRow[] = [
    { pair: 'SOL/USDT', buyExchange: 'Binance', sellExchange: 'Bybit', estimatedProfit: '$18.42', sqis: 92, risk: 'Low', riskTone: 'emerald' },
    { pair: 'BTC/USDT', buyExchange: 'OKX', sellExchange: 'Binance', estimatedProfit: '$32.18', sqis: 88, risk: 'Low', riskTone: 'emerald' },
    { pair: 'ETH/USDT', buyExchange: 'Bybit', sellExchange: 'OKX', estimatedProfit: '$15.67', sqis: 85, risk: 'Low', riskTone: 'emerald' },
    { pair: 'ARB/USDT', buyExchange: 'Gate.io', sellExchange: 'Binance', estimatedProfit: '$8.74', sqis: 78, risk: 'Medium', riskTone: 'amber' },
    { pair: 'MATIC/USDT', buyExchange: 'KuCoin', sellExchange: 'OKX', estimatedProfit: '$6.21', sqis: 74, risk: 'Medium', riskTone: 'amber' },
];

export const sqisDistribution = [
    { label: '90-100 Excellent', value: '28%', percentage: 28, tone: 'emerald' as const },
    { label: '80-89 High Quality', value: '42%', percentage: 42, tone: 'teal' as const },
    { label: '70-79 Good', value: '18%', percentage: 18, tone: 'amber' as const },
    { label: '60-69 Average', value: '8%', percentage: 8, tone: 'slate' as const },
    { label: '<60 Low', value: '4%', percentage: 4, tone: 'rose' as const },
];

export const riskMetrics: DashboardRiskMetric[] = [
    { label: 'Volatility', value: 'Low', tone: 'emerald' },
    { label: 'Liquidity', value: 'High', tone: 'emerald' },
    { label: 'Exchange Risk', value: 'Low', tone: 'emerald' },
    { label: 'Network Status', value: 'Normal', tone: 'teal' },
    { label: 'API Stability', value: 'Stable', tone: 'emerald' },
];

export const portfolioPnlBars: ChartPoint[] = [
    { label: '00:00', value: 120 },
    { label: '01:00', value: 180 },
    { label: '02:00', value: -80 },
    { label: '03:00', value: 260 },
    { label: '04:00', value: 140 },
    { label: '05:00', value: 320 },
    { label: '06:00', value: -110 },
    { label: '07:00', value: 90 },
    { label: '08:00', value: 220 },
    { label: '09:00', value: 160 },
    { label: '10:00', value: -50 },
    { label: '11:00', value: 240 },
    { label: '12:00', value: 310 },
    { label: '13:00', value: -140 },
    { label: '14:00', value: 80 },
    { label: '15:00', value: 140 },
    { label: '16:00', value: 260 },
    { label: '17:00', value: -90 },
    { label: '18:00', value: 120 },
    { label: '19:00', value: 170 },
    { label: '20:00', value: 90 },
    { label: '21:00', value: 200 },
    { label: '22:00', value: 150 },
    { label: '23:00', value: 240 },
];

export const portfolioPnlLine: ChartPoint[] = [
    { label: '00:00', value: 20 },
    { label: '01:00', value: 120 },
    { label: '02:00', value: 60 },
    { label: '03:00', value: 260 },
    { label: '04:00', value: 320 },
    { label: '05:00', value: 540 },
    { label: '06:00', value: 430 },
    { label: '07:00', value: 500 },
    { label: '08:00', value: 710 },
    { label: '09:00', value: 840 },
    { label: '10:00', value: 790 },
    { label: '11:00', value: 1010 },
    { label: '12:00', value: 1260 },
    { label: '13:00', value: 1180 },
    { label: '14:00', value: 1240 },
    { label: '15:00', value: 1410 },
    { label: '16:00', value: 1650 },
    { label: '17:00', value: 1560 },
    { label: '18:00', value: 1730 },
    { label: '19:00', value: 1900 },
    { label: '20:00', value: 1980 },
    { label: '21:00', value: 2180 },
    { label: '22:00', value: 2140 },
    { label: '23:00', value: 2310 },
];

export const assetAllocation: DashboardAllocationItem[] = [
    { label: 'USDT', value: '45.2%', percentage: 45.2, tone: 'emerald' },
    { label: 'BTC', value: '25.3%', percentage: 25.3, tone: 'teal' },
    { label: 'ETH', value: '15.6%', percentage: 15.6, tone: 'amber' },
    { label: 'SOL', value: '6.8%', percentage: 6.8, tone: 'slate' },
    { label: 'Others', value: '7.1%', percentage: 7.1, tone: 'rose' },
];

export const quickActions: DashboardQuickAction[] = [
    { label: 'New Scanner', description: 'Spin up a fresh market scan.', to: '/scanner', tone: 'teal', icon: 'SC' },
    { label: 'AI Analysis', description: 'Review committee reasoning.', to: '/ai-center', tone: 'emerald', icon: 'AI' },
    { label: 'Paper Trade', description: 'Send ideas to simulation.', to: '/paper-trading', tone: 'amber', icon: 'PT' },
    { label: 'Add Exchange', description: 'Connect a new venue.', to: '/exchange-manager', tone: 'slate', icon: 'EX' },
    { label: 'Create Alert', description: 'Configure a new notification.', to: '/alerts', tone: 'teal', icon: 'AL' },
    { label: 'Deposit Funds', description: 'Review wallet and billing flows.', to: '/wallets', tone: 'emerald', icon: 'FD' },
];

export const upcomingEvents: DashboardEventItem[] = [
    { label: 'FOMC Meeting', countdown: '2d 5h', detail: 'Policy statement due soon', tone: 'amber' },
    { label: 'US Non-Farm Payrolls', countdown: '5d 8h', detail: 'Macro volatility watch', tone: 'teal' },
    { label: 'CPI Data Release', countdown: '12d 3h', detail: 'Inflation print pending', tone: 'rose' },
];

export const systemStatus = {
    label: 'All Systems Operational',
    latency: '42ms',
    uptime: '99.98%',
    tone: 'emerald' as const,
};

export const dashboardFooterLinks: DashboardFooterLink[] = [
    { label: 'Privacy Policy', href: '/privacy-policy', description: 'How data is handled in the workspace.' },
    { label: 'Terms of Service', href: '/terms-of-service', description: 'Platform and trading intelligence terms.' },
    { label: 'Help Center', href: '/help-center', description: 'Operational notes and support guidance.' },
    { label: 'Contact', href: 'mailto:support@smapisquant.ai', description: 'Reach the team for product questions.', external: true },
];

export const dashboardTimeFilters = ['1H', '24H', '7D', '30D', '90D', '1Y'];
export const dashboardPnlFilters = ['1H', '24H', '7D', '30D', '90D'];
