<template>
    <section class="space-y-6">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AppCard v-for="stat in paperTradeStats" :key="stat.label" class="space-y-2">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">{{ stat.label }}</p>
                <p class="font-mono text-3xl font-semibold text-white">{{ stat.value }}</p>
                <p class="text-sm text-emerald-300">{{ stat.change }}</p>
                <p class="text-sm leading-6 text-slate-400">{{ stat.note }}</p>
            </AppCard>
        </div>

        <div class="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Paper curve</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Simulation performance snapshot</h2>
                    </div>
                    <AppBadge tone="teal">Paper only</AppBadge>
                </div>
                <div class="h-48 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <ProfitTrendChart :series="paperTrend" />
                </div>
                <div class="grid gap-3 sm:grid-cols-2">
                    <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Isolation</p>
                        <p class="mt-2 text-sm text-slate-300">Paper lane stays separated from live capital.</p>
                    </div>
                    <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Integration note</p>
                        <p class="mt-2 text-sm text-slate-300">Later this will stream from real trade events.</p>
                    </div>
                </div>
            </AppCard>

            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Journal</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Recent simulation activity</h2>
                    </div>
                    <AppButton variant="secondary" size="sm">New paper trade</AppButton>
                </div>
                <div class="space-y-3">
                    <div v-for="trade in paperTrades.slice(0, 3)" :key="trade.id" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <p class="text-sm font-semibold text-white">{{ trade.symbol }}</p>
                                <p class="mt-1 text-sm text-slate-400">{{ trade.strategy }} - {{ trade.openedAt }}</p>
                            </div>
                            <StatusPill :label="trade.status" :tone="tradeTone(trade.status)" />
                        </div>
                        <div class="mt-3 flex flex-wrap gap-2">
                            <AppBadge tone="slate">{{ trade.side }}</AppBadge>
                            <ProfitBadge :value="trade.pnl" />
                            <AppBadge tone="slate">{{ trade.exchange }}</AppBadge>
                        </div>
                    </div>
                </div>
            </AppCard>
        </div>

        <AppCard class="space-y-4">
            <div class="flex items-center justify-between gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Trade table</p>
                    <h2 class="mt-2 text-xl font-semibold text-white">Every simulated trade in one view</h2>
                </div>
                <AppBadge tone="amber">{{ paperTrades.length }} trades</AppBadge>
            </div>
            <AppTable>
                <thead>
                    <tr class="text-xs uppercase tracking-[0.28em] text-slate-500">
                        <th class="px-4 py-4 font-medium">Symbol</th>
                        <th class="px-4 py-4 font-medium">Status</th>
                        <th class="px-4 py-4 font-medium">Entry</th>
                        <th class="px-4 py-4 font-medium">Exit</th>
                        <th class="px-4 py-4 font-medium">PnL</th>
                        <th class="px-4 py-4 font-medium">Confidence</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="trade in paperTrades" :key="trade.id" class="border-b border-white/6 last:border-b-0">
                        <td class="px-4 py-4">
                            <div>
                                <p class="font-medium text-white">{{ trade.symbol }}</p>
                                <p class="mt-1 text-sm text-slate-400">{{ trade.strategy }} - {{ trade.openedAt }}</p>
                            </div>
                        </td>
                        <td class="px-4 py-4">
                            <StatusPill :label="trade.status" :tone="tradeTone(trade.status)" />
                        </td>
                        <td class="px-4 py-4 font-mono text-white">{{ trade.entry }}</td>
                        <td class="px-4 py-4 font-mono text-white">{{ trade.exit }}</td>
                        <td class="px-4 py-4">
                            <ProfitBadge :value="trade.pnl" />
                        </td>
                        <td class="px-4 py-4 font-mono text-white">{{ trade.confidence }}%</td>
                    </tr>
                </tbody>
            </AppTable>
        </AppCard>
    </section>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppTable from '@/components/ui/AppTable.vue';
import ProfitBadge from '@/components/trading/ProfitBadge.vue';
import ProfitTrendChart from '@/components/charts/ProfitTrendChart.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import { paperTradeStats, paperTrades, profitTrendSeries } from '@/data/mockData';

const paperTrend = profitTrendSeries;

function tradeTone(status: string) {
    switch (status) {
        case 'open':
            return 'emerald';
        case 'closed':
            return 'slate';
        case 'queued':
            return 'amber';
        default:
            return 'rose';
    }
}
</script>
