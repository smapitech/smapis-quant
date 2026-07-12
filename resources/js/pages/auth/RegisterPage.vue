<template>
    <AppCard class="space-y-6 border-white/10 bg-[rgba(8,14,26,0.86)] sm:p-8">
        <div class="space-y-3">
            <AppBadge tone="emerald" subtle>Responsible onboarding</AppBadge>
            <h1 class="text-3xl font-semibold tracking-tight text-white">Create your account</h1>
            <p class="text-sm leading-6 text-slate-400">
                Join Smapis Quant AI and begin with paper trading before live execution.
            </p>
        </div>

        <form class="space-y-5" method="POST" action="/register">
            <input type="hidden" name="_token" :value="csrfToken">

            <AuthInput
                id="register-name"
                v-model="name"
                name="name"
                label="Full name"
                autocomplete="name"
                placeholder="Amina Ibrahim"
                :error="firstError('name')"
                required
            />

            <AuthInput
                id="register-email"
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
                id="register-password"
                v-model="password"
                name="password"
                label="Password"
                type="password"
                autocomplete="new-password"
                placeholder="Create a strong password"
                hint="Use at least 8 characters."
                :error="firstError('password')"
                required
            />

            <AuthInput
                id="register-password-confirmation"
                v-model="passwordConfirmation"
                name="password_confirmation"
                label="Confirm password"
                type="password"
                autocomplete="new-password"
                placeholder="Repeat your password"
                :error="firstError('password_confirmation')"
                required
            />

            <div class="grid gap-5 md:grid-cols-2">
                <label class="block space-y-2">
                    <span class="flex items-center justify-between gap-4 text-sm font-medium text-slate-200">
                        <span>Account type</span>
                        <span class="text-xs font-normal text-slate-500">Optional</span>
                    </span>
                    <select
                        v-model="accountType"
                        name="account_type"
                        :class="[
                            'block w-full rounded-2xl border bg-[rgba(5,10,19,0.76)] px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none transition focus:ring-2 focus:ring-teal-400/12',
                            firstError('account_type') ? 'border-rose-400/40 focus:border-rose-400/60 focus:ring-rose-400/12' : 'border-white/10 focus:border-teal-400/60',
                        ]"
                    >
                        <option value="">Choose account type</option>
                        <option v-for="option in accountTypeOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                    <p v-if="firstError('account_type')" class="text-xs leading-5 text-rose-300">
                        {{ firstError('account_type') }}
                    </p>
                </label>

                <label class="block space-y-2">
                    <span class="flex items-center justify-between gap-4 text-sm font-medium text-slate-200">
                        <span>Country</span>
                        <span class="text-xs font-normal text-slate-500">Optional</span>
                    </span>
                    <select
                        v-model="country"
                        name="country"
                        :class="[
                            'block w-full rounded-2xl border bg-[rgba(5,10,19,0.76)] px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none transition focus:ring-2 focus:ring-teal-400/12',
                            firstError('country') ? 'border-rose-400/40 focus:border-rose-400/60 focus:ring-rose-400/12' : 'border-white/10 focus:border-teal-400/60',
                        ]"
                    >
                        <option value="">Select country</option>
                        <option v-for="option in countryOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                    <p v-if="firstError('country')" class="text-xs leading-5 text-rose-300">
                        {{ firstError('country') }}
                    </p>
                </label>
            </div>

            <div class="space-y-2">
                <label class="inline-flex items-start gap-3 text-sm text-slate-300">
                    <input
                        v-model="termsAccepted"
                        name="terms"
                        type="checkbox"
                        class="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-teal-400 focus:ring-teal-400/40"
                    >
                    <span>
                        I agree to the terms and confirm I understand trading involves risk.
                    </span>
                </label>
                <p v-if="firstError('terms')" class="text-xs leading-5 text-rose-300">
                    {{ firstError('terms') }}
                </p>
            </div>

            <AuthButton type="submit">Create Account</AuthButton>

            <p class="text-sm leading-6 text-slate-400">
                Smapis Quant AI provides trading intelligence and automation tools. It does not guarantee profit.
                Users are responsible for their trading decisions.
            </p>

            <div class="flex items-center justify-between gap-3 text-sm text-slate-400">
                <span>Already have an account?</span>
                <AppButton to="/login" variant="ghost" size="sm">Sign in</AppButton>
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
import { accountTypeOptions, countryOptions } from '@/data/authData';

const state = window.__APP_STATE__ ?? {};
const oldInput = state.old ?? {};
const errors = state.errors ?? {};

const name = ref(oldInput.name ?? '');
const email = ref(oldInput.email ?? '');
const password = ref('');
const passwordConfirmation = ref('');
const accountType = ref(oldInput.account_type ?? '');
const country = ref(oldInput.country ?? '');
const termsAccepted = ref(['1', 'true', 'on'].includes(String(oldInput.terms ?? '')));

const csrfToken = computed(() => {
    const token = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return token ?? '';
});

function firstError(field: string) {
    return errors[field]?.[0] ?? '';
}
</script>
