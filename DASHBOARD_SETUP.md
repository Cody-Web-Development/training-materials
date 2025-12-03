# Dashboard Layout - Complete Setup Guide

## 📊 What's Included

A production-ready Tailwind CSS dashboard with fully responsive design, modern UI components, and seamless integration with Vue 3 + Inertia.js.

### Core Files Created

```
resources/js/
├── layouts/
│   └── DashboardLayout.vue          # Main dashboard layout wrapper
├── pages/
│   └── Dashboard.vue                 # Dashboard home page
└── components/dashboard/
    ├── DashboardHeader.vue           # Top navigation bar
    ├── DashboardSidebar.vue          # Side navigation
    ├── StatsCard.vue                 # Metric cards
    ├── ChartCard.vue                 # Revenue chart
    ├── RecentActivityCard.vue        # Activity timeline
    └── DataTable.vue                 # Reusable data table
```

## 🎨 Features

### DashboardLayout.vue
- Clean, modern layout with sidebar + main content
- Responsive design (mobile-first)
- Flexible slot system for customization
- Props for title and custom styling

### DashboardSidebar.vue
- Dark-themed collapsible navigation
- Mobile overlay support
- Nested menu items with sub-navigation
- Badge support for notifications
- Smooth transitions

### DashboardHeader.vue
- Top navigation bar with branding space
- Search functionality
- Notifications bell with badge
- User dropdown menu with logout
- Fully responsive design

### Dashboard Content Components

#### StatsCard
- Display key metrics (KPIs)
- Trend indicators (up/down)
- Colorful icons
- Responsive grid layout

#### ChartCard
- Simple bar chart visualization
- Period selector dropdown
- Gradient styling
- Legend and stats display
- No external chart library needed

#### RecentActivityCard
- Activity feed timeline
- Type-based color coding
- Timestamps
- Expandable list

#### DataTable
- Generic TypeScript support
- Sortable columns
- Striped/hover effects
- Responsive scrolling
- Empty state handling
- Loading state
- Customizable cell rendering with slots

## 🚀 Quick Start

### 1. Use the DashboardLayout

```vue
<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
</script>

<template>
    <DashboardLayout title="Page Title">
        <!-- Your content here -->
    </DashboardLayout>
</template>
```

### 2. Add Stats Cards

```vue
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatsCard
        title="Total Users"
        value="1,234"
        change="+12%"
        trend="up"
        icon="users"
    />
</div>
```

### 3. Include Charts

```vue
<ChartCard class="lg:col-span-2" />
```

### 4. Display Data in Tables

```vue
<script setup lang="ts">
const columns = [
    { key: 'id', label: 'ID', width: '80px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
]

const data = [
    { id: 1, name: 'John', email: 'john@example.com', status: 'Active' },
]
</script>

<template>
    <DataTable :columns="columns" :data="data">
        <template #cell-status="{ value }">
            <span :class="[
                'px-2 py-1 rounded text-xs font-medium',
                value === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
            ]">
                {{ value }}
            </span>
        </template>
    </DataTable>
</template>
```

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (Sidebar hidden, overlay on toggle)
- **Tablet:** 768px - 1023px (Sidebar visible, optimized layout)
- **Desktop:** ≥ 1024px (Full sidebar always visible)

## 🎯 Common Use Cases

### Dashboard with Multiple Sections
```vue
<DashboardLayout title="Analytics">
    <!-- Stats Row -->
    <div class="grid grid-cols-4 gap-6">
        <StatsCard ... />
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-3 gap-6">
        <ChartCard class="col-span-2" />
        <div class="bg-white rounded-lg shadow p-6">...</div>
    </div>
</DashboardLayout>
```

### Data Management Page
```vue
<DashboardLayout title="Users">
    <template #header-action>
        <button class="btn-primary">+ Add User</button>
    </template>

    <DataTable :columns="columns" :data="users" />
</DashboardLayout>
```

### Settings/Profile Page
```vue
<DashboardLayout title="Settings">
    <div class="max-w-2xl bg-white rounded-lg shadow p-6">
        <!-- Settings form -->
    </div>
</DashboardLayout>
```

## 🎨 Customization

### Change Primary Color
Replace `indigo-600` with your brand color throughout components:
- `bg-indigo-600` → `bg-blue-600`
- `hover:bg-indigo-700` → `hover:bg-blue-700`
- `focus:ring-indigo-500` → `focus:ring-blue-500`

### Customize Sidebar
Edit `DashboardSidebar.vue`:
```typescript
const navItems = [
    {
        title: 'Custom Item',
        href: '/custom',
        icon: 'custom-icon',
        children: [
            { title: 'Sub Item', href: '/custom/sub' }
        ]
    }
]
```

### Add New Stats Icons
Edit `StatsCard.vue` `getIcon()` function and add:
```typescript
'your-icon': `<svg>...</svg>`
```

## 📊 Example Dashboard Page

See `resources/js/pages/Dashboard.vue` for a complete working example with:
- 4 stats cards
- Revenue chart
- Top banks ranking
- Quick actions buttons
- Recent activity feed

## 🔗 Integration

### With Inertia.js
```php
// routes/web.php
Route::get('/dashboard', DashboardController::class)->name('dashboard');

// In controller
return Inertia::render('Dashboard', [
    'stats' => [...],
    'chartData' => [...]
]);
```

### With Pinia Stores
```vue
<script setup lang="ts">
import { useBankStore } from '@/stores/axios-store'
const bankStore = useBankStore()

onMounted(() => {
    bankStore.fetchBanks()
})
</script>

<template>
    <DataTable
        :columns="columns"
        :data="bankStore.banks"
        :loading="bankStore.isLoading"
    />
</template>
```

## 📚 Component API Reference

### DashboardLayout
**Props:** `title?`, `class?`
**Slots:** `header`, `header-action`, default

### DashboardHeader
**Props:** `sidebarOpen`
**Emits:** `toggleSidebar`

### DashboardSidebar
**Props:** `open`
**Emits:** `toggle`

### StatsCard
**Props:** `title`, `value`, `change`, `trend`, `icon`

### ChartCard
**Props:** `class?`

### DataTable
**Props:** `columns`, `data`, `striped?`, `hover?`, `bordered?`, `loading?`, `class?`
**Emits:** `sort`, `rowClick`
**Slots:** `cell-{columnKey}` for custom cell rendering

## 🎯 Next Steps

1. **Create your dashboard pages** using `DashboardLayout`
2. **Customize colors** to match your brand
3. **Add navigation items** to the sidebar
4. **Create data tables** with your data
5. **Integrate with stores** for reactive data
6. **Add dark mode** (coming soon)

## 💡 Tips

- Use `grid grid-cols-{1,2,3,4}` for responsive layouts
- Combine components for complex dashboards
- Leverage slots for custom cell rendering in tables
- Add transitions for smooth interactions
- Use Pinia stores for reactive data updates

## 📖 Documentation

See `DASHBOARD_LAYOUT.md` for detailed component documentation.

## 📝 License

MIT - Free to use and modify for your projects.
