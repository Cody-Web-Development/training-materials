<script setup>
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue';

const count = ref(0)
const increment = () => count.value++
</script>
<template>
    <Head title="Increment" />  
    <AppLayout>        
        <button 
            @click="increment"
            class="px-3 py-2 w-[200px] rounded text-white bg-blue-500 hover:bg-blue-800"
        >Count: {{ count }}</button>
    </AppLayout>        
</template>