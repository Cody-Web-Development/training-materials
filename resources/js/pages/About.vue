<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import Breadcrumbs from '@/components/Breadcrumbs.vue';

const dashboardBreadcrumbs = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'About',
    },
];

</script>
<template>
  <Head title="About" />  
  <AppLayout>        
      <template #header>
          <h1>About</h1>
          <Breadcrumbs 
            :breadcrumbs="dashboardBreadcrumbs"
            class="mt-8"
          /> 
      </template>
      <div>
          <h2>The Laravel, Vue, Vite, Inertia Stack (LVI Stack)</h2>
          <p>The implementation of Vue.js in a modern Laravel project (version 9 and later) is streamlined by adopting a specific technology stack to provide a fast, Single-Page Application (SPA)-like experience while retaining the simplicity of Laravel's server-side routing.</p>
          <ol class="list-decimal list-outside pl-8 space-y-2 **text-lg** font-normal text-gray-700">
            <li class="mb-4">
              <h4>Vite: The Asset Bundler</h4>
              <p>Vite is the default, next-generation build tool for Laravel, replacing Webpack.</p>
              <p><strong>Role:</strong> Vite compiles your Vue components, TypeScript, and Tailwind CSS and provides Hot Module Replacement (HMR). This means when you save a file in development, the changes appear instantly in the browser without a full page refresh.</p>
              <p><strong>Implementation:</strong> Vite is configured via vite.config.js to process .vue files using the @vitejs/plugin-vue plugin and manage asset paths via the @vite Blade directive.</p>
            </li>
            <li>
              <h4>Vue.js: The Frontend Framework</h4>
              <p>Vue 3 is used for building dynamic and reusable user interfaces.</p>
              <p><strong>Role:</strong> Vue handles all client-side logic, interactivity, and rendering of components.</p>
              <p><strong>Implementation:</strong> Your application is initialized in resources/js/app.ts (or app.js), where you create the Vue app and pass it to Inertia.</p>
            </li>
            <li>
              <h4>Inertia.js: The Glue</h4>
              <p>Inertia.js is the key technology that allows you to use Vue components without the complexity of client-side routing (like Vue Router). It acts as the "glue" between Laravel and Vue.</p>
              <p><strong>Role:</strong> When a user clicks a link, Inertia intercepts the request and handles it via AJAX. The Laravel backend sends a JSON response containing the name of the Vue component to load and any props (data) it needs. Inertia then swaps the current Vue component for the new one, achieving an SPA feel.</p>
              <p><strong>Implementation:</strong> All routing is defined in Laravel's routes/web.php. Controllers render views using return Inertia::render('ComponentName', $data).</p>
            </li>
          </ol>
      </div>
  </AppLayout>
</template>