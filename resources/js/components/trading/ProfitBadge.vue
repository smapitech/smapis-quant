<template>
    <AppBadge :tone="tone">
        <span class="font-mono">{{ prefix }}{{ formatted }}</span>
    </AppBadge>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';

const props = withDefaults(
    defineProps<{
        value: string | number;
        prefix?: string;
    }>(),
    {
        prefix: '',
    },
);

const formatted = computed(() => String(props.value));
const tone = computed(() => {
    const raw = Number(String(props.value).replace(/[^\d.-]/g, ''));

    if (Number.isNaN(raw) || raw === 0) {
        return 'slate';
    }

    return raw > 0 ? 'emerald' : 'rose';
});
</script>
