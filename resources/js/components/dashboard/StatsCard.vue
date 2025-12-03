<script setup lang="ts">
defineProps<{
    title: string
    value: string
    change: string
    trend: 'up' | 'down'
    icon: string
}>()

const getIcon = (name: string) => {
    const icons: Record<string, string> = {
        users: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 8.048M12 4.354L8.646 7.708m6.708 0L15.354 7.708M9 12H9.01M15 12H15.01M12 20h.01" />
        </svg>`,
        building: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>`,
        chart: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`,
        trending: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>`,
    }
    return icons[name] || icons.chart
}
</script>

<template>
    <div class="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden">
        <!-- Gradient background on hover -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/5 group-hover:to-cyan-600/5 transition-all duration-300 pointer-events-none rounded-xl" />

        <div class="relative flex items-start justify-between">
            <div>
                <p class="text-sm font-medium text-slate-400">{{ title }}</p>
                <p class="mt-2 text-3xl font-bold text-transparent bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text">{{ value }}</p>
            </div>
            <div
                :class="[
                    'p-3 rounded-lg',
                    trend === 'up'
                        ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 text-emerald-400'
                        : 'bg-gradient-to-br from-red-500/20 to-red-600/20 text-red-400',
                ]"
                v-html="getIcon(icon)"
            />
        </div>
        <div class="mt-4 flex items-center relative">
            <span
                :class="[
                    'text-sm font-semibold',
                    trend === 'up' ? 'text-emerald-400' : 'text-red-400',
                ]"
            >
                {{ change }}
            </span>
            <span class="text-sm text-slate-500 ml-2">
                {{ trend === 'up' ? '↑' : '↓' }} from last month
            </span>
        </div>
    </div>
</template>
