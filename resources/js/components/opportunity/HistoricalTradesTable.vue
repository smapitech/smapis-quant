<template>
    <AppCard class="space-y-4">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Similar Historical Opportunities</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Past 100 similar opportunities</h3>
            </div>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
                    <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">{{ stat.label }}</p>
                    <p class="mt-2 font-mono text-xl font-semibold text-white">{{ stat.value }}</p>
                    <p class="mt-1 text-[11px] uppercase tracking-[0.22em]" :class="toneClass(stat.tone)">{{ stat.detail }}</p>
                </div>
            </div>
        </div>

        <AppTable>
            <thead>
                <tr class="text-xs uppercase tracking-[0.28em] text-slate-500">
                    <th class="px-4 py-4 font-medium">Pair</th>
                    <th class="px-4 py-4 font-medium">Outcome</th>
                    <th class="px-4 py-4 font-medium">Result</th>
                    <th class="px-4 py-4 font-medium">Profit</th>
                    <th class="px-4 py-4 font-medium">Duration</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="trade in trades"
                    :key="`${trade.pair}-${trade.outcome}-${trade.profit}`"
                    class="border-b border-white/8 last:border-b-0"
                >
                    <td class="px-4 py-4 font-mono text-sm font-semibold text-white">{{ trade.pair }}</td>
                    <td class="px-4 py-4">
                        <StatusPill :label="trade.outcome" :tone="statusTone(trade.outcome)" />
                    </td>
                    <td class="px-4 py-4 text-sm text-slate-300">{{ trade.result }}</td>
                    <td class="px-4 py-4 font-mono text-sm" :class="trade.profit.startsWith('-') ? 'text-rose-300' : 'text-emerald-300'">{{ trade.profit }}</td>
                    <td class="px-4 py-4 font-mono text-sm text-slate-300">{{ trade.duration }}</td>
                </tr>
            </tbody>
        </AppTable>
    </AppCard>
</template>

<script setup lang="ts">
import AppCard from '@/components/ui/AppCard.vue';
import AppTable from '@/components/ui/AppTable.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { OpportunityHistoricalStat, OpportunityHistoricalTradeRow } from '@/types';

defineProps<{
    stats: OpportunityHistoricalStat[];
    trades: OpportunityHistoricalTradeRow[];
}>();

function statusTone(outcome: string) {
    if (outcome.toLowerCase().includes('success')) {
        return 'emerald';
    }

    if (outcome.toLowerCase().includes('expired')) {
        return 'amber';
    }

    if (outcome.toLowerCase().includes('rejected') || outcome.toLowerCase().includes('loss')) {
        return 'rose';
    }

    return 'slate';
}

function toneClass(tone: OpportunityHistoricalStat['tone']) {
    const map: Record<OpportunityHistoricalStat['tone'], string> = {
        emerald: 'text-emerald-300',
        teal: 'text-teal-300',
        amber: 'text-amber-300',
        rose: 'text-rose-300',
        slate: 'text-slate-300',
    };

    return map[tone];
}
</script>
