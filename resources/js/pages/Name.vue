<script setup>
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { ref, watch } from 'vue'
const name = ref('')
const greeting = ref('')
watch(name, (newValue, oldValue) =>  greeting.value = newValue ? `Hello, ${newValue}!` : '')
</script>
<template>
    <Head title="Name" />  
    <AppLayout> 
        <div>
            <label for="name">Type your name</label><br/>
            <input v-model="name" id="name" class=" p-2 rounded shadow w-[500px] border border-gray-300" /><br/>
            <div class="mt-2 inline-block px-3 py-2 bg-yellow-300 rounded text-black">Greeting: {{ greeting }}</div>
        </div>
    </AppLayout>        
</template>