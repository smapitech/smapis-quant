<template>
    <AppModal
        v-model:open="uiStore.mobileNavOpen"
        title="Navigation"
        description="Move across Smapis Quant OS modules."
    >
        <div class="space-y-5">
            <div v-for="group in sidebarNavigation" :key="group.title" class="space-y-3">
                <p class="text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-500">{{ group.title }}</p>
                <div class="grid gap-2">
                    <RouterLink
                        v-for="item in group.items"
                        :key="item.to"
                        :to="item.to"
                        :class="linkClasses(item.to)"
                        @click="uiStore.closeMobileNav"
                    >
                        <span :class="iconClasses(item.tone)">
                            {{ iconLabel(item) }}
                        </span>
                        <span class="min-w-0 flex-1">
                            <span class="block text-sm font-medium text-white">{{ item.label }}</span>
                        </span>
                        <AppBadge v-if="item.badge" :tone="badgeTone(item.tone)">
                            {{ item.badge }}
                        </AppBadge>
                    </RouterLink>
                </div>
            </div>

            <SystemStatusCard :status="systemStatus" />

            <AppCard tone="glass" class="space-y-4">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-teal-300/80">Workspace</p>
                        <p class="mt-2 text-lg font-semibold text-white">{{ authStore.workspaceName }}</p>
                    </div>
                    <StatusPill label="Live" tone="emerald" />
                </div>
                <p class="text-sm text-slate-400">
                    {{ authStore.user?.name ?? 'Guest Trader' }} - {{ authStore.user?.title ?? 'Workspace' }}
                </p>
            </AppCard>
        </div>
    </AppModal>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppModal from '@/components/ui/AppModal.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import SystemStatusCard from '@/components/dashboard/SystemStatusCard.vue';
import { sidebarNavigation } from '@/data/mockData';
import { systemStatus } from '@/data/dashboardData';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';

const uiStore = useUiStore();
const authStore = useAuthStore();
const route = useRoute();

function iconLabel(item: { icon?: string; label: string }) {
    return (item.icon ?? item.label.slice(0, 2)).slice(0, 2).toUpperCase();
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

function linkClasses(target: string) {
    const active = route.path === target || route.path.startsWith(`${target}/`);

    return [
        'group flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition duration-200',
        active
            ? 'border-teal-400/20 bg-teal-400/[0.08] text-white'
            : 'border-white/8 bg-white/[0.03] text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white',
    ];
}
</script>
