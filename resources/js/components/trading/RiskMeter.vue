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

        <div class="space-y-2">
            <div class="flex items-center justify-between text-xs text-slate-500">
                <span>Risk level</span>
                <span class="font-mono">{{ score }}%</span>
            </div>
            <div class="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div class="h-full rounded-full" :class="meterClass" :style="{ width: `${score}%` }" />
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
    score: number;
    status: string;
    detail?: string;
}>();

const tone = computed(() => {
    if (props.score < 40) {
        return 'emerald';
    }

    if (props.score < 70) {
        return 'amber';
    }

    return 'rose';
});

const meterClass = computed(() => {
    if (props.score < 40) {
        return 'bg-gradient-to-r from-emerald-400 to-teal-400';
    }

    if (props.score < 70) {
        return 'bg-gradient-to-r from-amber-400 to-orange-400';
    }

    return 'bg-gradient-to-r from-rose-500 to-red-400';
});
</script>
