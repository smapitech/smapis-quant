<template>
    <section class="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div class="space-y-8">
            <div class="inline-flex max-w-max items-center gap-2 rounded-full border border-teal-400/16 bg-teal-400/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-teal-100">
                <span class="h-2 w-2 rounded-full bg-teal-300" />
                AI-Powered Trading Intelligence
            </div>

            <div class="space-y-5">
                <h1 class="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl xl:text-7xl">
                    AI-Powered Trading Intelligence for Smarter Arbitrage Decisions
                </h1>
                <p class="max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                    Smapis Quant AI scans global crypto markets, validates real arbitrage opportunities, measures risk, and helps traders act with confidence.
                </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row">
                <AppButton to="/register" size="lg">Start Free</AppButton>
                <AppButton href="#ai-preview" variant="secondary" size="lg">Watch Demo</AppButton>
            </div>

            <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div
                    v-for="item in securityHighlights"
                    :key="item.label"
                    class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                >
                    <p class="text-sm font-medium text-white">{{ item.label }}</p>
                    <p class="mt-2 text-sm leading-6 text-slate-400">{{ item.detail }}</p>
                </div>
            </div>
        </div>

        <AppCard tone="glass" :padded="false" class="overflow-hidden">
            <div class="border-b border-white/10 px-6 py-5">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Opportunity preview</p>
                        <div class="mt-3 flex items-center gap-3">
                            <h2 class="text-2xl font-semibold tracking-tight text-white">{{ preview.pair }}</h2>
                            <StatusPill label="Market Open" tone="emerald" />
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Recommendation</p>
                        <p class="mt-2 text-2xl font-semibold text-emerald-300">{{ preview.recommendation }}</p>
                    </div>
                </div>
            </div>

            <div class="grid gap-5 p-6">
                <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <div v-for="metric in summaryMetrics" :key="metric.label" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">{{ metric.label }}</p>
                        <p class="mt-3 font-mono text-xl font-semibold text-white">{{ metric.value }}</p>
                    </div>
                </div>

                <div class="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                    <div class="rounded-[22px] border border-white/10 bg-[rgba(5,10,19,0.62)] p-5">
                        <div class="flex items-center justify-between gap-4">
                            <div>
                                <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Spread signal</p>
                                <p class="mt-2 text-sm text-slate-300">Estimated net profit, fees, and slippage already netted out.</p>
                            </div>
                            <p class="font-mono text-3xl font-semibold text-teal-300">{{ preview.spread }}</p>
                        </div>

                        <div class="mt-6 flex h-24 items-end gap-2">
                            <div
                                v-for="bar in spreadBars"
                                :key="bar"
                                class="flex-1 rounded-t-full bg-gradient-to-t from-teal-400/35 via-emerald-400/55 to-teal-200/90"
                                :style="{ height: `${bar}%` }"
                            />
                        </div>
                    </div>

                    <div class="rounded-[22px] border border-white/10 bg-[rgba(5,10,19,0.62)] p-5">
                        <div class="flex items-center justify-between gap-4">
                            <div>
                                <p class="text-xs uppercase tracking-[0.24em] text-slate-500">AI Committee</p>
                                <p class="mt-2 text-sm text-slate-300">Final desk consensus after risk and execution review.</p>
                            </div>
                            <StatusPill :label="preview.risk + ' Risk'" tone="teal" />
                        </div>

                        <div class="mt-6 grid gap-3">
                            <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                <span class="text-sm text-slate-300">Approve</span>
                                <span class="font-mono text-lg font-semibold text-emerald-300">{{ preview.committee.approve }}</span>
                            </div>
                            <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                <span class="text-sm text-slate-300">Conditional</span>
                                <span class="font-mono text-lg font-semibold text-amber-300">{{ preview.committee.conditional }}</span>
                            </div>
                            <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                <span class="text-sm text-slate-300">Reject</span>
                                <span class="font-mono text-lg font-semibold text-rose-300">{{ preview.committee.reject }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppCard>
    </section>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { LandingSecurityItem } from '@/data/landingData';

const preview = {
    pair: 'SOL/USDT',
    buy: 'Binance @ $150.20',
    sell: 'Bybit @ $153.10',
    spread: '1.93%',
    netProfit: '$18.42',
    sqis: '94/100',
    recommendation: 'EXECUTE',
    committee: {
        approve: 5,
        conditional: 1,
        reject: 0,
    },
    risk: 'Low',
};

const securityHighlights: LandingSecurityItem[] = [
    { label: 'Bank-Level Security', detail: 'Encrypted controls and policy-driven access.' , tone: 'emerald' },
    { label: 'API Keys', detail: 'Trading-only permissions are strongly recommended.', tone: 'amber' },
    { label: 'AI Risk Officer', detail: 'Every setup is reviewed before action.', tone: 'teal' },
    { label: '99.9% Uptime', detail: 'Built for durable, always-on monitoring.', tone: 'slate' },
];

const summaryMetrics = [
    { label: 'Buy', value: preview.buy },
    { label: 'Sell', value: preview.sell },
    { label: 'Estimated Net Profit', value: preview.netProfit },
    { label: 'SQIS', value: preview.sqis },
];

const spreadBars = [38, 61, 47, 74, 55, 82, 68, 90, 76, 84, 68, 72];
</script>
