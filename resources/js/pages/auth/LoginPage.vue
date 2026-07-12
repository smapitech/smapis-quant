<template>
    <AppCard class="space-y-6 border-white/10 bg-[rgba(8,14,26,0.86)] sm:p-8">
        <div class="space-y-3">
            <AppBadge tone="teal" subtle>Secure access</AppBadge>
            <h1 class="text-3xl font-semibold tracking-tight text-white">Welcome back</h1>
            <p class="text-sm leading-6 text-slate-400">
                Sign in to continue to your trading intelligence dashboard.
            </p>
        </div>

        <form ref="formRef" class="space-y-5" method="POST" action="/login">
            <input type="hidden" name="_token" :value="csrfToken">

            <AuthInput
                id="login-email"
                v-model="email"
                name="email"
                label="Email address"
                type="email"
                autocomplete="email"
                placeholder="name@company.com"
                :error="firstError('email')"
                required
            />

            <AuthInput
                id="login-password"
                v-model="password"
                name="password"
                label="Password"
                type="password"
                autocomplete="current-password"
                placeholder="Enter your password"
                :error="firstError('password')"
                required
            >
                <template #right>
                    <span class="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Secure</span>
                </template>
            </AuthInput>

            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label class="inline-flex items-center gap-3 text-sm text-slate-300">
                    <input
                        v-model="rememberMe"
                        name="remember"
                        type="checkbox"
                        class="h-4 w-4 rounded border-white/20 bg-slate-950 text-teal-400 focus:ring-teal-400/40"
                    >
                    Remember me
                </label>

                <a
                    href="mailto:support@smapisquant.ai?subject=Password%20reset%20help"
                    class="text-sm font-medium text-teal-200 transition hover:text-teal-100"
                >
                    Forgot password?
                </a>
            </div>

            <section class="space-y-3 rounded-2xl border border-teal-400/12 bg-teal-400/5 p-4">
                <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div class="space-y-1">
                        <p class="text-sm font-medium text-teal-100">Demo access</p>
                        <p class="text-xs leading-5 text-slate-400">
                            Use the seeded credentials to preview the dashboard instantly.
                        </p>
                    </div>

                    <div class="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[11px] font-mono tracking-[0.18em] text-slate-300">
                        LOCAL / DEV
                    </div>
                </div>

                <div class="grid gap-2 sm:grid-cols-2">
                    <div class="rounded-xl border border-white/8 bg-slate-950/50 px-3 py-2">
                        <p class="text-[11px] uppercase tracking-[0.22em] text-slate-500">Email</p>
                        <p class="mt-1 font-mono text-sm text-slate-100">{{ demoLoginCredentials.email }}</p>
                    </div>
                    <div class="rounded-xl border border-white/8 bg-slate-950/50 px-3 py-2">
                        <p class="text-[11px] uppercase tracking-[0.22em] text-slate-500">Password</p>
                        <p class="mt-1 font-mono text-sm text-slate-100">{{ demoLoginCredentials.password }}</p>
                    </div>
                </div>

                <AuthButton type="button" variant="secondary" @click="useDemoCredentials">
                    Use Demo & Sign In
                </AuthButton>
            </section>

            <AuthButton type="submit">Sign In</AuthButton>

            <div class="flex items-center justify-between gap-3 text-sm text-slate-400">
                <span>Don't have an account?</span>
                <AppButton to="/register" variant="ghost" size="sm">Create one</AppButton>
            </div>
        </form>
    </AppCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AuthButton from '@/components/auth/AuthButton.vue';
import AuthInput from '@/components/auth/AuthInput.vue';
import { demoLoginCredentials } from '@/data/authData';

const formRef = ref<HTMLFormElement | null>(null);
const state = window.__APP_STATE__ ?? {};
const oldInput = state.old ?? {};
const errors = state.errors ?? {};

const email = ref(oldInput.email ?? '');
const password = ref('');
const rememberMe = ref(['1', 'true', 'on'].includes(String(oldInput.remember ?? '')));

const csrfToken = computed(() => {
    const token = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return token ?? '';
});

function firstError(field: string) {
    return errors[field]?.[0] ?? '';
}

function useDemoCredentials() {
    email.value = demoLoginCredentials.email;
    password.value = demoLoginCredentials.password;
    rememberMe.value = true;
    formRef.value?.requestSubmit();
}
</script>
