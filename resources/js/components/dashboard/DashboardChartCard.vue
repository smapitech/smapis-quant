<template>
    <AppCard class="overflow-hidden" :padded="false">
        <div v-if="loading" class="space-y-5 border-b border-white/8 px-5 py-5 sm:px-6">
            <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div class="space-y-3">
                    <div class="h-3 w-28 rounded-full bg-white/8" />
                    <div class="h-6 w-56 rounded-full bg-white/8" />
                    <div class="h-4 w-80 rounded-full bg-white/8" />
                </div>
                <div class="h-10 w-48 rounded-2xl bg-white/8" />
            </div>
            <div class="h-10 w-56 rounded-2xl bg-white/8" />
        </div>

        <div v-else class="border-b border-white/8 px-5 py-5 sm:px-6">
            <div class="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div class="min-w-0 space-y-3">
                    <AppBadge v-if="badge" :tone="badgeTone" subtle>{{ badge }}</AppBadge>
                    <div class="space-y-1">
                        <p v-if="eyebrow" class="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">
                            {{ eyebrow }}
                        </p>
                        <h3 class="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                            {{ title }}
                        </h3>
                        <p v-if="subtitle" class="max-w-2xl text-sm leading-6 text-slate-400">
                            {{ subtitle }}
                        </p>
                    </div>
                    <div v-if="metricValue" class="flex flex-wrap items-end gap-3">
                        <p class="font-mono text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            {{ metricValue }}
                        </p>
                        <div class="space-y-0.5">
                            <p v-if="metricLabel" class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                                {{ metricLabel }}
                            </p>
                            <p v-if="metricHint" :class="metricHintClasses" class="text-sm font-medium">
                                {{ metricHint }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col items-start gap-3 xl:items-end">
                    <slot name="actions" />
                    <AppTabs
                        v-if="tabItems.length"
                        :tabs="tabItems"
                        :model-value="currentTab"
                        @update:model-value="setTab"
                    />
                </div>
            </div>
        </div>

        <div v-if="loading" class="px-5 py-5 sm:px-6">
            <div class="space-y-4">
                <div class="h-[220px] rounded-[24px] border border-white/8 bg-white/[0.04]" />
                <div class="grid gap-3 sm:grid-cols-3">
                    <div v-for="index in 3" :key="index" class="h-24 rounded-[20px] border border-white/8 bg-white/[0.04]" />
                </div>
            </div>
        </div>

        <div v-else class="px-5 py-5 sm:px-6">
            <slot />
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppTabs from '@/components/ui/AppTabs.vue';
import type { DashboardTone } from '@/types';

const props = withDefaults(
    defineProps<{
        title: string;
        subtitle?: string;
        eyebrow?: string;
        badge?: string;
        badgeTone?: DashboardTone;
        metricLabel?: string;
        metricValue?: string;
        metricHint?: string;
        metricTone?: DashboardTone;
        tabs?: string[];
        activeTab?: string;
        loading?: boolean;
    }>(),
    {
        badgeTone: 'slate',
        metricTone: 'slate',
        tabs: () => [],
        activeTab: '',
        loading: false,
    },
);

const emit = defineEmits<{
    'update:activeTab': [value: string];
}>();

const currentTab = ref(props.activeTab || props.tabs[0] || '');

watch(
    () => props.activeTab,
    (value) => {
        if (value) {
            currentTab.value = value;
        }
    },
);

watch(
    () => props.tabs,
    (value) => {
        if (!currentTab.value && value.length) {
            currentTab.value = value[0];
        }
    },
    { deep: true },
);

const tabItems = computed(() =>
    props.tabs.map((tab) => ({
        label: tab,
        value: tab,
    })),
);

const metricHintClasses = computed(() => {
    const map: Record<DashboardTone, string> = {
        teal: 'text-teal-300',
        emerald: 'text-emerald-300',
        amber: 'text-amber-300',
        rose: 'text-rose-300',
        slate: 'text-slate-300',
    };

    return map[props.metricTone];
});

function setTab(value: string) {
    currentTab.value = value;
    emit('update:activeTab', value);
}
</script>
