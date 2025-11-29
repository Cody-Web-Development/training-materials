<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
// Import the generated Wayfinder action for the PostController
// The path will map to your controller's namespace and class name
import { show } from '@/actions/App/Http/Controllers/TicketController';

defineProps<{
    tickets: string[];
}>();
</script>

<template>
    <h1>All Tickets</h1>
    <div v-for="(ticket, index) in tickets" :key="index">
        <Link :href="show(index + 1)"> 
            View Ticket {{ index + 1 }}
        </Link>
    </div>
</template>