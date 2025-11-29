<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>
<template>
  <Head title="Login" />  
  <AppLayout
    class="p-0 rounded"
  >
    <div class="flex h-screen">
        
        <div class="w-3/5 bg-gray-200 p-12 flex items-center justify-center">
          <div class="max-w-xl text-center">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">
                Welcome to Laravel Training
            </h1>
            <p class="text-lg text-gray-600">
                This is a basic sample of using Laravel + VueJS and Vite. This page is entirely made with VueJS
            </p>
          </div>
        </div>
        <div class="w-2/5 bg-white p-12 shadow-2xl flex flex-col justify-center">            
            <h2 class="text-center mb-8 text-indigo-600">Sign In</h2>

            <form class="space-y-6">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-gray-800"
                  >
                </div>                
                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                  <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-gray-800"
                  >
                </div>

                <button 
                  type="submit" 
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                >
                  Log In
                </button>
            </form>
        </div>
    </div>
  </AppLayout>
</template>