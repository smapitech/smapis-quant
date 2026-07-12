<template>
    <AppCard class="group h-full border-white/10 bg-[rgba(8,14,26,0.84)] transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[rgba(10,18,31,0.94)]">
        <div class="space-y-4">
            <div class="flex items-start justify-between gap-4">
                <div class="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-sm font-semibold text-white">
                    {{ badgeInitial }}
                </div>
                <AppBadge :tone="tone">{{ badge }}</AppBadge>
            </div>
            <div class="space-y-2">
                <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
                <p class="text-sm leading-6 text-slate-400">
                    {{ description }}
                </p>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import type { LandingTone } from '@/data/landingData';

const props = defineProps<{
    title: string;
    description: string;
    badge: string;
    tone: LandingTone;
}>();

const badgeInitial = computed(() => props.badge.slice(0, 1).toUpperCase());
</script>
