<template>
    <section class="space-y-6">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AppCard v-for="stat in scannerSummaryStats.slice(0, 4)" :key="stat.label" class="space-y-2">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">{{ stat.label }}</p>
                <p class="font-mono text-3xl font-semibold text-white">{{ stat.value }}</p>
                <p class="text-sm text-emerald-300">{{ stat.change }}</p>
            </AppCard>
        </div>

        <div class="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Ranked opportunities</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">The desk-ready list that feeds the scanner and detail view</h2>
                    </div>
                    <AppButton to="/scanner" variant="secondary" size="sm">Live scanner</AppButton>
                </div>

                <AppTable>
                    <thead>
                        <tr class="text-xs uppercase tracking-[0.28em] text-slate-500">
                            <th class="px-4 py-4 font-medium">Pair</th>
                            <th class="px-4 py-4 font-medium">Buy</th>
                            <th class="px-4 py-4 font-medium">Sell</th>
                            <th class="px-4 py-4 font-medium">Profit</th>
                            <th class="px-4 py-4 font-medium">SQIS</th>
                            <th class="px-4 py-4 font-medium">Risk</th>
                            <th class="px-4 py-4 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <OpportunityRow v-for="opportunity in scannerOpportunities" :key="opportunity.id" :opportunity="opportunity" />
                    </tbody>
                </AppTable>
            </AppCard>

            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Smart profiles</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">AI filter profiles for different desk modes</h2>
                    </div>
                    <StatusPill label="Ready" tone="teal" />
                </div>
                <div class="space-y-3">
                    <div v-for="profile in scannerProfiles" :key="profile.id" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <p class="text-sm font-semibold text-white">{{ profile.name }}</p>
                                <p class="mt-1 text-sm text-slate-400">{{ profile.description }}</p>
                            </div>
                            <StatusPill :label="profile.active ? 'Active' : 'Available'" :tone="profile.active ? 'emerald' : 'slate'" />
                        </div>
                        <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                            <AppBadge tone="slate">{{ profile.riskBias }}</AppBadge>
                            <span>Min SQIS {{ profile.minSqis }}</span>
                            <span>Min profit {{ profile.minProfit }}%</span>
                        </div>
                    </div>
                </div>
            </AppCard>
        </div>

        <AppCard class="space-y-4">
            <div class="flex items-center justify-between gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Empty state</p>
                    <h2 class="mt-2 text-xl font-semibold text-white">Designed for quiet markets and zero-result scans</h2>
                </div>
                <StatusPill label="Fallback ready" tone="amber" />
            </div>
            <p class="max-w-3xl text-sm leading-6 text-slate-400">
                Even when the scanner returns nothing, the page still gives the user a calm, informative empty state with next-step guidance.
                That keeps the platform feeling deliberate instead of broken.
            </p>
        </AppCard>
    </section>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppTable from '@/components/ui/AppTable.vue';
import OpportunityRow from '@/components/trading/OpportunityRow.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import { scannerOpportunities, scannerProfiles, scannerSummaryStats } from '@/data/mockData';
</script>
