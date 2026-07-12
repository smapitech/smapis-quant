<template>
    <AppCard class="space-y-5" :padded="true">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{{ title }}</p>
                <h3 class="mt-2 text-xl font-semibold text-white">{{ label }}</h3>
                <p v-if="subtitle" class="mt-1 text-sm text-slate-400">{{ subtitle }}</p>
            </div>
            <StatusPill :label="band" :tone="tone" />
        </div>

        <div class="flex items-center gap-5">
            <div class="relative h-28 w-28 shrink-0">
                <svg viewBox="0 0 120 120" class="h-full w-full -rotate-90">
                    <circle cx="60" cy="60" r="48" class="fill-none stroke-white/8" stroke-width="10" />
                    <circle
                        cx="60"
                        cy="60"
                        r="48"
                        class="fill-none stroke-teal-400"
                        stroke-linecap="round"
                        stroke-width="10"
                        :stroke-dasharray="circumference"
                        :stroke-dashoffset="dashOffset"
                    />
                </svg>
                <div class="absolute inset-0 grid place-items-center">
                    <div class="text-center">
                        <p class="text-3xl font-semibold text-white font-mono">{{ score }}</p>
                        <p class="text-[11px] uppercase tracking-[0.3em] text-teal-200/80">SQIS</p>
                    </div>
                </div>
            </div>

            <div class="min-w-0 flex-1 space-y-3">
                <div
                    v-for="item in breakdown"
                    :key="item.label"
                    class="space-y-1"
                >
                    <div class="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.25em] text-slate-500">
                        <span>{{ item.label }}</span>
                        <span class="font-mono text-slate-300">{{ item.score }}</span>
                    </div>
                    <div class="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <div class="h-full rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300" :style="{ width: `${item.score}%` }" />
                    </div>
                    <p class="text-xs text-slate-400">{{ item.value }}</p>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { SqisBreakdownItem } from '@/types';

const props = withDefaults(
    defineProps<{
        title?: string;
        label: string;
        score: number;
        band: string;
        subtitle?: string;
        breakdown: SqisBreakdownItem[];
    }>(),
    {
        title: 'Signal quality',
        subtitle: '',
    },
);

const circumference = 2 * Math.PI * 48;
const dashOffset = computed(() => circumference - (props.score / 100) * circumference);

const tone = computed(() => {
    if (props.score >= 90) {
        return 'emerald';
    }

    if (props.score >= 80) {
        return 'teal';
    }

    if (props.score >= 70) {
        return 'amber';
    }

    return 'rose';
});
</script>
