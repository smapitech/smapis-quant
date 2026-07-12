<template>
    <AppButton
        :to="to"
        :href="href"
        :target="target"
        :rel="rel"
        :type="type"
        :variant="variant"
        :size="size"
        :disabled="disabled"
        class="w-full"
    >
        <slot />
    </AppButton>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';

withDefaults(
    defineProps<{
        to?: string;
        href?: string;
        target?: '_blank' | '_self' | '_parent' | '_top';
        rel?: string;
        type?: 'button' | 'submit' | 'reset';
        variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
        size?: 'sm' | 'md' | 'lg';
        disabled?: boolean;
    }>(),
    {
        type: 'button',
        variant: 'primary',
        size: 'md',
        disabled: false,
    },
);
</script>
