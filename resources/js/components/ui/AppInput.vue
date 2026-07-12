<template>
    <label class="block space-y-2">
        <span v-if="label" class="block text-sm font-medium text-slate-200">{{ label }}</span>
        <div class="relative">
            <span v-if="$slots.left" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                <slot name="left" />
            </span>
            <input
                :id="id"
                :name="name"
                :type="type"
                :autocomplete="autocomplete"
                :placeholder="placeholder"
                :required="required"
                :disabled="disabled"
                :value="modelValue"
                :class="inputClasses"
                @input="onInput"
            >
            <span v-if="$slots.right" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                <slot name="right" />
            </span>
        </div>
        <span v-if="hint" class="block text-xs text-slate-500">{{ hint }}</span>
    </label>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

const props = withDefaults(
    defineProps<{
        modelValue: string | number;
        label?: string;
        id?: string;
        name?: string;
        type?: string;
        autocomplete?: string;
        placeholder?: string;
        hint?: string;
        required?: boolean;
        disabled?: boolean;
    }>(),
    {
        type: 'text',
        autocomplete: 'off',
        placeholder: '',
        required: false,
        disabled: false,
    },
);

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const slots = useSlots();

const inputClasses = computed(() => [
    'block w-full rounded-2xl border border-white/10 bg-[rgba(5,10,19,0.72)] px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none transition placeholder:text-slate-500 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/12 disabled:cursor-not-allowed disabled:opacity-60',
    slots.left ? 'pl-11' : '',
    slots.right ? 'pr-11' : '',
]);

function onInput(event: Event) {
    const target = event.target as HTMLInputElement | null;
    emit('update:modelValue', target?.value ?? '');
}
</script>
