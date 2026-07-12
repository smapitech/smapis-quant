<template>
    <AppCard class="space-y-5">
        <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Why the AI recommends this trade</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Explainable decision rationale</h3>
                <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    The committee weighs spread, liquidity, fee drag, exchange health, market regime, and historical behavior before issuing a recommendation.
                </p>
            </div>
            <AppBadge :tone="recommendationTone" subtle>{{ recommendation }}</AppBadge>
        </div>

        <div class="space-y-3">
            <div
                v-for="item in reasons"
                :key="item"
                class="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
            >
                <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,0.1)]" />
                <p class="text-sm leading-6 text-slate-300">{{ item }}</p>
            </div>
        </div>

        <div class="rounded-2xl border border-emerald-400/15 bg-emerald-500/8 p-4">
            <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-200/80">Recommendation</p>
            <p class="mt-2 text-xl font-semibold text-emerald-100">{{ recommendation }}</p>
            <p class="mt-2 text-sm leading-6 text-emerald-50/80">
                The AI is confident enough to proceed, but the recommended size remains reduced to protect capital efficiency.
            </p>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';

const props = defineProps<{
    reasons: string[];
    recommendation: string;
}>();

const recommendationTone = computed(() => {
    if (props.recommendation.includes('REDUCE')) {
        return 'amber';
    }

    if (props.recommendation.includes('HOLD')) {
        return 'slate';
    }

    return 'emerald';
});
</script>
