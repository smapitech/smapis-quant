<template>
    <AppCard class="space-y-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{{ label }}</p>
                <p class="mt-2 text-xl font-semibold text-white">{{ value }}</p>
                <p v-if="detail" class="mt-1 text-sm text-slate-400">{{ detail }}</p>
            </div>
            <StatusPill :label="status" :tone="tone" />
        </div>

        <div class="space-y-3">
            <div class="flex items-center justify-between text-xs text-slate-500">
                <span>Depth</span>
                <span class="font-mono">{{ depth }}%</span>
            </div>
            <div class="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div class="h-full rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400" :style="{ width: `${depth}%` }" />
            </div>
            <div class="flex items-center justify-between text-xs text-slate-500">
                <span>Spread</span>
                <span class="font-mono">{{ spread }}</span>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';

const props = defineProps<{
    label: string;
    value: string;
    depth: number;
    spread: string;
    status: string;
    detail?: string;
}>();

const tone = computed(() => {
    if (props.depth >= 75) {
        return 'emerald';
    }

    if (props.depth >= 50) {
        return 'teal';
    }

    return 'amber';
});
</script>
