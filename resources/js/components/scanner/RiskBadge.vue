<template>
    <AppBadge :tone="tone">
        <span class="inline-flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-current" />
            <span class="font-medium">{{ label }}</span>
        </span>
    </AppBadge>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import type { ScannerRiskLevel } from '@/types';
import { scannerRiskTone } from './scannerTheme';

const props = defineProps<{
    label: ScannerRiskLevel;
}>();

const tone = computed(() => scannerRiskTone(props.label));
</script>
