<template>
    <span :class="badgeClasses">
        <span :class="dotClasses" />
        <span>{{ label }}</span>
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        label: string;
        tone?: 'teal' | 'emerald' | 'amber' | 'rose' | 'slate';
    }>(),
    {
        tone: 'slate',
    },
);

const toneClasses: Record<NonNullable<typeof props.tone>, string> = {
    teal: 'border-teal-400/15 bg-teal-400/8 text-teal-100',
    emerald: 'border-emerald-400/15 bg-emerald-400/8 text-emerald-100',
    amber: 'border-amber-400/15 bg-amber-400/8 text-amber-100',
    rose: 'border-rose-400/15 bg-rose-400/8 text-rose-100',
    slate: 'border-white/10 bg-white/[0.04] text-slate-200',
};

const dotClasses: Record<NonNullable<typeof props.tone>, string> = {
    teal: 'bg-teal-300',
    emerald: 'bg-emerald-300',
    amber: 'bg-amber-300',
    rose: 'bg-rose-300',
    slate: 'bg-slate-400',
};

const badgeClasses = computed(() => [
    'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur',
    toneClasses[props.tone],
]);
</script>
