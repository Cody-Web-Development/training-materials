<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

defineProps<{
    class?: HTMLAttributes['class']
}>()

// Sample data for chart
const chartData = [
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 300 },
    { month: 'Mar', value: 200 },
    { month: 'Apr', value: 278 },
    { month: 'May', value: 189 },
    { month: 'Jun', value: 239 },
    { month: 'Jul', value: 349 },
    { month: 'Aug', value: 430 },
    { month: 'Sep', value: 520 },
    { month: 'Oct', value: 480 },
    { month: 'Nov', value: 590 },
    { month: 'Dec', value: 650 },
]

const maxValue = Math.max(...chartData.map(d => d.value))

const getBarHeight = (value: number) => {
    return (value / maxValue) * 100
}
</script>

<template>
    <div :class="cn('bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm', $props.class)">
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-transparent bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text">Revenue Overview</h3>
            <select class="text-sm border border-slate-600/50 rounded-lg px-3 py-2 text-slate-300 bg-slate-700/50 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                <option class="bg-slate-900">Last 12 months</option>
                <option class="bg-slate-900">Last 30 days</option>
                <option class="bg-slate-900">Last 7 days</option>
            </select>
        </div>

        <!-- Simple bar chart -->
        <div class="flex items-end justify-between gap-2 h-64">
            <div
                v-for="item in chartData"
                :key="item.month"
                class="flex-1 flex flex-col items-center gap-2 group/bar"
            >
                <div class="relative w-full flex items-end justify-center h-full">
                    <div
                        class="w-full bg-gradient-to-t from-blue-600 via-blue-500 to-cyan-400 rounded-t-lg hover:from-blue-700 hover:via-blue-600 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-blue-500/20 group-hover/bar:shadow-blue-500/40"
                        :style="{ height: getBarHeight(item.value) + '%' }"
                    />
                </div>
                <span class="text-xs text-slate-400 font-medium">{{ item.month }}</span>
            </div>
        </div>

        <!-- Legend and stats -->
        <div class="mt-6 pt-6 border-t border-slate-700/50 flex items-center justify-between">
            <div class="space-y-2">
                <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />
                    <span class="text-sm text-slate-400">Revenue</span>
                </div>
            </div>
            <div class="text-right">
                <p class="text-sm text-slate-400">Total Revenue</p>
                <p class="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">$4,582</p>
            </div>
        </div>
    </div>
</template>
