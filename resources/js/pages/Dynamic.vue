<script setup>
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';

defineProps({
    slug: {
        type: String,
        required: true,
    }
});
</script>
<template>
    <Head title="Dynamic" />  
    <AppLayout> 
        <div>
            <div class="mt-2 inline-block px-3 py-2 bg-yellow-300 rounded text-black">Dynamic URL: {{ slug }}</div>
        </div>
    </AppLayout>        
</template>