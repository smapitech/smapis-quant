<template>
    <tr v-if="variant === 'table'" :class="rowClasses" class="cursor-pointer" @click="$emit('select', opportunity.id)">
        <td class="px-4 py-4">
            <span class="font-mono text-sm text-slate-500">{{ index }}</span>
        </td>
        <td class="px-4 py-4">
            <button
                type="button"
                class="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                @click="$emit('toggle-favorite', opportunity.id)"
            >
                <span class="sr-only">Toggle favorite</span>
                <span :class="opportunity.favorite ? 'text-amber-300' : 'text-slate-500'">★</span>
            </button>
        </td>
        <td class="px-4 py-4">
            <div class="font-mono text-sm font-semibold text-white">{{ opportunity.pair }}</div>
            <div class="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">{{ opportunity.symbol }}</div>
        </td>
        <td class="px-4 py-4 text-sm text-slate-300">{{ opportunity.network }}</td>
        <td class="px-4 py-4">
            <ExchangeBadge :name="opportunity.buyExchange" venue="Buy" status="connected" tone="teal" />
            <div class="mt-2 font-mono text-sm text-slate-400">{{ opportunity.buyPrice }}</div>
        </td>
        <td class="px-4 py-4">
            <ExchangeBadge :name="opportunity.sellExchange" venue="Sell" status="connected" tone="emerald" />
            <div class="mt-2 font-mono text-sm text-slate-400">{{ opportunity.sellPrice }}</div>
        </td>
        <td class="px-4 py-4 font-mono text-sm font-medium text-emerald-300">{{ opportunity.spreadPct }}</td>
        <td class="px-4 py-4 font-mono text-sm text-emerald-300">{{ opportunity.grossProfit }}</td>
        <td class="px-4 py-4 font-mono text-sm text-slate-300">{{ opportunity.fees }}</td>
        <td class="px-4 py-4 font-mono text-sm font-semibold text-emerald-300">{{ opportunity.estimatedNetProfit }}</td>
        <td class="px-4 py-4">
            <LiquidityMeter
                label="Liquidity"
                :value="opportunity.liquidity"
                :depth="liquidityDepth"
                :spread="opportunity.spreadPct"
                :status="opportunity.liquidity"
            />
        </td>
        <td class="px-4 py-4">
            <p class="text-sm font-medium text-white">{{ opportunity.orderBook }}</p>
            <p class="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">Order book depth</p>
        </td>
        <td class="px-4 py-4">
            <StatusPill :label="opportunity.exchangeHealth" :tone="healthTone" />
        </td>
        <td class="px-4 py-4">
            <div class="space-y-2">
                <div class="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-slate-500">
                    <span>SQIS</span>
                    <span class="font-mono text-white">{{ opportunity.sqis }}</span>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <div :class="sqisBarClasses" :style="{ width: `${opportunity.sqis}%` }" class="h-full rounded-full transition-all duration-500" />
                </div>
            </div>
        </td>
        <td class="px-4 py-4">
            <div class="space-y-2">
                <div class="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-slate-500">
                    <span>Confidence</span>
                    <span class="font-mono text-white">{{ opportunity.aiConfidence }}%</span>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <div class="h-full rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 transition-all duration-500" :style="{ width: `${opportunity.aiConfidence}%` }" />
                </div>
            </div>
        </td>
        <td class="px-4 py-4">
            <RiskBadge :label="opportunity.risk" />
        </td>
        <td class="px-4 py-4 font-mono text-sm text-slate-300">{{ opportunity.executionTime }}</td>
        <td class="px-4 py-4">
            <StatusPill :label="opportunity.status" :tone="statusTone" />
        </td>
        <td class="px-4 py-4">
            <div class="flex flex-wrap gap-2">
                <AppButton variant="primary" size="sm" @click="$emit('select', opportunity.id)">View</AppButton>
                <AppButton variant="secondary" size="sm" @click="$emit('action', { type: 'replay', id: opportunity.id })">Replay</AppButton>
                <AppButton variant="ghost" size="sm" @click="$emit('action', { type: 'paper', id: opportunity.id })">Paper Trade</AppButton>
                <AppButton variant="ghost" size="sm" @click="$emit('action', { type: 'manual', id: opportunity.id })">Manual Execute</AppButton>
                <AppButton variant="ghost" size="sm" @click="$emit('action', { type: 'auto', id: opportunity.id })">Auto Execute</AppButton>
                <AppButton variant="secondary" size="sm" @click="$emit('action', { type: 'watchlist', id: opportunity.id })">Watchlist</AppButton>
                <AppButton variant="ghost" size="sm" @click="$emit('action', { type: 'compare', id: opportunity.id })">Compare</AppButton>
            </div>
        </td>
    </tr>

    <article v-else :class="cardClasses" class="cursor-pointer" @click="$emit('select', opportunity.id)">
        <div class="flex items-start justify-between gap-3">
            <div>
                <div class="flex items-center gap-2">
                    <button
                        type="button"
                        class="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                        @click="$emit('toggle-favorite', opportunity.id)"
                    >
                        <span :class="opportunity.favorite ? 'text-amber-300' : 'text-slate-500'">★</span>
                    </button>
                    <p class="font-mono text-lg font-semibold text-white">{{ opportunity.pair }}</p>
                </div>
                <p class="mt-1 text-sm text-slate-400">{{ opportunity.buyExchange }} → {{ opportunity.sellExchange }}</p>
            </div>
            <StatusPill :label="opportunity.status" :tone="statusTone" />
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Net profit</p>
                <p class="mt-2 font-mono text-xl font-semibold text-emerald-300">{{ opportunity.estimatedNetProfit }}</p>
            </div>
            <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">SQIS</p>
                <p class="mt-2 font-mono text-xl font-semibold text-white">{{ opportunity.sqis }}</p>
            </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Buy</p>
                <p class="mt-2 text-sm text-white">{{ opportunity.buyExchange }}</p>
                <p class="mt-1 font-mono text-sm text-slate-400">{{ opportunity.buyPrice }}</p>
            </div>
            <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Sell</p>
                <p class="mt-2 text-sm text-white">{{ opportunity.sellExchange }}</p>
                <p class="mt-1 font-mono text-sm text-slate-400">{{ opportunity.sellPrice }}</p>
            </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Order book</p>
                <p class="mt-2 text-sm font-medium text-white">{{ opportunity.orderBook }}</p>
            </div>
            <div class="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p class="text-[11px] uppercase tracking-[0.24em] text-slate-500">Exchange health</p>
                <div class="mt-2">
                    <StatusPill :label="opportunity.exchangeHealth" :tone="healthTone" />
                </div>
            </div>
        </div>

        <div class="flex flex-wrap gap-2">
            <ProfitBadge :value="opportunity.spreadPct" />
            <RiskBadge :label="opportunity.risk" />
            <AppBadge tone="slate">{{ opportunity.executionTime }}</AppBadge>
        </div>

        <div class="flex flex-wrap gap-2">
            <AppButton variant="primary" size="sm" @click="$emit('select', opportunity.id)">View</AppButton>
            <AppButton variant="secondary" size="sm" @click="$emit('action', { type: 'replay', id: opportunity.id })">Replay</AppButton>
            <AppButton variant="ghost" size="sm" @click="$emit('action', { type: 'paper', id: opportunity.id })">Paper Trade</AppButton>
            <AppButton variant="ghost" size="sm" @click="$emit('action', { type: 'manual', id: opportunity.id })">Manual Execute</AppButton>
            <AppButton variant="ghost" size="sm" @click="$emit('action', { type: 'auto', id: opportunity.id })">Auto Execute</AppButton>
            <AppButton variant="secondary" size="sm" @click="$emit('action', { type: 'watchlist', id: opportunity.id })">Watchlist</AppButton>
            <AppButton variant="ghost" size="sm" @click="$emit('action', { type: 'compare', id: opportunity.id })">Compare</AppButton>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import ExchangeBadge from '@/components/scanner/ExchangeBadge.vue';
import LiquidityMeter from '@/components/scanner/LiquidityMeter.vue';
import ProfitBadge from '@/components/scanner/ProfitBadge.vue';
import RiskBadge from '@/components/scanner/RiskBadge.vue';
import type { ScannerOpportunityRow } from '@/types';
import { scannerSignalTone, scannerStatusTone } from './scannerTheme';

const props = withDefaults(
    defineProps<{
        opportunity: ScannerOpportunityRow;
        index?: number;
        selected?: boolean;
        variant?: 'table' | 'card';
    }>(),
    {
        index: 0,
        selected: false,
        variant: 'table',
    },
);

defineEmits<{
    select: [id: string];
    action: [{ type: string; id: string }];
    'toggle-favorite': [id: string];
}>();

const rowClasses = computed(() => [
    'border-b border-white/8 transition-colors last:border-b-0',
    props.selected ? 'bg-teal-400/[0.05]' : 'hover:bg-white/[0.025]',
]);

const cardClasses = computed(() => [
    'space-y-4 rounded-[22px] border p-4 transition-colors',
    props.selected ? 'border-teal-400/20 bg-teal-400/[0.06]' : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.05]',
]);

const statusTone = computed(() => scannerStatusTone(props.opportunity.status));
const healthTone = computed(() => scannerStatusTone(props.opportunity.exchangeHealth));
const sqisBarClasses = computed(() => {
    const map = {
        emerald: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400',
        teal: 'bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400',
        amber: 'bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400',
        rose: 'bg-gradient-to-r from-rose-400 via-pink-400 to-orange-300',
        slate: 'bg-gradient-to-r from-slate-400 via-slate-300 to-cyan-200',
    } as const;

    return map[scannerSignalTone(props.opportunity.sqis)];
});
const liquidityDepth = computed(() => {
    if (props.opportunity.liquidity === 'High') {
        return 88;
    }

    if (props.opportunity.liquidity === 'Medium') {
        return 68;
    }

    return 42;
});
</script>
