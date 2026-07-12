<template>
    <header class="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div class="px-4 py-4 sm:px-6 lg:px-8">
            <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div class="space-y-1">
                    <p v-if="route.meta.eyebrow" class="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
                        {{ route.meta.eyebrow }}
                    </p>
                    <div class="flex flex-wrap items-center gap-3">
                        <h1 class="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                            {{ route.meta.title ?? 'Smapis Quant AI' }}
                        </h1>
                        <StatusBadge variant="neutral">Demo mode</StatusBadge>
                    </div>
                    <p v-if="route.meta.description" class="max-w-3xl text-sm leading-6 text-slate-400">
                        {{ route.meta.description }}
                    </p>
                </div>

                <div class="flex flex-1 items-center gap-3 xl:max-w-xl xl:justify-end">
                    <div class="hidden w-full max-w-sm xl:block">
                        <input
                            type="search"
                            placeholder="Search symbols, orders, or strategies"
                            class="block w-full rounded-full border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15"
                        >
                    </div>
                    <BaseButton to="/scanner" variant="secondary" size="sm">Open scanner</BaseButton>
                    <BaseButton to="/settings" variant="ghost" size="sm">Settings</BaseButton>
                </div>
            </div>

            <div class="mt-4 flex gap-2 overflow-x-auto lg:hidden">
                <BaseButton to="/dashboard" variant="ghost" size="sm">Dashboard</BaseButton>
                <BaseButton to="/scanner" variant="ghost" size="sm">Scanner</BaseButton>
                <BaseButton to="/paper-trading" variant="ghost" size="sm">Paper Trading</BaseButton>
                <BaseButton to="/settings" variant="ghost" size="sm">Settings</BaseButton>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import BaseButton from '@/components/ui/BaseButton.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';

const route = useRoute();
</script>
