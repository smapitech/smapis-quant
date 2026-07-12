<template>
    <AppBadge :tone="tone" class="inline-flex items-center gap-2">
        <span :class="dotClasses" />
        <span class="font-medium">{{ label }}</span>
    </AppBadge>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';

const props = withDefaults(
    defineProps<{
        label: string;
        tone?: 'neutral' | 'teal' | 'emerald' | 'amber' | 'rose' | 'slate' | 'info' | 'success' | 'warning' | 'danger';
    }>(),
    {
        tone: 'neutral',
    },
);

const dotClasses = computed(() => {
    const map: Record<string, string> = {
        neutral: 'bg-slate-300',
        slate: 'bg-slate-400',
        teal: 'bg-teal-300',
        emerald: 'bg-emerald-300',
        amber: 'bg-amber-300',
        rose: 'bg-rose-300',
        info: 'bg-cyan-300',
        success: 'bg-emerald-300',
        warning: 'bg-amber-300',
        danger: 'bg-rose-300',
    };

    return ['h-1.5 w-1.5 rounded-full', map[props.tone]];
});

const tone = computed(() => props.tone);
</script>
