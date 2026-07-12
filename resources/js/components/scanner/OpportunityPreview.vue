<template>
    <AppCard class="space-y-5">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Opportunity Preview</p>
                <h3 class="mt-2 text-xl font-semibold text-white">{{ opportunity.pair }}</h3>
                <p class="mt-1 text-sm text-slate-400">{{ opportunity.buyExchange }} → {{ opportunity.sellExchange }}</p>
            </div>
            <div class="flex flex-col items-end gap-2">
                <ProfitBadge :value="summary.expectedProfit" />
                <RiskBadge :label="summary.risk" />
            </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">SQIS</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ summary.sqis }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Spread</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ summary.spread }}</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Execution</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ summary.estimatedDuration }}</p>
            </div>
        </div>

        <AppTabs v-model="activeTab" :tabs="tabs" />

        <div v-if="activeTab === 'overview'" class="space-y-4">
            <div class="grid gap-4 xl:grid-cols-2">
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Opportunity overview</p>
                            <p class="mt-2 text-lg font-semibold text-white">{{ opportunity.pair }}</p>
                        </div>
                        <StatusPill :label="opportunity.status" :tone="opportunityStatusTone" />
                    </div>
                    <div class="mt-4 h-32 rounded-2xl border border-white/8 bg-slate-950/60 p-3">
                        <MiniSpreadChart :series="sparklineSeries" />
                    </div>
                </div>

                <div class="grid gap-3">
                    <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Thesis</p>
                        <p class="mt-2 text-sm leading-6 text-slate-300">
                            {{ thesis }}
                        </p>
                    </div>
                    <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Market bias</p>
                        <p class="mt-2 font-mono text-xl font-semibold text-white">{{ marketBias }}</p>
                    </div>
                </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Buy exchange analysis</p>
                    <div class="mt-3 flex items-start justify-between gap-4">
                    <ExchangeBadge :name="opportunity.buyExchange" venue="Buy" tone="teal" />
                        <span class="font-mono text-lg font-semibold text-white">{{ opportunity.buyPrice }}</span>
                    </div>
                    <div class="mt-4 space-y-3 text-sm text-slate-300">
                        <p>Price: <span class="font-mono text-white">{{ opportunity.buyPrice }}</span></p>
                        <p>Order book: <span class="text-white">{{ opportunity.orderBook }}</span></p>
                        <p>Liquidity: <span class="text-white">{{ opportunity.liquidity }}</span></p>
                        <p>Deposit status: <span class="text-white">{{ opportunity.depositStatus }}</span></p>
                    </div>
                </div>

                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Sell exchange analysis</p>
                    <div class="mt-3 flex items-start justify-between gap-4">
                    <ExchangeBadge :name="opportunity.sellExchange" venue="Sell" tone="emerald" />
                        <span class="font-mono text-lg font-semibold text-white">{{ opportunity.sellPrice }}</span>
                    </div>
                    <div class="mt-4 space-y-3 text-sm text-slate-300">
                        <p>Price: <span class="font-mono text-white">{{ opportunity.sellPrice }}</span></p>
                        <p>Exchange health: <span class="text-white">{{ opportunity.exchangeHealth }}</span></p>
                        <p>Withdrawal status: <span class="text-white">{{ opportunity.withdrawalStatus }}</span></p>
                        <p>Net profit target: <span class="text-white">{{ summary.expectedProfit }}</span></p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="activeTab === 'buy'" class="space-y-4">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Buy analysis</p>
                <div class="mt-4 grid gap-3 sm:grid-cols-2">
                    <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Venue</p>
                        <p class="mt-2 text-lg font-semibold text-white">{{ opportunity.buyExchange }}</p>
                    </div>
                    <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Price</p>
                        <p class="mt-2 font-mono text-lg font-semibold text-white">{{ opportunity.buyPrice }}</p>
                    </div>
                    <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Liquidity</p>
                        <p class="mt-2 text-lg font-semibold text-white">{{ opportunity.liquidity }}</p>
                    </div>
                    <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Fees</p>
                        <p class="mt-2 font-mono text-lg font-semibold text-white">$0.04%</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="activeTab === 'sell'" class="space-y-4">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Sell analysis</p>
                <div class="mt-4 grid gap-3 sm:grid-cols-2">
                    <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Venue</p>
                        <p class="mt-2 text-lg font-semibold text-white">{{ opportunity.sellExchange }}</p>
                    </div>
                    <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Price</p>
                        <p class="mt-2 font-mono text-lg font-semibold text-white">{{ opportunity.sellPrice }}</p>
                    </div>
                    <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Exchange health</p>
                        <p class="mt-2 text-lg font-semibold text-white">{{ opportunity.exchangeHealth }}</p>
                    </div>
                    <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Execution time</p>
                        <p class="mt-2 font-mono text-lg font-semibold text-white">{{ opportunity.executionTime }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="activeTab === 'committee'" class="space-y-3">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Committee vote</p>
                <div class="mt-4 space-y-3">
                    <article
                        v-for="vote in committeeVotes"
                        :key="vote.agent"
                        class="rounded-2xl border border-white/8 bg-slate-950/50 p-4"
                    >
                        <div class="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <p class="text-sm font-semibold text-white">{{ vote.agent }}</p>
                                <p class="mt-1 text-sm leading-6 text-slate-400">{{ vote.reason }}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <StatusPill :label="vote.vote" :tone="voteTone(vote.vote)" />
                                <ProfitBadge :value="`${vote.confidence}%`" />
                            </div>
                        </div>
                        <div class="mt-3 flex flex-wrap gap-2">
                            <AppBadge v-for="flag in vote.riskFlags" :key="flag" tone="slate">{{ flag }}</AppBadge>
                        </div>
                    </article>
                </div>
            </div>
        </div>

        <div v-else-if="activeTab === 'risk'" class="space-y-4">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Risk report</p>
                <div class="mt-4 grid gap-3 sm:grid-cols-2">
                    <div
                        v-for="item in riskChecks"
                        :key="item.label"
                        class="rounded-2xl border border-white/8 bg-slate-950/50 p-4"
                    >
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">{{ item.label }}</p>
                        <p class="mt-2 text-lg font-semibold text-white">{{ item.value }}</p>
                        <p class="mt-1 text-sm text-slate-400">{{ item.status }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="activeTab === 'simulator'" class="space-y-4">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Trade simulator</p>
                <div class="mt-4 grid gap-3 sm:grid-cols-2">
                    <div class="rounded-2xl border border-white/8 bg-slate-950/50 p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Order size</p>
                        <p class="mt-2 font-mono text-lg font-semibold text-white">$1,000</p>
                    </div>
                    <div class="rounded-2xl border border-white/8 bg-slate-950/50 p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Slippage cap</p>
                        <p class="mt-2 font-mono text-lg font-semibold text-white">0.05%</p>
                    </div>
                    <div class="rounded-2xl border border-white/8 bg-slate-950/50 p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Risk budget</p>
                        <p class="mt-2 font-mono text-lg font-semibold text-white">0.40%</p>
                    </div>
                    <div class="rounded-2xl border border-white/8 bg-slate-950/50 p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Fill time</p>
                        <p class="mt-2 font-mono text-lg font-semibold text-white">{{ summary.estimatedDuration }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="space-y-4">
            <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <p class="text-xs uppercase tracking-[0.26em] text-slate-500">Replay</p>
                        <p class="mt-2 text-lg font-semibold text-white">Opportunity replay</p>
                    </div>
                    <AppButton variant="secondary" size="sm">Replay button</AppButton>
                </div>

                <div class="mt-4 space-y-3">
                    <article
                        v-for="step in replaySteps"
                        :key="step.label"
                        class="rounded-2xl border border-white/8 bg-slate-950/50 p-4"
                    >
                        <div class="flex items-center justify-between gap-3">
                            <div>
                                <p class="text-sm font-semibold text-white">{{ step.label }}</p>
                                <p class="mt-1 text-sm leading-6 text-slate-400">{{ step.note }}</p>
                            </div>
                            <div class="text-right">
                                <p class="font-mono text-white">{{ step.price }}</p>
                                <p class="text-xs uppercase tracking-[0.24em] text-slate-500">{{ step.time }}</p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppTabs from '@/components/ui/AppTabs.vue';
import ExchangeBadge from '@/components/scanner/ExchangeBadge.vue';
import ProfitBadge from '@/components/scanner/ProfitBadge.vue';
import RiskBadge from '@/components/scanner/RiskBadge.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import MiniSpreadChart from '@/components/charts/MiniSpreadChart.vue';
import type {
    ScannerCommitteeVote,
    ScannerOpportunityRow,
    ScannerPreviewSummary,
    ScannerRiskCheck,
    ScannerReplayStep,
} from '@/types';
import { scannerStatusTone } from './scannerTheme';

const props = defineProps<{
    opportunity: ScannerOpportunityRow;
    summary: ScannerPreviewSummary;
    committeeVotes: ScannerCommitteeVote[];
    riskChecks: ScannerRiskCheck[];
    replaySteps: ScannerReplayStep[];
}>();

const activeTab = ref('overview');

const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Buy Analysis', value: 'buy' },
    { label: 'Sell Analysis', value: 'sell' },
    { label: 'Committee Vote', value: 'committee' },
    { label: 'Risk', value: 'risk' },
    { label: 'Simulator', value: 'simulator' },
    { label: 'Replay', value: 'replay' },
];

const sparklineSeries = computed(() => props.opportunity.sparkline.map((value, index) => ({ label: `${index}`, value })));

const thesis = computed(() =>
    props.opportunity.favorite
        ? 'This is a high-confidence opportunity with strong liquidity, clean spread quality, and committee alignment.'
        : 'The route remains attractive, but the desk should still observe liquidity and execution before committing size.',
);

const marketBias = computed(() =>
    props.opportunity.risk === 'Low' ? 'Bullish continuation' : props.opportunity.risk === 'Medium' ? 'Balanced to cautious' : 'Defensive watch',
);

const opportunityStatusTone = computed(() => scannerStatusTone(props.opportunity.status));

function voteTone(vote: ScannerCommitteeVote['vote']) {
    if (vote === 'Approve') {
        return 'emerald';
    }

    if (vote === 'Conditional') {
        return 'amber';
    }

    if (vote === 'Reject') {
        return 'rose';
    }

    return 'slate';
}
</script>
