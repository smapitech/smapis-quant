<template>
    <AppCard class="space-y-5">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Order Book Visualization</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Buy depth, sell depth, combined depth, and expected slippage</h3>
            </div>
            <AppBadge tone="teal">Bid / Ask {{ snapshot.bidAskRatio }}</AppBadge>
        </div>

        <div class="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_320px]">
            <div class="space-y-4">
                <div class="grid gap-4 lg:grid-cols-2">
                    <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div class="flex items-center justify-between gap-3">
                            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Buy Depth</p>
                            <AppBadge tone="emerald">Strong</AppBadge>
                        </div>
                        <apexchart type="area" height="190" :options="buyOptions" :series="buySeries" />
                    </div>

                    <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div class="flex items-center justify-between gap-3">
                            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Sell Depth</p>
                            <AppBadge tone="amber">Healthy</AppBadge>
                        </div>
                        <apexchart type="area" height="190" :options="sellOptions" :series="sellSeries" />
                    </div>
                </div>

                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Combined Depth</p>
                            <h4 class="mt-2 text-lg font-semibold text-white">Blended buy and sell book pressure</h4>
                        </div>
                        <AppBadge tone="slate">Depth Mix</AppBadge>
                    </div>
                    <apexchart type="area" height="170" :options="combinedOptions" :series="combinedSeries" />
                </div>

                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Depth Heatmap</p>
                            <h4 class="mt-2 text-lg font-semibold text-white">Market depth across the execution window</h4>
                        </div>
                        <AppBadge tone="slate">Live preview</AppBadge>
                    </div>
                    <apexchart type="heatmap" height="260" :options="heatmapOptions" :series="heatmapSeries" />
                </div>
            </div>

            <div class="space-y-3">
                <div
                    v-for="metric in metrics"
                    :key="metric.label"
                    class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                    <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">{{ metric.label }}</p>
                    <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ metric.value }}</p>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ApexOptions } from 'apexcharts';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import type { OpportunityOrderBookSnapshot } from '@/types';

const props = defineProps<{
    snapshot: OpportunityOrderBookSnapshot;
}>();

const xCategories = computed(() => props.snapshot.buyDepth.map((point) => point.label));

const buySeries = computed(() => [
    {
        name: 'Buy depth',
        data: props.snapshot.buyDepth.map((point) => point.value),
    },
]);

const sellSeries = computed(() => [
    {
        name: 'Sell depth',
        data: props.snapshot.sellDepth.map((point) => point.value),
    },
]);

const buyOptions = computed<ApexOptions>(() => createLineOptions('#34d399', '#2dd4bf'));
const sellOptions = computed<ApexOptions>(() => createLineOptions('#f59e0b', '#f97316'));
const combinedOptions = computed<ApexOptions>(() => createLineOptions('#60a5fa', '#22d3ee'));

const combinedSeries = computed(() => [
    {
        name: 'Combined depth',
        data: props.snapshot.buyDepth.map((point, index) => {
            const sell = props.snapshot.sellDepth[index]?.value ?? point.value;
            return Math.round((point.value + sell) / 2);
        }),
    },
]);

const heatmapSeries = computed(() => [
    {
        name: 'Buy',
        data: props.snapshot.depthHeatmap.map((cell) => ({ x: cell.label, y: cell.buy })),
    },
    {
        name: 'Sell',
        data: props.snapshot.depthHeatmap.map((cell) => ({ x: cell.label, y: cell.sell })),
    },
]);

const heatmapOptions = computed<ApexOptions>(() => ({
    chart: {
        type: 'heatmap',
        background: 'transparent',
        toolbar: { show: false },
        animations: {
            enabled: true,
            speed: 650,
        },
    },
    colors: ['#34d399'],
    dataLabels: {
        enabled: false,
    },
    grid: {
        borderColor: 'rgba(255,255,255,0.06)',
    },
    plotOptions: {
        heatmap: {
            radius: 4,
            enableShades: false,
            colorScale: {
                ranges: [
                    { from: 0, to: 50, color: '#334155', name: 'Low' },
                    { from: 51, to: 75, color: '#14b8a6', name: 'Medium' },
                    { from: 76, to: 100, color: '#22c55e', name: 'High' },
                ],
            },
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
}));

const metrics = computed(() => [
    { label: 'Expected Slippage', value: props.snapshot.expectedSlippage },
    { label: 'Maximum Safe Capital', value: props.snapshot.maximumSafeCapital },
    { label: 'Bid / Ask Ratio', value: props.snapshot.bidAskRatio },
]);

function createLineOptions(colorFrom: string, colorTo: string): ApexOptions {
    return {
        chart: {
            type: 'area',
            background: 'transparent',
            toolbar: { show: false },
            sparkline: { enabled: false },
            animations: {
                enabled: true,
                speed: 650,
            },
        },
        colors: [colorFrom],
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
                gradientToColors: [colorTo],
                opacityFrom: 0.35,
                opacityTo: 0.03,
                stops: [0, 100],
            },
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.06)',
        },
        xaxis: {
            categories: xCategories.value,
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
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            theme: 'dark',
        },
    };
}
</script>
