<template>
    <AppCard class="space-y-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">System Status</p>
                <h3 v-if="!compact" class="mt-2 text-xl font-semibold text-white">Operational health</h3>
            </div>
            <StatusPill :label="status.label" :tone="status.tone" />
        </div>

        <div class="grid gap-3" :class="compact ? 'grid-cols-1' : 'sm:grid-cols-2'">
            <div class="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)]" :class="compact ? 'p-3' : 'p-4'">
                <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Latency</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ status.latency }}</p>
            </div>
            <div class="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)]" :class="compact ? 'p-3' : 'p-4'">
                <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Uptime</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ status.uptime }}</p>
            </div>
        </div>

        <p v-if="!compact" class="text-sm leading-6 text-slate-400">
            Infrastructure health, API responsiveness, and route status are tracked here for future live integration.
        </p>
    </AppCard>
</template>

<script setup lang="ts">
import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { DashboardTone } from '@/types';

type SystemStatusPayload = {
    label: string;
    latency: string;
    uptime: string;
    tone: DashboardTone;
};

const props = withDefaults(
    defineProps<{
        status: SystemStatusPayload;
        compact?: boolean;
    }>(),
    {
        compact: false,
    },
);
</script>
