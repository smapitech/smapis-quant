<template>
    <component :is="layoutComponent">
        <RouterView />
    </component>
</template>

<script setup lang="ts">
import { computed, watchEffect, type Component } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import type { LayoutName } from '@/types';

const route = useRoute();

const layoutMap: Record<LayoutName, Component> = {
    app: AppLayout,
    auth: AuthLayout,
    public: PublicLayout,
};

const layoutComponent = computed(() => layoutMap[route.meta.layout ?? 'public']);

watchEffect(() => {
    const pageTitle = route.meta.title ? `${route.meta.title} - Smapis Quant AI` : 'Smapis Quant AI';
    document.title = pageTitle;
});
</script>
