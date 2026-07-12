<template>
    <svg viewBox="0 0 420 180" class="h-full w-full">
        <defs>
            <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.75" />
                <stop offset="100%" stop-color="#2dd4bf" stop-opacity="0.03" />
            </linearGradient>
        </defs>
        <path :d="areaPath" :fill="`url(#${gradientId})`" />
        <path :d="linePath" fill="none" stroke="#2dd4bf" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { ChartPoint } from '@/types';

const props = defineProps<{
    series: ChartPoint[];
}>();

const gradientId = `trend-${Math.random().toString(36).slice(2, 8)}`;

const points = computed(() => {
    if (!props.series.length) {
        return [];
    }

    const width = 380;
    const height = 138;
    const max = Math.max(...props.series.map((point) => point.value));
    const min = Math.min(...props.series.map((point) => point.value));
    const range = max - min || 1;

    return props.series.map((point, index) => {
        const x = (index / (props.series.length - 1 || 1)) * width + 20;
        const y = height - ((point.value - min) / range) * height + 16;
        return `${x},${y}`;
    });
});

const linePath = computed(() => {
    if (!points.value.length) {
        return '';
    }

    return `M ${points.value.join(' L ')}`;
});

const areaPath = computed(() => {
    if (!points.value.length) {
        return '';
    }

    const first = points.value[0];
    const last = points.value[points.value.length - 1];
    return `${linePath.value} L ${last.split(',')[0]},164 L ${first.split(',')[0]},164 Z`;
});
</script>
