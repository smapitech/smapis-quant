<template>
    <DashboardChartCard
        title="Portfolio Overview"
        eyebrow="Account pulse"
        badge="Portfolio snapshot"
        badge-tone="teal"
        metric-label="Total Value"
        metric-value="$125,430.16"
        metric-hint="+3.41% (24h)"
        metric-tone="emerald"
        :tabs="dashboardTimeFilters"
        v-model:activeTab="selectedRange"
    >
        <div class="space-y-5">
            <div class="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_320px]">
                <div class="rounded-[24px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-4 sm:p-5">
                    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Equity curve</p>
                            <p class="mt-1 text-sm text-slate-400">Intraday portfolio value and allocation pulse.</p>
                        </div>
                        <AppBadge tone="emerald">Live value</AppBadge>
                    </div>
                    <ProfitLossChart :line="series" mode="line" />
                </div>

                <div class="rounded-[24px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-4 sm:p-5">
                    <div class="flex items-start justify-between gap-3">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Capital Allocation</p>
                            <p class="mt-1 text-sm text-slate-400">Current desk composition by allocation bucket.</p>
                        </div>
                        <StatusPill label="Top split" tone="emerald" />
                    </div>

                    <div class="mt-5 flex items-center gap-5">
                        <div class="relative h-36 w-36 shrink-0">
                            <div class="absolute inset-0 rounded-full" :style="{ background: allocationStyle }" />
                            <div class="absolute inset-[18px] rounded-full border border-white/8 bg-[rgba(3,7,18,0.95)]" />
                            <div class="absolute inset-0 grid place-items-center text-center">
                                <div>
                                    <p class="font-mono text-2xl font-semibold text-white">$125.4k</p>
                                    <p class="text-[11px] uppercase tracking-[0.28em] text-slate-500">Total</p>
                                </div>
                            </div>
                        </div>

                        <div class="min-w-0 flex-1 space-y-3">
                            <div
                                v-for="item in allocation"
                                :key="item.label"
                                class="space-y-1"
                            >
                                <div class="flex items-center justify-between gap-3 text-sm">
                                    <span class="text-slate-300">{{ item.label }}</span>
                                    <span class="font-mono text-white">{{ item.value }}</span>
                                </div>
                                <div class="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                                    <div :class="allocationBarClasses(item.tone)" class="h-full rounded-full" :style="{ width: item.value }" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="rounded-[24px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-4 sm:p-5">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Performance Snapshot</p>
                        <p class="mt-1 text-sm text-slate-400">Desk performance anchored to paper and guarded live runs.</p>
                    </div>
                    <StatusPill label="77.8% win rate" tone="emerald" />
                </div>

                <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <div
                        v-for="metric in performanceMetrics"
                        :key="metric.label"
                        class="rounded-2xl border border-white/8 bg-[rgba(5,10,19,0.7)] p-4"
                    >
                        <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                            {{ metric.label }}
                        </p>
                        <p class="mt-2 font-mono text-xl font-semibold text-white">
                            {{ metric.value }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </DashboardChartCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import DashboardChartCard from '@/components/dashboard/DashboardChartCard.vue';
import ProfitLossChart from '@/components/dashboard/ProfitLossChart.vue';
import type { ChartPoint, DashboardAllocationItem, DashboardPerformanceMetric } from '@/types';
import { dashboardTimeFilters } from '@/data/dashboardData';

const props = defineProps<{
    series: ChartPoint[];
    allocation: DashboardAllocationItem[];
    performanceMetrics: DashboardPerformanceMetric[];
}>();

const selectedRange = ref(dashboardTimeFilters[1]);

const allocationStyle = computed(() => buildConicGradient(props.allocation));

function allocationBarClasses(tone: DashboardAllocationItem['tone']) {
    const map: Record<DashboardAllocationItem['tone'], string> = {
        emerald: 'bg-gradient-to-r from-emerald-400 to-emerald-300',
        teal: 'bg-gradient-to-r from-teal-400 to-cyan-300',
        amber: 'bg-gradient-to-r from-amber-400 to-yellow-300',
        rose: 'bg-gradient-to-r from-rose-400 to-pink-300',
        slate: 'bg-gradient-to-r from-slate-500 to-slate-300',
    };

    return map[tone];
}

function buildConicGradient(items: DashboardAllocationItem[]) {
    const palette: Record<DashboardAllocationItem['tone'], string> = {
        emerald: 'rgba(52,211,153,0.95)',
        teal: 'rgba(45,212,191,0.95)',
        amber: 'rgba(251,191,36,0.95)',
        rose: 'rgba(251,113,133,0.95)',
        slate: 'rgba(148,163,184,0.95)',
    };

    let cursor = 0;
    const stops = items.map((item) => {
        const start = cursor;
        cursor += item.percentage;
        return `${palette[item.tone]} ${start}% ${cursor}%`;
    });

    return `conic-gradient(from 210deg, ${stops.join(', ')})`;
}
</script>
