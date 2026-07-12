<template>
    <div class="min-h-screen">
        <header class="sticky top-0 z-40 border-b border-white/8 bg-[rgba(3,7,18,0.8)] backdrop-blur-2xl">
            <div class="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between gap-4">
                    <RouterLink to="/" class="shrink-0">
                        <AppLogo />
                    </RouterLink>

                    <nav class="hidden items-center gap-1 lg:flex">
                        <AppButton v-for="item in navLinks" :key="item.label" :href="item.href" variant="ghost" size="sm">
                            {{ item.label }}
                        </AppButton>
                    </nav>

                    <div class="flex items-center gap-2">
                        <AppButton href="/login" variant="ghost" size="sm">Login</AppButton>
                        <AppButton to="/register" size="sm">Start Free</AppButton>
                    </div>
                </div>

                <nav class="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                    <AppButton
                        v-for="item in navLinks"
                        :key="item.label"
                        :href="item.href"
                        variant="ghost"
                        size="sm"
                        class="shrink-0"
                    >
                        {{ item.label }}
                    </AppButton>
                </nav>
            </div>
        </header>

        <main class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';

const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Academy', href: '/#academy' },
    { label: 'Docs', href: '/#docs' },
    { label: 'Company', href: '/#company' },
];
</script>
