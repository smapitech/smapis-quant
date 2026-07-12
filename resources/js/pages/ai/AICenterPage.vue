<template>
    <section class="space-y-6">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AppCard v-for="stat in aiStats" :key="stat.label" class="space-y-2">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">{{ stat.label }}</p>
                <p class="font-mono text-3xl font-semibold text-white">{{ stat.value }}</p>
                <p class="text-sm text-emerald-300">{{ stat.change }}</p>
                <p class="text-sm leading-6 text-slate-400">{{ stat.note }}</p>
            </AppCard>
        </div>

        <div class="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">AI modules</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Model services and routing surfaces</h2>
                    </div>
                    <AppBadge tone="teal">Foundation ready</AppBadge>
                </div>
                <div class="grid gap-4 sm:grid-cols-2">
                    <div v-for="module in aiModules" :key="module.title" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <p class="text-sm font-semibold text-white">{{ module.title }}</p>
                                <p class="mt-1 text-sm text-slate-400">{{ module.description }}</p>
                            </div>
                            <StatusPill :label="module.status" :tone="moduleTone(module.status)" />
                        </div>
                        <div class="mt-4 flex items-center justify-between gap-3 text-sm text-slate-400">
                            <span>{{ module.focus }}</span>
                            <span class="font-mono text-white">{{ module.score }}</span>
                        </div>
                    </div>
                </div>
            </AppCard>

            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Prompt lab</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Model notes, orchestration, and prompt controls</h2>
                    </div>
                    <AppButton variant="secondary" size="sm">Queue review</AppButton>
                </div>
                <div class="space-y-3">
                    <AppInput v-model="promptTitle" label="Prompt title" placeholder="Momentum router v3" />
                    <label class="block space-y-2">
                        <span class="block text-sm font-medium text-slate-200">Working prompt</span>
                        <textarea
                            rows="7"
                            class="block w-full rounded-2xl border border-white/10 bg-[rgba(5,10,19,0.72)] px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none placeholder:text-slate-500 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/12"
                            placeholder="Describe how the router should rank opportunities..."
                        />
                    </label>
                </div>
                <div class="grid gap-3 sm:grid-cols-2">
                    <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Routing mode</p>
                        <p class="mt-2 text-sm text-slate-300">Risk-first, committee aware</p>
                    </div>
                    <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Model status</p>
                        <p class="mt-2 text-sm text-slate-300">Ready for future API payloads</p>
                    </div>
                </div>
            </AppCard>
        </div>

        <AppCard class="space-y-4">
            <div class="flex items-center justify-between gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Committee feed</p>
                    <h2 class="mt-2 text-xl font-semibold text-white">Recent AI Trade Committee votes</h2>
                </div>
                <AppBadge tone="slate">{{ aiCommitteeFeed.length }} votes</AppBadge>
            </div>
            <AppTable>
                <thead>
                    <tr class="text-xs uppercase tracking-[0.28em] text-slate-500">
                        <th class="px-4 py-4 font-medium">Agent</th>
                        <th class="px-4 py-4 font-medium">Vote</th>
                        <th class="px-4 py-4 font-medium">Confidence</th>
                        <th class="px-4 py-4 font-medium">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="vote in aiCommitteeFeed" :key="vote.agent" class="border-b border-white/6 last:border-b-0">
                        <td class="px-4 py-4 font-medium text-white">{{ vote.agent }}</td>
                        <td class="px-4 py-4">
                            <StatusPill :label="vote.vote" :tone="voteTone(vote.vote)" />
                            <div class="mt-2 flex flex-wrap gap-2">
                                <AppBadge v-for="flag in vote.riskFlags" :key="flag" tone="slate">{{ flag }}</AppBadge>
                            </div>
                        </td>
                        <td class="px-4 py-4 font-mono text-white">{{ vote.confidence }}%</td>
                        <td class="px-4 py-4 text-slate-400">{{ vote.reason }}</td>
                    </tr>
                </tbody>
            </AppTable>
        </AppCard>
    </section>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppTable from '@/components/ui/AppTable.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import { aiCommitteeFeed, aiModules, aiStats } from '@/data/mockData';

import { ref } from 'vue';

const promptTitle = ref('Momentum router v3');

function moduleTone(status: string) {
    if (status === 'Running') {
        return 'emerald';
    }

    if (status === 'Drafting') {
        return 'amber';
    }

    return 'teal';
}

function voteTone(vote: string) {
    if (vote === 'Approve') {
        return 'emerald';
    }

    if (vote === 'Conditional') {
        return 'amber';
    }

    if (vote === 'Wait') {
        return 'slate';
    }

    return 'rose';
}
</script>
