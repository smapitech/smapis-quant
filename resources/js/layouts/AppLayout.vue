<template>
    <div class="relative min-h-screen bg-[var(--app-bg)] text-slate-100 lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
        <Sidebar />
        <MobileNav />
        <div class="relative flex min-h-screen flex-col">
            <Topbar />
            <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                <div class="mx-auto w-full max-w-[1860px] space-y-6">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import MobileNav from '@/components/layout/MobileNav.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import Topbar from '@/components/layout/Topbar.vue';
</script>
