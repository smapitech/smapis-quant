<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="open" class="fixed inset-0 z-50">
                <button
                    type="button"
                    class="absolute inset-0 bg-slate-950/78 backdrop-blur-sm"
                    aria-label="Close modal"
                    @click="close"
                />

                <Transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="opacity-0 translate-y-3 scale-[0.98]"
                    enter-to-class="opacity-100 translate-y-0 scale-100"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="opacity-100 translate-y-0 scale-100"
                    leave-to-class="opacity-0 translate-y-3 scale-[0.98]"
                >
                    <div
                        class="relative mx-auto flex min-h-full w-full items-center justify-center p-4"
                        @keydown.esc.prevent="close"
                    >
                        <div :class="panelClasses" tabindex="-1">
                            <div v-if="title || description || $slots.header" class="border-b border-white/10 px-5 py-4">
                                <slot name="header">
                                    <div class="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
                                            <p v-if="description" class="mt-1 text-sm leading-6 text-slate-400">
                                                {{ description }}
                                            </p>
                                        </div>
                                        <AppButton variant="ghost" size="sm" @click="close">Close</AppButton>
                                    </div>
                                </slot>
                            </div>
                            <div class="max-h-[80vh] overflow-y-auto px-5 py-5">
                                <slot />
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue';

import AppButton from '@/components/ui/AppButton.vue';

const props = withDefaults(
    defineProps<{
        open: boolean;
        title?: string;
        description?: string;
        size?: 'sm' | 'md' | 'lg' | 'xl';
    }>(),
    {
        title: '',
        description: '',
        size: 'lg',
    },
);

const emit = defineEmits<{
    'update:open': [value: boolean];
}>();

const sizeClasses = {
    sm: 'max-w-lg',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
};

const panelClasses = computed(() => [
    'w-full overflow-hidden rounded-[24px] border border-white/10 bg-[var(--app-surface)] shadow-[0_28px_90px_-30px_rgba(0,0,0,0.96)] backdrop-blur-xl',
    sizeClasses[props.size],
]);

function close() {
    emit('update:open', false);
}

watch(
    () => props.open,
    (isOpen) => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    },
    { immediate: true },
);

onBeforeUnmount(() => {
    document.body.style.overflow = '';
});
</script>
