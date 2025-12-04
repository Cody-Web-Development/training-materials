<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { Head } from '@inertiajs/vue3'
import { onMounted, ref, computed } from 'vue'
import { ApiClient } from '@/lib/axios-client'
import { useAuthGuard } from '@/composables/useAuthGuard'

const { redirectIfNotAuthenticated } = useAuthGuard()

// Minimal metrics state
const totalUsers = ref<number | null>(null)
const loggedInUsers = ref<number | null>(null)
const failedAttempts = ref<number | null>(null)
const loading = ref(true)
const lastUpdated = ref<string | null>(null)

// Computed properties
const onlinePercentage = computed(() => {
    if (!totalUsers.value || totalUsers.value === 0) return 0
    return Math.round((loggedInUsers.value! / totalUsers.value) * 100)
})

const offlineUsers = computed(() => {
    if (!totalUsers.value || !loggedInUsers.value) return 0
    return totalUsers.value - loggedInUsers.value
})

const fetchMetrics = async () => {
    loading.value = true
    try {
        const data = await ApiClient.get('/api/v1/admin/metrics')
        totalUsers.value = data.total_users ?? null
        loggedInUsers.value = data.logged_in_users ?? null
        failedAttempts.value = data.failed_attempts ?? null
        lastUpdated.value = new Date().toISOString()
    } catch (err) {
        console.error('Failed to load metrics', err)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    redirectIfNotAuthenticated()
    void fetchMetrics()
})
</script>

<template>
    <DashboardLayout title="Dashboard">
        <Head title="Dashboard" />

        <div class="max-w-6xl mx-auto py-8 px-4">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h2 class="text-3xl font-bold text-gray-900">Dashboard</h2>
                    <p class="text-gray-600 text-sm mt-1">Real-time system metrics and user activity</p>
                </div>
                <div class="flex items-center gap-3">
                    <button
                        @click="fetchMetrics"
                        :disabled="loading"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4 4a8 8 0 0112.9-1.4L18 2a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1l.5-.5A6 6 0 106 6v1a1 1 0 01-2 0V4z" clip-rule="evenodd"/></svg>
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            <!-- Main metrics grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <!-- Total Users Card -->
                <div class="p-6 bg-white border rounded-lg shadow-sm">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Total Users</p>
                            <p class="mt-2 text-4xl font-bold text-gray-900">{{ loading ? '—' : (totalUsers ?? '0') }}</p>
                        </div>
                        <div class="p-3 bg-blue-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 8.048M12 4.354L8.646 7.708m6.708 0L15.354 7.708M9 12H9.01M15 12H15.01M12 20h.01" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Logged In Users Card -->
                <div class="p-6 bg-white border rounded-lg shadow-sm">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Currently Logged In</p>
                            <p class="mt-2 text-4xl font-bold text-green-600">{{ loading ? '—' : (loggedInUsers ?? '0') }}</p>
                            <p class="mt-2 text-xs text-gray-500">{{ onlinePercentage }}% online</p>
                        </div>
                        <div class="p-3 bg-green-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Offline Users Card -->
                <div class="p-6 bg-white border rounded-lg shadow-sm">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Offline Users</p>
                            <p class="mt-2 text-4xl font-bold text-gray-600">{{ loading ? '—' : offlineUsers }}</p>
                            <p class="mt-2 text-xs text-gray-500">{{ 100 - onlinePercentage }}% offline</p>
                        </div>
                        <div class="p-3 bg-gray-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Failed Attempts Card -->
                <div class="p-6 bg-white border rounded-lg shadow-sm">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">Failed Login Attempts</p>
                            <p class="mt-2 text-4xl font-bold text-red-600">{{ loading ? '—' : (failedAttempts ?? '0') }}</p>
                        </div>
                        <div class="p-3 bg-red-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-sm text-gray-500 text-right">
                <span v-if="lastUpdated">Last updated: {{ new Date(lastUpdated).toLocaleString() }}</span>
            </div>
        </div>
    </DashboardLayout>
</template>
