<template>
    <div class="flex flex-wrap gap-2">
        <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            :class="tabClasses(tab.value)"
            @click="select(tab.value)"
        >
            <span>{{ tab.label }}</span>
            <AppBadge v-if="tab.badge" tone="slate">{{ tab.badge }}</AppBadge>
        </button>
    </div>
</template>

<script setup lang="ts">

import AppBadge from '@/components/ui/AppBadge.vue';

interface TabItem {
    label: string;
    value: string;
    badge?: string;
}

const props = defineProps<{
    modelValue: string;
    tabs: TabItem[];
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

function select(value: string) {
    emit('update:modelValue', value);
}

function tabClasses(value: string) {
    return [
        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition',
        value === props.modelValue
            ? 'border-teal-400/20 bg-teal-400/10 text-teal-100 shadow-[0_0_0_1px_rgba(45,212,191,0.1)]'
            : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white',
    ];
}
</script>
