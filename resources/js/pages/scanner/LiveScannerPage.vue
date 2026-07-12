<template>
    <section class="space-y-6 pb-28">
        <header class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div class="space-y-3">
                <div class="flex flex-wrap items-center gap-3">
                    <AppBadge tone="teal" subtle>AI continuously scans connected exchanges</AppBadge>
                    <StatusPill label="LIVE" tone="emerald" />
                </div>
                <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Live Arbitrage Scanner
                </h1>
                <p class="max-w-4xl text-sm leading-6 text-slate-400 sm:text-base">
                    AI continuously scans connected exchanges to discover genuine arbitrage opportunities after fees, liquidity and risk analysis.
                </p>
            </div>

            <div class="flex flex-wrap items-center gap-3">
                <div class="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    <p class="text-[11px] uppercase tracking-[0.26em] text-slate-500">Market Status</p>
                    <p class="mt-1 flex items-center gap-2 font-medium text-emerald-300">
                        <span class="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.12)] animate-pulse" />
                        LIVE
                    </p>
                </div>
                <div class="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-sm text-slate-200">
                    UTC {{ utcClock }}
                </div>
                <AppButton variant="ghost" size="sm" @click="scannerStore.saveCurrentFilters">Save Filter</AppButton>
                <AppButton variant="secondary" size="sm" @click="scannerStore.setMobileFilters(true)">Presets</AppButton>
                <AppButton variant="primary" size="sm">Play Alert</AppButton>
            </div>
        </header>

        <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            <ScannerStatsCard v-for="metric in scannerStore.summaryCards" :key="metric.label" :metric="metric" />
        </section>

        <div v-if="scannerStore.loading" class="rounded-[26px] border border-white/8 bg-[rgba(8,14,26,0.48)] p-5">
            <ScannerLoadingSkeleton />
        </div>

        <template v-else>
            <section class="grid gap-6 xl:grid-cols-[minmax(0,1.58fr)_380px]">
                <div class="space-y-6">
                    <ScannerFilterBar
                        :filters="scannerStore.filters"
                        :presets="scannerStore.presets"
                        :active-preset-id="scannerStore.activePresetId"
                        :primary-filters="scannerStore.primaryFilters"
                        :secondary-filters="scannerStore.secondaryFilters"
                        @preset="scannerStore.applyPreset"
                        @reset="scannerStore.resetFilters"
                        @save="scannerStore.saveCurrentFilters"
                        @refresh="scannerStore.refreshSnapshot"
                        @mobile="scannerStore.toggleMobileFilters"
                        @update:filters="scannerStore.setFilters"
                    />

                    <ScannerTable
                        id="scanner-table"
                        :rows="scannerStore.visibleOpportunities"
                        :selected-id="scannerStore.selectedOpportunity.id"
                        :loading="scannerStore.loading"
                        :empty-state="scannerStore.emptyState"
                        @select="scannerStore.selectOpportunity"
                        @action="handleRowAction"
                        @toggle-favorite="handleFavoriteToggle"
                        @refresh="scannerStore.refreshSnapshot"
                    />

                    <ExecutionQueue id="scanner-queue" :items="scannerStore.queueItems" />
                </div>

                <div class="space-y-6 xl:sticky xl:top-24 xl:self-start">
                    <AIRecommendationCard
                        :recommendation="scannerStore.selectedPreviewSummary.recommendation"
                        :confidence="scannerStore.selectedPreviewSummary.confidence"
                        :reasons="scannerRecommendationReasons"
                        :estimated-duration="scannerStore.selectedPreviewSummary.estimatedDuration"
                        :risk="scannerStore.selectedPreviewSummary.risk"
                    />

                    <SQISGauge
                        :score="scannerStore.selectedOpportunity.sqis"
                        :band="sqisBand"
                        :breakdown="scannerSqisBreakdown"
                    />

                    <OpportunityPreview
                        id="scanner-preview"
                        :opportunity="scannerStore.selectedOpportunity"
                        :summary="scannerStore.selectedPreviewSummary"
                        :committee-votes="scannerStore.committeeVotes"
                        :risk-checks="scannerStore.riskChecks"
                        :replay-steps="scannerStore.replaySteps"
                    />

                    <MarketOverviewCard :metrics="scannerStore.marketOverview" />
                    <HeatMapCard :items="scannerStore.heatmap" />
                    <LiveAlertsFeed id="scanner-alerts" :alerts="scannerStore.alerts" />
                </div>
            </section>
        </template>

        <footer class="space-y-4 border-t border-white/8 pt-6 text-sm text-slate-500">
            <div class="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
                <div class="space-y-2">
                    <p class="text-sm font-medium text-slate-200">Server Time: {{ utcClock }} UTC</p>
                    <p class="text-sm text-slate-500">Version 1.0.0</p>
                    <p class="max-w-4xl text-sm leading-6 text-slate-500">
                        {{ scannerFooterCopy }}
                    </p>
                </div>

                <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <template v-for="link in footerLinks" :key="link.label">
                        <a
                            v-if="link.external"
                            :href="link.href"
                            class="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm transition hover:border-white/12 hover:bg-white/[0.06] hover:text-white"
                        >
                            <span class="block font-medium text-white">{{ link.label }}</span>
                            <span class="mt-1 block text-xs leading-5 text-slate-500">{{ link.description }}</span>
                        </a>
                        <RouterLink
                            v-else
                            :to="link.to"
                            class="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm transition hover:border-white/12 hover:bg-white/[0.06] hover:text-white"
                        >
                            <span class="block font-medium text-white">{{ link.label }}</span>
                            <span class="mt-1 block text-xs leading-5 text-slate-500">{{ link.description }}</span>
                        </RouterLink>
                    </template>
                </div>
            </div>
        </footer>

        <AppModal v-model:open="scannerStore.mobileFiltersOpen" title="Scanner Filters" description="Adjust scanner criteria for the current market pass." size="xl">
            <ScannerFilterBar
                compact
                :filters="scannerStore.filters"
                :presets="scannerStore.presets"
                :active-preset-id="scannerStore.activePresetId"
                :primary-filters="scannerStore.primaryFilters"
                :secondary-filters="scannerStore.secondaryFilters"
                @preset="scannerStore.applyPreset"
                @reset="scannerStore.resetFilters"
                @save="scannerStore.saveCurrentFilters"
                @refresh="scannerStore.refreshSnapshot"
                @mobile="scannerStore.setMobileFilters(false)"
                @update:filters="scannerStore.setFilters"
            />
        </AppModal>

        <div class="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 lg:hidden">
            <div class="flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(8,14,26,0.92)] p-2 shadow-[0_24px_90px_-36px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                <button
                    class="rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    type="button"
                    @click="scannerStore.setMobileFilters(true)"
                >
                    Filters
                </button>
                <button
                    class="rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    type="button"
                    @click="scrollToSection('scanner-table')"
                >
                    Table
                </button>
                <button
                    class="rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    type="button"
                    @click="scrollToSection('scanner-preview')"
                >
                    Preview
                </button>
                <button
                    class="rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    type="button"
                    @click="scrollToSection('scanner-queue')"
                >
                    Queue
                </button>
                <button
                    class="rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    type="button"
                    @click="scrollToSection('scanner-alerts')"
                >
                    Alerts
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppModal from '@/components/ui/AppModal.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import AIRecommendationCard from '@/components/scanner/AIRecommendationCard.vue';
import ExecutionQueue from '@/components/scanner/ExecutionQueue.vue';
import HeatMapCard from '@/components/scanner/HeatMapCard.vue';
import LiveAlertsFeed from '@/components/scanner/LiveAlertsFeed.vue';
import MarketOverviewCard from '@/components/scanner/MarketOverviewCard.vue';
import OpportunityPreview from '@/components/scanner/OpportunityPreview.vue';
import ScannerFilterBar from '@/components/scanner/ScannerFilterBar.vue';
import ScannerLoadingSkeleton from '@/components/scanner/ScannerLoadingSkeleton.vue';
import ScannerStatsCard from '@/components/scanner/ScannerStatsCard.vue';
import ScannerTable from '@/components/scanner/ScannerTable.vue';
import SQISGauge from '@/components/scanner/SQISGauge.vue';
import { scannerFooterCopy, scannerRecommendationReasons, scannerSqisBreakdown } from '@/data/scannerData';
import { useScannerStore } from '@/stores/scannerStore';

const scannerStore = useScannerStore();
const utcClock = ref('');

type FooterLink =
    | { label: string; description: string; external?: false; to: string }
    | { label: string; description: string; external: true; href: string };

const footerLinks: FooterLink[] = [
    { label: 'Privacy Policy', to: '/privacy-policy', description: 'How scanner data and access are handled.' },
    { label: 'Terms of Service', to: '/terms-of-service', description: 'Usage rules and desk responsibilities.' },
    { label: 'Help Center', to: '/help-center', description: 'Scanner onboarding and support notes.' },
    { label: 'Contact', href: 'mailto:support@smapisquant.ai', description: 'Reach the team for product questions.', external: true },
];

const sqisBand = computed(() => {
    const score = scannerStore.selectedOpportunity.sqis;

    if (score >= 90) {
        return 'Excellent';
    }

    if (score >= 80) {
        return 'High Quality';
    }

    if (score >= 70) {
        return 'Good';
    }

    return 'Watch';
});

function updateClock() {
    utcClock.value = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    }).format(new Date());
}

let clockTimer: number | undefined;

onMounted(() => {
    updateClock();
    clockTimer = window.setInterval(updateClock, 1000);
});

onBeforeUnmount(() => {
    if (clockTimer) {
        window.clearInterval(clockTimer);
    }
});

function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleRowAction(_action: { type: string; id: string }) {
    // TODO: wire row actions to the live execution, replay, and automation stack.
}

function handleFavoriteToggle(id: string) {
    scannerStore.toggleFavorite(id);
}
</script>
