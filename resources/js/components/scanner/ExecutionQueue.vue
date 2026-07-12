<template>
    <AppCard class="space-y-4">
        <div class="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Execution Queue</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Queued trades and simulation lanes</h3>
                <p class="mt-1 text-sm text-slate-400">Queued, paper, completed, cancelled, and failed states are grouped here.</p>
            </div>

            <AppTabs v-model="activeTab" :tabs="tabs" />
        </div>

        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <div
                v-for="bucket in buckets"
                :key="bucket.bucket"
                class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">{{ bucket.bucket }}</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ bucket.count }}</p>
            </div>
        </div>

        <div class="space-y-3">
            <article
                v-for="item in activeItems"
                :key="item.id"
                class="rounded-2xl border border-white/8 bg-slate-950/50 p-4 transition hover:border-white/12 hover:bg-white/[0.04]"
            >
                <div class="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p class="text-sm font-semibold text-white">{{ item.pair }}</p>
                        <p class="mt-1 text-sm leading-6 text-slate-400">{{ item.exchangeRoute }}</p>
                        <p class="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">{{ item.note }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <StatusPill :label="item.status" :tone="item.tone" />
                        <ProfitBadge :value="item.estimatedProfit" />
                    </div>
                </div>
            </article>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import AppCard from '@/components/ui/AppCard.vue';
import AppTabs from '@/components/ui/AppTabs.vue';
import ProfitBadge from '@/components/scanner/ProfitBadge.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { ScannerQueueItem } from '@/types';

const props = defineProps<{
    items: ScannerQueueItem[];
}>();

const bucketOrder = ['Queued Trades', 'Paper Trades', 'Completed', 'Cancelled', 'Failed'] as const;
const activeTab = ref(bucketOrder[0]);

const buckets = computed(() =>
    bucketOrder.map((bucket) => ({
        bucket,
        count: props.items.filter((item) => item.bucket === bucket).length,
    })),
);

const tabs = computed(() => buckets.value.map((bucket) => ({ label: bucket.bucket, value: bucket.bucket, badge: String(bucket.count) })));

const activeItems = computed(() => props.items.filter((item) => item.bucket === activeTab.value));
</script>
