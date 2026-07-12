<template>
    <div class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-sm font-semibold text-white">{{ holding.name }}</p>
                <p class="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">{{ holding.symbol }}</p>
            </div>
            <StatusBadge :variant="trendVariant">{{ holding.pnl }}</StatusBadge>
        </div>

        <div class="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            <div>
                <p class="text-xs uppercase tracking-[0.22em] text-slate-500">Qty</p>
                <p class="mt-1 font-medium text-white">{{ holding.quantity }}</p>
            </div>
            <div>
                <p class="text-xs uppercase tracking-[0.22em] text-slate-500">Avg cost</p>
                <p class="mt-1 font-medium text-white">{{ holding.avgCost }}</p>
            </div>
            <div>
                <p class="text-xs uppercase tracking-[0.22em] text-slate-500">Value</p>
                <p class="mt-1 font-medium text-white">{{ holding.marketValue }}</p>
            </div>
        </div>

        <div>
            <div class="mb-2 flex items-center justify-between text-xs text-slate-500">
                <span>Allocation</span>
                <span>{{ holding.allocation }}%</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                    class="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500"
                    :style="{ width: `${holding.allocation}%` }"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import StatusBadge from '@/components/ui/StatusBadge.vue';
import type { Holding } from '@/types';

const props = defineProps<{
    holding: Holding;
}>();

const trendVariant = computed(() => {
    if (props.holding.trend === 'up') {
        return 'success';
    }

    if (props.holding.trend === 'down') {
        return 'danger';
    }

    return 'neutral';
});
</script>
