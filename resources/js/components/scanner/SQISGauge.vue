<template>
    <AppCard class="space-y-5">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">SQIS Visualisation</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Average SQIS</h3>
                <p class="mt-1 text-sm text-slate-400">{{ band }}</p>
            </div>

            <div class="text-right">
                <p class="font-mono text-3xl font-semibold text-white">{{ score }}</p>
                <p class="text-[11px] uppercase tracking-[0.28em]" :class="bandClasses">{{ band }}</p>
            </div>
        </div>

        <div class="grid gap-5 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:items-center">
            <div class="relative">
                <apexchart type="radialBar" height="240" :options="chartOptions" :series="series" />
                <div class="pointer-events-none absolute inset-0 grid place-items-center">
                    <div class="text-center">
                        <p class="font-mono text-4xl font-semibold text-white">{{ score }}</p>
                        <p class="mt-1 text-[11px] uppercase tracking-[0.32em] text-slate-500">SQIS</p>
                    </div>
                </div>
            </div>

            <div class="space-y-3">
                <div v-for="item in breakdown" :key="item.label" class="space-y-1">
                    <div class="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-slate-500">
                        <span>{{ item.label }}</span>
                        <span class="font-mono text-slate-300">{{ item.score }}%</span>
                    </div>
                    <div class="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <div class="h-full rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300 transition-all duration-500" :style="{ width: `${item.score}%` }" />
                    </div>
                    <p class="text-xs text-slate-400">{{ item.value }}</p>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ApexOptions } from 'apexcharts';

import AppCard from '@/components/ui/AppCard.vue';
import type { ScannerSqisBreakdownItem } from '@/types';
import { scannerSignalTone } from './scannerTheme';

const props = defineProps<{
    score: number;
    band: string;
    breakdown: ScannerSqisBreakdownItem[];
}>();

const series = computed(() => [props.score]);
const tone = computed(() => scannerSignalTone(props.score));

const bandClasses = computed(() => {
    const map = {
        teal: 'text-teal-200',
        emerald: 'text-emerald-200',
        amber: 'text-amber-200',
        rose: 'text-rose-200',
        slate: 'text-slate-200',
    } as const;

    return map[tone.value];
});

const chartOptions = computed<ApexOptions>(() => ({
    chart: {
        type: 'radialBar',
        sparkline: {
            enabled: true,
        },
        animations: {
            enabled: true,
            speed: 650,
        },
        background: 'transparent',
    },
    colors: ['#34d399'],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: '68%',
            },
            track: {
                background: 'rgba(255,255,255,0.07)',
                strokeWidth: '100%',
                margin: 0,
            },
            dataLabels: {
                show: false,
            },
        },
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'horizontal',
            gradientToColors: ['#2dd4bf'],
            stops: [0, 100],
        },
    },
    stroke: {
        lineCap: 'round',
    },
    labels: ['SQIS'],
}));
</script>
