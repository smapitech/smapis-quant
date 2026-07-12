<template>
    <AppCard class="space-y-3 border-white/10 bg-[rgba(8,14,26,0.84)]">
        <div class="flex items-start justify-between gap-4">
            <p class="text-xs uppercase tracking-[0.26em] text-slate-500">{{ label }}</p>
            <span :class="toneClasses[tone]" class="h-2.5 w-2.5 rounded-full" />
        </div>
        <p class="font-mono text-2xl font-semibold text-white">{{ value }}</p>
        <p class="text-sm leading-6 text-slate-400">{{ detail }}</p>
    </AppCard>
</template>

<script setup lang="ts">
import AppCard from '@/components/ui/AppCard.vue';
import type { LandingTone } from '@/data/landingData';

defineProps<{
    label: string;
    value: string;
    detail: string;
    tone: LandingTone;
}>();

const toneClasses: Record<LandingTone, string> = {
    teal: 'bg-teal-300',
    emerald: 'bg-emerald-300',
    amber: 'bg-amber-300',
    rose: 'bg-rose-300',
    slate: 'bg-slate-400',
};
</script>
