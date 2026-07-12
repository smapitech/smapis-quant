<template>
    <section class="space-y-6">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AppCard class="space-y-2">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Connected venues</p>
                <p class="font-mono text-3xl font-semibold text-white">{{ exchangeConnections.length }}</p>
                <p class="text-sm text-emerald-300">Across live and paper environments</p>
            </AppCard>
            <AppCard class="space-y-2">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Healthy venues</p>
                <p class="font-mono text-3xl font-semibold text-white">{{ healthyCount }}</p>
                <p class="text-sm text-emerald-300">Stable API keys and sync health</p>
            </AppCard>
            <AppCard class="space-y-2">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Wallet balances</p>
                <p class="font-mono text-3xl font-semibold text-white">{{ walletBalances.length }}</p>
                <p class="text-sm text-emerald-300">Custody and treasury tracking</p>
            </AppCard>
            <AppCard class="space-y-2">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Paper lane</p>
                <p class="font-mono text-3xl font-semibold text-white">$50K</p>
                <p class="text-sm text-emerald-300">Isolated simulation capital</p>
            </AppCard>
        </div>

        <div class="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Exchange connections</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">API venue health and sync readiness</h2>
                    </div>
                    <AppBadge tone="teal">Monitoring</AppBadge>
                </div>
                <div class="grid gap-3 sm:grid-cols-2">
                    <div v-for="exchange in exchangeConnections" :key="exchange.id" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <p class="text-sm font-semibold text-white">{{ exchange.name }}</p>
                                <p class="mt-1 text-sm text-slate-400">{{ exchange.venue }}</p>
                            </div>
                            <StatusPill :label="exchange.status" :tone="exchangeTone(exchange.status)" />
                        </div>
                        <div class="mt-3 grid gap-2 text-sm text-slate-300">
                            <div class="flex items-center justify-between gap-3"><span>Latency</span><span class="font-mono text-white">{{ exchange.latency }}</span></div>
                            <div class="flex items-center justify-between gap-3"><span>Markets</span><span class="font-mono text-white">{{ exchange.markets }}</span></div>
                            <div class="flex items-center justify-between gap-3"><span>Fee tier</span><span class="font-mono text-white">{{ exchange.feeTier }}</span></div>
                            <div class="flex items-center justify-between gap-3"><span>Balance</span><span class="font-mono text-white">{{ exchange.balance }}</span></div>
                        </div>
                    </div>
                </div>
            </AppCard>

            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Wallet balances</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Treasury and custody snapshot</h2>
                    </div>
                    <AppButton variant="secondary" size="sm">Sync now</AppButton>
                </div>
                <AppTable>
                    <thead>
                        <tr class="text-xs uppercase tracking-[0.28em] text-slate-500">
                            <th class="px-4 py-4 font-medium">Asset</th>
                            <th class="px-4 py-4 font-medium">Available</th>
                            <th class="px-4 py-4 font-medium">Locked</th>
                            <th class="px-4 py-4 font-medium">Value</th>
                            <th class="px-4 py-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="wallet in walletBalances" :key="wallet.id" class="border-b border-white/6 last:border-b-0">
                            <td class="px-4 py-4">
                                <div>
                                    <p class="font-medium text-white">{{ wallet.asset }}</p>
                                    <p class="mt-1 text-sm text-slate-400">{{ wallet.chain }}</p>
                                </div>
                            </td>
                            <td class="px-4 py-4 font-mono text-white">{{ wallet.available }}</td>
                            <td class="px-4 py-4 font-mono text-white">{{ wallet.locked }}</td>
                            <td class="px-4 py-4 font-mono text-white">{{ wallet.valueUsd }}</td>
                            <td class="px-4 py-4">
                                <StatusPill :label="wallet.status" :tone="walletTone(wallet.status)" />
                            </td>
                        </tr>
                    </tbody>
                </AppTable>
            </AppCard>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppTable from '@/components/ui/AppTable.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import { exchangeConnections, walletBalances } from '@/data/mockData';

const healthyCount = computed(() => exchangeConnections.filter((exchange) => exchange.status !== 'offline').length);

function exchangeTone(status: string) {
    if (status === 'connected') {
        return 'emerald';
    }

    if (status === 'syncing') {
        return 'teal';
    }

    if (status === 'limited') {
        return 'amber';
    }

    return 'rose';
}

function walletTone(status: string) {
    if (status === 'healthy') {
        return 'emerald';
    }

    if (status === 'watch') {
        return 'amber';
    }

    return 'rose';
}
</script>
