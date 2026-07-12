<template>
    <AppCard class="space-y-5">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Risk Center</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Current opportunity risk posture is {{ level }}</h3>
            </div>
            <StatusPill :label="level" :tone="levelTone" />
        </div>

        <div class="grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-center">
            <div class="relative mx-auto h-44 w-44">
                <apexchart type="radialBar" height="176" :options="chartOptions" :series="series" />
                <div class="pointer-events-none absolute inset-0 grid place-items-center text-center">
                    <div>
                        <p class="text-4xl font-semibold text-white">{{ score }}</p>
                        <p class="mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-500">Risk score</p>
                    </div>
                </div>
            </div>

            <div class="space-y-3">
                <div
                    v-for="metric in metrics"
                    :key="metric.label"
                    class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                    <div class="flex items-center justify-between gap-3">
                        <span class="text-sm text-slate-300">{{ metric.label }}</span>
                        <StatusPill :label="metric.value" :tone="metric.tone" />
                    </div>
                    <p class="mt-2 text-sm leading-6 text-slate-400">{{ metric.detail }}</p>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ApexOptions } from 'apexcharts';

import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { OpportunityRiskMetric } from '@/types';
import type { DashboardTone } from '@/types';

const props = defineProps<{
    metrics: OpportunityRiskMetric[];
    score: number;
    level: string;
}>();

const series = computed(() => [props.score]);
const levelTone = computed<DashboardTone>(() => {
    if (props.level.toLowerCase() === 'low') {
        return 'emerald';
    }

    if (props.level.toLowerCase() === 'medium') {
        return 'amber';
    }

    return 'rose';
});

const chartOptions = computed<ApexOptions>(() => ({
    chart: {
        type: 'radialBar',
        background: 'transparent',
        sparkline: { enabled: true },
        animations: {
            enabled: true,
            speed: 650,
        },
    },
    labels: ['Risk'],
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
                margin: 0,
            },
            dataLabels: {
                show: false,
            },
        },
    },
    stroke: {
        lineCap: 'round',
    },
}));
</script>
