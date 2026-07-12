<template>
    <BaseCard class="p-6">
        <div class="space-y-4 text-center">
            <div class="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-400/20">
                <slot name="icon">SQ</slot>
            </div>
            <div class="space-y-2">
                <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
                <p class="mx-auto max-w-xl text-sm leading-6 text-slate-400">{{ description }}</p>
            </div>
            <slot name="action" />
        </div>
    </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue';

withDefaults(
    defineProps<{
        title: string;
        description: string;
    }>(),
    {},
);
</script>
