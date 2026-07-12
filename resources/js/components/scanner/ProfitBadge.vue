<template>
    <AppBadge :tone="tone">
        <span class="font-mono font-medium">{{ value }}</span>
    </AppBadge>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import { scannerBadgeToneFromText } from './scannerTheme';

const props = defineProps<{
    value: string;
}>();

const tone = computed(() => scannerBadgeToneFromText(props.value));
</script>
