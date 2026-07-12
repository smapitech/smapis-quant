import { computed } from 'vue';
import { defineStore } from 'pinia';

import {
    dashboardCapitalAllocation,
    dashboardDecisionFeed,
    dashboardPortfolioSeries,
    dashboardStats,
    exchangeConnections,
    paperTrades,
    portfolioHoldings,
    portfolioStats,
    scannerSummaryStats,
    walletBalances,
} from '@/data/mockData';

interface MarketState {
    dashboardCards: typeof dashboardStats;
    scannerCards: typeof scannerSummaryStats;
    decisionFeed: typeof dashboardDecisionFeed;
    portfolioSeries: typeof dashboardPortfolioSeries;
    capitalAllocation: typeof dashboardCapitalAllocation;
    exchangeConnections: typeof exchangeConnections;
    walletBalances: typeof walletBalances;
    paperTrades: typeof paperTrades;
    portfolioHoldings: typeof portfolioHoldings;
    portfolioStats: typeof portfolioStats;
    paperTradingBalance: string;
    liveTradingStatus: 'Standby' | 'Armed' | 'Paused';
}

export const useMarketStore = defineStore('market', () => {
    const state = computed<MarketState>(() => ({
        dashboardCards: dashboardStats,
        scannerCards: scannerSummaryStats,
        decisionFeed: dashboardDecisionFeed,
        portfolioSeries: dashboardPortfolioSeries,
        capitalAllocation: dashboardCapitalAllocation,
        exchangeConnections,
        walletBalances,
        paperTrades,
        portfolioHoldings,
        portfolioStats,
        paperTradingBalance: '$50,000.00',
        liveTradingStatus: 'Standby',
    }));

    const connectedExchanges = computed(() => state.value.exchangeConnections.filter((exchange) => exchange.status !== 'offline').length);
    const highQualitySignals = computed(() => state.value.decisionFeed.filter((item) => item.sqis >= 80).length);
    const portfolioValue = computed(() => portfolioStats[0].value);

    function refreshMarketPulse() {
        // TODO: replace with live Laravel/API payloads.
        return state.value;
    }

    return {
        state,
        connectedExchanges,
        highQualitySignals,
        portfolioValue,
        refreshMarketPulse,
    };
});
