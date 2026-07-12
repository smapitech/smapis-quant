<template>
    <div class="space-y-4">
        <div v-if="loading" class="space-y-4">
            <div class="flex items-center justify-between gap-3">
                <div class="h-4 w-40 rounded-full bg-white/8" />
                <div class="h-4 w-24 rounded-full bg-white/8" />
            </div>
            <div class="h-[280px] rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <div class="grid h-full gap-3">
                    <div class="h-3 w-1/3 rounded-full bg-white/8" />
                    <div class="h-full rounded-[18px] bg-white/[0.04]" />
                </div>
            </div>
        </div>

        <div v-else class="space-y-4">
            <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <AppBadge tone="teal" subtle>Combined View</AppBadge>
                <span v-if="mode === 'combined'">Profit bars and cumulative curve from mock desk activity.</span>
                <span v-else>Line curve from portfolio value samples.</span>
            </div>

            <div class="relative overflow-hidden rounded-[24px] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4 sm:p-5">
                <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" />
                <div class="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                <svg
                    viewBox="0 0 960 320"
                    class="relative z-[1] h-[280px] w-full sm:h-[320px]"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient :id="areaGradientId" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.42" />
                            <stop offset="65%" stop-color="#2dd4bf" stop-opacity="0.12" />
                            <stop offset="100%" stop-color="#2dd4bf" stop-opacity="0.02" />
                        </linearGradient>
                        <linearGradient :id="barPositiveGradientId" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.96" />
                            <stop offset="100%" stop-color="#10b981" stop-opacity="0.55" />
                        </linearGradient>
                        <linearGradient :id="barNegativeGradientId" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#fb7185" stop-opacity="0.9" />
                            <stop offset="100%" stop-color="#f43f5e" stop-opacity="0.55" />
                        </linearGradient>
                        <filter :id="glowId" x="-30%" y="-30%" width="160%" height="160%">
                            <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#2dd4bf" flood-opacity="0.28" />
                        </filter>
                    </defs>

                    <g opacity="0.42">
                        <line v-for="line in gridLines" :key="line" x1="24" :x2="936" :y1="line" :y2="line" stroke="rgba(148,163,184,0.12)" stroke-width="1" />
                    </g>

                    <g v-if="mode === 'combined'">
                        <rect
                            v-for="bar in barRects"
                            :key="bar.label"
                            :x="bar.x"
                            :y="bar.y"
                            :width="bar.width"
                            :height="bar.height"
                            :rx="bar.width / 2"
                            :fill="bar.value >= 0 ? `url(#${barPositiveGradientId})` : `url(#${barNegativeGradientId})`"
                            :opacity="bar.value >= 0 ? 0.9 : 0.82"
                        />
                    </g>

                    <path
                        v-if="areaPath"
                        :d="areaPath"
                        :fill="`url(#${areaGradientId})`"
                        opacity="0.95"
                    />
                    <path
                        v-if="linePath"
                        :d="linePath"
                        fill="none"
                        stroke="#2dd4bf"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        :filter="`url(#${glowId})`"
                    />
                    <path
                        v-if="linePath"
                        :d="linePath"
                        fill="none"
                        stroke="#8ff0e5"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        opacity="0.38"
                    />

                    <g>
                        <circle
                            v-for="point in highlightedPoints"
                            :key="point.label"
                            :cx="point.x"
                            :cy="point.y"
                            r="4.5"
                            fill="#030712"
                            stroke="#2dd4bf"
                            stroke-width="2"
                        />
                    </g>

                    <g class="fill-slate-500 text-[11px] uppercase tracking-[0.24em]">
                        <text v-for="label in axisLabels" :key="label.text" :x="label.x" y="308" text-anchor="middle">
                            {{ label.text }}
                        </text>
                    </g>
                </svg>

                <div class="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <AppBadge tone="emerald">Profit</AppBadge>
                    <AppBadge tone="rose">Loss</AppBadge>
                    <AppBadge tone="teal">Cumulative</AppBadge>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import type { ChartPoint } from '@/types';

const props = withDefaults(
    defineProps<{
        bars?: ChartPoint[];
        line: ChartPoint[];
        mode?: 'combined' | 'line';
        loading?: boolean;
    }>(),
    {
        bars: () => [],
        mode: 'combined',
        loading: false,
    },
);

const areaGradientId = `area-${Math.random().toString(36).slice(2, 8)}`;
const barPositiveGradientId = `bar-pos-${Math.random().toString(36).slice(2, 8)}`;
const barNegativeGradientId = `bar-neg-${Math.random().toString(36).slice(2, 8)}`;
const glowId = `glow-${Math.random().toString(36).slice(2, 8)}`;

const chart = {
    width: 912,
    height: 248,
    left: 24,
    right: 24,
    top: 24,
    bottom: 36,
};

const allValues = computed(() => {
    const values = props.line.map((point) => point.value);

    if (props.mode === 'combined') {
        values.push(...props.bars.map((point) => point.value));
    }

    return values;
});

const minValue = computed(() => Math.min(...allValues.value, 0));
const maxValue = computed(() => Math.max(...allValues.value, 0));
const range = computed(() => maxValue.value - minValue.value || 1);
const innerHeight = chart.height - chart.top - chart.bottom;
const innerWidth = chart.width - chart.left - chart.right;

function scaleX(index: number, count: number) {
    if (count <= 1) {
        return chart.left + innerWidth / 2;
    }

    return chart.left + (index / (count - 1)) * innerWidth;
}

function scaleY(value: number) {
    return chart.top + ((maxValue.value - value) / range.value) * innerHeight;
}

const linePoints = computed(() =>
    props.line.map((point, index) => ({
        ...point,
        x: scaleX(index, props.line.length),
        y: scaleY(point.value),
    })),
);

const barRects = computed(() => {
    if (props.mode !== 'combined' || !props.bars.length) {
        return [];
    }

    const baseY = scaleY(0);
    const step = innerWidth / props.bars.length;

    return props.bars.map((point, index) => {
        const centerX = chart.left + step * index + step / 2;
        const width = Math.max(step * 0.42, 8);
        const valueY = scaleY(point.value);
        const top = point.value >= 0 ? valueY : baseY;
        const height = Math.max(Math.abs(baseY - valueY), 2);

        return {
            label: point.label,
            x: centerX - width / 2,
            y: point.value >= 0 ? top : baseY,
            width,
            height,
            value: point.value,
        };
    });
});

const linePath = computed(() => {
    if (!linePoints.value.length) {
        return '';
    }

    return `M ${linePoints.value.map((point) => `${point.x} ${point.y}`).join(' L ')}`;
});

const baselineY = computed(() => {
    if (minValue.value > 0) {
        return chart.top + innerHeight;
    }

    if (maxValue.value < 0) {
        return chart.top;
    }

    return scaleY(0);
});

const areaPath = computed(() => {
    if (!linePoints.value.length) {
        return '';
    }

    const first = linePoints.value[0];
    const last = linePoints.value[linePoints.value.length - 1];

    return `${linePath.value} L ${last.x} ${baselineY.value} L ${first.x} ${baselineY.value} Z`;
});

const highlightedPoints = computed(() => {
    const indexes = [0, Math.floor(linePoints.value.length / 3), Math.floor((linePoints.value.length * 2) / 3), linePoints.value.length - 1];
    return indexes
        .filter((value, index, array) => array.indexOf(value) === index && linePoints.value[value])
        .map((index) => linePoints.value[index]);
});

const gridLines = computed(() => {
    const count = 4;
    return Array.from({ length: count + 1 }, (_value, index) => chart.top + (innerHeight / count) * index);
});

const axisLabels = computed(() => {
    if (!linePoints.value.length) {
        return [];
    }

    const indexes = [0, Math.floor((linePoints.value.length - 1) * 0.25), Math.floor((linePoints.value.length - 1) * 0.5), Math.floor((linePoints.value.length - 1) * 0.75), linePoints.value.length - 1];

    return indexes.map((index, position) => {
        const point = linePoints.value[index];
        return {
            x: point.x,
            text: props.line[index]?.label ?? `P${position + 1}`,
        };
    });
});
</script>
