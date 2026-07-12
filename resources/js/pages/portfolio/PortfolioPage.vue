<template>
    <section class="space-y-6">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AppCard v-for="stat in portfolioStats" :key="stat.label" class="space-y-2">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">{{ stat.label }}</p>
                <p class="font-mono text-3xl font-semibold text-white">{{ stat.value }}</p>
                <p class="text-sm text-emerald-300">{{ stat.change }}</p>
                <p class="text-sm leading-6 text-slate-400">{{ stat.note }}</p>
            </AppCard>
        </div>

        <div class="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Allocation view</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Capital mix and intraday equity curve</h2>
                    </div>
                    <AppBadge tone="teal">Portfolio</AppBadge>
                </div>
                <div class="h-48 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <ProfitTrendChart :series="portfolioSeries" />
                </div>
                <div class="grid gap-3 sm:grid-cols-2">
                    <div v-for="slice in portfolioAllocationSeries" :key="slice.label" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div class="flex items-center justify-between gap-3 text-sm">
                            <span class="text-slate-300">{{ slice.label }}</span>
                            <span class="font-mono text-white">{{ slice.value }}</span>
                        </div>
                        <div class="mt-3 h-2.5 rounded-full bg-white/[0.06]">
                            <div
                                class="h-2.5 rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300"
                                :style="{ width: `${slice.percentage}%` }"
                            />
                        </div>
                    </div>
                </div>
            </AppCard>

            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Holdings</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Position snapshot and unrealized performance</h2>
                    </div>
                    <AppButton variant="secondary" size="sm">Export</AppButton>
                </div>
                <AppTable>
                    <thead>
                        <tr class="text-xs uppercase tracking-[0.28em] text-slate-500">
                            <th class="px-4 py-4 font-medium">Asset</th>
                            <th class="px-4 py-4 font-medium">Allocation</th>
                            <th class="px-4 py-4 font-medium">Qty</th>
                            <th class="px-4 py-4 font-medium">Market Value</th>
                            <th class="px-4 py-4 font-medium">PnL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="holding in portfolioHoldings" :key="holding.symbol" class="border-b border-white/6 last:border-b-0">
                            <td class="px-4 py-4">
                                <div>
                                    <p class="font-medium text-white">{{ holding.symbol }}</p>
                                    <p class="mt-1 text-sm text-slate-400">{{ holding.name }}</p>
                                </div>
                            </td>
                            <td class="px-4 py-4 font-mono text-white">{{ holding.allocation }}%</td>
                            <td class="px-4 py-4 font-mono text-white">{{ holding.quantity }}</td>
                            <td class="px-4 py-4 font-mono text-white">{{ holding.marketValue }}</td>
                            <td class="px-4 py-4">
                                <ProfitBadge :value="holding.pnl" />
                            </td>
                        </tr>
                    </tbody>
                </AppTable>
            </AppCard>
        </div>
    </section>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppTable from '@/components/ui/AppTable.vue';
import ProfitBadge from '@/components/trading/ProfitBadge.vue';
import ProfitTrendChart from '@/components/charts/ProfitTrendChart.vue';
import { dashboardPortfolioSeries as portfolioSeries, portfolioAllocationSeries, portfolioHoldings, portfolioStats } from '@/data/mockData';
</script>
