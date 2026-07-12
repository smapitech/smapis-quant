<template>
    <AppCard class="space-y-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Vote Distribution</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Committee confidence</h3>
            </div>
            <AppBadge tone="teal">{{ summary.confidence }}%</AppBadge>
        </div>

        <div class="grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-center">
            <div class="relative mx-auto h-44 w-44">
                <apexchart type="donut" height="176" :options="chartOptions" :series="series" />
                <div class="pointer-events-none absolute inset-0 grid place-items-center">
                    <div class="text-center">
                        <p class="text-4xl font-semibold text-white">{{ summary.confidence }}</p>
                        <p class="mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-500">Confidence</p>
                    </div>
                </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div
                    v-for="item in voteRows"
                    :key="item.label"
                    class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                    <div class="flex items-center justify-between gap-3 text-sm">
                        <span class="text-slate-300">{{ item.label }}</span>
                        <span class="font-mono text-white">{{ item.value }}</span>
                    </div>
                    <div class="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <div class="h-full rounded-full" :class="item.barClass" :style="{ width: `${item.percent}%` }" />
                    </div>
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
import type { OpportunityCommitteeSummary } from '@/types';

const props = defineProps<{
    summary: OpportunityCommitteeSummary;
}>();

const series = computed(() => [props.summary.approve, props.summary.conditional, props.summary.wait, props.summary.reject]);

const voteRows = computed(() => [
    { label: 'Approve', value: props.summary.approve, percent: Math.max(4, props.summary.approve * 16), barClass: 'bg-gradient-to-r from-emerald-400 to-teal-400' },
    { label: 'Conditional', value: props.summary.conditional, percent: Math.max(4, props.summary.conditional * 40), barClass: 'bg-gradient-to-r from-amber-400 to-orange-400' },
    { label: 'Wait', value: props.summary.wait, percent: Math.max(4, props.summary.wait * 40), barClass: 'bg-gradient-to-r from-slate-400 to-slate-300' },
    { label: 'Reject', value: props.summary.reject, percent: Math.max(4, props.summary.reject * 40), barClass: 'bg-gradient-to-r from-rose-400 to-red-400' },
]);

const chartOptions = computed<ApexOptions>(() => ({
    chart: {
        type: 'donut',
        background: 'transparent',
        sparkline: { enabled: true },
        animations: {
            enabled: true,
            speed: 700,
        },
    },
    labels: ['Approve', 'Conditional', 'Wait', 'Reject'],
    colors: ['#34d399', '#f59e0b', '#94a3b8', '#f43f5e'],
    legend: { show: false },
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    plotOptions: {
        pie: {
            donut: {
                size: '78%',
                labels: { show: false },
            },
        },
    },
    tooltip: {
        theme: 'dark',
    },
}));
</script>
