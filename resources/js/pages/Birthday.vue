<script setup>
import { Head } from '@inertiajs/vue3';
import { reactive } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue';
const user = reactive({
  name: 'John Doe',
  age: 25
})
const birthday = () => user.age++
</script>
<template>
    <Head title="Birthday" />  
    <AppLayout> 
        <div>
            <h2>User Info</h2>
            <p>Name: {{ user.name }}</p>
            <p>Age: {{ user.age }}</p>
            <button 
                @click="birthday"
                class="px-3 py-2 w-[200px] rounded text-white bg-blue-500 hover:bg-blue-800"
            >Happy Birthday!</button>
        </div>
    </AppLayout>        
</template>