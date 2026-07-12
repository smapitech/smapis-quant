<template>
    <AppCard tone="glass" :padded="false">
        <div class="overflow-x-auto">
            <table class="min-w-full border-separate border-spacing-0 text-left text-sm">
                <slot />
            </table>
        </div>
    </AppCard>
</template>

<script setup lang="ts">
import AppCard from '@/components/ui/AppCard.vue';
</script>
