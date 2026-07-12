<template>
    <section class="space-y-6">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div class="max-w-3xl space-y-3">
                <AppBadge tone="teal" subtle>Workspace settings</AppBadge>
                <h1 class="text-3xl font-semibold tracking-tight text-white">Configure the foundation before backend integration</h1>
                <p class="text-sm leading-6 text-slate-400">
                    These controls are placeholders for future persistence, role-based access, and notification plumbing.
                </p>
            </div>
            <AppButton variant="secondary" size="sm">Save draft</AppButton>
        </div>

        <AppTabs v-model="activeTab" :tabs="settingsTabs.map((tab) => ({ label: tab, value: tab }))" />

        <div class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Workspace settings</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Core desk preferences</h2>
                    </div>
                    <StatusPill label="Draft" tone="amber" />
                </div>
                <div class="space-y-3">
                    <AppInput v-model="workspaceName" label="Workspace name" placeholder="Smapis Quant OS" />
                    <AppInput v-model="baseCurrency" label="Base currency" placeholder="USD" />
                    <AppInput v-model="timezone" label="Timezone" placeholder="UTC+1" />
                    <AppInput v-model="notificationEmail" label="Notification email" placeholder="alerts@smapisquant.ai" />
                </div>
            </AppCard>

            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Settings sections</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Navigation targets for the future settings flow</h2>
                    </div>
                    <AppBadge tone="slate">{{ settingsSections.length }} sections</AppBadge>
                </div>
                <div class="grid gap-3 sm:grid-cols-2">
                    <div v-for="section in settingsSections" :key="section.label" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p class="text-sm font-semibold text-white">{{ section.label }}</p>
                        <p class="mt-2 text-sm leading-6 text-slate-400">{{ section.description }}</p>
                    </div>
                </div>
            </AppCard>
        </div>

        <AppCard class="space-y-4">
            <div class="flex items-center justify-between gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Auto trading settings</p>
                    <h2 class="mt-2 text-xl font-semibold text-white">Safety-first controls for later automation</h2>
                </div>
                <StatusPill label="Disabled" tone="slate" />
            </div>
            <div class="grid gap-3 md:grid-cols-3">
                <div v-for="control in autoTradingControls" :key="control.title" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <p class="text-sm font-semibold text-white">{{ control.title }}</p>
                            <p class="mt-1 text-sm text-slate-400">{{ control.description }}</p>
                        </div>
                        <AppBadge tone="amber">{{ control.status }}</AppBadge>
                    </div>
                    <p class="mt-3 text-sm text-slate-500">{{ control.note }}</p>
                </div>
            </div>
        </AppCard>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppTabs from '@/components/ui/AppTabs.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import { autoTradingControls, settingsSections, settingsTabs } from '@/data/mockData';

const activeTab = ref(settingsTabs[0]);
const workspaceName = ref('Smapis Quant OS');
const baseCurrency = ref('USD');
const timezone = ref('UTC+1');
const notificationEmail = ref('alerts@smapisquant.ai');
</script>
