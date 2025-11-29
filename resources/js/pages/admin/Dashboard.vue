<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/vue3'; 
import PlaceholderPattern from '@/components/PlaceholderPattern.vue';
import { type NavItem } from '@/types';
import { DASHBOARD_NAV_ITEMS } from '@/config/navigation.ts'

const page = usePage();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

</script>

<template>
    <Head title="Dashboard" />

    <AppLayout 
        :breadcrumbs="breadcrumbs"
        class="p-0 rounded"
    >

<div class="flex flex-col h-screen bg-white rounded">
    <div class="flex flex-1 overflow-hidden">
        
        <aside class="w-64 bg-gray-800 text-white overflow-y-auto hidden md:block rounded-tl-lg rounded-bl-lg">
            <nav class="space-y-2">
                <Link
                    v-for="item in DASHBOARD_NAV_ITEMS"
                    :key="item.title"
                    :href="item.href"
                    :class="{
                        'transition duration-300 ease-in-out px-6 py-3 mb-0 block rounded text-base text-gray-300': true,                
                        'bg-gray-700 text-white': item.href === page.url,
                        'block p-3 rounded-md hover:bg-gray-700 transition duration-150': item.href !== page.url
                    }"
                >
                    {{ item.title }}
                </Link>
            </nav>
        </aside>

        <main class="flex-1 overflow-y-auto p-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            <!-- <p class="text-gray-700 leading-relaxed">
                This is the primary area for page content, forms, tables, and data displays.
                The layout uses Flexbox (`flex`) on the main container (`.flex-1 overflow-hidden`)
                to place the sidebar and main content side-by-side. The content area is given
                `flex-1` so it automatically expands to fill the rest of the available width.
            </p>
            <div class="h-[1000px] mt-8 bg-gray-50 p-4 rounded-md border border-dashed">
                Scrollable content placeholder...
            </div> -->
        </main>
    </div>
</div>
    </AppLayout>
</template>
