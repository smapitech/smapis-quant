<template>
    <AppCard class="space-y-4">
        <div class="flex items-center justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">AI Decision Feed</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Latest committee signals</h3>
            </div>
            <AppButton :to="viewAllTo" variant="ghost" size="sm">View All</AppButton>
        </div>

        <div v-if="loading" class="space-y-3">
            <div v-for="index in 4" :key="index" class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div class="flex items-start gap-4">
                    <div class="h-11 w-11 rounded-2xl bg-white/8" />
                    <div class="min-w-0 flex-1 space-y-2">
                        <div class="h-4 w-2/3 rounded-full bg-white/8" />
                        <div class="h-3 w-full rounded-full bg-white/8" />
                    </div>
                    <div class="h-6 w-16 rounded-full bg-white/8" />
                </div>
            </div>
        </div>

        <div v-else-if="!items.length" class="rounded-[24px] border border-dashed border-white/8 bg-white/[0.02] p-6 text-center">
            <p class="text-base font-medium text-white">No AI decisions yet.</p>
            <p class="mt-2 text-sm leading-6 text-slate-400">
                Real committee events will appear here once the scanner and validation pipeline are connected.
            </p>
        </div>

        <div v-else class="space-y-3">
            <div
                v-for="item in items"
                :key="`${item.title}-${item.time}`"
                class="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] p-4 transition hover:border-white/12 hover:bg-white/[0.05]"
            >
                <div class="flex items-start gap-4">
                    <div :class="toneIconClasses(item.tone)" class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-[11px] font-semibold tracking-[0.25em]">
                        {{ item.icon }}
                    </div>
                    <div class="min-w-0 flex-1 space-y-2">
                        <div class="flex items-start justify-between gap-3">
                            <div class="min-w-0">
                                <p class="font-medium text-white">
                                    {{ item.title }}
                                </p>
                                <p class="mt-1 text-sm leading-6 text-slate-400">
                                    {{ item.text }}
                                </p>
                            </div>
                            <div class="text-right text-xs text-slate-500">
                                {{ item.time }}
                            </div>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <AppBadge v-if="item.badge" :tone="item.badgeTone ?? item.tone">
                                {{ item.badge }}
                            </AppBadge>
                            <AppBadge tone="slate">Live feed</AppBadge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import type { DashboardDecisionFeedItem, DashboardTone } from '@/types';

const props = withDefaults(
    defineProps<{
        items: DashboardDecisionFeedItem[];
        viewAllTo?: string;
        loading?: boolean;
    }>(),
    {
        viewAllTo: '/ai-center',
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
