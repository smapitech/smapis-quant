<template>
    <AppCard class="space-y-4">
        <div class="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Main Live Table</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Live arbitrage opportunities</h3>
                <p class="mt-1 text-sm text-slate-400">Selectable rows, row actions, and a mobile card fallback.</p>
            </div>

            <div class="flex items-center gap-3">
                <AppBadge tone="teal">{{ rows.length }} live</AppBadge>
                <AppButton variant="secondary" size="sm" @click="$emit('refresh')">Refresh</AppButton>
            </div>
        </div>

        <div v-if="loading" class="space-y-4">
            <div class="h-12 rounded-2xl border border-white/10 bg-white/[0.04] animate-pulse" />
            <div class="space-y-3">
                <div v-for="index in 6" :key="index" class="h-24 rounded-2xl border border-white/10 bg-white/[0.04] animate-pulse" />
            </div>
        </div>

        <template v-else>
            <div v-if="rows.length" class="hidden overflow-x-auto lg:block">
                <table class="min-w-[1680px] border-separate border-spacing-0 text-left text-sm">
                    <thead>
                        <tr class="text-xs uppercase tracking-[0.26em] text-slate-500">
                            <th class="px-4 py-4 font-medium">#</th>
                            <th class="px-4 py-4 font-medium">Favorite</th>
                            <th class="px-4 py-4 font-medium">Coin</th>
                            <th class="px-4 py-4 font-medium">Network</th>
                            <th class="px-4 py-4 font-medium">Buy Exchange</th>
                            <th class="px-4 py-4 font-medium">Buy Price</th>
                            <th class="px-4 py-4 font-medium">Sell Exchange</th>
                            <th class="px-4 py-4 font-medium">Sell Price</th>
                            <th class="px-4 py-4 font-medium">Spread %</th>
                            <th class="px-4 py-4 font-medium">Gross Profit</th>
                            <th class="px-4 py-4 font-medium">Fees</th>
                            <th class="px-4 py-4 font-medium">Net Profit</th>
                            <th class="px-4 py-4 font-medium">Liquidity</th>
                            <th class="px-4 py-4 font-medium">Order Book</th>
                            <th class="px-4 py-4 font-medium">Exchange Health</th>
                            <th class="px-4 py-4 font-medium">SQIS</th>
                            <th class="px-4 py-4 font-medium">AI Confidence</th>
                            <th class="px-4 py-4 font-medium">Risk</th>
                            <th class="px-4 py-4 font-medium">Execution Time</th>
                            <th class="px-4 py-4 font-medium">Status</th>
                            <th class="px-4 py-4 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ScannerRow
                            v-for="(row, index) in rows"
                            :key="row.id"
                            :opportunity="row"
                            :index="index + 1"
                            :selected="row.id === selectedId"
                            @select="$emit('select', $event)"
                            @action="$emit('action', $event)"
                            @toggle-favorite="$emit('toggle-favorite', $event)"
                        >
                        </ScannerRow>
                    </tbody>
                </table>
            </div>

            <div v-else class="rounded-[22px] border border-dashed border-white/10 bg-white/[0.02] p-6 text-center">
                <div class="mx-auto max-w-xl space-y-3">
                    <AppBadge tone="amber">Empty state</AppBadge>
                    <h4 class="text-2xl font-semibold text-white">{{ emptyState.title }}</h4>
                    <p class="text-sm leading-6 text-slate-400">{{ emptyState.description }}</p>
                </div>
            </div>

            <div class="grid gap-4 lg:hidden">
                <ScannerRow
                    v-for="row in rows"
                    :key="row.id"
                    :opportunity="row"
                    variant="card"
                    :selected="row.id === selectedId"
                    @select="$emit('select', $event)"
                    @action="$emit('action', $event)"
                    @toggle-favorite="$emit('toggle-favorite', $event)"
                />
            </div>

            <div v-if="rows.length" class="flex flex-col gap-3 border-t border-white/8 pt-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                <p>Showing 1 to {{ rows.length }} of 186 opportunities</p>
                <div class="flex flex-wrap items-center gap-2">
                    <span class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-300">1</span>
                    <span class="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-slate-500">2</span>
                    <span class="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-slate-500">3</span>
                    <span class="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-slate-500">4</span>
                    <span class="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-slate-500">5</span>
                    <span class="px-1 text-slate-600">…</span>
                    <span class="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-slate-500">19</span>
                </div>
            </div>
        </template>
    </AppCard>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import ScannerRow from '@/components/scanner/ScannerRow.vue';
import type { ScannerOpportunityRow } from '@/types';

defineProps<{
    rows: ScannerOpportunityRow[];
    selectedId: string;
    loading?: boolean;
    emptyState: {
        title: string;
        description: string;
    };
}>();

defineEmits<{
    select: [id: string];
    action: [{ type: string; id: string }];
    'toggle-favorite': [id: string];
    refresh: [];
}>();
</script>
