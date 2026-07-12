<template>
    <AppCard class="space-y-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Opportunity Replay</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Timeline of the opportunity lifecycle</h3>
            </div>
            <AppBadge tone="slate">Replay Opportunity</AppBadge>
        </div>

        <div class="space-y-3">
            <div
                v-for="(step, index) in steps"
                :key="step.label"
                class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
                <div class="flex items-center gap-3">
                    <div
                        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                        :class="toneClasses(step.tone)"
                    >
                        <span class="font-mono text-xs font-semibold">{{ index + 1 }}</span>
                    </div>
                    <div class="min-w-0 flex-1">
                        <div class="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p class="text-sm font-semibold text-white">{{ step.label }}</p>
                                <p class="mt-1 text-sm leading-6 text-slate-400">{{ step.note }}</p>
                            </div>
                            <p class="font-mono text-sm text-slate-300">{{ step.time }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="rounded-2xl border border-emerald-400/20 bg-emerald-500/8 p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200/80">Verdict</p>
            <p class="mt-2 text-2xl font-semibold text-emerald-300">Strong Opportunity</p>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import type { OpportunityReplayMilestone } from '@/types';

defineProps<{
    steps: OpportunityReplayMilestone[];
}>();

function toneClasses(tone: OpportunityReplayMilestone['tone']) {
    const map: Record<OpportunityReplayMilestone['tone'], string> = {
        emerald: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
        teal: 'border-teal-400/30 bg-teal-500/10 text-teal-200',
        amber: 'border-amber-400/30 bg-amber-500/10 text-amber-200',
        rose: 'border-rose-400/30 bg-rose-500/10 text-rose-200',
        slate: 'border-slate-400/20 bg-slate-500/10 text-slate-200',
    };

    return map[tone];
}
</script>
