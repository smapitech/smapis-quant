<template>
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div class="max-w-3xl space-y-2">
            <p v-if="eyebrow" class="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">{{ eyebrow }}</p>
            <h2 class="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{{ title }}</h2>
            <p v-if="description" class="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                {{ description }}
            </p>
        </div>
        <slot name="action" />
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        title: string;
        description?: string;
        eyebrow?: string;
    }>(),
    {
        description: '',
        eyebrow: '',
    },
);
</script>
