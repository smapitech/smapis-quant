<template>
    <section id="pricing" class="space-y-8">
        <div class="max-w-3xl space-y-3">
            <AppBadge tone="amber" subtle>Pricing preview</AppBadge>
            <h1 class="text-4xl font-semibold tracking-tight text-white">Plans that match a serious trading desk.</h1>
            <p class="text-base leading-7 text-slate-400">
                Pricing is a preview only for now. Billing, subscription controls, and usage metering can be connected later without changing the frontend shell.
            </p>
        </div>

        <div class="grid gap-4 xl:grid-cols-4">
            <LandingPricingCard v-for="plan in landingPricingPlans" :key="plan.name" :plan="plan" />
        </div>

        <AppCard class="space-y-4 border-white/10 bg-[rgba(8,14,26,0.84)]">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p class="text-sm font-semibold text-white">No payment logic connected yet</p>
                    <p class="mt-2 text-sm leading-6 text-slate-400">
                        The pricing tier layout is ready for later billing integration and can be wired to a subscription provider when the product is ready.
                    </p>
                </div>
                <AppButton href="/#company" variant="secondary">Talk to Sales</AppButton>
            </div>
        </AppCard>
    </section>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import LandingPricingCard from '@/components/landing/LandingPricingCard.vue';
import { landingPricingPlans } from '@/data/landingData';
</script>
