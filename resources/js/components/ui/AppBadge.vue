<template>
    <span :class="badgeClasses">
        <slot />
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type AppBadgeTone = 'neutral' | 'teal' | 'emerald' | 'amber' | 'rose' | 'slate' | 'info' | 'success' | 'warning' | 'danger';

const props = withDefaults(
    defineProps<{
        tone?: AppBadgeTone;
        subtle?: boolean;
    }>(),
    {
        tone: 'neutral',
        subtle: false,
    },
);

const toneClasses: Record<AppBadgeTone, string> = {
    neutral: 'bg-white/[0.06] text-slate-200 ring-white/10',
    slate: 'bg-slate-500/10 text-slate-200 ring-slate-400/15',
    teal: 'bg-teal-400/10 text-teal-200 ring-teal-400/15',
    emerald: 'bg-emerald-400/10 text-emerald-200 ring-emerald-400/15',
    amber: 'bg-amber-400/10 text-amber-200 ring-amber-400/15',
    rose: 'bg-rose-400/10 text-rose-200 ring-rose-400/15',
    info: 'bg-cyan-400/10 text-cyan-200 ring-cyan-400/15',
    success: 'bg-emerald-400/10 text-emerald-200 ring-emerald-400/15',
    warning: 'bg-amber-400/10 text-amber-200 ring-amber-400/15',
    danger: 'bg-rose-400/10 text-rose-200 ring-rose-400/15',
};

const badgeClasses = computed(() => [
    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 backdrop-blur',
    toneClasses[props.tone],
    props.subtle ? 'uppercase tracking-[0.2em]' : '',
]);
</script>
