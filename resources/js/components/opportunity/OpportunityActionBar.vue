<template>
    <AppCard class="space-y-4">
        <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Bottom Action Bar</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Execution controls and desk shortcuts</h3>
                <p class="mt-2 text-sm leading-6 text-slate-400">
                    These controls are mock-only for now and will connect to the execution workflow later.
                </p>
            </div>
            <AppBadge tone="teal">Ready</AppBadge>
        </div>

        <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            <AppButton variant="primary" size="sm" class="w-full" @click="$emit('paper')">Paper Trade</AppButton>
            <AppButton variant="success" size="sm" class="w-full" @click="$emit('manual')">Manual Execute</AppButton>
            <AppButton variant="secondary" size="sm" class="w-full" @click="$emit('auto')">Enable Auto Trading</AppButton>
            <AppButton variant="ghost" size="sm" class="w-full" @click="$emit('replay')">Replay</AppButton>
            <AppButton variant="secondary" size="sm" class="w-full" @click="$emit('download')">Download Report</AppButton>
            <AppButton variant="ghost" size="sm" class="w-full" @click="$emit('share')">Share</AppButton>
            <AppButton :variant="props.bookmarked ? 'success' : 'ghost'" size="sm" class="w-full" @click="$emit('bookmark')">
                {{ props.bookmarked ? 'Bookmarked' : 'Bookmark' }}
            </AppButton>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';

const props = withDefaults(
    defineProps<{
        bookmarked?: boolean;
    }>(),
    {
        bookmarked: false,
    },
);

defineEmits<{
    paper: [];
    manual: [];
    auto: [];
    replay: [];
    download: [];
    share: [];
    bookmark: [];
}>();
</script>
