<template>
    <BaseCard class="p-5">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">{{ label }}</p>
                <p class="mt-2 text-3xl font-semibold text-white">{{ score }}/100</p>
            </div>
            <StatusBadge :variant="statusVariant">{{ scoreLabel }}</StatusBadge>
        </div>

        <div class="mt-5 h-3 overflow-hidden rounded-full bg-white/[0.06]">
            <div
                class="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 transition-all"
                :style="{ width: `${score}%` }"
            />
        </div>

        <p class="mt-4 text-sm leading-6 text-slate-400">{{ description }}</p>
    </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import BaseCard from '@/components/ui/BaseCard.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';

const props = withDefaults(
    defineProps<{
        label: string;
        score: number;
        description: string;
        scoreLabel?: string;
    }>(),
    {
        scoreLabel: 'Healthy',
    },
);

const statusVariant = computed(() => {
    if (props.score >= 80) {
        return 'success';
    }

    if (props.score >= 60) {
        return 'warning';
    }

    return 'danger';
});
</script>
