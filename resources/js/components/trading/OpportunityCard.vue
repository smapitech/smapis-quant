<template>
    <AppCard class="space-y-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{{ opportunity.strategy }}</p>
                <h3 class="mt-2 text-xl font-semibold text-white">{{ opportunity.pair }}</h3>
                <p class="mt-1 text-sm text-slate-400">{{ opportunity.timeframe }} - {{ opportunity.marketBias }}</p>
            </div>
            <StatusPill :label="opportunity.sqisBand" :tone="bandTone" />
        </div>

        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.25em] text-slate-500">SQIS</p>
                <p class="mt-2 font-mono text-2xl text-white">{{ opportunity.sqis }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Profit</p>
                <p class="mt-2 font-mono text-2xl text-emerald-300">{{ opportunity.expectedProfit }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Risk / reward</p>
                <p class="mt-2 font-mono text-2xl text-white">{{ opportunity.riskReward }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Liquidity</p>
                <p class="mt-2 font-mono text-2xl text-white">{{ opportunity.liquidity }}</p>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { Opportunity } from '@/types';

const props = defineProps<{
    opportunity: Opportunity;
}>();

const bandTone = computed(() => {
    if (props.opportunity.sqisBand === 'Elite' || props.opportunity.sqisBand === 'High') {
        return 'emerald';
    }

    if (props.opportunity.sqisBand === 'Good') {
        return 'teal';
    }

    return 'amber';
});
</script>
