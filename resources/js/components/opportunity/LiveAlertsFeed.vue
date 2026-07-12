<template>
    <AppCard class="space-y-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Live Alerts</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Real-time feed</h3>
            </div>
            <AppButton variant="ghost" size="sm">View All Alerts</AppButton>
        </div>

        <div class="space-y-3">
            <article
                v-for="alert in alerts"
                :key="`${alert.label}-${alert.time}`"
                class="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.05]"
            >
                <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_0_5px_rgba(45,212,191,0.08)]" :class="indicatorClasses(alert.tone)" />
                <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap items-center gap-2">
                        <p class="font-medium text-white">{{ alert.label }}</p>
                        <AppBadge :tone="alert.tone" subtle>{{ alert.time }}</AppBadge>
                    </div>
                    <p class="mt-1 text-sm leading-6 text-slate-400">{{ alert.detail }}</p>
                </div>
                <span
                    v-if="alert.live"
                    class="mt-1 inline-flex items-center gap-1 rounded-full border border-emerald-400/15 bg-emerald-400/[0.08] px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-emerald-200"
                >
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    Live
                </span>
            </article>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import type { OpportunityLiveAlertItem } from '@/types';

defineProps<{
    alerts: OpportunityLiveAlertItem[];
}>();

function indicatorClasses(tone: OpportunityLiveAlertItem['tone']) {
    const map: Record<OpportunityLiveAlertItem['tone'], string> = {
        emerald: 'bg-emerald-400',
        teal: 'bg-teal-400',
        amber: 'bg-amber-400',
        rose: 'bg-rose-400',
        slate: 'bg-slate-400',
    };

    return map[tone];
}
</script>
