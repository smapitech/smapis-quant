<template>
    <section class="space-y-6">
        <div class="space-y-3">
            <div class="h-4 w-44 rounded-full bg-white/[0.06] animate-pulse" />
            <div class="h-12 w-[28rem] max-w-full rounded-2xl bg-white/[0.08] animate-pulse" />
            <div class="h-5 w-[36rem] max-w-full rounded-full bg-white/[0.06] animate-pulse" />
        </div>

        <div class="grid gap-4 xl:grid-cols-4 2xl:grid-cols-6">
            <div v-for="index in 6" :key="index" class="h-28 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
        </div>

        <div class="grid gap-6 2xl:grid-cols-[minmax(0,1.6fr)_380px]">
            <div class="space-y-6">
                <div class="grid gap-6 xl:grid-cols-2">
                    <div class="h-72 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                    <div class="h-72 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                </div>
                <div class="h-72 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                <div class="h-72 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                <div class="grid gap-6 xl:grid-cols-2">
                    <div class="h-64 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                    <div class="h-64 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                </div>
                <div class="h-80 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                <div class="h-64 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                <div class="h-72 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                <div class="h-80 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                <div class="h-48 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
            </div>

            <div class="space-y-6">
                <div class="h-64 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                <div class="h-80 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                <div class="h-80 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
                <div class="h-60 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
            </div>
        </div>

        <div class="h-36 rounded-[22px] border border-white/10 bg-white/[0.03] animate-pulse" />
    </section>
</template>
