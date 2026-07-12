<template>
    <AppCard class="space-y-4">
        <div class="flex items-center justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Upcoming Events</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Macro calendar watchlist</h3>
            </div>
            <AppBadge tone="amber">Calendar</AppBadge>
        </div>

        <div v-if="loading" class="space-y-3">
            <div v-for="index in 3" :key="index" class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div class="h-4 w-2/3 rounded-full bg-white/8" />
                <div class="mt-3 h-3 w-24 rounded-full bg-white/8" />
            </div>
        </div>

        <div v-else-if="!events.length" class="rounded-[24px] border border-dashed border-white/8 bg-white/[0.02] p-6 text-center">
            <p class="text-base font-medium text-white">No macro events scheduled.</p>
            <p class="mt-2 text-sm leading-6 text-slate-400">
                Calendar items will appear here when the desk subscribes to market moving events.
            </p>
        </div>

        <div v-else class="space-y-3">
            <div
                v-for="event in events"
                :key="event.label"
                class="rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.03)] p-4"
            >
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <p class="font-medium text-white">{{ event.label }}</p>
                        <p class="mt-1 text-sm leading-6 text-slate-400">{{ event.detail }}</p>
                    </div>
                    <StatusPill :label="event.countdown" :tone="event.tone" />
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { DashboardEventItem } from '@/types';

const props = withDefaults(
    defineProps<{
        events: DashboardEventItem[];
        loading?: boolean;
    }>(),
    {
        loading: false,
    },
);
</script>
