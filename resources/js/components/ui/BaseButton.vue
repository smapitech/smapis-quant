<template>
    <RouterLink
        v-if="to"
        :to="to"
        :aria-disabled="disabled || undefined"
        :tabindex="disabled ? -1 : undefined"
        :class="buttonClasses"
        :data-variant="variant"
    >
        <slot />
    </RouterLink>
    <button v-else :type="type" :disabled="disabled" :class="buttonClasses" :data-variant="variant">
        <slot />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { RouterLink } from 'vue-router';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
    defineProps<{
        to?: RouteLocationRaw;
        type?: 'button' | 'submit' | 'reset';
        variant?: ButtonVariant;
        size?: ButtonSize;
        disabled?: boolean;
    }>(),
    {
        type: 'button',
        variant: 'primary',
        size: 'md',
        disabled: false,
    },
);

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-300 focus-visible:ring-cyan-300/80',
    secondary:
        'bg-white/[0.08] text-slate-100 ring-1 ring-white/10 hover:bg-white/[0.12] hover:text-white focus-visible:ring-slate-300/80',
    ghost: 'bg-transparent text-slate-300 hover:bg-white/[0.06] hover:text-white focus-visible:ring-slate-300/70',
    danger:
        'bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/20 hover:bg-rose-500/20 focus-visible:ring-rose-300/80',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-sm',
};

const buttonClasses = computed(() => [
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
    'disabled:pointer-events-none disabled:opacity-50',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.to && props.disabled ? 'pointer-events-none opacity-50' : '',
]);
</script>
