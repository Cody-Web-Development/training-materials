# Tailwind Dashboard Documentation

A modern, fully responsive Tailwind CSS dashboard built with Vue 3, TypeScript, and Inertia.js. Features a sidebar navigation, top header bar, and flexible layout system.

## Components

### Layout Components

#### `DashboardLayout.vue`
Main layout wrapper for dashboard pages with sidebar and header integration.

**Props:**
- `title` (string, optional) - Page title displayed in header
- `class` (string, optional) - Additional CSS classes for content area

**Slots:**
- `header` - Custom header content
- `header-action` - Header action buttons area
- Default slot - Main page content

**Usage:**
```vue
<template>
    <DashboardLayout title="Users">
        <template #header-action>
            <button class="btn-primary">New User</button>
        </template>

        <!-- Page content -->
        <div>Content here</div>
    </DashboardLayout>
</template>
```

### Navigation Components

#### `DashboardSidebar.vue`
Collapsible sidebar with navigation menu, responsive mobile overlay, and rounded icon buttons.

**Props:**
- `open` (boolean) - Sidebar visibility state

**Emits:**
- `toggle` - Emitted when sidebar toggle button clicked

**Features:**
- Mobile responsive with overlay
- Nested navigation items
- Active state styling
- Badge support (e.g., notification count)
- Smooth transitions

#### `DashboardHeader.vue`
Top navigation bar with search, notifications, and user menu.

**Props:**
- `sidebarOpen` (boolean) - Current sidebar state

**Emits:**
- `toggleSidebar` - Toggle sidebar visibility

**Features:**
- Search functionality
- Notifications bell with badge
- User dropdown menu with profile options
- Responsive design
- Logout functionality

### Content Components

#### `StatsCard.vue`
Display key metrics with trend indicators.

**Props:**
- `title` (string) - Card title
- `value` (string) - Main metric value
- `change` (string) - Change percentage/text
- `trend` ('up' | 'down') - Trend direction
- `icon` (string) - Icon type (users, building, chart, trending)

**Example:**
```vue
<StatsCard
    title="Total Users"
    value="1,234"
    change="+12%"
    trend="up"
    icon="users"
/>
```

#### `ChartCard.vue`
Revenue overview bar chart with period selector.

**Props:**
- `class` (string, optional) - Additional CSS classes

**Features:**
- Interactive bar chart
- Period selector dropdown
- Gradient colored bars
- Hover effects
- Legend and stats display

#### `RecentActivityCard.vue`
Timeline of recent system activities with type-based color coding.

**Features:**
- Activity types: user, bank, system
- Color-coded icons by activity type
- Timestamp display
- Expandable list
- View all activity link

## Layout Structure

```
┌─────────────────────────────────────────────┐
│           DashboardHeader                    │
│  (Search, Notifications, User Menu)         │
├──────────────┬──────────────────────────────┤
│              │                              │
│ Sidebar      │     Main Content Area        │
│ Navigation   │     (DashboardLayout)        │
│              │                              │
│              │  • Stats Cards               │
│              │  • Charts                    │
│              │  • Activity Feed             │
│              │  • Custom Content            │
│              │                              │
└──────────────┴──────────────────────────────┘
```

## Responsive Behavior

- **Mobile (< 1024px):**
  - Sidebar hidden by default
  - Overlay when sidebar visible
  - Hamburger menu toggle
  - Simplified header

- **Desktop (≥ 1024px):**
  - Sidebar always visible
  - No overlay
  - Full search bar
  - Full user menu

## Color Scheme

- **Primary:** Indigo-600 (actions, active states)
- **Gray Scale:** Gray-900 (text), Gray-600 (secondary), Gray-100 (backgrounds)
- **Success:** Green (up trends, verified)
- **Danger:** Red (down trends, alerts)
- **Info:** Blue (user actions)
- **Warning:** Purple (system events)

## Usage Example

### Complete Dashboard Page

```vue
<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { Head } from '@inertiajs/vue3'
import StatsCard from '@/components/dashboard/StatsCard.vue'

const stats = [
    {
        title: 'Total Users',
        value: '1,234',
        change: '+12%',
        trend: 'up',
        icon: 'users',
    },
]
</script>

<template>
    <DashboardLayout title="My Dashboard">
        <Head title="Dashboard" />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
                v-for="stat in stats"
                :key="stat.title"
                v-bind="stat"
            />
        </div>
    </DashboardLayout>
</template>
```

### Custom Header Actions

```vue
<template>
    <DashboardLayout title="Users">
        <template #header-action>
            <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                + Add User
            </button>
        </template>

        <!-- Page content -->
    </DashboardLayout>
</template>
```

## Customization

### Changing Theme Colors

Edit the Tailwind classes in components:
- Primary: Change `indigo-600` to your brand color
- Sidebar: Modify `bg-gray-900` to custom background
- Cards: Update `bg-white` and shadow classes

### Adding Navigation Items

Edit `DashboardSidebar.vue` `navItems` array:
```typescript
const navItems = [
    {
        title: 'Reports',
        href: '/reports',
        icon: 'chart',
        children: [
            { title: 'Sales', href: '/reports/sales' },
            { title: 'Analytics', href: '/reports/analytics' },
        ],
    },
]
```

### Extending Icons

Add new icons to `getIcon()` functions:
```typescript
const icons: Record<string, string> = {
    'custom-icon': `<svg>...</svg>`,
}
```

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus indicators on interactive elements

## Performance

- Lightweight components (~5KB gzipped)
- No external chart library (uses CSS)
- Minimal JavaScript footprint
- Fast mobile rendering
- CSS-based animations (GPU accelerated)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Future Enhancements

- [ ] Dark mode toggle
- [ ] More chart types (pie, line, area)
- [ ] Data table component
- [ ] Notification drawer
- [ ] User activity analytics
- [ ] Custom dashboard widgets
- [ ] Export reports functionality

## Troubleshooting

### Sidebar not toggling
Ensure `@toggle` event is properly bound in parent component.

### Icons not displaying
Check that icon names match the `getIcon()` function keys.

### Layout breaking on mobile
Verify Tailwind breakpoints are included: `sm:`, `md:`, `lg:`.

### Style conflicts
Clear Tailwind cache: `npm run build -- --force`

## License

MIT - Free to use and modify for your projects.
