<template>
    <AppCard class="space-y-5">
        <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">AI Debate Mode</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Independent agents challenge the route before a final recommendation is logged</h3>
                <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                    The committee debate keeps the decision process transparent so traders can understand where the recommendation came from.
                </p>
            </div>
            <AppBadge tone="teal">Debate Logged</AppBadge>
        </div>

        <div class="space-y-3">
            <article
                v-for="message in messages"
                :key="`${message.speaker}-${message.quote}`"
                class="rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 hover:border-white/15"
                :class="toneClasses(message.tone)"
            >
                <div class="flex flex-wrap items-start justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <div class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-slate-950/65 font-mono text-sm font-semibold text-white">
                            {{ initials(message.speaker) }}
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-white">{{ message.speaker }}</p>
                            <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">{{ message.role }}</p>
                        </div>
                    </div>
                    <AppBadge :tone="message.tone" subtle>{{ toneLabel(message.tone) }}</AppBadge>
                </div>

                <blockquote class="mt-4 text-sm leading-6 text-slate-200">
                    "{{ message.quote }}"
                </blockquote>
            </article>
        </div>

        <div class="grid gap-3 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <div class="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.08] p-5">
                <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-200/80">Final Committee Decision</p>
                <div class="mt-3 flex flex-wrap items-center gap-3">
                    <StatusPill :label="summary.decision" tone="emerald" />
                    <AppBadge tone="amber" subtle>{{ summary.subDecision }}</AppBadge>
                </div>
                <p class="mt-4 max-w-2xl text-sm leading-6 text-emerald-50/85">
                    The committee agrees the route is valid, but recommends reduced size to keep execution risk contained and preserve portfolio discipline.
                </p>
            </div>

            <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <div
                    v-for="vote in voteCards"
                    :key="vote.label"
                    class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                    <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">{{ vote.label }}</p>
                    <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ vote.value }}</p>
                    <div class="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <div class="h-full rounded-full" :class="vote.barClass" :style="{ width: `${vote.percent}%` }" />
                    </div>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { DashboardTone, OpportunityCommitteeDebateMessage, OpportunityCommitteeSummary } from '@/types';

const props = defineProps<{
    messages: OpportunityCommitteeDebateMessage[];
    summary: OpportunityCommitteeSummary;
}>();

const voteCards = computed(() => [
    {
        label: 'Approve',
        value: props.summary.approve,
        percent: Math.max(4, props.summary.approve * 16),
        barClass: 'bg-gradient-to-r from-emerald-400 to-teal-400',
    },
    {
        label: 'Conditional',
        value: props.summary.conditional,
        percent: Math.max(4, props.summary.conditional * 40),
        barClass: 'bg-gradient-to-r from-amber-400 to-orange-400',
    },
    {
        label: 'Wait',
        value: props.summary.wait,
        percent: Math.max(4, props.summary.wait * 40),
        barClass: 'bg-gradient-to-r from-slate-400 to-slate-300',
    },
    {
        label: 'Reject',
        value: props.summary.reject,
        percent: Math.max(4, props.summary.reject * 40),
        barClass: 'bg-gradient-to-r from-rose-400 to-red-400',
    },
    {
        label: 'Confidence',
        value: `${props.summary.confidence}%`,
        percent: props.summary.confidence,
        barClass: 'bg-gradient-to-r from-cyan-400 to-teal-400',
    },
]);

function toneClasses(tone: OpportunityCommitteeDebateMessage['tone']) {
    const map: Record<DashboardTone, string> = {
        emerald: 'border-emerald-400/15 bg-emerald-500/[0.06]',
        teal: 'border-teal-400/15 bg-teal-500/[0.06]',
        amber: 'border-amber-400/15 bg-amber-500/[0.06]',
        rose: 'border-rose-400/15 bg-rose-500/[0.06]',
        slate: 'border-white/10 bg-white/[0.03]',
    };

    return map[tone];
}

function toneLabel(tone: DashboardTone) {
    const map: Record<DashboardTone, string> = {
        emerald: 'Aligned',
        teal: 'Assertive',
        amber: 'Caution',
        rose: 'Rejected',
        slate: 'Neutral',
    };

    return map[tone];
}

function initials(name: string) {
    return name
        .split(' ')
        .map((part) => part.trim()[0])
        .filter((part): part is string => Boolean(part) && /[a-z0-9]/i.test(part))
        .join('')
        .slice(0, 2)
        .toUpperCase();
}
</script>
