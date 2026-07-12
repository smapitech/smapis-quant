<template>
    <AppCard tone="glass" class="relative h-full overflow-hidden">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_36%)]" />
        <div class="relative flex h-full flex-col gap-8">
            <div class="space-y-8">
                <AppLogo />

                <div class="inline-flex max-w-max items-center gap-2 rounded-full border border-teal-400/18 bg-teal-400/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.26em] text-teal-200">
                    <span class="h-2 w-2 rounded-full bg-teal-300" />
                    {{ config.eyebrow }}
                </div>

                <div class="max-w-2xl space-y-4">
                    <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        {{ config.title }}
                    </h1>
                    <p class="max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                        {{ config.description }}
                    </p>
                </div>

                <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <AuthSecurityBadge v-for="badge in config.badges" :key="badge.label" :label="badge.label" :tone="badge.tone" />
                </div>
            </div>

            <div class="space-y-4">
                <div class="rounded-[26px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_70px_-34px_rgba(0,0,0,0.95)]">
                    <div class="flex items-center justify-between gap-4">
                        <div>
                            <p class="text-xs uppercase tracking-[0.28em] text-slate-500">{{ config.previewTitle }}</p>
                            <p class="mt-2 text-sm text-slate-300">Protected workspace snapshot</p>
                        </div>
                        <span class="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                            Ready
                        </span>
                    </div>

                    <div class="mt-5 grid gap-3 sm:grid-cols-2">
                        <div
                            v-for="metric in config.previewMetrics"
                            :key="metric.label"
                            class="rounded-2xl border border-white/10 bg-[rgba(5,10,19,0.65)] p-4"
                        >
                            <p class="text-xs uppercase tracking-[0.24em] text-slate-500">{{ metric.label }}</p>
                            <p class="mt-2 font-mono text-2xl font-semibold text-white">{{ metric.value }}</p>
                        </div>
                    </div>
                </div>

                <div class="grid gap-3 sm:grid-cols-2">
                    <div
                        v-for="item in config.checklist"
                        :key="item"
                        class="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm text-slate-300"
                    >
                        <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/12 text-emerald-200">✓</span>
                        <span>{{ item }}</span>
                    </div>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import AppCard from '@/components/ui/AppCard.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import { type AuthPanelConfig } from '@/data/authData';

import AuthSecurityBadge from './AuthSecurityBadge.vue';

defineProps<{
    config: AuthPanelConfig;
}>();
</script>
