<template>
    <BaseCard class="p-4">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">Scanner filters</p>
                <p class="mt-1 text-sm text-slate-400">Basic placeholder controls for future filtering.</p>
            </div>
            <div class="flex flex-wrap gap-2">
                <button
                    v-for="filter in filters"
                    :key="filter"
                    type="button"
                    :class="[
                        'rounded-full px-3 py-1.5 text-xs font-medium transition',
                        filter === activeFilter
                            ? 'bg-cyan-400 text-slate-950'
                            : 'bg-white/[0.06] text-slate-300 ring-1 ring-white/10 hover:bg-white/10 hover:text-white',
                    ]"
                >
                    {{ filter }}
                </button>
            </div>
        </div>
    </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue';

defineProps<{
    filters: string[];
    activeFilter: string;
}>();
</script>
