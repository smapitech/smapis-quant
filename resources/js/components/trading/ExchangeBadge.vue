<template>
    <AppBadge :tone="tone" class="inline-flex items-center gap-2">
        <span class="font-medium">{{ name }}</span>
        <span class="text-[10px] uppercase tracking-[0.26em] text-current/70">{{ venue }}</span>
    </AppBadge>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';

const props = defineProps<{
    name: string;
    venue: string;
    status?: 'connected' | 'syncing' | 'limited' | 'offline';
}>();

const tone = computed(() => {
    if (props.status === 'offline') {
        return 'rose';
    }

    if (props.status === 'limited') {
        return 'amber';
    }

    if (props.status === 'syncing') {
        return 'teal';
    }

    return 'emerald';
});
</script>
