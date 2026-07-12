<template>
    <AppCard class="space-y-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">{{ title }}</p>
                <h3 class="mt-2 text-xl font-semibold text-white">{{ analysis.exchange }}</h3>
                <p class="mt-1 text-sm text-slate-400">{{ subtitle }}</p>
            </div>
            <ExchangeBadge :name="analysis.exchange" :venue="venue" :tone="analysis.tone" />
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Price</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ analysis.price }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Available Volume</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ analysis.availableVolume }}</p>
            </div>
        </div>

        <div class="space-y-2">
            <div class="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-slate-500">
                <span>Order Book</span>
                <span class="font-mono text-slate-300">{{ analysis.orderBook }}</span>
            </div>
            <div class="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                    class="h-full rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 transition-all duration-500"
                    :style="{ width: `${depth}%` }"
                />
            </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <div v-for="metric in metrics" :key="metric.label" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">{{ metric.label }}</p>
                <p class="mt-2 font-mono text-lg font-semibold text-white">{{ metric.value }}</p>
            </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Deposit Status</p>
                <div class="mt-3">
                    <StatusPill :label="analysis.depositStatus" :tone="analysis.depositStatus === 'Enabled' ? 'emerald' : 'amber'" />
                </div>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Withdrawal Status</p>
                <div class="mt-3">
                    <StatusPill :label="analysis.withdrawalStatus" :tone="analysis.withdrawalStatus === 'Enabled' ? 'emerald' : 'amber'" />
                </div>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Exchange Health</p>
                <div class="mt-3">
                    <StatusPill :label="analysis.health" :tone="analysis.tone" />
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import ExchangeBadge from '@/components/scanner/ExchangeBadge.vue';
import type { OpportunityExchangeAnalysis } from '@/types';

const props = defineProps<{
    title: 'Buy Analysis' | 'Sell Analysis';
    venue: 'Buy' | 'Sell';
    subtitle: string;
    analysis: OpportunityExchangeAnalysis;
}>();

const depth = computed(() => {
    if (props.analysis.orderBook.toLowerCase().includes('very')) {
        return 92;
    }

    if (props.analysis.orderBook.toLowerCase().includes('strong')) {
        return 84;
    }

    return 68;
});

const metrics = computed(() => [
    { label: 'Maker Fee', value: props.analysis.makerFee },
    { label: 'Taker Fee', value: props.analysis.takerFee },
    { label: 'API Latency', value: props.analysis.apiLatency },
]);
</script>
