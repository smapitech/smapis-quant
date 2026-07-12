<template>
    <section class="space-y-6 pb-44">
        <OpportunitySummary
            :record="record"
            :bookmarked="bookmarked"
            @replay="scrollToSection('replay-section')"
            @share="handlePlaceholderAction('share report')"
            @download="handlePlaceholderAction('download pdf')"
            @paper="handlePlaceholderAction('paper trade')"
            @manual="handlePlaceholderAction('manual execute')"
            @bookmark="toggleBookmark"
            @more="handlePlaceholderAction('more actions')"
        />

        <OpportunityDetailSkeleton v-if="loading" />

        <template v-else>
            <div class="grid gap-6 2xl:grid-cols-[minmax(0,1.6fr)_380px]">
                <div class="space-y-6">
                    <div id="committee-section" class="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
                        <CommitteeDecisionCard :summary="record.committeeSummary" :agents="record.committeeAgents" />
                        <MarketPulseCard :pulse="record.marketPulse" />
                    </div>

                    <div id="debate-section">
                        <CommitteeDebatePanel :messages="record.committeeDebate" :summary="record.committeeSummary" />
                    </div>

                    <div id="explanation-section">
                        <AIExplanationPanel :reasons="record.aiExplanation" :recommendation="record.recommendedAction.title" />
                    </div>

                    <div id="exchange-section" class="grid gap-6 xl:grid-cols-2">
                        <ExchangeAnalysisCard title="Buy Analysis" venue="Buy" subtitle="Buy exchange analysis" :analysis="record.buyExchange" />
                        <ExchangeAnalysisCard title="Sell Analysis" venue="Sell" subtitle="Sell exchange analysis" :analysis="record.sellExchange" />
                    </div>

                    <div id="order-book-section">
                        <OrderBookChart :snapshot="record.orderBook" />
                    </div>

                    <div id="fee-risk-section" class="grid gap-6 xl:grid-cols-2">
                        <FeeAnalysisCard :lines="record.feeAnalysis" />
                        <RiskAnalysisCard :metrics="record.riskAnalysis" :score="record.riskScore" :level="record.riskLevel" />
                    </div>

                    <div id="digital-twin-section">
                        <DigitalTwinSimulation :simulation="record.digitalTwin" />
                    </div>

                    <div id="market-analysis-section">
                        <MarketAnalysisPanel :tabs="record.marketAnalysisTabs" :series="record.marketAnalysisSeries" />
                    </div>

                    <div id="replay-section">
                        <OpportunityReplayCard :steps="record.replaySteps" />
                    </div>

                    <HistoricalTradesTable id="history-section" :stats="record.historicalStats" :trades="record.historicalTrades" />

                    <div id="recommended-section">
                        <RecommendedActionCard :action="record.recommendedAction" @view="scrollToSection('explanation-section')" />
                    </div>
                </div>

                <div class="space-y-6 xl:sticky xl:top-24 xl:self-start">
                    <LiveAlertsFeed :alerts="record.liveAlerts" />
                    <TradeSimulator :metrics="record.tradeSimulator" />
                    <AIChatPanel :messages="record.chatMessages" />
                    <AppCard class="space-y-4">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Position Size Recommendation</p>
                                <h3 class="mt-2 text-xl font-semibold text-white">Recommended capital and safe upper bound</h3>
                            </div>
                            <AppBadge tone="teal">Ready</AppBadge>
                        </div>
                        <PositionSizeSlider
                            v-model="positionCapital"
                            :presets="record.tradeSimulator.capitalPresets"
                            label="Recommended"
                        />
                        <div class="grid gap-3 sm:grid-cols-2">
                            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Recommended</p>
                                <p class="mt-2 font-mono text-2xl font-semibold text-emerald-300">{{ record.positionRecommendation.recommended }}</p>
                            </div>
                            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Maximum Safe</p>
                                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ record.positionRecommendation.maximumSafe }}</p>
                            </div>
                            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Risk Exposure</p>
                                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ record.positionRecommendation.riskExposure }}</p>
                            </div>
                            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Expected Profit</p>
                                <p class="mt-2 font-mono text-2xl font-semibold text-emerald-300">{{ record.positionRecommendation.expectedProfit }}</p>
                            </div>
                        </div>
                    </AppCard>
                </div>
            </div>

            <div class="hidden lg:block">
                <OpportunityActionBar
                    :bookmarked="bookmarked"
                    @paper="handlePlaceholderAction('paper trade')"
                    @manual="handlePlaceholderAction('manual execute')"
                    @auto="handlePlaceholderAction('enable auto trading')"
                    @replay="scrollToSection('replay-section')"
                    @download="handlePlaceholderAction('download report')"
                    @share="handlePlaceholderAction('share report')"
                    @bookmark="toggleBookmark"
                />
            </div>

            <footer class="space-y-4 border-t border-white/8 pt-6 text-sm text-slate-500">
                <p class="max-w-5xl leading-6 text-slate-500">{{ record.footerDisclaimer }}</p>

                <div class="flex flex-wrap gap-3">
                    <RouterLink
                        v-for="link in footerLinks"
                        :key="link.label"
                        :to="link.to"
                        class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm transition hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                    >
                        <span class="block font-medium text-white">{{ link.label }}</span>
                        <span class="mt-1 block text-xs leading-5 text-slate-500">{{ link.description }}</span>
                    </RouterLink>
                    <a
                        class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm transition hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                        href="mailto:support@smapisquant.ai"
                    >
                        <span class="block font-medium text-white">Contact</span>
                        <span class="mt-1 block text-xs leading-5 text-slate-500">Reach the desk for product questions.</span>
                    </a>
                </div>
            </footer>
        </template>

        <div class="fixed inset-x-4 bottom-4 z-40 max-h-[calc(100vh-2rem)] overflow-auto lg:hidden">
            <OpportunityActionBar
                :bookmarked="bookmarked"
                @paper="handlePlaceholderAction('paper trade')"
                @manual="handlePlaceholderAction('manual execute')"
                @auto="handlePlaceholderAction('enable auto trading')"
                @replay="scrollToSection('replay-section')"
                @download="handlePlaceholderAction('download report')"
                @share="handlePlaceholderAction('share report')"
                @bookmark="toggleBookmark"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import AIChatPanel from '@/components/opportunity/AIChatPanel.vue';
import AIExplanationPanel from '@/components/opportunity/AIExplanationPanel.vue';
import CommitteeDebatePanel from '@/components/opportunity/CommitteeDebatePanel.vue';
import CommitteeDecisionCard from '@/components/opportunity/CommitteeDecisionCard.vue';
import DigitalTwinSimulation from '@/components/opportunity/DigitalTwinSimulation.vue';
import ExchangeAnalysisCard from '@/components/opportunity/ExchangeAnalysisCard.vue';
import FeeAnalysisCard from '@/components/opportunity/FeeAnalysisCard.vue';
import HistoricalTradesTable from '@/components/opportunity/HistoricalTradesTable.vue';
import LiveAlertsFeed from '@/components/opportunity/LiveAlertsFeed.vue';
import MarketAnalysisPanel from '@/components/opportunity/MarketAnalysisPanel.vue';
import MarketPulseCard from '@/components/opportunity/MarketPulseCard.vue';
import OpportunityActionBar from '@/components/opportunity/OpportunityActionBar.vue';
import OpportunityDetailSkeleton from '@/components/opportunity/OpportunityDetailSkeleton.vue';
import OpportunityReplayCard from '@/components/opportunity/OpportunityReplayCard.vue';
import OpportunitySummary from '@/components/opportunity/OpportunitySummary.vue';
import OrderBookChart from '@/components/opportunity/OrderBookChart.vue';
import PositionSizeSlider from '@/components/opportunity/PositionSizeSlider.vue';
import RecommendedActionCard from '@/components/opportunity/RecommendedActionCard.vue';
import RiskAnalysisCard from '@/components/opportunity/RiskAnalysisCard.vue';
import TradeSimulator from '@/components/opportunity/TradeSimulator.vue';
import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import { getOpportunityDetailRecord } from '@/data/opportunityDetailData';

const route = useRoute();
const loading = ref(true);
const bookmarked = ref(false);
const positionCapital = ref(1000);

const record = computed(() => getOpportunityDetailRecord(String(route.params.id ?? 'sol-usdt')));

const footerLinks = [
    { label: 'Privacy Policy', to: '/privacy-policy', description: 'Data handling and access policy.' },
    { label: 'Terms of Service', to: '/terms-of-service', description: 'Platform rules and trading responsibility.' },
    { label: 'Help Center', to: '/help-center', description: 'Desk onboarding and support references.' },
];

onMounted(() => {
    window.setTimeout(() => {
        loading.value = false;
    }, 240);
});

function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleBookmark() {
    bookmarked.value = !bookmarked.value;
}

function handlePlaceholderAction(label: string) {
    // TODO: wire these controls to the execution workflow, report generation, and future trading actions.
    console.debug(`[Opportunity Detail] ${label}`);
}
</script>
