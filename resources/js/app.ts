import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';

// import.meta.glob returns unknown, so type it properly
const pages = import.meta.glob<Record<string, any>>('./Pages/**/*.vue');

createInertiaApp({
  resolve: (name: string) =>
    resolvePageComponent<DefineComponent>(
      `./Pages/${name}.vue`,
      Object.fromEntries(
        Object.entries(pages).map(([key, resolver]) => [
          key,
          async () => {
            // Cast the module so TypeScript knows it has a default export
            const mod = (await resolver()) as { default: DefineComponent };
            return mod.default;
          },
        ])
      )
    ),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin) // required for Head & Link
      .mount(el);
  },
});
