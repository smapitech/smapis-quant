<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between gap-3">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{{ label }}</p>
                <h4 class="mt-2 text-lg font-semibold text-white">{{ displayValue }}</h4>
            </div>
            <AppBadge tone="teal">{{ displayValue }}</AppBadge>
        </div>

        <input
            v-model.number="currentValue"
            :aria-label="label"
            :max="max"
            :min="min"
            :step="step"
            class="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/[0.08] accent-teal-400"
            type="range"
        >

        <div class="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-500">
            <span>{{ formatCurrency(min) }}</span>
            <span>{{ formatCurrency(max) }}</span>
        </div>

        <div v-if="presets.length" class="flex flex-wrap gap-2">
            <button
                v-for="preset in presets"
                :key="preset"
                type="button"
                class="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-slate-300 transition hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                @click="currentValue = preset"
            >
                {{ formatCurrency(preset) }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';

const props = withDefaults(
    defineProps<{
        modelValue: number;
        label?: string;
        min?: number;
        max?: number;
        step?: number;
        presets?: number[];
    }>(),
    {
        label: 'Position size',
        min: 100,
        max: 10000,
        step: 100,
        presets: () => [100, 500, 1000, 2500, 5000, 10000],
    },
);

const emit = defineEmits<{
    'update:modelValue': [value: number];
}>();

const currentValue = computed({
    get: () => props.modelValue,
    set: (value: number) => emit('update:modelValue', value),
});

const displayValue = computed(() => formatCurrency(props.modelValue));

function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value);
}
</script>
