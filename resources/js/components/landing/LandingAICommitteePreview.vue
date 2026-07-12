<template>
    <AppCard tone="glass" class="space-y-6" :id="id">
        <div class="flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div class="space-y-2">
                <AppBadge tone="teal" subtle>AI Decision Preview</AppBadge>
                <h3 class="text-2xl font-semibold tracking-tight text-white">AI Trade Committee</h3>
                <p class="max-w-2xl text-sm leading-6 text-slate-400">
                    A multi-agent review layer that validates spreads, liquidity, risk, execution quality, and policy before capital moves.
                </p>
            </div>

            <div class="grid min-w-0 gap-3 rounded-[22px] border border-white/10 bg-white/[0.03] p-4 sm:min-w-[15rem]">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs uppercase tracking-[0.24em] text-slate-500">Final Decision</p>
                        <p class="mt-2 text-2xl font-semibold tracking-tight text-emerald-300">{{ finalDecision }}</p>
                    </div>
                    <div class="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-right">
                        <p class="font-mono text-2xl font-semibold text-white">{{ confidence }}%</p>
                        <p class="text-[11px] uppercase tracking-[0.24em] text-emerald-200">Confidence</p>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2 text-center text-xs">
                    <div class="rounded-2xl border border-emerald-400/15 bg-emerald-400/8 px-2 py-3">
                        <p class="font-mono text-lg font-semibold text-emerald-200">5</p>
                        <p class="mt-1 text-[10px] uppercase tracking-[0.2em] text-emerald-100/80">Approve</p>
                    </div>
                    <div class="rounded-2xl border border-amber-400/15 bg-amber-400/8 px-2 py-3">
                        <p class="font-mono text-lg font-semibold text-amber-200">1</p>
                        <p class="mt-1 text-[10px] uppercase tracking-[0.2em] text-amber-100/80">Conditional</p>
                    </div>
                    <div class="rounded-2xl border border-rose-400/15 bg-rose-400/8 px-2 py-3">
                        <p class="font-mono text-lg font-semibold text-rose-200">0</p>
                        <p class="mt-1 text-[10px] uppercase tracking-[0.2em] text-rose-100/80">Reject</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="overflow-x-auto rounded-[22px] border border-white/10">
            <div class="grid min-w-[920px] grid-cols-[1.2fr_.7fr_.6fr_1.3fr_.7fr] gap-px bg-white/8 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                <div class="bg-[rgba(5,10,19,0.92)] px-4 py-3">Agent</div>
                <div class="bg-[rgba(5,10,19,0.92)] px-4 py-3">Vote</div>
                <div class="bg-[rgba(5,10,19,0.92)] px-4 py-3">Confidence</div>
                <div class="bg-[rgba(5,10,19,0.92)] px-4 py-3">Reason</div>
                <div class="bg-[rgba(5,10,19,0.92)] px-4 py-3">Risk Flags</div>
            </div>

            <div v-for="vote in votes" :key="vote.agent" class="grid min-w-[920px] grid-cols-[1.2fr_.7fr_.6fr_1.3fr_.7fr] gap-px bg-white/8">
                <div class="bg-[rgba(7,12,22,0.9)] px-4 py-4">
                    <p class="font-medium text-white">{{ vote.agent }}</p>
                </div>
                <div class="bg-[rgba(7,12,22,0.9)] px-4 py-4">
                    <AppBadge :tone="voteTone(vote.vote)" subtle>{{ vote.vote }}</AppBadge>
                </div>
                <div class="bg-[rgba(7,12,22,0.9)] px-4 py-4">
                    <div class="flex items-center gap-3">
                        <span class="font-mono text-sm text-white">{{ vote.confidence }}%</span>
                        <div class="h-1.5 flex-1 rounded-full bg-white/8">
                            <div
                                class="h-full rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-300"
                                :style="{ width: `${vote.confidence}%` }"
                            />
                        </div>
                    </div>
                </div>
                <div class="bg-[rgba(7,12,22,0.9)] px-4 py-4 text-sm leading-6 text-slate-300">
                    {{ vote.reason }}
                </div>
                <div class="bg-[rgba(7,12,22,0.9)] px-4 py-4">
                    <div class="flex flex-wrap gap-2">
                        <span
                            v-for="flag in vote.riskFlags"
                            :key="flag"
                            :class="flagClasses(flag)"
                        >
                            {{ flag }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import type { LandingCommitteeVote } from '@/data/landingData';

const props = defineProps<{
    votes: LandingCommitteeVote[];
    finalDecision: string;
    confidence: number;
    id?: string;
}>();

function voteTone(vote: string) {
    const normalized = vote.toLowerCase();

    if (normalized.includes('approve')) {
        return 'emerald';
    }

    if (normalized.includes('conditional')) {
        return 'amber';
    }

    if (normalized.includes('reduce')) {
        return 'teal';
    }

    return 'rose';
}

function flagClasses(flag: string) {
    const normalized = flag.toLowerCase();

    const map: Record<string, string> = {
        none: 'border-emerald-400/15 bg-emerald-400/8 text-emerald-100',
        low: 'border-teal-400/15 bg-teal-400/8 text-teal-100',
        medium: 'border-amber-400/15 bg-amber-400/8 text-amber-100',
        high: 'border-rose-400/15 bg-rose-400/8 text-rose-100',
    };

    const match = Object.keys(map).find((key) => normalized.includes(key));

    return [
        'rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em]',
        match ? map[match] : 'border-white/10 bg-white/[0.04] text-slate-200',
    ];
}
</script>
