<template>
    <AppCard class="space-y-4">
        <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Market Pulse Context</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Current market health and momentum</h3>
            </div>
            <StatusPill :label="pulse.currentHealth" :tone="healthTone" />
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <apexchart type="area" height="96" :options="chartOptions" :series="chartSeries" />
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
            <div v-for="metric in metrics" :key="metric.label" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">{{ metric.label }}</p>
                <p class="mt-2 font-mono text-lg font-semibold text-white">{{ metric.value }}</p>
                <p class="mt-1 text-xs leading-5 text-slate-400">{{ metric.detail }}</p>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ApexOptions } from 'apexcharts';

import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { OpportunityMarketPulse } from '@/types';
import type { DashboardTone } from '@/types';

const props = defineProps<{
    pulse: OpportunityMarketPulse;
}>();

const chartSeries = computed(() => [
    {
        name: 'Market SQIS',
        data: [88, 89, 90, 91, 92, 91, 93, 92, 94],
    },
]);

const chartOptions = computed<ApexOptions>(() => ({
    chart: {
        type: 'area',
        background: 'transparent',
        toolbar: { show: false },
        sparkline: { enabled: true },
        animations: {
            enabled: true,
            speed: 650,
        },
    },
    colors: ['#2dd4bf'],
    stroke: {
        curve: 'smooth',
        width: 3,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.22,
            opacityFrom: 0.4,
            opacityTo: 0.03,
            stops: [0, 100],
        },
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        theme: 'dark',
    },
}));

const healthTone = computed<DashboardTone>(() => {
    const normalized = props.pulse.currentHealth.toLowerCase();

    if (normalized.includes('good') || normalized.includes('stable')) {
        return 'emerald';
    }

    if (normalized.includes('watch')) {
        return 'amber';
    }

    if (normalized.includes('poor') || normalized.includes('risk')) {
        return 'rose';
    }

    return 'teal';
});

const metrics = computed(() => [
    { label: 'Market Trend', value: props.pulse.marketRegime, detail: 'Directional bias observed across the current scan window.' },
    { label: 'Market Volatility', value: props.pulse.marketVolatility, detail: 'Current range conditions remain manageable.' },
    { label: 'Top Coin', value: props.pulse.topCoin, detail: 'Most active symbol in the current scan.' },
    { label: 'Avg Opportunity Duration', value: props.pulse.averageOpportunityDuration, detail: 'Median lifespan of recent routes.' },
    { label: 'Average Market SQIS', value: String(props.pulse.averageMarketSqis), detail: 'Desk-wide quality score across the market snapshot.' },
]);
</script>
