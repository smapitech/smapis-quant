<template>
    <BaseCard class="flex h-full flex-col justify-between p-5">
        <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">{{ label }}</p>
                <p class="mt-3 text-2xl font-semibold text-white sm:text-3xl">{{ value }}</p>
            </div>
            <StatusBadge :variant="trendVariant">{{ change }}</StatusBadge>
        </div>
        <p class="mt-4 text-sm leading-6 text-slate-400">{{ note }}</p>
    </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import BaseCard from '@/components/ui/BaseCard.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';
import type { TrendDirection } from '@/types';

const props = defineProps<{
    label: string;
    value: string;
    change: string;
    note: string;
    trend: TrendDirection;
}>();

const trendVariant = computed(() => {
    if (props.trend === 'up') {
        return 'success';
    }

    if (props.trend === 'down') {
        return 'danger';
    }

    return 'neutral';
});
</script>
