<template>
    <label class="space-y-2">
        <span v-if="label" class="block text-sm font-medium text-slate-200">{{ label }}</span>
        <select
            :id="id"
            :name="name"
            :required="required"
            :disabled="disabled"
            :value="modelValue"
            @change="onChange"
            class="block w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
            <option v-if="placeholder" value="">{{ placeholder }}</option>
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
        <span v-if="hint" class="block text-xs text-slate-500">{{ hint }}</span>
    </label>
</template>

<script setup lang="ts">
export interface SelectOption {
    label: string;
    value: string;
}

const props = withDefaults(
    defineProps<{
        modelValue: string;
        options: SelectOption[];
        label?: string;
        id?: string;
        name?: string;
        placeholder?: string;
        hint?: string;
        required?: boolean;
        disabled?: boolean;
    }>(),
    {
        placeholder: '',
        required: false,
        disabled: false,
    },
);

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

function onChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    emit('update:modelValue', target?.value ?? '');
}
</script>
