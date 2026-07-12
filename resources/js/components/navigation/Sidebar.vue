<template>
    <aside
        class="sticky top-0 hidden h-screen flex-col border-r border-white/10 bg-slate-950/55 px-5 py-6 backdrop-blur-xl lg:flex"
    >
        <div class="flex items-center justify-between gap-4">
            <AppLogo />
            <StatusBadge variant="success">Live</StatusBadge>
        </div>

        <div class="mt-8 flex-1 space-y-6 overflow-y-auto pr-1">
            <section v-for="group in sidebarNavigation" :key="group.title" class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{{ group.title }}</p>
                <nav class="space-y-2">
                    <RouterLink
                        v-for="item in group.items"
                        :key="item.to"
                        :to="item.to"
                        :class="linkClasses(item.to)"
                    >
                        <span class="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-white/5 text-xs font-semibold text-cyan-200 ring-1 ring-white/10">
                            {{ item.label.slice(0, 2).toUpperCase() }}
                        </span>
                        <span class="min-w-0 flex-1">
                            <span class="block text-sm font-medium text-white">{{ item.label }}</span>
                            <span class="mt-0.5 block text-xs leading-5 text-slate-400">{{ item.description }}</span>
                        </span>
                        <span v-if="item.badge" class="rounded-full bg-cyan-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                            {{ item.badge }}
                        </span>
                    </RouterLink>
                </nav>
            </section>
        </div>

        <BaseCard class="mt-6 border-cyan-400/10 bg-cyan-400/[0.06] p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">Market pulse</p>
            <div class="mt-4 flex items-end justify-between gap-4">
                <div>
                    <p class="text-2xl font-semibold text-white">86/100</p>
                    <p class="mt-1 text-xs text-slate-400">Opportunity score</p>
                </div>
                <StatusBadge variant="info">4 scanners live</StatusBadge>
            </div>
        </BaseCard>
    </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

import AppLogo from '@/components/ui/AppLogo.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';
import { sidebarNavigation } from '@/data/mockData';

const route = useRoute();

function linkClasses(target: string) {
    const active = route.path === target || route.path.startsWith(`${target}/`);

    return [
        'group flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition duration-200',
        active
            ? 'border-cyan-400/20 bg-cyan-400/[0.08] text-white shadow-[0_0_0_1px_rgba(34,211,238,0.12)]'
            : 'border-transparent bg-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white',
    ];
}
</script>
