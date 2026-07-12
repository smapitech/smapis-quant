<template>
    <AppCard class="space-y-4">
        <div class="flex items-center justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Asset Allocation</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Portfolio composition</h3>
            </div>
            <AppButton to="/portfolio" variant="ghost" size="sm">More Details</AppButton>
        </div>

        <div v-if="loading" class="grid gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
            <div class="h-[220px] rounded-[24px] bg-white/[0.03]" />
            <div class="space-y-3">
                <div v-for="index in 5" :key="index" class="space-y-2">
                    <div class="h-4 w-2/3 rounded-full bg-white/8" />
                    <div class="h-2 rounded-full bg-white/8" />
                </div>
            </div>
        </div>

        <div v-else class="grid gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
            <div class="rounded-[24px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-4">
                <div class="relative mx-auto h-44 w-44">
                    <div class="absolute inset-0 rounded-full" :style="{ background: ringStyle }" />
                    <div class="absolute inset-[22px] rounded-full border border-white/8 bg-[rgba(3,7,18,0.95)]" />
                    <div class="absolute inset-0 grid place-items-center text-center">
                        <div>
                            <p class="font-mono text-2xl font-semibold text-white">{{ totalValue }}</p>
                            <p class="mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-500">Total Value</p>
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

import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import type { DashboardAllocationItem, DashboardTone } from '@/types';

const props = defineProps<{
    totalValue: string;
    items: DashboardAllocationItem[];
    loading?: boolean;
}>();

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

function buildConicGradient(items: DashboardAllocationItem[]) {
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

    return `conic-gradient(from 220deg, ${stops.join(', ')})`;
}
</script>
