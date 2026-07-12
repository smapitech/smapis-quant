<template>
    <section class="space-y-4">
        <AppCard class="space-y-5">
            <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">AI Trade Committee</p>
                    <h3 class="mt-2 text-2xl font-semibold text-white">Independent AI agents review every opportunity before any recommendation is made.</h3>
                </div>

                <CommitteeVoteChart :summary="summary" />
            </div>

            <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-[11px] uppercase tracking-[0.26em] text-slate-500">Overall Decision</p>
                    <p class="mt-2 text-2xl font-semibold text-emerald-300">{{ summary.decision }}</p>
                    <p class="mt-1 text-sm text-slate-400">{{ summary.subDecision }}</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-[11px] uppercase tracking-[0.26em] text-slate-500">Approve</p>
                    <p class="mt-2 text-2xl font-semibold text-white">{{ summary.approve }}</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-[11px] uppercase tracking-[0.26em] text-slate-500">Conditional</p>
                    <p class="mt-2 text-2xl font-semibold text-white">{{ summary.conditional }}</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-[11px] uppercase tracking-[0.26em] text-slate-500">Wait</p>
                    <p class="mt-2 text-2xl font-semibold text-white">{{ summary.wait }}</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-[11px] uppercase tracking-[0.26em] text-slate-500">Reject</p>
                    <p class="mt-2 text-2xl font-semibold text-white">{{ summary.reject }}</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p class="text-[11px] uppercase tracking-[0.26em] text-slate-500">Committee Confidence</p>
                    <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ summary.confidence }}%</p>
                </div>
            </div>
        </AppCard>

        <div class="grid gap-3 xl:grid-cols-2">
            <CommitteeAgentCard v-for="agent in agents" :key="agent.agent" :agent="agent" />
        </div>
    </section>
</template>

<script setup lang="ts">
import AppCard from '@/components/ui/AppCard.vue';
import CommitteeAgentCard from '@/components/opportunity/CommitteeAgentCard.vue';
import CommitteeVoteChart from '@/components/opportunity/CommitteeVoteChart.vue';
import type { OpportunityCommitteeAgent, OpportunityCommitteeSummary } from '@/types';

defineProps<{
    summary: OpportunityCommitteeSummary;
    agents: OpportunityCommitteeAgent[];
}>();
</script>
