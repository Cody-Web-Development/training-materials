<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { Head } from '@inertiajs/vue3'
import StatsCard from '@/components/dashboard/StatsCard.vue'
import ChartCard from '@/components/dashboard/ChartCard.vue'
import RecentActivityCard from '@/components/dashboard/RecentActivityCard.vue'

const stats = [
    {
        title: 'Total Users',
        value: '1,234',
        change: '+12%',
        trend: 'up',
        icon: 'users',
    },
    {
        title: 'Active Banks',
        value: '42',
        change: '+4.5%',
        trend: 'up',
        icon: 'building',
    },
    {
        title: 'Total Revenue',
        value: '$125,430',
        change: '-2.4%',
        trend: 'down',
        icon: 'chart',
    },
    {
        title: 'Conversion Rate',
        value: '3.24%',
        change: '+1.2%',
        trend: 'up',
        icon: 'trending',
    },
]
</script>

<template>
    <DashboardLayout title="Dashboard">
        <Head title="Dashboard" />

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                v-for="stat in stats"
                :key="stat.title"
                :title="stat.title"
                :value="stat.value"
                :change="stat.change"
                :trend="stat.trend"
                :icon="stat.icon"
            />
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <!-- Main Chart -->
            <ChartCard class="lg:col-span-2" />

            <!-- Sidebar Chart -->
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm">
                <h3 class="text-lg font-semibold text-transparent bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text mb-4">Top Performing Banks</h3>
                <div class="space-y-4">
                    <div
                        v-for="i in 5"
                        :key="i"
                        class="flex items-center justify-between pb-3 border-b border-slate-700/50 last:border-b-0 hover:bg-slate-700/20 px-2 py-1 rounded transition-colors"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-600 shadow-lg"
                            />
                            <div>
                                <p class="text-sm font-medium text-slate-100">Bank {{ i }}</p>
                                <p class="text-xs text-slate-500">{{ 1200 + i * 100 }} users</p>
                            </div>
                        </div>
                        <span class="text-sm font-semibold text-emerald-400">
                            {{ 95 - i * 5 }}%
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Activity and Tasks -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RecentActivityCard />

            <!-- Quick Actions -->
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm">
                <h3 class="text-lg font-semibold text-transparent bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text mb-4">Quick Actions</h3>
                <div class="space-y-3">
                    <button
                        class="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                    >
                        + Add New User
                    </button>
                    <button
                        class="w-full px-4 py-2.5 bg-slate-700/50 text-slate-200 rounded-lg hover:bg-slate-600/50 transition-colors font-medium border border-slate-600/50 hover:border-slate-500/50"
                    >
                        + Add Bank
                    </button>
                    <button
                        class="w-full px-4 py-2.5 bg-slate-700/50 text-slate-200 rounded-lg hover:bg-slate-600/50 transition-colors font-medium border border-slate-600/50 hover:border-slate-500/50"
                    >
                        View Reports
                    </button>
                    <button
                        class="w-full px-4 py-2.5 bg-slate-700/50 text-slate-200 rounded-lg hover:bg-slate-600/50 transition-colors font-medium border border-slate-600/50 hover:border-slate-500/50"
                    >
                        Settings
                    </button>
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>
