<template>
    <div class="space-y-2">
        <div class="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-slate-500">
            <span>{{ label }}</span>
            <span class="font-mono text-slate-300">{{ value }}</span>
        </div>
        <div class="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div :class="meterClasses" :style="{ width: `${depth}%` }" class="h-full rounded-full transition-all duration-500" />
        </div>
        <div class="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-slate-500">
            <span>{{ status }}</span>
            <span>{{ spread }} spread</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    label: string;
    value: string;
    depth: number;
    spread: string;
    status: string;
}>();

const meterClasses = computed(() => {
    if (props.depth >= 80) {
        return 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400';
    }

    if (props.depth >= 55) {
        return 'bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300';
    }

    return 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400';
});
</script>
