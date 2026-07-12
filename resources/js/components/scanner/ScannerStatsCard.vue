<template>
    <AppCard class="relative overflow-hidden border-white/10 bg-[rgba(8,14,26,0.9)]">
        <div :class="accentClasses" class="absolute inset-x-0 top-0 h-1.5" />

        <div class="flex items-start justify-between gap-4">
            <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">{{ metric.label }}</p>
                <p class="font-mono text-3xl font-semibold tracking-tight text-white">{{ metric.value }}</p>
                <p class="text-sm leading-6 text-slate-400">{{ metric.note }}</p>
            </div>

            <div :class="iconClasses" class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border text-[11px] font-semibold tracking-[0.28em]">
                {{ metric.icon }}
            </div>
        </div>

        <div class="mt-5 flex items-center justify-between gap-3 border-t border-white/8 pt-4">
            <span class="text-sm text-slate-400">{{ metric.change }}</span>
            <span class="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em]" :class="changeClasses">
                <span class="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                Live
            </span>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppCard from '@/components/ui/AppCard.vue';
import type { ScannerMetricCard } from '@/types';
import { scannerSolidToneClasses, scannerToneClasses } from './scannerTheme';

const props = defineProps<{
    metric: ScannerMetricCard;
}>();

const accentClasses = computed(() => {
    const map = {
        teal: 'bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400',
        emerald: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400',
        amber: 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-300',
        rose: 'bg-gradient-to-r from-rose-400 via-pink-400 to-orange-300',
        slate: 'bg-gradient-to-r from-slate-400 via-slate-300 to-cyan-200',
    } as const;

    return map[props.metric.tone];
});

const iconClasses = computed(() => [
    scannerToneClasses(props.metric.tone),
    scannerSolidToneClasses(props.metric.tone),
]);

const changeClasses = computed(() => scannerToneClasses(props.metric.tone));
</script>
