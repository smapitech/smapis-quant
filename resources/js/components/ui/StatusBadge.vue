<template>
    <span :class="badgeClasses">
        <slot />
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

const props = withDefaults(
    defineProps<{
        variant?: BadgeVariant;
    }>(),
    {
        variant: 'neutral',
    },
);

const badgeClasses = computed(() => {
    const map: Record<BadgeVariant, string> = {
        neutral: 'bg-white/7 text-slate-300 ring-white/10',
        info: 'bg-cyan-400/10 text-cyan-200 ring-cyan-400/20',
        success: 'bg-emerald-400/10 text-emerald-200 ring-emerald-400/20',
        warning: 'bg-amber-400/10 text-amber-200 ring-amber-400/20',
        danger: 'bg-rose-400/10 text-rose-200 ring-rose-400/20',
    };

    return [
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 backdrop-blur',
        map[props.variant],
    ];
});
</script>
