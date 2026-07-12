<template>
    <AppCard class="space-y-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{{ label }}</p>
                <h3 class="mt-2 text-xl font-semibold text-white">{{ name }}</h3>
                <p class="mt-1 text-sm text-slate-400">{{ venue }} - {{ region }}</p>
            </div>
            <StatusPill :label="statusLabel" :tone="tone" />
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Latency</p>
                <p class="mt-2 font-mono text-2xl text-white">{{ latency }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Markets</p>
                <p class="mt-2 font-mono text-2xl text-white">{{ markets }}</p>
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
    name: string;
    venue: string;
    region: string;
    latency: string;
    markets: number;
    status?: 'connected' | 'syncing' | 'limited' | 'offline';
}>();

const statusLabel = computed(() => props.status ?? 'connected');

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
