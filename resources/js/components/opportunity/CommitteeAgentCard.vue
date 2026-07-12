<template>
    <AppCard :tone="expanded ? 'glass' : 'subtle'" class="overflow-hidden transition-all duration-300">
        <button
            type="button"
            class="flex w-full items-start justify-between gap-4 text-left"
            @click="expanded = !expanded"
        >
            <div class="space-y-3">
                <div class="flex items-center gap-3">
                    <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] font-mono text-sm font-semibold text-white">
                        {{ agent.avatar }}
                    </div>
                    <div class="min-w-0">
                        <h4 class="truncate text-base font-semibold text-white">{{ agent.agent }}</h4>
                        <p class="text-xs uppercase tracking-[0.22em] text-slate-500">{{ agent.role }}</p>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-2">
                    <StatusPill :label="agent.vote" :tone="voteTone" />
                    <AppBadge tone="slate">{{ agent.confidence }}%</AppBadge>
                </div>

                <p class="text-sm leading-6 text-slate-400">{{ agent.reason }}</p>
            </div>

            <div class="flex flex-col items-end gap-2">
                <span class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Recommendation</span>
                <span class="text-sm font-semibold text-white">{{ agent.recommendation }}</span>
                <span class="text-slate-400 transition-transform duration-300" :class="expanded ? 'rotate-180' : ''">v</span>
            </div>
        </button>

        <transition name="fade-slide">
            <div v-if="expanded" class="mt-4 border-t border-white/8 pt-4">
                <div class="flex flex-wrap gap-2">
                    <AppBadge v-for="flag in agent.riskFlags" :key="flag" tone="slate">{{ flag }}</AppBadge>
                </div>
            </div>
        </transition>
    </AppCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { OpportunityCommitteeAgent } from '@/types';
import { opportunityToneForVote } from './opportunityTheme';

const props = defineProps<{
    agent: OpportunityCommitteeAgent;
}>();

const expanded = ref(props.agent.expanded ?? false);
const voteTone = computed(() => opportunityToneForVote(props.agent.vote));
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 180ms ease, transform 180ms ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>
