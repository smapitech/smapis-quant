<template>
    <AppCard class="space-y-4">
        <div class="flex items-start justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Ask the AI</p>
                <h3 class="mt-2 text-xl font-semibold text-white">Desk conversation</h3>
            </div>
            <AppBadge tone="teal">Mock chat</AppBadge>
        </div>

        <div class="space-y-3">
            <article
                v-for="message in messages"
                :key="`${message.role}-${message.time}-${message.content}`"
                :class="message.role === 'user' ? 'ml-10 bg-teal-400/[0.08] border-teal-400/20' : 'mr-10 bg-white/[0.03] border-white/10'"
                class="rounded-2xl border p-4"
            >
                <div class="flex items-center justify-between gap-3">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">{{ message.role === 'user' ? 'User' : 'AI' }}</p>
                    <span class="text-xs uppercase tracking-[0.24em] text-slate-500">{{ message.time }}</span>
                </div>
                <p class="mt-3 text-sm leading-6 text-slate-200">{{ message.content }}</p>
            </article>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppCard from '@/components/ui/AppCard.vue';
import type { OpportunityChatMessage } from '@/types';

defineProps<{
    messages: OpportunityChatMessage[];
}>();
</script>
