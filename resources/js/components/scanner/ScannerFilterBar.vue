<template>
    <AppCard class="space-y-5">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Smart Filter Bar</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Shape the scan before it reaches the desk</h3>
                <p class="mt-1 text-sm text-slate-400">
                    Filter by exchange venue, spread, SQIS, liquidity, execution speed, and AI confidence.
                </p>
            </div>

            <div class="flex flex-wrap items-center gap-2">
                <StatusPill :label="compact ? 'Compact' : 'Live'" :tone="compact ? 'slate' : 'emerald'" />
                <AppButton variant="ghost" size="sm" @click="$emit('reset')">Reset Filters</AppButton>
                <AppButton variant="secondary" size="sm" @click="$emit('save')">Save Filter</AppButton>
            </div>
        </div>

        <div class="space-y-3">
            <div class="flex flex-wrap gap-2">
                <AppButton
                    v-for="preset in presets"
                    :key="preset.id"
                    :variant="preset.id === activePresetId ? 'primary' : 'secondary'"
                    size="sm"
                    @click="$emit('preset', preset.id)"
                >
                    <span>{{ preset.label }}</span>
                </AppButton>
            </div>
            <p class="text-xs leading-5 text-slate-500">
                Presets visually update the filter set for quick desk alignment.
            </p>
        </div>

        <div class="space-y-5">
            <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                <label
                    v-for="field in primaryFilters"
                    :key="field.label"
                    :class="fieldClasses(field)"
                    class="space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                    <span class="block text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">{{ field.label }}</span>

                    <select
                        v-if="field.kind === 'select'"
                        :value="filters[field.key] as string"
                        class="block w-full rounded-2xl border border-white/10 bg-[rgba(5,10,19,0.72)] px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none transition focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/12"
                        @change="updateField(field.key, ($event.target as HTMLSelectElement).value)"
                    >
                        <option v-for="option in field.options" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>

                    <AppInput
                        v-else
                        :model-value="String(filters[field.key] ?? '')"
                        :type="field.kind === 'number' ? 'number' : 'text'"
                        :placeholder="field.placeholder"
                        @update:model-value="updateField(field.key, $event)"
                    >
                        <template v-if="field.suffix" #right>
                            <span class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{{ field.suffix }}</span>
                        </template>
                    </AppInput>
                </label>
            </div>

            <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                <label
                    v-for="field in secondaryFilters"
                    :key="field.label"
                    :class="fieldClasses(field)"
                    class="space-y-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                    <span class="block text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">{{ field.label }}</span>

                    <select
                        v-if="field.kind === 'select'"
                        :value="filters[field.key] as string"
                        class="block w-full rounded-2xl border border-white/10 bg-[rgba(5,10,19,0.72)] px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none transition focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/12"
                        @change="updateField(field.key, ($event.target as HTMLSelectElement).value)"
                    >
                        <option v-for="option in field.options" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>

                    <AppInput
                        v-else
                        :model-value="String(filters[field.key] ?? '')"
                        :type="field.kind === 'number' ? 'number' : 'text'"
                        :placeholder="field.placeholder"
                        @update:model-value="updateField(field.key, $event)"
                    >
                        <template v-if="field.suffix" #right>
                            <span class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{{ field.suffix }}</span>
                        </template>
                    </AppInput>
                </label>
            </div>

            <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div class="grid gap-2 sm:grid-cols-3">
                    <label class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <input
                            :checked="filters.favoriteOnly"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/20 bg-slate-950 text-teal-400 focus:ring-teal-400/40"
                            @change="updateToggle('favoriteOnly', ($event.target as HTMLInputElement).checked)"
                        >
                        <span>
                            <span class="block text-sm font-medium text-white">Favorite only</span>
                            <span class="block text-xs text-slate-500">Keep watchlisted venues in view</span>
                        </span>
                    </label>

                    <label class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <input
                            :checked="filters.hideHighRisk"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/20 bg-slate-950 text-teal-400 focus:ring-teal-400/40"
                            @change="updateToggle('hideHighRisk', ($event.target as HTMLInputElement).checked)"
                        >
                        <span>
                            <span class="block text-sm font-medium text-white">Hide high risk</span>
                            <span class="block text-xs text-slate-500">Suppress red-flag opportunities</span>
                        </span>
                    </label>

                    <label class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <input
                            :checked="filters.hideLowLiquidity"
                            type="checkbox"
                            class="h-4 w-4 rounded border-white/20 bg-slate-950 text-teal-400 focus:ring-teal-400/40"
                            @change="updateToggle('hideLowLiquidity', ($event.target as HTMLInputElement).checked)"
                        >
                        <span>
                            <span class="block text-sm font-medium text-white">Hide low liquidity</span>
                            <span class="block text-xs text-slate-500">Avoid thin books and poor depth</span>
                        </span>
                    </label>
                </div>

                <div class="flex flex-wrap gap-2">
                    <AppButton variant="secondary" size="sm" @click="$emit('refresh')">Refresh Snapshot</AppButton>
                    <AppButton variant="ghost" size="sm" @click="$emit('mobile')">
                        {{ compact ? 'Close' : 'Mobile Filters' }}
                    </AppButton>
                </div>
            </div>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppInput from '@/components/ui/AppInput.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { ScannerFilterField, ScannerFilterState, ScannerPreset } from '@/types';

const props = withDefaults(
    defineProps<{
        filters: ScannerFilterState;
        presets: ScannerPreset[];
        activePresetId: string;
        primaryFilters: ScannerFilterField[];
        secondaryFilters: ScannerFilterField[];
        compact?: boolean;
    }>(),
    {
        compact: false,
    },
);

const emit = defineEmits<{
    preset: [presetId: string];
    reset: [];
    save: [];
    refresh: [];
    mobile: [];
    'update:filters': [filters: ScannerFilterState];
}>();

function updateField(key: keyof ScannerFilterState, value: string) {
    emit('update:filters', {
        ...props.filters,
        [key]: value,
    });
}

function updateToggle(key: 'favoriteOnly' | 'hideHighRisk' | 'hideLowLiquidity', value: boolean) {
    emit('update:filters', {
        ...props.filters,
        [key]: value,
    });
}

function fieldClasses(field: ScannerFilterField) {
    return field.span === '2' ? 'md:col-span-2' : field.span === '3' ? 'md:col-span-3' : '';
}
</script>
