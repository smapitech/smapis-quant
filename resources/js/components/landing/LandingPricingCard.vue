<template>
    <AppCard
        class="flex h-full flex-col justify-between border-white/10 bg-[rgba(8,14,26,0.84)]"
        :class="plan.highlighted ? 'ring-1 ring-teal-400/20 shadow-[0_24px_80px_-36px_rgba(45,212,191,0.18)]' : ''"
    >
        <div class="space-y-5">
            <div class="flex items-start justify-between gap-4">
                <div>
                    <p class="text-sm font-semibold text-white">{{ plan.name }}</p>
                    <p class="mt-2 text-sm leading-6 text-slate-400">{{ plan.description }}</p>
                </div>
                <AppBadge :tone="plan.tone">{{ plan.highlighted ? 'Popular' : plan.cadence }}</AppBadge>
            </div>

            <div class="flex items-end gap-2">
                <p class="font-mono text-4xl font-semibold text-white">{{ plan.price }}</p>
                <p class="pb-1 text-sm text-slate-400">{{ plan.cadence }}</p>
            </div>

            <ul class="space-y-2.5 text-sm text-slate-300">
                <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2.5">
                    <span class="mt-2 h-1.5 w-1.5 rounded-full bg-teal-300" />
                    <span>{{ feature }}</span>
                </li>
            </ul>
        </div>

        <AppButton :variant="plan.highlighted ? 'primary' : 'secondary'" :to="ctaTo" :href="ctaHref" class="mt-6 w-full">
            {{ plan.cta }}
        </AppButton>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import type { LandingPricingPlan } from '@/data/landingData';

const props = defineProps<{
    plan: LandingPricingPlan;
}>();

const ctaTo = computed(() => (props.plan.name === 'Enterprise' ? undefined : '/register'));
const ctaHref = computed(() => (props.plan.name === 'Enterprise' ? '/#company' : undefined));
</script>
