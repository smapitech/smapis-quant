<template>
    <AppCard class="space-y-4">
        <div class="flex items-center justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Quick Actions</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Operational shortcuts</h3>
            </div>
            <StatusPill label="Ready" tone="emerald" />
        </div>

        <div v-if="loading" class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div v-for="index in 6" :key="index" class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div class="h-4 w-1/2 rounded-full bg-white/8" />
                <div class="mt-3 h-3 w-full rounded-full bg-white/8" />
            </div>
        </div>

        <div v-else-if="!actions.length" class="rounded-[24px] border border-dashed border-white/8 bg-white/[0.02] p-6 text-center">
            <p class="text-base font-medium text-white">No quick actions available.</p>
            <p class="mt-2 text-sm leading-6 text-slate-400">
                Actions will be mapped to live workflows once the execution layer is introduced.
            </p>
        </div>

        <div v-else class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <RouterLink
                v-for="action in actions"
                :key="action.label"
                :to="action.to"
                class="group rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] p-4 transition hover:border-white/12 hover:bg-white/[0.05]"
            >
                <div class="flex items-start gap-4">
                    <div :class="toneIconClasses(action.tone)" class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-[11px] font-semibold tracking-[0.28em]">
                        {{ action.icon }}
                    </div>
                    <div class="min-w-0 flex-1">
                        <p class="font-medium text-white">{{ action.label }}</p>
                        <p class="mt-1 text-sm leading-6 text-slate-400">{{ action.description }}</p>
                    </div>
                </div>
            </RouterLink>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { DashboardQuickAction, DashboardTone } from '@/types';

const props = withDefaults(
    defineProps<{
        actions: DashboardQuickAction[];
        loading?: boolean;
    }>(),
    {
        loading: false,
    },
);

function toneIconClasses(tone: DashboardTone) {
    const map: Record<DashboardTone, string> = {
        teal: 'border-teal-400/15 bg-teal-400/[0.08] text-teal-200',
        emerald: 'border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-200',
        amber: 'border-amber-400/15 bg-amber-400/[0.08] text-amber-200',
        rose: 'border-rose-400/15 bg-rose-400/[0.08] text-rose-200',
        slate: 'border-white/10 bg-white/[0.05] text-slate-200',
    };

    return map[tone];
}
</script>
