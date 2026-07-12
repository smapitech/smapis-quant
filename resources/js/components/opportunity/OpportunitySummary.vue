<template>
    <section class="space-y-4">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div class="space-y-3">
                <div class="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
                    <span v-for="(item, index) in record.breadcrumb" :key="item" class="flex items-center gap-2">
                        <span>{{ item }}</span>
                        <span v-if="index < record.breadcrumb.length - 1" class="text-slate-600">></span>
                    </span>
                </div>
                <div class="flex flex-wrap items-center gap-3">
                    <StatusPill :label="record.status" :tone="record.statusTone" />
                    <AppBadge tone="teal" subtle>{{ record.arbitrageType }}</AppBadge>
                </div>
                <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{{ record.title }}</h1>
                <p class="max-w-4xl text-sm leading-6 text-slate-400 sm:text-base">{{ record.subtitle }}</p>
            </div>

            <div class="flex flex-wrap items-center gap-2">
                <AppButton variant="ghost" size="sm" @click="$emit('replay')">Replay Opportunity</AppButton>
                <AppButton variant="secondary" size="sm" @click="$emit('share')">Share Analysis</AppButton>
                <AppButton variant="secondary" size="sm" @click="$emit('download')">Download PDF Report</AppButton>
                <AppButton variant="primary" size="sm" @click="$emit('paper')">Paper Trade</AppButton>
                <AppButton variant="success" size="sm" @click="$emit('manual')">Manual Execute</AppButton>
                <AppButton :variant="bookmarked ? 'success' : 'ghost'" size="sm" @click="$emit('bookmark')">
                    {{ bookmarked ? 'Bookmarked' : 'Bookmark' }}
                </AppButton>
                <AppButton variant="ghost" size="sm" @click="$emit('more')">More Actions</AppButton>
            </div>
        </div>

        <div class="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_360px]">
            <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <AppCard
                    v-for="metric in record.summaryMetrics"
                    :key="metric.label"
                    class="space-y-2"
                    :tone="metric.tone === 'slate' ? 'subtle' : 'default'"
                >
                    <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">{{ metric.label }}</p>
                    <p class="font-mono text-2xl font-semibold text-white">{{ metric.value }}</p>
                    <p class="text-sm text-slate-400">{{ metric.detail }}</p>
                </AppCard>
            </div>

                <AppCard class="space-y-4">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Opportunity Summary</p>
                        <h3 class="mt-2 text-xl font-semibold text-white">{{ record.pair }}</h3>
                        <p class="mt-1 text-sm text-slate-400">Decision context and live scan metadata</p>
                        </div>
                        <AppBadge tone="emerald" subtle>{{ record.sqisBand }}</AppBadge>
                    </div>

                <div class="grid gap-3 sm:grid-cols-2">
                    <div
                        v-for="item in record.quickSummary"
                        :key="item.label"
                        class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                        <p class="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">{{ item.label }}</p>
                        <p class="mt-2 font-mono text-lg font-semibold text-white">{{ item.value }}</p>
                        <p class="mt-1 text-xs leading-5 text-slate-400">{{ item.detail }}</p>
                    </div>
                </div>
            </AppCard>
        </div>
    </section>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { OpportunityDetailRecord } from '@/types';

defineProps<{
    record: OpportunityDetailRecord;
    bookmarked?: boolean;
}>();

defineEmits<{
    replay: [];
    share: [];
    download: [];
    paper: [];
    manual: [];
    bookmark: [];
    more: [];
}>();
</script>
