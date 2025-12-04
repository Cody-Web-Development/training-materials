<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthBase from '@/layouts/AuthLayout.vue';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Head } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/axios-store'
import { dashboard } from '@/routes'

defineProps<{
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}>();

const auth = useAuthStore()
const form = ref({ email: '', password: '', remember: false })
const errors = ref<{ email?: string; password?: string; general?: string }>({})
const processing = computed(() => auth.isLoading)

const submit = async () => {
    errors.value = {}
    try {
        const response = await auth.login(form.value.email, form.value.password)
        
        // Save token to localStorage
        if (response?.token) {
            localStorage.setItem('api_token', response.token)
        }
        
        // Redirect to dashboard
        window.location.href = dashboard.url()

    } catch (err: any) {
        console.log('Error:', err);
        const e = err?.errors ?? err?.response?.data?.errors
        if (e) {
            errors.value.email = e.email?.[0] ?? undefined
            errors.value.password = e.password?.[0] ?? undefined
        } else {
            errors.value.general = auth.error || err?.message || 'Login failed'
        }
    }
}
</script>

<template>
    <AuthBase
        title="Log in to your account"
        description="Enter your email and password below to log in"
    >
        <Head title="Log in" />

        <div v-if="errors.general" class="mb-4 rounded bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            {{ errors.general }}
        </div>

        <div
            v-if="status"
            class="mb-4 text-center text-sm font-medium text-green-600"
        >
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        v-model="form.email"
                        required
                        autofocus
                        :tabindex="1"
                        autocomplete="email"
                        placeholder="email@example.com"
                    />
                    <InputError :message="errors.email" />
                </div>

                <div class="grid gap-2">
                    <div class="flex items-center justify-between">
                        <Label for="password">Password</Label>
                        <TextLink
                            v-if="canResetPassword"
                            :href="request()"
                            class="text-sm"
                            :tabindex="5"
                        >
                            Forgot password?
                        </TextLink>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        v-model="form.password"
                        required
                        :tabindex="2"
                        autocomplete="current-password"
                        placeholder="Password"
                    />
                    <InputError :message="errors.password" />
                </div>

                <div class="flex items-center justify-between">
                    <Label for="remember" class="flex items-center space-x-3">
                        <Checkbox id="remember" name="remember" v-model="form.remember" :tabindex="3" />
                        <span>Remember me</span>
                    </Label>
                </div>

                <Button
                    type="submit"
                    class="mt-4 w-full"
                    :tabindex="4"
                    :disabled="processing"
                    data-test="login-button"
                >
                    <Spinner v-if="processing" />
                    Log in
                </Button>
            </div>

            <div
                class="text-center text-sm text-muted-foreground"
                v-if="canRegister"
            >
                Don't have an account?
                <TextLink :href="register()" :tabindex="5">Sign up</TextLink>
            </div>
        </form>
    </AuthBase>
</template>
