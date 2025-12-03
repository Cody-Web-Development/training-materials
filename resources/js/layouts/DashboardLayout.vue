<script setup lang="ts">
import { ref, computed } from 'vue'
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
    defineProps<{
        title?: string
        class?: HTMLAttributes['class']
    }>(),
    {
        title: 'Dashboard',
    }
)

const sidebarOpen = ref(true)

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
    <div class="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <!-- Sidebar -->
        <DashboardSidebar :open="sidebarOpen" @toggle="toggleSidebar" />

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Top Bar -->
            <DashboardHeader :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />

            <!-- Page Content -->
            <main class="flex-1 overflow-auto">
                <div class="px-4 py-8 sm:px-6 lg:px-8">
                    <!-- Page Header -->
                    <div v-if="title || $slots.header" class="mb-8">
                        <div class="flex items-center justify-between">
                            <div>
                                <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 bg-clip-text text-transparent">{{ title }}</h1>
                            </div>
                            <slot name="header-action" />
                        </div>
                        <slot name="header" />
                    </div>

                    <!-- Content -->
                    <div :class="cn('space-y-6', props.class)">
                        <slot />
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
