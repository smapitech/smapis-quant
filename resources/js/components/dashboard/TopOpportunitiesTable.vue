<template>
    <AppCard class="space-y-4" :padded="false">
        <div class="flex items-center justify-between gap-4 px-5 pt-5 sm:px-6">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Top Opportunities</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Highest quality arbitrage spreads</h3>
            </div>
            <AppButton to="/opportunities" variant="ghost" size="sm">View All</AppButton>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full border-separate border-spacing-0 text-left text-sm">
                <thead>
                    <tr class="text-xs uppercase tracking-[0.24em] text-slate-500">
                        <th class="px-5 pb-4 pt-3 font-medium sm:px-6">Pair</th>
                        <th class="px-5 pb-4 pt-3 font-medium sm:px-6">Buy Exchange</th>
                        <th class="px-5 pb-4 pt-3 font-medium sm:px-6">Sell Exchange</th>
                        <th class="px-5 pb-4 pt-3 font-medium sm:px-6">Estimated Profit</th>
                        <th class="px-5 pb-4 pt-3 font-medium sm:px-6">SQIS</th>
                        <th class="px-5 pb-4 pt-3 font-medium sm:px-6">Risk</th>
                        <th class="px-5 pb-4 pt-3 font-medium sm:px-6">Action</th>
                    </tr>
                </thead>

                <tbody v-if="loading">
                    <tr v-for="index in 5" :key="index" class="border-t border-white/6">
                        <td v-for="column in 7" :key="`${index}-${column}`" class="px-5 py-4 sm:px-6">
                            <div class="h-4 w-full max-w-[120px] rounded-full bg-white/8" />
                        </td>
                    </tr>
                </tbody>

                <tbody v-else-if="!rows.length">
                    <tr>
                        <td colspan="7" class="px-5 py-8 sm:px-6">
                            <div class="rounded-[24px] border border-dashed border-white/8 bg-white/[0.02] p-6 text-center">
                                <p class="text-base font-medium text-white">No opportunities are available right now.</p>
                                <p class="mt-2 text-sm leading-6 text-slate-400">
                                    Once the scanner is connected, ranked arbitrage rows will populate this table.
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>

                <tbody v-else>
                    <tr
                        v-for="row in rows"
                        :key="row.pair"
                        class="border-t border-white/6 transition hover:bg-white/[0.025]"
                    >
                        <td class="px-5 py-4 sm:px-6">
                            <div class="space-y-1">
                                <p class="font-semibold text-white">{{ row.pair }}</p>
                                <p class="text-xs text-slate-500">Cross-exchange arbitrage</p>
                            </div>
                        </td>
                        <td class="px-5 py-4 sm:px-6 text-slate-300">{{ row.buyExchange }}</td>
                        <td class="px-5 py-4 sm:px-6 text-slate-300">{{ row.sellExchange }}</td>
                        <td class="px-5 py-4 sm:px-6">
                            <p class="font-mono text-emerald-300">{{ row.estimatedProfit }}</p>
                        </td>
                        <td class="px-5 py-4 sm:px-6">
                            <div class="space-y-1">
                                <p class="font-mono text-lg text-white">{{ row.sqis }}</p>
                                <p class="text-xs text-slate-500">Quality score</p>
                            </div>
                        </td>
                        <td class="px-5 py-4 sm:px-6">
                            <StatusPill :label="row.risk" :tone="row.riskTone" />
                        </td>
                        <td class="px-5 py-4 sm:px-6">
                            <AppButton :to="detailLink(row.pair)" variant="secondary" size="sm">View</AppButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { DashboardOpportunityRow } from '@/types';

const props = withDefaults(
    defineProps<{
        rows: DashboardOpportunityRow[];
        loading?: boolean;
    }>(),
    {
        loading: false,
    },
);

function detailLink(pair: string) {
    return `/opportunities/${pair.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-')}`;
}
</script>
