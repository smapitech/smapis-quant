<template>
    <AppCard class="space-y-5">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">AI Quick Summary</p>
                <h3 class="mt-2 text-xl font-semibold text-white">AI Recommendation</h3>
            </div>
            <StatusPill :label="recommendation" :tone="recommendationTone" />
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Recommendation</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ recommendation }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Confidence</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ confidence }}%</p>
            </div>
        </div>

        <div class="space-y-3">
            <div v-for="reason in reasons" :key="reason" class="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                <span class="mt-1 h-2.5 w-2.5 rounded-full bg-teal-300 shadow-[0_0_0_4px_rgba(45,212,191,0.12)]" />
                <p class="text-sm leading-6 text-slate-300">{{ reason }}</p>
            </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Estimated duration</p>
                <p class="mt-2 font-mono text-xl font-semibold text-white">{{ estimatedDuration }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Risk</p>
                <p class="mt-2 font-mono text-xl font-semibold text-white">{{ risk }}</p>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { ScannerRiskLevel } from '@/types';
import { scannerBadgeToneFromText } from './scannerTheme';

const props = defineProps<{
    recommendation: string;
    confidence: number;
    reasons: string[];
    estimatedDuration: string;
    risk: ScannerRiskLevel;
}>();

const recommendationTone = computed(() => scannerBadgeToneFromText(props.recommendation));
</script>
