<template>
    <section :class="cardClasses">
        <slot />
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        tone?: 'default' | 'glass' | 'subtle';
        padded?: boolean;
    }>(),
    {
        tone: 'default',
        padded: true,
    },
);

const toneClasses = {
    default: 'border-white/10 bg-[var(--app-surface)] shadow-[0_24px_80px_-36px_rgba(0,0,0,0.95)]',
    glass: 'border-white/8 bg-[rgba(8,14,26,0.72)] shadow-[0_24px_80px_-36px_rgba(0,0,0,0.95)] backdrop-blur-xl',
    subtle: 'border-white/8 bg-white/[0.025] shadow-[0_20px_60px_-36px_rgba(0,0,0,0.75)]',
};

const cardClasses = computed(() => [
    'rounded-[22px] border',
    toneClasses[props.tone],
    props.padded ? 'p-5' : '',
]);
</script>
