<template>
    <RouterLink
        v-if="to"
        :to="to"
        :class="buttonClasses"
        :aria-disabled="disabled || undefined"
        :tabindex="disabled ? -1 : undefined"
    >
        <slot />
    </RouterLink>
    <a v-else-if="href" :href="href" :class="buttonClasses" :target="target" :rel="rel">
        <slot />
    </a>
    <button v-else :type="type" :disabled="disabled" :class="buttonClasses">
        <slot />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, type RouteLocationRaw } from 'vue-router';

type AppButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type AppButtonSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
    defineProps<{
        to?: RouteLocationRaw;
        href?: string;
        target?: '_blank' | '_self' | '_parent' | '_top';
        rel?: string;
        type?: 'button' | 'submit' | 'reset';
        variant?: AppButtonVariant;
        size?: AppButtonSize;
        disabled?: boolean;
    }>(),
    {
        type: 'button',
        variant: 'primary',
        size: 'md',
        disabled: false,
    },
);

const variantClasses: Record<AppButtonVariant, string> = {
    primary:
        'bg-teal-400 text-slate-950 shadow-[0_0_0_1px_rgba(45,212,191,0.22),0_12px_30px_-12px_rgba(45,212,191,0.55)] hover:bg-teal-300 focus-visible:ring-teal-300/80',
    secondary:
        'bg-white/[0.06] text-slate-100 ring-1 ring-white/10 hover:bg-white/[0.1] hover:text-white focus-visible:ring-slate-200/70',
    ghost: 'bg-transparent text-slate-300 hover:bg-white/[0.06] hover:text-white focus-visible:ring-slate-300/60',
    danger: 'bg-rose-500/12 text-rose-200 ring-1 ring-rose-400/20 hover:bg-rose-500/18 focus-visible:ring-rose-300/70',
    success:
        'bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-400/20 hover:bg-emerald-500/20 focus-visible:ring-emerald-300/70',
};

const sizeClasses: Record<AppButtonSize, string> = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-sm',
};

const buttonClasses = computed(() => [
    'inline-flex items-center justify-center gap-2 rounded-2xl font-medium tracking-[0.01em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.to || props.href ? 'whitespace-nowrap' : '',
]);
</script>
