<template>
    <div class="inline-flex items-center gap-3">
        <div
            class="grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(145deg,rgba(45,212,191,1),rgba(16,185,129,0.85),rgba(15,23,42,1))] text-sm font-black tracking-[0.2em] text-slate-950 shadow-[0_16px_40px_-12px_rgba(45,212,191,0.55)]"
        >
            SQ
        </div>
        <div v-if="!compact" class="space-y-0.5">
            <div class="flex items-center gap-2">
                <p class="text-sm font-semibold uppercase tracking-[0.32em] text-slate-100">Smapis Quant AI</p>
                <span class="rounded-full border border-teal-400/20 bg-teal-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-200">
                    OS
                </span>
            </div>
            <p class="text-xs text-slate-400">Institutional AI trading intelligence foundation</p>
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        compact?: boolean;
    }>(),
    {
        compact: false,
    },
);
</script>
