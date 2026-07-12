<template>
    <AppCard class="space-y-5">
        <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Digital Twin Simulation</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Monte Carlo execution rehearsal</h3>
                <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                    Run {{ simulation.runs.toLocaleString() }} simulated executions to model expected performance before any live capital is committed.
                </p>
            </div>
            <AppBadge tone="teal">Mock Engine</AppBadge>
        </div>

        <div class="grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-center">
            <div class="relative mx-auto h-44 w-44">
                <apexchart type="radialBar" height="176" :options="chartOptions" :series="chartSeries" />
                <div class="pointer-events-none absolute inset-0 grid place-items-center text-center">
                    <div>
                        <p class="text-4xl font-semibold text-white">{{ probabilityLabel }}</p>
                        <p class="mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-500">Success Probability</p>
                    </div>
                </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
                <div v-for="metric in metrics" :key="metric.label" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">{{ metric.label }}</p>
                    <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ metric.value }}</p>
                    <p class="mt-1 text-xs leading-5 text-slate-400">{{ metric.detail }}</p>
                </div>
            </div>
        </div>

        <div class="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.08] p-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-200/80">Recommendation</p>
                    <p class="mt-2 text-lg font-semibold text-emerald-100">{{ simulation.recommendation }}</p>
                </div>
                <StatusPill :label="probabilityToneLabel" :tone="probabilityTone" />
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ApexOptions } from 'apexcharts';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { OpportunityDigitalTwinSimulation } from '@/types';
import type { DashboardTone } from '@/types';

const props = defineProps<{
    simulation: OpportunityDigitalTwinSimulation;
}>();

const probabilityLabel = computed(() => props.simulation.successProbability);
const probabilityNumber = computed(() => Number.parseFloat(props.simulation.successProbability.replace('%', '')) || 0);

const chartSeries = computed(() => [probabilityNumber.value]);

const chartOptions = computed<ApexOptions>(() => ({
    chart: {
        type: 'radialBar',
        background: 'transparent',
        sparkline: { enabled: true },
        animations: {
            enabled: true,
            speed: 700,
        },
    },
    colors: ['#34d399'],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: '72%',
            },
            track: {
                background: 'rgba(255,255,255,0.07)',
                strokeWidth: '100%',
            },
            dataLabels: {
                show: false,
            },
        },
    },
    stroke: {
        lineCap: 'round',
    },
    tooltip: {
        theme: 'dark',
    },
}));

const metrics = computed(() => [
    {
        label: 'Success Probability',
        value: props.simulation.successProbability,
        detail: 'Percent of simulated executions that remain profitable.',
    },
    {
        label: 'Average Profit',
        value: props.simulation.averageProfit,
        detail: 'Mean output across the full simulation run.',
    },
    {
        label: 'Worst Case',
        value: props.simulation.worstCase,
        detail: 'Stress scenario if spread narrows during execution.',
    },
    {
        label: 'Best Case',
        value: props.simulation.bestCase,
        detail: 'Upside if both legs fill inside the optimal window.',
    },
]);

const probabilityTone = computed<DashboardTone>(() => {
    if (probabilityNumber.value >= 95) {
        return 'emerald';
    }

    if (probabilityNumber.value >= 85) {
        return 'teal';
    }

    if (probabilityNumber.value >= 70) {
        return 'amber';
    }

    return 'rose';
});

const probabilityToneLabel = computed(() => {
    if (probabilityNumber.value >= 95) {
        return 'Excellent';
    }

    if (probabilityNumber.value >= 85) {
        return 'Strong';
    }

    if (probabilityNumber.value >= 70) {
        return 'Watch';
    }

    return 'Low';
});
</script>
