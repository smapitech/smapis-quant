<template>
    <tr class="group border-b border-white/6 last:border-b-0 hover:bg-white/[0.02]">
        <td class="px-4 py-4">
            <div class="flex items-center gap-3">
                <div class="grid h-10 w-10 place-items-center rounded-2xl bg-white/[0.06] text-sm font-semibold text-teal-200 ring-1 ring-white/10">
                    {{ opportunity.symbol }}
                </div>
                <div>
                    <p class="font-medium text-white">{{ opportunity.pair }}</p>
                    <p class="text-xs text-slate-500">{{ opportunity.strategy }} - {{ opportunity.timeframe }}</p>
                </div>
            </div>
        </td>
        <td class="px-4 py-4 text-slate-300">
            <ExchangeBadge :name="opportunity.buyExchange" venue="Buy" :status="exchangeStatus" />
        </td>
        <td class="px-4 py-4 text-slate-300">
            <ExchangeBadge :name="opportunity.sellExchange" venue="Sell" :status="exchangeStatus" />
        </td>
        <td class="px-4 py-4 font-mono text-emerald-300">{{ opportunity.expectedProfit }}</td>
        <td class="px-4 py-4">
            <ProfitBadge :value="opportunity.expectedProfitPct" />
        </td>
        <td class="px-4 py-4">
            <div class="space-y-2">
                <p class="font-mono text-lg text-white">{{ opportunity.sqis }}</p>
                <StatusPill :label="opportunity.sqisBand" tone="teal" />
            </div>
        </td>
        <td class="px-4 py-4">
            <StatusPill :label="opportunity.risk" :tone="riskTone" />
        </td>
        <td class="px-4 py-4">
            <AppButton :to="`/opportunities/${opportunity.id}`" variant="secondary" size="sm">View</AppButton>
        </td>
    </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppButton from '@/components/ui/AppButton.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import ExchangeBadge from '@/components/trading/ExchangeBadge.vue';
import ProfitBadge from '@/components/trading/ProfitBadge.vue';
import type { Opportunity } from '@/types';

const props = defineProps<{
    opportunity: Opportunity;
}>();

const exchangeStatus = computed(() => {
    if (props.opportunity.status === 'rejected') {
        return 'offline';
    }

    if (props.opportunity.status === 'queued') {
        return 'syncing';
    }

    return 'connected';
});

const riskTone = computed(() => {
    if (props.opportunity.risk === 'Low') {
        return 'emerald';
    }

    if (props.opportunity.risk === 'Medium') {
        return 'amber';
    }

    return 'rose';
});
</script>
