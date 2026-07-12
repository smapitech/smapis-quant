<template>
    <header ref="rootRef" class="sticky top-0 z-30 border-b border-white/10 bg-[rgba(4,9,17,0.82)] backdrop-blur-xl">
        <div class="px-4 py-4 sm:px-6 lg:px-8">
            <div class="flex flex-col gap-4 xl:flex-row xl:items-center">
                <div class="flex items-center gap-3">
                    <button
                        type="button"
                        class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08] lg:hidden"
                        @click="uiStore.toggleMobileNav"
                    >
                        <span class="sr-only">Open navigation</span>
                        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div class="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 xl:flex">
                        <StatusPill label="Market Open" tone="emerald" />
                        <span class="font-mono text-sm text-slate-300">UTC {{ utcClock }}</span>
                    </div>

                    <AppInput
                        v-model="searchQuery"
                        placeholder="Search opportunities, pairs, exchanges..."
                        class="min-w-0 flex-1 xl:w-[720px]"
                    >
                        <template #left>
                            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                                <circle cx="11" cy="11" r="6" />
                                <path d="m16 16 4 4" />
                            </svg>
                        </template>
                        <template #right>
                            <span class="rounded-lg border border-white/10 bg-white/[0.05] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">
                                /
                            </span>
                        </template>
                    </AppInput>
                </div>

                <div class="flex flex-wrap items-center gap-2 xl:ml-auto">
                    <StatusPill label="Live Trading Enabled" tone="emerald" />

                    <div class="relative" ref="quickActionsRef">
                        <AppButton variant="secondary" size="sm" type="button" @click="toggleQuickActions">
                            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                                <path d="M13 3 4 14h6l-1 7 11-11h-6l-1-7Z" />
                            </svg>
                            <span>Quick Actions</span>
                            <svg viewBox="0 0 24 24" class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </AppButton>

                        <transition
                            enter-active-class="transition duration-150 ease-out"
                            enter-from-class="opacity-0 translate-y-2"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition duration-100 ease-in"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 translate-y-2"
                        >
                            <div
                                v-if="quickActionsOpen"
                                class="absolute right-0 top-full z-40 mt-3 w-[min(92vw,36rem)] rounded-[24px] border border-white/10 bg-[rgba(8,14,26,0.98)] p-4 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.95)]"
                            >
                                <div class="mb-3 flex items-center justify-between gap-3">
                                    <div>
                                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Quick Actions</p>
                                        <p class="mt-1 text-sm text-slate-400">Jump to the most common desk workflows.</p>
                                    </div>
                                    <StatusPill label="Ready" tone="emerald" />
                                </div>

                                <div class="grid gap-2 sm:grid-cols-2">
                                    <RouterLink
                                        v-for="action in quickActions"
                                        :key="action.label"
                                        :to="action.to"
                                        class="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition hover:border-white/12 hover:bg-white/[0.06]"
                                        @click="closeMenus"
                                    >
                                        <div class="flex items-start gap-3">
                                            <div :class="toneIconClasses(action.tone)" class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-[11px] font-semibold tracking-[0.28em]">
                                                {{ action.icon }}
                                            </div>
                                            <div class="min-w-0 flex-1">
                                                <p class="font-medium text-white">{{ action.label }}</p>
                                                <p class="mt-1 text-sm leading-6 text-slate-400">{{ action.description }}</p>
                                            </div>
                                        </div>
                                    </RouterLink>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <button
                        type="button"
                        class="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08]"
                        aria-label="Notifications"
                    >
                        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                            <path d="M15 17H9" />
                            <path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7" />
                            <path d="M10 19a2 2 0 0 0 4 0" />
                        </svg>
                        <span class="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-400 shadow-[0_0_0_4px_rgba(244,63,94,0.12)]" />
                    </button>

                    <RouterLink
                        to="/help-center"
                        class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08]"
                    >
                        <span class="sr-only">Help Center</span>
                        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                            <path d="M12 18h.01" />
                            <path d="M9.5 9.5a3 3 0 1 1 5 2.24c-.95.72-1.5 1.4-1.5 2.76" />
                            <circle cx="12" cy="12" r="9" />
                        </svg>
                    </RouterLink>

                    <div class="relative" ref="profileRef">
                        <button
                            type="button"
                            class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-left transition hover:bg-white/[0.08]"
                            @click="toggleProfile"
                        >
                            <div class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-xs font-bold text-slate-950">
                                {{ authStore.user?.initials ?? 'SQ' }}
                            </div>
                            <div class="hidden min-w-0 leading-tight xl:block">
                                <p class="truncate text-sm font-medium text-white">{{ authStore.user?.name ?? 'Guest Trader' }}</p>
                                <p class="truncate text-xs text-slate-400">{{ authStore.user?.title ?? 'Workspace' }}</p>
                            </div>
                            <svg viewBox="0 0 24 24" class="hidden h-4 w-4 text-slate-400 xl:block" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>

                        <transition
                            enter-active-class="transition duration-150 ease-out"
                            enter-from-class="opacity-0 translate-y-2"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition duration-100 ease-in"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 translate-y-2"
                        >
                            <div
                                v-if="profileOpen"
                                class="absolute right-0 top-full z-40 mt-3 w-80 rounded-[24px] border border-white/10 bg-[rgba(8,14,26,0.98)] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.95)]"
                            >
                                <div class="border-b border-white/8 p-4">
                                    <p class="text-sm font-semibold text-white">{{ authStore.user?.name ?? 'Guest Trader' }}</p>
                                    <p class="mt-1 text-sm text-slate-400">{{ authStore.user?.email ?? 'No email connected' }}</p>
                                    <p class="mt-2 text-xs uppercase tracking-[0.26em] text-slate-500">
                                        {{ authStore.workspaceName }}
                                    </p>
                                </div>

                                <div class="space-y-1 p-3">
                                    <RouterLink
                                        to="/settings"
                                        class="block rounded-2xl border border-transparent px-3 py-2.5 text-sm text-slate-300 transition hover:border-white/8 hover:bg-white/[0.05] hover:text-white"
                                        @click="closeMenus"
                                    >
                                        Workspace settings
                                    </RouterLink>
                                    <RouterLink
                                        to="/portfolio"
                                        class="block rounded-2xl border border-transparent px-3 py-2.5 text-sm text-slate-300 transition hover:border-white/8 hover:bg-white/[0.05] hover:text-white"
                                        @click="closeMenus"
                                    >
                                        Portfolio
                                    </RouterLink>
                                    <RouterLink
                                        to="/billing"
                                        class="block rounded-2xl border border-transparent px-3 py-2.5 text-sm text-slate-300 transition hover:border-white/8 hover:bg-white/[0.05] hover:text-white"
                                        @click="closeMenus"
                                    >
                                        Billing
                                    </RouterLink>
                                </div>

                                <form action="/logout" method="POST" class="border-t border-white/8 p-3">
                                    <input type="hidden" name="_token" :value="csrfToken">
                                    <button
                                        type="submit"
                                        class="flex w-full items-center justify-between rounded-2xl border border-rose-400/15 bg-rose-400/[0.08] px-3 py-2.5 text-sm font-medium text-rose-200 transition hover:bg-rose-400/[0.12]"
                                    >
                                        <span>Sign out</span>
                                        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                                            <path d="M10 17l5-5-5-5" />
                                            <path d="M15 12H3" />
                                            <path d="M21 5v14" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

import AppButton from '@/components/ui/AppButton.vue';
import AppInput from '@/components/ui/AppInput.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import { quickActions } from '@/data/dashboardData';
import { useAuthStore } from '@/stores/authStore';
import { useScannerStore } from '@/stores/scannerStore';
import { useUiStore } from '@/stores/uiStore';
import type { DashboardTone } from '@/types';

const uiStore = useUiStore();
const authStore = useAuthStore();
const scannerStore = useScannerStore();

const searchQuery = computed({
    get: () => scannerStore.searchQuery,
    set: (value: string) => scannerStore.setSearch(value),
});
const quickActionsOpen = ref(false);
const profileOpen = ref(false);
const rootRef = ref<HTMLElement | null>(null);
const quickActionsRef = ref<HTMLElement | null>(null);
const profileRef = ref<HTMLElement | null>(null);
const utcClock = ref('');
let clockTimer: number | undefined;
const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

function toggleQuickActions() {
    quickActionsOpen.value = !quickActionsOpen.value;
    if (quickActionsOpen.value) {
        profileOpen.value = false;
    }
}

function toggleProfile() {
    profileOpen.value = !profileOpen.value;
    if (profileOpen.value) {
        quickActionsOpen.value = false;
    }
}

function closeMenus() {
    quickActionsOpen.value = false;
    profileOpen.value = false;
}

function toneIconClasses(tone: DashboardTone) {
    const map: Record<DashboardTone, string> = {
        teal: 'border-teal-400/15 bg-teal-400/[0.08] text-teal-200',
        emerald: 'border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-200',
        amber: 'border-amber-400/15 bg-amber-400/[0.08] text-amber-200',
        rose: 'border-rose-400/15 bg-rose-400/[0.08] text-rose-200',
        slate: 'border-white/10 bg-white/[0.05] text-slate-200',
    };

    return map[tone];
}

function handleDocumentClick(event: MouseEvent) {
    const target = event.target as Node | null;
    const root = rootRef.value;

    if (!root || !target) {
        return;
    }

    if (!root.contains(target)) {
        closeMenus();
        return;
    }

    if (quickActionsRef.value && !quickActionsRef.value.contains(target)) {
        quickActionsOpen.value = false;
    }

    if (profileRef.value && !profileRef.value.contains(target)) {
        profileOpen.value = false;
    }
}

function updateClock() {
    utcClock.value = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    }).format(new Date());
}

onMounted(() => {
    updateClock();
    clockTimer = window.setInterval(updateClock, 1000);
    document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleDocumentClick);
    if (clockTimer) {
        window.clearInterval(clockTimer);
    }
});
</script>
