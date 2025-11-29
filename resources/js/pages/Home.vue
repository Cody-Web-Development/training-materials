<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>
<template>
  <Head title="Home" />  
  <AppLayout
    class="p-0 rounded"
  >
    <div class="rounded shadow overflow">
      <img src="/storage/images/home.png" class="w-full" />
    </div>
  </AppLayout>
</template>