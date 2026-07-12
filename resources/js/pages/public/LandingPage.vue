<template>
    <div class="space-y-24">
        <LandingHero />

        <section id="features" class="space-y-8">
            <div class="max-w-3xl space-y-3">
                <AppBadge tone="teal" subtle>Platform foundation</AppBadge>
                <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Built to surface clean opportunities, safer decisions, and stronger operational control.
                </h2>
                <p class="text-base leading-7 text-slate-400">
                    Every major interaction is framed around intelligence, liquidity, and risk rather than hype or speculative noise.
                </p>
            </div>

            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <LandingMetricCard
                    v-for="metric in landingTrustMetrics"
                    :key="metric.label"
                    :label="metric.label"
                    :value="metric.value"
                    :detail="metric.detail"
                    :tone="metric.tone"
                />
            </div>

            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <LandingFeatureCard
                    v-for="feature in landingFeatures"
                    :key="feature.title"
                    :title="feature.title"
                    :description="feature.description"
                    :badge="feature.badge"
                    :tone="feature.tone"
                />
            </div>
        </section>

        <section id="academy" class="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <AppCard class="space-y-6 border-white/10 bg-[rgba(8,14,26,0.84)]">
                <div class="space-y-3">
                    <AppBadge tone="amber" subtle>How it works</AppBadge>
                    <h2 class="text-3xl font-semibold tracking-tight text-white">Four steps from exchange access to reviewed decisions.</h2>
                    <p class="text-sm leading-6 text-slate-400">
                        Keep the process calm and structured so traders can review the signal chain before any execution decision is made.
                    </p>
                </div>

                <div class="grid gap-3">
                    <div
                        v-for="step in landingHowItWorks"
                        :key="step.step"
                        class="flex items-start gap-4 rounded-[22px] border border-white/10 bg-white/[0.03] p-4"
                    >
                        <div class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-teal-400/15 bg-teal-400/8 font-mono text-sm font-semibold text-teal-200">
                            {{ step.step }}
                        </div>
                        <div class="space-y-1">
                            <h3 class="text-lg font-semibold text-white">{{ step.title }}</h3>
                            <p class="text-sm leading-6 text-slate-400">{{ step.description }}</p>
                        </div>
                    </div>
                </div>
            </AppCard>

            <LandingAICommitteePreview
                id="ai-preview"
                :votes="landingCommitteeVotes"
                final-decision="EXECUTE WITH REDUCED SIZE"
                :confidence="97"
            />
        </section>

        <section class="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <AppCard class="space-y-6 border-white/10 bg-[rgba(8,14,26,0.84)]">
                <div class="space-y-3">
                    <AppBadge tone="emerald" subtle>Paper trading</AppBadge>
                    <h2 class="text-3xl font-semibold tracking-tight text-white">
                        Start with simulation before risking real capital.
                    </h2>
                    <p class="text-sm leading-6 text-slate-400">
                        Use paper trading to test the scanner, AI decisions, and strategy performance before enabling live execution.
                    </p>
                </div>

                <div class="grid gap-3 sm:grid-cols-2">
                    <div class="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Virtual capital</p>
                        <p class="mt-3 font-mono text-2xl font-semibold text-white">$50,000.00</p>
                    </div>
                    <div class="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Rehearsal win rate</p>
                        <p class="mt-3 font-mono text-2xl font-semibold text-emerald-300">78.4%</p>
                    </div>
                </div>

                <div class="rounded-[22px] border border-white/10 bg-[rgba(5,10,19,0.62)] p-5">
                    <div class="flex items-center justify-between gap-4">
                        <p class="text-sm font-medium text-white">Simulation controls</p>
                        <StatusPill label="Safe mode" tone="emerald" />
                    </div>
                    <div class="mt-4 grid gap-3 sm:grid-cols-3">
                        <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <p class="text-xs uppercase tracking-[0.22em] text-slate-500">Paper mode</p>
                            <p class="mt-2 text-sm text-slate-300">Enabled</p>
                        </div>
                        <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <p class="text-xs uppercase tracking-[0.22em] text-slate-500">Live risk</p>
                            <p class="mt-2 text-sm text-slate-300">Locked</p>
                        </div>
                        <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <p class="text-xs uppercase tracking-[0.22em] text-slate-500">Replay</p>
                            <p class="mt-2 text-sm text-slate-300">Available</p>
                        </div>
                    </div>
                </div>
            </AppCard>

            <AppCard id="docs" class="space-y-6 border-white/10 bg-[rgba(8,14,26,0.84)]">
                <div class="space-y-3">
                    <AppBadge tone="teal" subtle>Security and controls</AppBadge>
                    <h2 class="text-3xl font-semibold tracking-tight text-white">A risk-first setup for serious trading operations.</h2>
                    <p class="text-sm leading-6 text-slate-400">
                        Every permission and operational default is designed to keep the workspace calm, auditable, and predictable.
                    </p>
                </div>

                <div class="grid gap-3 sm:grid-cols-2">
                    <div v-for="item in landingSecurity" :key="item.label" class="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                        <div class="flex items-start justify-between gap-4">
                            <p class="text-sm font-medium text-white">{{ item.label }}</p>
                            <span class="h-2.5 w-2.5 rounded-full" :class="securityTone[item.tone]" />
                        </div>
                        <p class="mt-2 text-sm leading-6 text-slate-400">{{ item.detail }}</p>
                    </div>
                </div>
            </AppCard>
        </section>

        <section id="pricing" class="space-y-8">
            <div class="max-w-3xl space-y-3">
                <AppBadge tone="amber" subtle>Pricing preview</AppBadge>
                <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Transparent plans for traders, teams, and institutions.</h2>
                <p class="text-base leading-7 text-slate-400">
                    The pricing surface is ready now, while billing and subscription logic can be connected later without changing the design language.
                </p>
            </div>

            <div class="grid gap-4 xl:grid-cols-4">
                <LandingPricingCard v-for="plan in landingPricingPlans" :key="plan.name" :plan="plan" />
            </div>
        </section>

        <section class="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(8,14,26,0.92),rgba(8,14,26,0.72))] p-8 shadow-[0_28px_90px_-44px_rgba(0,0,0,0.95)] sm:p-10">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div class="max-w-2xl space-y-4">
                    <AppBadge tone="teal" subtle>Responsible execution</AppBadge>
                    <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Start with intelligence. Upgrade when you are ready.
                    </h2>
                    <p class="text-base leading-7 text-slate-400">
                        Begin in paper trading, review AI decisions, and only move into live execution when your process and risk posture are ready.
                    </p>
                </div>
                <div class="flex flex-col gap-3 sm:flex-row">
                    <AppButton to="/register" size="lg">Start Free</AppButton>
                    <AppButton href="#ai-preview" variant="secondary" size="lg">View Demo</AppButton>
                </div>
            </div>
        </section>

        <footer id="company" class="grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div class="space-y-4">
                <AppLogo />
                <p class="max-w-2xl text-sm leading-7 text-slate-400">
                    Smapis Quant AI provides trading intelligence and automation tools. Trading involves risk. No profit is guaranteed.
                </p>
                <p class="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Smapis Quant OS internal architecture for institutional trading intelligence.
                </p>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
                <AppCard v-for="link in footerLinks" :key="link.label" class="border-white/10 bg-white/[0.03]">
                    <a :href="link.href" class="block">
                        <p class="text-sm font-medium text-white">{{ link.label }}</p>
                        <p class="mt-2 text-sm leading-6 text-slate-400">{{ link.description }}</p>
                    </a>
                </AppCard>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import LandingAICommitteePreview from '@/components/landing/LandingAICommitteePreview.vue';
import LandingFeatureCard from '@/components/landing/LandingFeatureCard.vue';
import LandingHero from '@/components/landing/LandingHero.vue';
import LandingMetricCard from '@/components/landing/LandingMetricCard.vue';
import LandingPricingCard from '@/components/landing/LandingPricingCard.vue';
import {
    landingCommitteeVotes,
    landingFeatures,
    landingHowItWorks,
    landingPricingPlans,
    landingSecurity,
    landingTrustMetrics,
} from '@/data/landingData';

const footerLinks = [
    { label: 'Privacy Policy', href: '#company', description: 'How account and platform data is handled.' },
    { label: 'Terms', href: '#company', description: 'Platform terms and responsible use guidelines.' },
    { label: 'Help Center', href: '#docs', description: 'Operational notes, FAQs, and support guidance.' },
    { label: 'Contact', href: '#company', description: 'Reach the team for product or enterprise questions.' },
];

const securityTone = {
    teal: 'bg-teal-300',
    emerald: 'bg-emerald-300',
    amber: 'bg-amber-300',
    rose: 'bg-rose-300',
    slate: 'bg-slate-400',
} as const;
</script>
