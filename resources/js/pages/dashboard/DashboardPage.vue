<template>
    <section class="space-y-8 pb-10">
        <header class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div class="min-w-0 space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.34em] text-teal-300/80">
                    Workspace overview
                </p>
                <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Dashboard
                </h2>
                <p class="max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
                    Welcome back, Isaac. Here&apos;s your trading intelligence overview.
                </p>
            </div>

            <div class="flex items-center gap-3">
                <StatusPill label="Live Trading Enabled" tone="emerald" />
                <AppButton variant="secondary" size="md" type="button">
                    Configure Dashboard
                </AppButton>
            </div>
        </header>

        <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-7">
            <StatCard
                v-for="card in dashboardSummaryCards"
                :key="card.label"
                :card="card"
            />
        </section>

        <section class="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.82fr)]">
            <div class="space-y-6">
                <PortfolioOverviewCard
                    :series="dashboardPortfolioSeries"
                    :allocation="portfolioCapitalAllocation"
                    :performance-metrics="portfolioPerformanceMetrics"
                />

                <TopOpportunitiesTable :rows="topOpportunities" />

                <DashboardChartCard
                    title="Profit & Loss Overview"
                    eyebrow="Performance pulse"
                    badge="Today"
                    badge-tone="emerald"
                    metric-label="Today's Profit"
                    metric-value="$1,248.75"
                    metric-hint="+12.61% vs yesterday"
                    metric-tone="emerald"
                    :tabs="dashboardPnlFilters"
                    v-model:activeTab="selectedPnlRange"
                >
                    <ProfitLossChart
                        :bars="portfolioPnlBars"
                        :line="portfolioPnlLine"
                        mode="combined"
                    />
                </DashboardChartCard>

                <AssetAllocationCard
                    total-value="$125,430.16"
                    :items="assetAllocation"
                />
            </div>

            <div class="space-y-6">
                <AIDecisionFeed :items="aiDecisionFeed" />

                <SQISDistributionCard
                    :score="85"
                    band="High Quality"
                    :items="sqisDistribution"
                />

                <RiskOverviewCard
                    :score="22"
                    label="Low Risk"
                    :metrics="riskMetrics"
                />

                <QuickActionsCard :actions="quickActions" />

                <UpcomingEventsCard :events="upcomingEvents" />
            </div>
        </section>

        <footer class="space-y-5 border-t border-white/8 pt-6">
            <div class="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
                <div class="space-y-2">
                    <p class="text-sm font-medium text-slate-200">
                        Server Time: {{ serverTimeLabel }} UTC
                    </p>
                    <p class="text-sm text-slate-500">
                        Version 1.0.0
                    </p>
                    <p class="max-w-4xl text-sm leading-6 text-slate-500">
                        Smapis Quant AI provides trading intelligence and automation tools. Trading involves risk. No profit is guaranteed.
                    </p>
                </div>

                <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <template v-for="link in dashboardFooterLinks" :key="link.label">
                        <a
                            v-if="link.external"
                            :href="link.href"
                            target="_blank"
                            rel="noreferrer noopener"
                            class="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition hover:border-white/12 hover:bg-white/[0.05] hover:text-white"
                        >
                            <span class="block font-medium text-white">{{ link.label }}</span>
                            <span class="mt-1 block text-xs leading-5 text-slate-500">{{ link.description }}</span>
                        </a>
                        <RouterLink
                            v-else
                            :to="link.href"
                            class="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition hover:border-white/12 hover:bg-white/[0.05] hover:text-white"
                        >
                            <span class="block font-medium text-white">{{ link.label }}</span>
                            <span class="mt-1 block text-xs leading-5 text-slate-500">{{ link.description }}</span>
                        </RouterLink>
                    </template>
                </div>
            </div>

            <div class="flex flex-col gap-3 border-t border-white/8 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <p>All systems remain in mock-data mode until API integration is enabled.</p>
                <div class="flex flex-wrap items-center gap-4">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Help Center</span>
                </div>
            </div>
        </footer>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

import AppButton from '@/components/ui/AppButton.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import AIDecisionFeed from '@/components/dashboard/AIDecisionFeed.vue';
import AssetAllocationCard from '@/components/dashboard/AssetAllocationCard.vue';
import DashboardChartCard from '@/components/dashboard/DashboardChartCard.vue';
import PortfolioOverviewCard from '@/components/dashboard/PortfolioOverviewCard.vue';
import ProfitLossChart from '@/components/dashboard/ProfitLossChart.vue';
import QuickActionsCard from '@/components/dashboard/QuickActionsCard.vue';
import RiskOverviewCard from '@/components/dashboard/RiskOverviewCard.vue';
import SQISDistributionCard from '@/components/dashboard/SQISDistributionCard.vue';
import StatCard from '@/components/dashboard/StatCard.vue';
import TopOpportunitiesTable from '@/components/dashboard/TopOpportunitiesTable.vue';
import UpcomingEventsCard from '@/components/dashboard/UpcomingEventsCard.vue';
import {
    aiDecisionFeed,
    assetAllocation,
    dashboardFooterLinks,
    dashboardPnlFilters,
    dashboardPortfolioSeries,
    dashboardSummaryCards,
    portfolioCapitalAllocation,
    portfolioPerformanceMetrics,
    portfolioPnlBars,
    portfolioPnlLine,
    quickActions,
    riskMetrics,
    sqisDistribution,
    topOpportunities,
    upcomingEvents,
} from '@/data/dashboardData';

const selectedPnlRange = ref(dashboardPnlFilters[1]);

const serverTimeLabel = computed(() =>
    new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'medium',
        timeZone: 'UTC',
    }).format(new Date()),
);
</script>
