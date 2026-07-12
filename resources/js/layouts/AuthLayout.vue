<template>
    <div class="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div class="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
            <div class="order-2 lg:order-1">
                <AuthFeaturePanel :config="panelConfig" />
            </div>

            <section class="order-1 flex items-center justify-center lg:order-2">
                <div class="w-full max-w-xl">
                    <slot />
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import AuthFeaturePanel from '@/components/auth/AuthFeaturePanel.vue';
import { loginPanel, registerPanel } from '@/data/authData';

const route = useRoute();

const panelConfig = computed(() => (route.name === 'register' ? registerPanel : loginPanel));
</script>
