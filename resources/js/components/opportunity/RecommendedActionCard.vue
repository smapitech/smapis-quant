<template>
    <AppCard class="space-y-4 border border-emerald-400/20 bg-emerald-500/8">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-200/80">Recommended Action</p>
                <h3 class="mt-2 text-2xl font-semibold text-emerald-100">{{ action.title }}</h3>
            </div>
            <StatusPill :label="action.title" tone="emerald" />
        </div>

        <div class="space-y-3">
            <div v-for="reason in action.reasons" :key="reason" class="flex items-start gap-3 text-sm leading-6 text-emerald-50/90">
                <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-300" />
                <span>{{ reason }}</span>
            </div>
        </div>

        <div class="grid gap-2 sm:grid-cols-3">
            <AppButton variant="primary" size="sm" class="w-full" @click="$emit('paper')">Paper Trade</AppButton>
            <AppButton variant="success" size="sm" class="w-full" @click="$emit('manual')">Manual Execute</AppButton>
            <AppButton variant="secondary" size="sm" class="w-full" @click="$emit('save')">Save</AppButton>
        </div>

        <AppButton variant="ghost" class="w-full" @click="$emit('view')">{{ action.buttonLabel }}</AppButton>
    </AppCard>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import type { OpportunityDetailRecord } from '@/types';

defineProps<{
    action: OpportunityDetailRecord['recommendedAction'];
}>();

defineEmits<{
    view: [];
    paper: [];
    manual: [];
    save: [];
}>();
</script>
