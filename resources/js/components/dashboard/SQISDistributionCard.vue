<template>
    <AppCard class="space-y-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">SQIS Distribution</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Average SQIS quality profile</h3>
            </div>
            <StatusPill :label="band" :tone="scoreTone" />
        </div>

        <div v-if="loading" class="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div class="h-[220px] rounded-[24px] bg-white/[0.03]" />
            <div class="space-y-3">
                <div v-for="index in 5" :key="index" class="space-y-2">
                    <div class="h-4 w-2/3 rounded-full bg-white/8" />
                    <div class="h-2 rounded-full bg-white/8" />
                </div>
            </div>
        </div>

        <div v-else class="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div class="rounded-[24px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-4">
                <div class="relative mx-auto h-44 w-44">
                    <div class="absolute inset-0 rounded-full" :style="{ background: ringStyle }" />
                    <div class="absolute inset-[16px] rounded-full border border-white/8 bg-[rgba(3,7,18,0.95)]" />
                    <div class="absolute inset-0 grid place-items-center text-center">
                        <div>
                            <p class="font-mono text-4xl font-semibold text-white">{{ score }}</p>
                            <p class="mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-500">Average SQIS</p>
                            <p class="mt-2 text-sm font-medium text-emerald-300">{{ band }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="space-y-3">
                <div
                    v-for="item in items"
                    :key="item.label"
                    class="rounded-2xl border border-white/8 bg-[rgba(5,10,19,0.7)] p-4"
                >
                    <div class="flex items-center justify-between gap-3 text-sm">
                        <span class="text-slate-300">{{ item.label }}</span>
                        <span class="font-mono text-white">{{ item.value }}</span>
                    </div>
                    <div class="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <div :class="toneBarClasses(item.tone)" class="h-full rounded-full" :style="{ width: item.value }" />
                    </div>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { DashboardTone } from '@/types';

type DistributionItem = {
    label: string;
    value: string;
    percentage: number;
    tone: DashboardTone;
};

const props = withDefaults(
    defineProps<{
        score: number;
        band: string;
        items: DistributionItem[];
        loading?: boolean;
    }>(),
    {
        loading: false,
    },
);

const scoreTone = computed<DashboardTone>(() => {
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

const ringStyle = computed(() => buildConicGradient(props.items));

function toneBarClasses(tone: DashboardTone) {
    const map: Record<DashboardTone, string> = {
        emerald: 'bg-gradient-to-r from-emerald-400 to-emerald-300',
        teal: 'bg-gradient-to-r from-teal-400 to-cyan-300',
        amber: 'bg-gradient-to-r from-amber-400 to-yellow-300',
        rose: 'bg-gradient-to-r from-rose-400 to-pink-300',
        slate: 'bg-gradient-to-r from-slate-500 to-slate-300',
    };

    return map[tone];
}

function buildConicGradient(items: DistributionItem[]) {
    const palette: Record<DashboardTone, string> = {
        emerald: 'rgba(52,211,153,0.95)',
        teal: 'rgba(45,212,191,0.95)',
        amber: 'rgba(251,191,36,0.95)',
        rose: 'rgba(251,113,133,0.95)',
        slate: 'rgba(148,163,184,0.95)',
    };

    let cursor = 0;
    const stops = items.map((item) => {
        const start = cursor;
        cursor += item.percentage;
        return `${palette[item.tone]} ${start}% ${cursor}%`;
    });

    return `conic-gradient(from 210deg, ${stops.join(', ')})`;
}
</script>
