import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createPinia } from 'pinia';

const pages = import.meta.glob<Record<string, any>>('./Pages/**/*.vue');
const pinia = createPinia();

createInertiaApp({
  resolve: (name: string) =>
    resolvePageComponent<DefineComponent>(
      `./Pages/${name}.vue`,
      Object.fromEntries(
        Object.entries(pages).map(([key, resolver]) => [
          key,
          async () => {
            const mod = (await resolver()) as { default: DefineComponent };
            return mod.default;
          },
        ])
      )
    ),
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) });
    app.use(plugin);
    app.use(pinia);
    app.mount(el);
      

  },
});
