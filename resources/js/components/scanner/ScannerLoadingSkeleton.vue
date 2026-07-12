<template>
    <div class="space-y-6 animate-pulse">
        <div class="grid gap-4 xl:grid-cols-6">
            <div v-for="index in 6" :key="index" class="h-32 rounded-[22px] border border-white/10 bg-white/[0.04]" />
        </div>

        <div class="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(360px,0.7fr)]">
            <div class="space-y-4">
                <div class="h-72 rounded-[24px] border border-white/10 bg-white/[0.04]" />
                <div class="h-96 rounded-[24px] border border-white/10 bg-white/[0.04]" />
            </div>
            <div class="space-y-4">
                <div v-for="index in 4" :key="index" class="h-52 rounded-[24px] border border-white/10 bg-white/[0.04]" />
            </div>
        </div>
    </div>
</template>
