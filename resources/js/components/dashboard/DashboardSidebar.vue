<script setup lang="ts">
import { computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import AppLogo from '@/components/AppLogo.vue'

const props = withDefaults(
    defineProps<{
        open: boolean
    }>(),
    {
        open: true,
    }
)

const emit = defineEmits<{
    toggle: []
}>()

const page = usePage()

const currentPath = computed(() => {
    return page.props.route_name || ''
})

const navItems = [
    {
        title: 'Dashboard',
        href: '/',
        icon: 'dashboard',
        active: currentPath.value === 'home',
    },
    {
        title: 'Users',
        href: '/users',
        icon: 'users',
        badge: '12',
    },
    {
        title: 'Banks',
        href: '/banks',
        icon: 'building',
    },
    {
        title: 'Settings',
        href: '/settings/profile',
        icon: 'settings',
        children: [
            { title: 'Profile', href: '/settings/profile' },
            { title: 'Password', href: '/settings/password' },
            { title: 'Appearance', href: '/settings/appearance' },
        ],
    },
]

const getIcon = (name: string) => {
    const icons: Record<string, string> = {
        dashboard: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 4v4m4-4v4m-5-10l2-1m0 0l7-4 7 4m-9 3v10" />
        </svg>`,
        users: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 8.048M12 4.354L8.646 7.708m6.708 0L15.354 7.708M9 12H9.01M15 12H15.01M12 20h.01" />
        </svg>`,
        building: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>`,
        settings: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>`,
    }
    return icons[name] || icons.dashboard
}
</script>

<template>
    <!-- Mobile overlay -->
    <div
        v-show="open"
        class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
        @click="emit('toggle')"
    />

    <!-- Sidebar -->
    <aside
        :class="[
            'fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-0 border-r border-slate-700/50',
            open ? 'translate-x-0' : '-translate-x-full',
        ]"
    >
        <div class="flex flex-col h-full">
            <!-- Logo -->
            <div class="flex items-center justify-between h-16 px-4 border-b border-slate-700/50">
                <AppLogo class="text-white" />
                <button
                    @click="emit('toggle')"
                    class="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                    <svg
                        class="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <div v-for="item in navItems" :key="item.href" class="space-y-1">
                    <!-- Main item -->
                    <Link
                        :href="item.href"
                        :class="[
                            'flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                            item.active
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50',
                        ]"
                    >
                        <div class="flex items-center gap-3">
                            <span v-html="getIcon(item.icon)" />
                            <span>{{ item.title }}</span>
                        </div>
                        <span
                            v-if="item.badge"
                            class="ml-auto bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow-lg"
                        >
                            {{ item.badge }}
                        </span>
                    </Link>

                    <!-- Sub items -->
                    <div v-if="item.children" class="space-y-1 pl-4">
                        <Link
                            v-for="child in item.children"
                            :key="child.href"
                            :href="child.href"
                            class="flex items-center px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-200 hover:bg-slate-800/30 transition-colors"
                        >
                            <svg
                                class="w-2 h-2 mr-2"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                            >
                                <circle cx="4" cy="4" r="3" />
                            </svg>
                            {{ child.title }}
                        </Link>
                    </div>
                </div>
            </nav>

            <!-- Footer -->
            <div class="border-t border-slate-700/50 p-4">
                <div class="text-xs text-slate-500 text-center">
                    <p>© 2025 Dashboard</p>
                    <p class="mt-1">v1.0.0</p>
                </div>
            </div>
        </div>
    </aside>
</template>
