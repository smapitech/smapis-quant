<template>
    <span :class="badgeClasses">
        <span class="inline-flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-current" />
            <span class="font-medium text-white">{{ name }}</span>
        </span>
        <span class="text-[10px] uppercase tracking-[0.26em] text-current/70">{{ venue }}</span>
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { ScannerTone } from '@/types';
import { scannerToneClasses } from './scannerTheme';

const props = defineProps<{
    name: string;
    venue: string;
    tone?: ScannerTone;
    status?: 'connected' | 'syncing' | 'limited' | 'offline';
}>();

const badgeClasses = computed(() => {
    const toneMap = {
        connected: 'emerald',
        syncing: 'teal',
        limited: 'amber',
        offline: 'rose',
    } as const;

    return [
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ring-1',
        scannerToneClasses(props.tone ?? toneMap[props.status ?? 'connected']),
    ];
});
</script>
