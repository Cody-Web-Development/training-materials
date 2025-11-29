<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
</script>

<template>
  <Head>
    <title>Home Page</title>
    <meta name="description" content="This is the home page" />
  </Head>

  <div class="text-center p-10">
    <h1 class="text-3xl font-bold text-green-600">
      Hello from Inertia + Vue 3 + Laravel 12!
    </h1>

    <Link href="/about" class="text-blue-600 underline">Go to About</Link>
  </div>
</template>
