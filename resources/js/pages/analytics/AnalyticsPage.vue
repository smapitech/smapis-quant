<template>
    <section class="space-y-6">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AppCard v-for="stat in analyticsStats" :key="stat.label" class="space-y-2">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">{{ stat.label }}</p>
                <p class="font-mono text-3xl font-semibold text-white">{{ stat.value }}</p>
                <p class="text-sm text-emerald-300">{{ stat.change }}</p>
                <p class="text-sm leading-6 text-slate-400">{{ stat.note }}</p>
            </AppCard>
        </div>

        <div class="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Performance</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Trend line and return behavior</h2>
                    </div>
                    <AppBadge tone="teal">Analytics</AppBadge>
                </div>
                <div class="h-48 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <ProfitTrendChart :series="analyticsSeries" />
                </div>
                <div class="grid gap-3 sm:grid-cols-2">
                    <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Win rate</p>
                        <p class="mt-2 font-mono text-2xl text-white">63%</p>
                    </div>
                    <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Drawdown</p>
                        <p class="mt-2 font-mono text-2xl text-white">-4.2%</p>
                    </div>
                </div>
            </AppCard>

            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Performance windows</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">A lightweight analytics breakdown</h2>
                    </div>
                    <StatusPill label="Review" tone="amber" />
                </div>
                <AppTable>
                    <thead>
                        <tr class="text-xs uppercase tracking-[0.28em] text-slate-500">
                            <th class="px-4 py-4 font-medium">Day</th>
                            <th class="px-4 py-4 font-medium">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="point in analyticsSeries" :key="point.label" class="border-b border-white/6 last:border-b-0">
                            <td class="px-4 py-4 text-white">{{ point.label }}</td>
                            <td class="px-4 py-4 font-mono text-white">{{ point.value }}</td>
                        </tr>
                    </tbody>
                </AppTable>
            </AppCard>
        </div>
    </section>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppTable from '@/components/ui/AppTable.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import ProfitTrendChart from '@/components/charts/ProfitTrendChart.vue';
import { analyticsSeries, analyticsStats } from '@/data/mockData';
</script>
