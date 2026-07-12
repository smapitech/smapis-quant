import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import {
    scannerAlerts,
    scannerCommitteeVotes,
    scannerDefaultFilters,
    scannerEmptyState,
    scannerHeatmapItems,
    scannerMarketOverview,
    scannerOpportunityRows,
    scannerPresets,
    scannerPreviewSummary,
    scannerPrimaryFilters,
    scannerQueueItems,
    scannerRiskChecks,
    scannerReplaySteps,
    scannerSecondaryFilters,
    scannerSummaryMetrics,
} from '@/data/scannerData';
import type { ScannerFilterState, ScannerOpportunityRow, ScannerPreset } from '@/types';

type FilterValue = string | boolean;
type ScannerFilterKey = keyof ScannerFilterState;

const allTokens = new Set(['All', 'All Exchanges', 'All Coins', 'All Networks', 'All Pairs']);
const storageKey = 'smapis.quant.scanner.filters';

function isAll(value: string) {
    return allTokens.has(value);
}

function parseNumber(value: string) {
    const parsed = Number.parseFloat(String(value).replace(/[^0-9.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function matchText(haystack: string, needle: string) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}

function readPersistedState() {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const raw = window.localStorage.getItem(storageKey);
        return raw ? (JSON.parse(raw) as Partial<{ activePresetId: string; searchQuery: string; filters: ScannerFilterState }>) : null;
    } catch {
        return null;
    }
}

function filterByRisk(row: ScannerOpportunityRow, filters: ScannerFilterState) {
    if (filters.hideHighRisk && (row.risk === 'High' || row.risk === 'Critical')) {
        return false;
    }

    if (filters.hideLowLiquidity && row.liquidity === 'Low') {
        return false;
    }

    return true;
}

export const useScannerStore = defineStore('scanner', () => {
    const persistedState = readPersistedState();

    const activePresetId = ref<ScannerPreset['id']>(persistedState?.activePresetId ?? 'balanced');
    const selectedOpportunityId = ref(scannerOpportunityRows[0]?.id ?? '');
    const searchQuery = ref(persistedState?.searchQuery ?? '');
    const loading = ref(false);
    const liveMode = ref(true);
    const mobileFiltersOpen = ref(false);
    const lastUpdatedAt = ref(new Date().toISOString());
    const opportunityRows = ref(scannerOpportunityRows.map((row) => ({ ...row })));
    const filters = ref<ScannerFilterState>({
        ...scannerDefaultFilters,
        ...(persistedState?.filters ?? {}),
    });

    const summaryCards = computed(() => scannerSummaryMetrics);
    const presets = computed(() => scannerPresets);
    const primaryFilters = computed(() => scannerPrimaryFilters);
    const secondaryFilters = computed(() => scannerSecondaryFilters);
    const marketOverview = computed(() => scannerMarketOverview);
    const heatmap = computed(() => scannerHeatmapItems);
    const alerts = computed(() => scannerAlerts);
    const queueItems = computed(() => scannerQueueItems);
    const committeeVotes = computed(() => scannerCommitteeVotes);
    const riskChecks = computed(() => scannerRiskChecks);
    const replaySteps = computed(() => scannerReplaySteps);
    const previewSummary = computed(() => scannerPreviewSummary);
    const emptyState = computed(() => scannerEmptyState);

    const activePreset = computed(() => presets.value.find((preset) => preset.id === activePresetId.value) ?? presets.value[1]);

    const visibleOpportunities = computed(() => {
        const query = searchQuery.value.trim();

        const filtered = opportunityRows.value.filter((row) => {
            if (!filterByRisk(row, filters.value)) {
                return false;
            }

            if (query && ![row.pair, row.symbol, row.buyExchange, row.sellExchange, row.network].some((text) => matchText(text, query))) {
                return false;
            }

            if (filters.value.favoriteOnly && !row.favorite) {
                return false;
            }

            if (!isAll(filters.value.exchange) && !(row.buyExchange === filters.value.exchange || row.sellExchange === filters.value.exchange)) {
                return false;
            }

            if (!isAll(filters.value.buyExchange) && row.buyExchange !== filters.value.buyExchange) {
                return false;
            }

            if (!isAll(filters.value.sellExchange) && row.sellExchange !== filters.value.sellExchange) {
                return false;
            }

            if (!isAll(filters.value.coin) && row.symbol !== filters.value.coin) {
                return false;
            }

            if (!isAll(filters.value.pair) && !matchText(row.pair, filters.value.pair)) {
                return false;
            }

            if (!isAll(filters.value.network) && row.network !== filters.value.network) {
                return false;
            }

            const minSpread = parseNumber(filters.value.minimumSpread);
            const maxSpread = parseNumber(filters.value.maximumSpread);
            const minProfit = parseNumber(filters.value.minimumNetProfit);
            const minSqis = parseNumber(filters.value.sqis);
            const minConfidence = parseNumber(filters.value.aiConfidence);

            if (!Number.isNaN(minSpread) && parseNumber(row.spreadPct) < minSpread) {
                return false;
            }

            if (!Number.isNaN(maxSpread) && parseNumber(row.spreadPct) > maxSpread) {
                return false;
            }

            if (!Number.isNaN(minProfit) && parseNumber(row.estimatedNetProfit) < minProfit) {
                return false;
            }

            if (!isAll(filters.value.liquidity) && row.liquidity !== filters.value.liquidity) {
                return false;
            }

            if (!isAll(filters.value.volatility) && row.volatility !== filters.value.volatility) {
                return false;
            }

            if (!isAll(filters.value.riskLevel) && row.risk !== filters.value.riskLevel) {
                return false;
            }

            if (!Number.isNaN(minSqis) && row.sqis < minSqis) {
                return false;
            }

            if (!Number.isNaN(minConfidence) && row.aiConfidence < minConfidence) {
                return false;
            }

            if (!isAll(filters.value.tradingVolume) && !matchText(row.tradingVolume, filters.value.tradingVolume)) {
                return false;
            }

            if (!isAll(filters.value.depositStatus) && row.depositStatus !== filters.value.depositStatus) {
                return false;
            }

            if (!isAll(filters.value.withdrawalStatus) && row.withdrawalStatus !== filters.value.withdrawalStatus) {
                return false;
            }

            if (!isAll(filters.value.executionTime) && !matchText(row.executionTime, filters.value.executionTime)) {
                return false;
            }

            return true;
        });

        return filtered.sort((a, b) => {
            if (a.live !== b.live) {
                return a.live ? -1 : 1;
            }

            return b.sqis - a.sqis;
        });
    });

    const selectedOpportunity = computed<ScannerOpportunityRow>(() => {
        return visibleOpportunities.value.find((row) => row.id === selectedOpportunityId.value) ?? visibleOpportunities.value[0] ?? opportunityRows.value[0];
    });

    const queueBuckets = computed(() => {
        return ['Queued Trades', 'Paper Trades', 'Completed', 'Cancelled', 'Failed'].map((bucket) => ({
            bucket,
            count: queueItems.value.filter((item) => item.bucket === bucket).length,
        }));
    });

    const selectedPreviewSummary = computed(() => ({
        ...previewSummary.value,
        pair: selectedOpportunity.value?.pair ?? previewSummary.value.pair,
        buyExchange: selectedOpportunity.value?.buyExchange ?? previewSummary.value.buyExchange,
        sellExchange: selectedOpportunity.value?.sellExchange ?? previewSummary.value.sellExchange,
        sqis: selectedOpportunity.value?.sqis ?? previewSummary.value.sqis,
        expectedProfit: selectedOpportunity.value?.estimatedNetProfit ?? previewSummary.value.expectedProfit,
        spread: selectedOpportunity.value?.spreadPct ?? previewSummary.value.spread,
        liquidity: selectedOpportunity.value?.liquidity ?? previewSummary.value.liquidity,
        risk: selectedOpportunity.value?.risk ?? previewSummary.value.risk,
    }));

    function updateFilter<K extends ScannerFilterKey>(key: K, value: FilterValue) {
        filters.value = {
            ...filters.value,
            [key]: value,
        };
    }

    function setFilters(nextFilters: ScannerFilterState) {
        filters.value = {
            ...nextFilters,
        };
    }

    function applyPreset(presetId: ScannerPreset['id']) {
        const preset = presets.value.find((item) => item.id === presetId) ?? presets.value[1];

        activePresetId.value = preset.id;
        filters.value = {
            ...scannerDefaultFilters,
            ...preset.filters,
        };
    }

    function resetFilters() {
        activePresetId.value = 'balanced';
        filters.value = { ...scannerDefaultFilters };
        searchQuery.value = '';
    }

    function selectOpportunity(opportunityId: string) {
        selectedOpportunityId.value = opportunityId;
    }

    function toggleFavorite(opportunityId: string) {
        const row = opportunityRows.value.find((item) => item.id === opportunityId);

        if (row) {
            row.favorite = !row.favorite;
        }
    }

    function setSearch(query: string) {
        searchQuery.value = query;
    }

    function toggleMobileFilters() {
        mobileFiltersOpen.value = !mobileFiltersOpen.value;
    }

    function setMobileFilters(open: boolean) {
        mobileFiltersOpen.value = open;
    }

    function saveCurrentFilters() {
        if (typeof window === 'undefined') {
            return;
        }

        try {
            window.localStorage.setItem(
                storageKey,
                JSON.stringify({
                    activePresetId: activePresetId.value,
                    searchQuery: searchQuery.value,
                    filters: filters.value,
                }),
            );
        } catch {
            // Ignore storage failures in restricted browser contexts.
        }
    }

    async function refreshSnapshot() {
        loading.value = true;

        // TODO: replace with WebSocket / API snapshot pull when the live scanner backend is available.
        await new Promise((resolve) => window.setTimeout(resolve, 450));

        lastUpdatedAt.value = new Date().toISOString();
        loading.value = false;
    }

    return {
        activePresetId,
        selectedOpportunityId,
        searchQuery,
        loading,
        liveMode,
        mobileFiltersOpen,
        lastUpdatedAt,
        filters,
        summaryCards,
        presets,
        primaryFilters,
        secondaryFilters,
        opportunities: opportunityRows,
        marketOverview,
        heatmap,
        alerts,
        queueItems,
        queueBuckets,
        committeeVotes,
        riskChecks,
        replaySteps,
        selectedPreviewSummary,
        emptyState,
        activePreset,
        visibleOpportunities,
        selectedOpportunity,
        updateFilter,
        setFilters,
        applyPreset,
        resetFilters,
        selectOpportunity,
        toggleFavorite,
        setSearch,
        toggleMobileFilters,
        setMobileFilters,
        saveCurrentFilters,
        refreshSnapshot,
    };
});
