<template>
    <label :for="id" class="block space-y-2">
        <span class="flex items-center justify-between gap-4 text-sm font-medium text-slate-200">
            <span>{{ label }}</span>
            <span v-if="optional" class="text-xs font-normal text-slate-500">Optional</span>
        </span>
        <div class="relative">
            <span
                v-if="$slots.left"
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500"
            >
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
                :aria-invalid="Boolean(error) || undefined"
                :aria-describedby="describedBy"
                :class="inputClasses"
                @input="onInput"
            >
            <span
                v-if="$slots.right"
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500"
            >
                <slot name="right" />
            </span>
        </div>
        <p v-if="hint && !error" :id="hintId" class="text-xs leading-5 text-slate-500">
            {{ hint }}
        </p>
        <p v-if="error" :id="errorId" class="text-xs leading-5 text-rose-300">
            {{ error }}
        </p>
    </label>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

const props = withDefaults(
    defineProps<{
        modelValue: string;
        id: string;
        name: string;
        label: string;
        type?: string;
        autocomplete?: string;
        placeholder?: string;
        hint?: string;
        error?: string;
        required?: boolean;
        disabled?: boolean;
        optional?: boolean;
    }>(),
    {
        type: 'text',
        autocomplete: 'off',
        placeholder: '',
        hint: '',
        error: '',
        required: false,
        disabled: false,
        optional: false,
    },
);

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const slots = useSlots();

const hintId = computed(() => `${props.id}-hint`);
const errorId = computed(() => `${props.id}-error`);
const describedBy = computed(() => {
    const ids = [];

    if (props.hint && !props.error) {
        ids.push(hintId.value);
    }

    if (props.error) {
        ids.push(errorId.value);
    }

    return ids.length > 0 ? ids.join(' ') : undefined;
});

const inputClasses = computed(() => [
    'block w-full rounded-2xl border border-white/10 bg-[rgba(5,10,19,0.76)] px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none transition placeholder:text-slate-500 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/12 disabled:cursor-not-allowed disabled:opacity-60',
    slots.left ? 'pl-11' : '',
    slots.right ? 'pr-11' : '',
    props.error ? 'border-rose-400/40 focus:border-rose-400/60 focus:ring-rose-400/12' : '',
]);

function onInput(event: Event) {
    const target = event.target as HTMLInputElement | null;
    emit('update:modelValue', target?.value ?? '');
}
</script>
