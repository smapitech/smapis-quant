<template>
    <label class="space-y-2">
        <span v-if="label" class="block text-sm font-medium text-slate-200">{{ label }}</span>
        <input
            :id="id"
            :name="name"
            :type="type"
            :autocomplete="autocomplete"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :value="modelValue"
            @input="onInput"
            class="block w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-60"
        />
        <span v-if="hint" class="block text-xs text-slate-500">{{ hint }}</span>
    </label>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: string;
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

function onInput(event: Event) {
    const target = event.target as HTMLInputElement | null;
    emit('update:modelValue', target?.value ?? '');
}
</script>
