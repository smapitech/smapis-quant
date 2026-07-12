<template>
    <AppCard class="h-full overflow-hidden">
        <div v-if="loading" class="space-y-4">
            <div class="flex items-start justify-between gap-3">
                <div class="space-y-3">
                    <div class="h-3 w-28 rounded-full bg-white/8" />
                    <div class="h-8 w-40 rounded-xl bg-white/8" />
                </div>
                <div class="h-11 w-11 rounded-2xl bg-white/8" />
            </div>
            <div class="h-3 w-2/3 rounded-full bg-white/8" />
            <div class="h-3 w-full rounded-full bg-white/8" />
        </div>

        <div v-else class="space-y-4">
            <div class="flex items-start justify-between gap-4">
                <div class="min-w-0 space-y-2">
                    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {{ card.label }}
                    </p>
                    <p :class="valueClasses" class="font-mono font-semibold tracking-tight leading-none whitespace-nowrap">
                        {{ card.value }}
                    </p>
                </div>
                <div :class="iconClasses" class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-[11px] font-semibold tracking-[0.28em]">
                    {{ card.icon }}
                </div>
            </div>

            <div class="space-y-2">
                <p :class="changeClasses" class="text-sm font-medium">
                    {{ card.change }}
                </p>
                <p class="text-sm leading-6 text-slate-400">
                    {{ card.note }}
                </p>
            </div>

            <div v-if="card.chips?.length" class="flex flex-wrap gap-2 pt-1">
                <AppBadge
                    v-for="chip in card.chips"
                    :key="chip.name"
                    :tone="chip.tone"
                >
                    {{ chip.name }}
                </AppBadge>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import type { DashboardSummaryCard, DashboardTone } from '@/types';

const props = defineProps<{
    card: DashboardSummaryCard;
    loading?: boolean;
}>();

const toneMap: Record<DashboardTone, { ring: string; fill: string; text: string; glow: string }> = {
    teal: {
        ring: 'border-teal-400/18 bg-teal-400/[0.08] text-teal-200',
        fill: 'text-teal-300',
        text: 'text-teal-300',
        glow: 'shadow-[0_0_0_1px_rgba(45,212,191,0.16),0_18px_42px_-24px_rgba(45,212,191,0.55)]',
    },
    emerald: {
        ring: 'border-emerald-400/18 bg-emerald-400/[0.08] text-emerald-200',
        fill: 'text-emerald-300',
        text: 'text-emerald-300',
        glow: 'shadow-[0_0_0_1px_rgba(52,211,153,0.16),0_18px_42px_-24px_rgba(52,211,153,0.55)]',
    },
    amber: {
        ring: 'border-amber-400/18 bg-amber-400/[0.08] text-amber-200',
        fill: 'text-amber-300',
        text: 'text-amber-300',
        glow: 'shadow-[0_0_0_1px_rgba(251,191,36,0.16),0_18px_42px_-24px_rgba(251,191,36,0.55)]',
    },
    rose: {
        ring: 'border-rose-400/18 bg-rose-400/[0.08] text-rose-200',
        fill: 'text-rose-300',
        text: 'text-rose-300',
        glow: 'shadow-[0_0_0_1px_rgba(251,113,133,0.16),0_18px_42px_-24px_rgba(251,113,133,0.55)]',
    },
    slate: {
        ring: 'border-white/10 bg-white/[0.06] text-slate-100',
        fill: 'text-slate-200',
        text: 'text-slate-200',
        glow: 'shadow-[0_0_0_1px_rgba(148,163,184,0.08),0_18px_42px_-24px_rgba(15,23,42,0.8)]',
    },
};

const toneClasses = computed(() => toneMap[props.card.tone]);

const iconClasses = computed(() => [
    toneClasses.value.ring,
    toneClasses.value.glow,
]);

const valueClasses = computed(() => [
    toneClasses.value.fill,
    props.card.value.length > 10 ? 'text-[20px]' : props.card.value.length > 8 ? 'text-[24px]' : 'text-[32px]',
]);

const changeClasses = computed(() => {
    if (props.card.label === 'Risk Status') {
        return 'text-emerald-300';
    }

    if (props.card.change.startsWith('-')) {
        return 'text-rose-300';
    }

    if (props.card.change.startsWith('+')) {
        return 'text-emerald-300';
    }

    return toneClasses.value.text;
});
</script>
