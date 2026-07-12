<template>
    <AppCard class="space-y-5">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Trade Simulator</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Interactive capital sizing</h3>
            </div>
            <StatusPill label="Mock" tone="teal" />
        </div>

        <PositionSizeSlider v-model="selectedCapital" :presets="metrics.capitalPresets" />

        <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Estimated Profit</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-emerald-300">{{ expectedProfit }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Estimated Fees</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ estimatedFees }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Expected Slippage</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ expectedSlippage }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Recommended Size</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-emerald-300">{{ metrics.recommendedCapital }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Expected SQIS</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ expectedSqis }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Committee Confidence</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ committeeConfidence }}</p>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import PositionSizeSlider from '@/components/opportunity/PositionSizeSlider.vue';
import type { OpportunityTradeSimulatorMetrics } from '@/types';

const props = defineProps<{
    metrics: OpportunityTradeSimulatorMetrics;
}>();

const selectedCapital = ref(props.metrics.capitalPresets[2] ?? 1000);

const recommendedCapital = computed(() => parseMoney(props.metrics.recommendedCapital));
const safeCapital = computed(() => parseMoney(props.metrics.maximumSafeCapital));
const baseProfit = computed(() => parseMoney(props.metrics.expectedProfit));
const baseFees = computed(() => parseMoney(props.metrics.estimatedFees));
const baseSlippage = computed(() => parseMoney(props.metrics.expectedSlippage));
const baseSqis = computed(() => parseInt(props.metrics.expectedSqis, 10));
const baseConfidence = computed(() => parseInt(props.metrics.committeeConfidence, 10));

const expectedProfit = computed(() => formatCurrency(selectedCapital.value * (baseProfit.value / recommendedCapital.value)));
const estimatedFees = computed(() => formatCurrency(selectedCapital.value * (baseFees.value / recommendedCapital.value)));
const expectedSlippage = computed(() => formatCurrency(selectedCapital.value * (baseSlippage.value / recommendedCapital.value)));

const expectedSqis = computed(() => {
    const sizeFactor = selectedCapital.value / recommendedCapital.value;
    return `${Math.max(82, Math.round(baseSqis.value - Math.max(0, sizeFactor - 1) * 4))}/100`;
});

const committeeConfidence = computed(() => {
    const sizeFactor = selectedCapital.value / recommendedCapital.value;
    return `${Math.max(84, Math.round(baseConfidence.value - Math.max(0, sizeFactor - 1) * 5))}%`;
});

watch(
    () => props.metrics.capitalPresets,
    (presets) => {
        if (!presets.includes(selectedCapital.value)) {
            selectedCapital.value = props.metrics.recommendedCapital ? parseMoney(props.metrics.recommendedCapital) : presets[0] ?? 1000;
        }
    },
);

function parseMoney(value: string) {
    return Number(value.replace(/[^0-9.]/g, '')) || 0;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(value);
}
</script>
