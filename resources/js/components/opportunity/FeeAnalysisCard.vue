<template>
    <AppCard class="space-y-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Fee Analysis</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Cost breakdown after execution</h3>
            </div>
            <AppBadge tone="emerald">Net positive</AppBadge>
        </div>

        <div class="space-y-3">
            <div
                v-for="line in lines"
                :key="line.label"
                class="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
                <span class="text-sm text-slate-300">{{ line.label }}</span>
                <span :class="lineClass(line.tone)" class="font-mono text-lg font-semibold">{{ line.value }}</span>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import type { OpportunityFeeLine } from '@/types';

defineProps<{
    lines: OpportunityFeeLine[];
}>();

function lineClass(tone: OpportunityFeeLine['tone']) {
    const map: Record<OpportunityFeeLine['tone'], string> = {
        emerald: 'text-emerald-300',
        teal: 'text-teal-300',
        amber: 'text-amber-300',
        rose: 'text-rose-300',
        slate: 'text-slate-200',
    };

    return map[tone];
}
</script>
