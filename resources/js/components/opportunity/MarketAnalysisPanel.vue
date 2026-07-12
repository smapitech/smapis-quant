<template>
    <AppCard class="space-y-5">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Market Analysis</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Spread, price, liquidity, and success history</h3>
            </div>
            <AppBadge tone="teal">Tabs ready</AppBadge>
        </div>

        <AppTabs v-model="activeTab" :tabs="tabs" />

        <div class="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_280px]">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{{ currentLabel }}</p>
                        <p class="mt-2 text-lg font-semibold text-white">{{ currentSubtitle }}</p>
                    </div>
                    <StatusPill label="Live mock" tone="emerald" />
                </div>
                <apexchart :type="chartType" height="290" :options="chartOptions" :series="chartSeries" />
            </div>

            <div class="space-y-3">
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Current reading</p>
                    <p class="mt-2 font-mono text-3xl font-semibold text-white">{{ currentValue }}</p>
                    <p class="mt-1 text-sm text-slate-400">{{ currentDetail }}</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Desk note</p>
                    <p class="mt-2 text-sm leading-6 text-slate-300">{{ currentNote }}</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Performance hint</p>
                    <p class="mt-2 text-sm leading-6 text-slate-300">
                        The chart stays intentionally quiet and institutional so the desk can read the move without casino noise.
                    </p>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ApexOptions } from 'apexcharts';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppTabs from '@/components/ui/AppTabs.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { OpportunityMarketAnalysisSeries, OpportunityMarketAnalysisTabItem } from '@/types';

const props = defineProps<{
    tabs: OpportunityMarketAnalysisTabItem[];
    series: OpportunityMarketAnalysisSeries;
}>();

type OpportunityMarketAnalysisTabValue = OpportunityMarketAnalysisTabItem['value'];
type OpportunityMarketAnalysisSeriesKey = keyof OpportunityMarketAnalysisSeries;

const activeTab = ref<OpportunityMarketAnalysisTabValue>('spread');

const tabSeriesKeyMap: Record<OpportunityMarketAnalysisTabValue, OpportunityMarketAnalysisSeriesKey> = {
    spread: 'spread',
    'price-history': 'priceHistory',
    'order-book': 'liquidity',
    liquidity: 'liquidity',
    'market-trend': 'marketTrend',
    funding: 'funding',
    'historical-success': 'historicalSuccess',
};

const tabMeta: Record<OpportunityMarketAnalysisTabValue, { label: string; subtitle: string; note: string; type: 'area' | 'bar' }> = {
    spread: {
        label: 'Spread Analysis',
        subtitle: '30 minute spread movement',
        note: 'Spread remains above the desk threshold and is still holding together.',
        type: 'area',
    },
    'price-history': {
        label: 'Price History',
        subtitle: '30 minute price action',
        note: 'Price is drifting in the right direction with no sudden break in structure.',
        type: 'area',
    },
    'order-book': {
        label: 'Order Book',
        subtitle: 'Depth proxy from the live scan',
        note: 'Order-book behaviour is stable enough for a reduced-size route.',
        type: 'bar',
    },
    liquidity: {
        label: 'Liquidity',
        subtitle: 'Liquidity trend across the scan window',
        note: 'Liquidity remains high enough to support the route without forcing size cuts.',
        type: 'area',
    },
    'market-trend': {
        label: 'Market Trend',
        subtitle: 'Directional momentum across the session',
        note: 'Trend strength is positive but still measured.',
        type: 'area',
    },
    funding: {
        label: 'Funding',
        subtitle: 'Funding pressure snapshot',
        note: 'Funding remains manageable and does not distort the trade setup.',
        type: 'area',
    },
    'historical-success': {
        label: 'Historical Success',
        subtitle: 'Rolling success rate for similar trades',
        note: 'The historical curve supports the committee’s current recommendation.',
        type: 'area',
    },
};

const currentMeta = computed(() => tabMeta[activeTab.value]);
const currentSeries = computed(() => props.series[tabSeriesKeyMap[activeTab.value]]);

const chartSeries = computed(() => [
    {
        name: currentMeta.value.label,
        data: currentSeries.value.map((point) => point.value),
    },
]);

const chartType = computed(() => currentMeta.value.type);
const chartOptions = computed<ApexOptions>(() => ({
    chart: {
        type: currentMeta.value.type,
        background: 'transparent',
        toolbar: { show: false },
        animations: {
            enabled: true,
            speed: 650,
        },
    },
    colors: [currentMeta.value.type === 'bar' ? '#f59e0b' : '#2dd4bf'],
    stroke: {
        curve: 'smooth',
        width: 3,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.25,
            opacityFrom: 0.35,
            opacityTo: 0.04,
            stops: [0, 100],
        },
    },
    grid: {
        borderColor: 'rgba(255,255,255,0.06)',
    },
    xaxis: {
        categories: currentSeries.value.map((point) => point.label),
        labels: {
            style: {
                colors: '#94a3b8',
            },
        },
        axisBorder: { color: 'rgba(255,255,255,0.06)' },
        axisTicks: { color: 'rgba(255,255,255,0.06)' },
    },
    yaxis: {
        labels: {
            style: {
                colors: '#94a3b8',
            },
            formatter: (value) => Number(value).toFixed(activeTab.value === 'funding' ? 3 : 0),
        },
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        theme: 'dark',
        y: {
            formatter: (value) => (activeTab.value === 'funding' ? Number(value).toFixed(3) : Number(value).toFixed(2)),
        },
    },
}));

const currentLabel = computed(() => currentMeta.value.label);
const currentSubtitle = computed(() => currentMeta.value.subtitle);
const currentValue = computed(() => {
    const last = currentSeries.value[currentSeries.value.length - 1];
    return last ? formatValue(last.value, activeTab.value) : 'n/a';
});
const currentDetail = computed(() => {
    const first = currentSeries.value[0];
    const last = currentSeries.value[currentSeries.value.length - 1];
    if (!first || !last) {
        return '';
    }

    return `From ${formatValue(first.value, activeTab.value)} to ${formatValue(last.value, activeTab.value)} across the selected window.`;
});
const currentNote = computed(() => currentMeta.value.note);

function formatValue(value: number, key: OpportunityMarketAnalysisTabValue) {
    if (key === 'spread' || key === 'funding') {
        return key === 'funding' ? value.toFixed(3) : `${value.toFixed(2)}%`;
    }

    if (key === 'price-history') {
        return `$${value.toFixed(2)}`;
    }

    if (key === 'historical-success' || key === 'liquidity' || key === 'market-trend' || key === 'order-book') {
        return `${Math.round(value)}`;
    }

    return `${value}`;
}
</script>
