<template>
    <AppCard class="space-y-5">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Market Overview</p>
                <h3 class="mt-2 text-xl font-semibold text-white">BTC / ETH / Flow</h3>
            </div>
            <StatusPill label="Market Open" tone="emerald" />
        </div>

        <div class="rounded-[22px] border border-white/8 bg-white/[0.03] p-3">
            <apexchart type="area" height="220" :options="chartOptions" :series="series" />
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
            <div
                v-for="metric in metrics"
                :key="metric.label"
                class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">{{ metric.label }}</p>
                        <p class="mt-2 font-mono text-lg font-semibold text-white">{{ metric.value }}</p>
                    </div>
                    <span class="rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.24em]" :class="toneClasses(metric.tone)">
                        {{ metric.change }}
                    </span>
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
import type { ScannerMarketMetric } from '@/types';
import { scannerToneClasses } from './scannerTheme';

const props = defineProps<{
    metrics: ScannerMarketMetric[];
}>();

const series = computed(() => [
    {
        name: props.metrics[0]?.label ?? 'BTC Trend',
        data: props.metrics[0]?.data ?? [],
    },
    {
        name: props.metrics[1]?.label ?? 'ETH Trend',
        data: props.metrics[1]?.data ?? [],
    },
]);

const chartOptions = computed<ApexOptions>(() => ({
    chart: {
        type: 'area',
        background: 'transparent',
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        sparkline: {
            enabled: false,
        },
    },
    colors: ['#2dd4bf', '#34d399'],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
        width: 2.5,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.24,
            opacityTo: 0.04,
            stops: [0, 100],
        },
    },
    grid: {
        borderColor: 'rgba(148,163,184,0.12)',
        strokeDashArray: 4,
    },
    xaxis: {
        categories: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'],
        labels: {
            style: {
                colors: '#64748b',
                fontSize: '11px',
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                colors: '#64748b',
                fontSize: '11px',
            },
        },
    },
    legend: {
        labels: {
            colors: '#cbd5e1',
        },
        position: 'top',
    },
    tooltip: {
        theme: 'dark',
    },
    theme: {
        mode: 'dark',
    },
}));

function toneClasses(tone: ScannerMarketMetric['tone']) {
    return scannerToneClasses(tone);
}

const metrics = computed(() => props.metrics.slice(2));
</script>
