<template>
    <section class="space-y-6">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div class="max-w-3xl space-y-3">
                <AppBadge tone="amber" subtle>Foundation placeholder</AppBadge>
                <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {{ title }}
                </h2>
                <p class="max-w-2xl text-sm leading-6 text-slate-400">
                    {{ description }}
                </p>
            </div>
            <AppButton to="/dashboard" variant="secondary" size="sm">Back to dashboard</AppButton>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
            <AppCard v-for="item in highlights" :key="item.title" class="space-y-3">
                <AppBadge :tone="item.tone">{{ item.status }}</AppBadge>
                <p class="text-base font-semibold text-white">{{ item.title }}</p>
                <p class="text-sm leading-6 text-slate-400">{{ item.description }}</p>
            </AppCard>
        </div>

        <AppCard class="space-y-4">
            <div class="flex items-center justify-between gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Integration note</p>
                    <p class="mt-2 text-lg font-semibold text-white">This module is scaffolded for the next implementation phase.</p>
                </div>
                <StatusPill label="Coming soon" tone="amber" />
            </div>
            <div class="grid gap-3 md:grid-cols-3">
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-xs uppercase tracking-[0.25em] text-slate-500">UI shell</p>
                    <p class="mt-2 text-sm text-slate-300">Routes, layout, and theming are wired.</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Mock data</p>
                    <p class="mt-2 text-sm text-slate-300">Real API sources can replace the placeholders later.</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Next step</p>
                    <p class="mt-2 text-sm text-slate-300">Hook the backend workflow once product scope is locked.</p>
                </div>
            </div>
        </AppCard>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import { autoTradingControls, pricingPlans, publicHighlights, strategyMarketplace, walletBalances } from '@/data/mockData';

const route = useRoute();

const title = computed(() => (route.meta.title ?? 'Module') as string);
const description = computed(() => route.meta.description ?? 'This module is scaffolded as a placeholder for the next implementation phase.');

type HighlightTone = 'teal' | 'emerald' | 'amber' | 'rose' | 'slate';

interface HighlightCard {
    title: string;
    description: string;
    status: string;
    tone: HighlightTone;
}

const highlights = computed<HighlightCard[]>(() => {
    switch (title.value) {
        case 'Auto Trading':
            return autoTradingControls.map((item) => ({
                title: item.title,
                description: item.note,
                status: item.status,
                tone: item.status === 'Active' ? 'emerald' : item.status === 'Armed' ? 'amber' : 'slate',
            }));
        case 'Strategies':
            return strategyMarketplace.map((item) => ({
                title: item.title,
                description: item.description,
                status: item.status,
                tone: item.status === 'Verified' ? 'emerald' : item.status === 'Community' ? 'teal' : 'amber',
            }));
        case 'Wallets':
            return walletBalances.map((item) => ({
                title: `${item.asset} on ${item.chain}`,
                description: `${item.available} available, ${item.locked} locked, ${item.valueUsd} market value.`,
                status: item.status,
                tone: item.status === 'healthy' ? 'emerald' : item.status === 'watch' ? 'amber' : 'rose',
            }));
        case 'Billing':
            return pricingPlans.map((item) => ({
                title: item.name,
                description: `${item.price} ${item.cadence} - ${item.description}`,
                status: item.highlighted ? 'Featured' : 'Available',
                tone: item.highlighted ? 'teal' : 'slate',
            }));
        default:
            return publicHighlights.slice(0, 3).map((item) => ({
                title: item.title,
                description: item.description,
                status: item.kicker ?? 'Ready',
                tone: 'teal',
            }));
    }
});
</script>
