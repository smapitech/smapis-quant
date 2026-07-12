<template>
    <AppCard class="space-y-4">
        <div class="flex items-center justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Risk Overview</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Desk-level risk posture</h3>
            </div>
            <AppButton :to="moreDetailsTo" variant="ghost" size="sm">More Details</AppButton>
        </div>

        <div v-if="loading" class="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div class="h-[220px] rounded-[24px] bg-white/[0.03]" />
            <div class="space-y-3">
                <div v-for="index in 5" :key="index" class="space-y-2">
                    <div class="h-4 w-1/2 rounded-full bg-white/8" />
                    <div class="h-3 rounded-full bg-white/8" />
                </div>
            </div>
        </div>

        <div v-else class="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div class="rounded-[24px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-4">
                <div class="relative mx-auto h-52 w-full max-w-[220px]">
                    <svg viewBox="0 0 220 160" class="h-full w-full">
                        <defs>
                            <linearGradient :id="trackGradientId" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#34d399" />
                                <stop offset="45%" stop-color="#2dd4bf" />
                                <stop offset="75%" stop-color="#fbbf24" />
                                <stop offset="100%" stop-color="#f43f5e" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 30 120 A 80 80 0 0 1 190 120"
                            fill="none"
                            stroke="rgba(148,163,184,0.12)"
                            stroke-linecap="round"
                            stroke-width="18"
                        />
                        <path
                            d="M 30 120 A 80 80 0 0 1 190 120"
                            fill="none"
                            :stroke="`url(#${trackGradientId})`"
                            stroke-linecap="round"
                            stroke-width="18"
                            :stroke-dasharray="semiCircumference"
                            :stroke-dashoffset="semiOffset"
                            transform="rotate(180 110 120)"
                        />
                        <circle cx="110" cy="120" r="56" fill="rgba(3,7,18,0.95)" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center pt-6 text-center">
                        <p class="font-mono text-4xl font-semibold text-white">{{ score }}</p>
                        <p class="mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-500">{{ label }}</p>
                        <p class="mt-3 text-sm font-medium text-emerald-300">All systems normal</p>
                    </div>
                </div>
            </div>

            <div class="space-y-3">
                <div
                    v-for="metric in metrics"
                    :key="metric.label"
                    class="rounded-2xl border border-white/8 bg-[rgba(5,10,19,0.7)] p-4"
                >
                    <div class="flex items-center justify-between gap-3">
                        <span class="text-sm text-slate-300">{{ metric.label }}</span>
                        <StatusPill :label="metric.value" :tone="metric.tone" />
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
import StatusPill from '@/components/ui/StatusPill.vue';
import type { DashboardRiskMetric } from '@/types';

const props = withDefaults(
    defineProps<{
        score: number;
        label: string;
        metrics: DashboardRiskMetric[];
        moreDetailsTo?: string;
        loading?: boolean;
    }>(),
    {
        moreDetailsTo: '/risk-center',
        loading: false,
    },
);

const trackGradientId = `risk-track-${Math.random().toString(36).slice(2, 8)}`;
const semiCircumference = Math.PI * 160;
const semiOffset = computed(() => semiCircumference - (props.score / 100) * semiCircumference);
</script>
