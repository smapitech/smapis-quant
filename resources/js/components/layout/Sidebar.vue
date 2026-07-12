<template>
    <aside :class="asideClasses">
        <div class="flex items-center justify-between gap-3">
            <RouterLink to="/dashboard" class="min-w-0">
                <AppLogo :compact="uiStore.sidebarCollapsed" />
            </RouterLink>
            <AppButton
                variant="ghost"
                size="sm"
                class="shrink-0"
                :title="uiStore.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
                @click="uiStore.toggleSidebar"
            >
                <span class="text-xs uppercase tracking-[0.2em]">{{ uiStore.sidebarCollapsed ? 'Open' : 'Collapse' }}</span>
            </AppButton>
        </div>

        <div class="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.08] px-3 py-2 text-emerald-200">
            <span class="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]" />
            <span v-if="!uiStore.sidebarCollapsed" class="text-sm font-medium">Market Open</span>
        </div>

        <div class="mt-6 flex-1 space-y-6 overflow-y-auto pr-1">
            <section v-for="group in sidebarNavigation" :key="group.title" class="space-y-2">
                <p v-if="!uiStore.sidebarCollapsed" class="px-1 text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">
                    {{ group.title }}
                </p>
                <nav class="space-y-1.5">
                    <RouterLink v-for="item in group.items" :key="item.to" :to="item.to" :class="linkClasses(item.to)">
                        <span :class="iconClasses(item.tone)">
                            {{ iconLabel(item) }}
                        </span>
                        <span v-if="!uiStore.sidebarCollapsed" class="min-w-0 flex-1">
                            <span class="block text-sm font-medium text-white">{{ item.label }}</span>
                        </span>
                        <AppBadge v-if="item.badge && !uiStore.sidebarCollapsed" :tone="badgeTone(item.tone)">
                            {{ item.badge }}
                        </AppBadge>
                    </RouterLink>
                </nav>
            </section>
        </div>

        <div class="mt-6">
            <SystemStatusCard v-if="!uiStore.sidebarCollapsed" :status="systemStatus" />
            <div v-else class="flex justify-center">
                <StatusPill label="Live" tone="emerald" />
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import SystemStatusCard from '@/components/dashboard/SystemStatusCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import { sidebarNavigation } from '@/data/mockData';
import { systemStatus } from '@/data/dashboardData';
import { useUiStore } from '@/stores/uiStore';

const route = useRoute();
const uiStore = useUiStore();

function isActive(target: string) {
    return route.path === target || route.path.startsWith(`${target}/`);
}

function iconLabel(item: { icon?: string; label: string }) {
    return (item.icon ?? item.label.slice(0, 2)).slice(0, 2).toUpperCase();
}

function badgeTone(tone?: string) {
    switch (tone) {
        case 'emerald':
            return 'emerald';
        case 'amber':
            return 'amber';
        case 'rose':
            return 'rose';
        case 'teal':
            return 'teal';
        default:
            return 'slate';
    }
}

function iconClasses(tone?: string) {
    const toneMap: Record<string, string> = {
        teal: 'bg-teal-400/12 text-teal-200 ring-teal-400/15',
        emerald: 'bg-emerald-400/12 text-emerald-200 ring-emerald-400/15',
        amber: 'bg-amber-400/12 text-amber-200 ring-amber-400/15',
        rose: 'bg-rose-400/12 text-rose-200 ring-rose-400/15',
        slate: 'bg-slate-400/10 text-slate-200 ring-slate-400/15',
    };

    return [
        'grid h-10 w-10 shrink-0 place-items-center rounded-2xl border text-[11px] font-semibold tracking-[0.25em] ring-1',
        toneMap[tone ?? 'slate'],
    ];
}

function linkClasses(target: string) {
    return [
        'group flex items-center gap-3 rounded-2xl border px-3 py-3 transition duration-200',
        uiStore.sidebarCollapsed ? 'justify-center' : '',
        isActive(target)
            ? 'border-teal-400/20 bg-teal-400/[0.08] text-white shadow-[0_0_0_1px_rgba(45,212,191,0.12)]'
            : 'border-transparent bg-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-white',
    ];
}

const asideClasses = computed(() => [
    'sticky top-0 hidden h-screen flex-col border-r border-white/10 bg-[rgba(4,9,17,0.82)] px-4 py-5 backdrop-blur-xl lg:flex',
    uiStore.sidebarCollapsed ? 'w-[96px]' : 'w-[292px]',
]);
</script>
