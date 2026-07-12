<template>
    <AppCard class="space-y-4">
        <div class="flex items-center justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Live Heatmap</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Top profitable coins</h3>
            </div>
            <StatusPill label="Live" tone="emerald" />
        </div>

        <div class="rounded-[22px] border border-white/8 bg-white/[0.03] p-3">
            <apexchart type="heatmap" height="220" :options="chartOptions" :series="series" />
        </div>

        <div class="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-slate-500">
            <span class="inline-flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Green
            </span>
            <span class="inline-flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-slate-400" /> Neutral
            </span>
            <span class="inline-flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-rose-400" /> Red
            </span>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ApexOptions } from 'apexcharts';

import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { ScannerHeatmapItem } from '@/types';

const props = defineProps<{
    items: ScannerHeatmapItem[];
}>();

const series = computed(() => [
    {
        name: 'SQIS',
        data: props.items.map((item) => ({
            x: item.symbol,
            y: item.value,
        })),
    },
]);

const chartOptions = computed<ApexOptions>(() => ({
    chart: {
        type: 'heatmap',
        toolbar: {
            show: false,
        },
        background: 'transparent',
    },
    plotOptions: {
        heatmap: {
            radius: 6,
            shadeIntensity: 0.55,
            colorScale: {
                ranges: [
                    { from: 85, to: 100, color: '#34d399', name: 'Green' },
                    { from: 70, to: 84, color: '#64748b', name: 'Neutral' },
                    { from: 0, to: 69, color: '#f43f5e', name: 'Red' },
                ],
            },
        },
    },
    dataLabels: {
        enabled: true,
        style: {
            colors: ['#f8fafc'],
        },
    },
    stroke: {
        width: 3,
        colors: ['rgba(8,14,26,0.9)'],
    },
    grid: {
        padding: {
            left: 0,
            right: 0,
        },
    },
    xaxis: {
        labels: {
            style: {
                colors: '#94a3b8',
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                colors: '#94a3b8',
            },
        },
    },
    tooltip: {
        theme: 'dark',
    },
    theme: {
        mode: 'dark',
    },
}));
</script>
